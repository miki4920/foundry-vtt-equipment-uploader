import {properties} from "./properties";

export class DataHandler {
    private players: {};
    constructor(IDs) {
        this.players = this.getPlayers(IDs);
        this.insertIntoDatabase()
    }

    getPlayers(IDs) {
        const players = {}
        for(const key of Object.keys(IDs)) {
            players[key] = IDs[key].map(ID => game["actors"].get(ID))
        }
        return players
    }

    getItemLevel(item) {
        let itemLevel = item["level"]
        if(item["type"] === "armor") {
            for(const key of Object.keys(properties["armor"])) {
                let runes = properties["armor"][key]
                let runeLevel = runes[item["system"][key]["value"]]
                runeLevel = runeLevel === undefined ? 0 : runeLevel["level"]
                itemLevel = Math.max(itemLevel, isNaN(runeLevel) ? 0 : runeLevel)
            }
        }
        return itemLevel
    }

    getItemValue(item) {
        let value = item["system"]["price"]["value"].copperValue
        value /= 100
        if(item["type"] === "armor") {
            for(const key of Object.keys(properties["armor"])) {
                let runes = properties["armor"][key]
                let runeValue = runes[item["system"][key]["value"]]
                runeValue = runeValue === undefined ? 0 : runeValue["price"]
                value = Math.max(value, runeValue)
            }
        }
        value /= item["system"]["price"]["per"]
        return value.toFixed(2)
    }

    insertIntoDatabase() {
        for(const key of Object.keys(this.players)) {
            for(const player of this.players[key]) {
                const inventory = player["inventory"].entries();
                const itemIDs: String[] = [];
                for (const [key, item] of inventory) {
                    itemIDs.push(item["id"]);
                    const itemName = item["name"];
                    const itemLevel = this.getItemLevel(item);
                    const itemValue = this.getItemValue(item);
                    const itemQuantity = item["system"]["quantity"]
                    const itemTotal = (itemValue * itemQuantity).toFixed(2);
                    const itemConsumable = (item["type"] === "consumable") ? 1 : 0;
                }
            }
        }
    }
}