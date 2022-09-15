import {properties} from "./properties";

export class DataHandler {
    private players: {};
    private ddb: any;
    constructor(IDs, ddb) {
        this.players = this.getPlayers(IDs);
        this.ddb = ddb
        this.insertIntoDatabase()
    }

    getPlayers(IDs) {
        const players = {}
        for (const key of Object.keys(IDs)) {
            players[key] = IDs[key].map(ID => game["actors"].get(ID))
        }
        return players
    }

    getArmourValue(item, armourKey) {
        let value = 0
        for (const key of Object.keys(properties["armor"])) {
            let runes = properties["armor"][key]
            let runeValue = runes[item["system"][key]["value"]]
            runeValue = runeValue === undefined ? 0 : runeValue[armourKey]
            value = Math.max(value, runeValue)
        }
        return value
    }

    getItemLevel(item) {
        let itemLevel = item["level"]
        if (item["type"] === "armor") {
            itemLevel = Math.max(itemLevel, this.getArmourValue(item, "level"))
        }
        return itemLevel
    }

    getItemValue(item) {
        let value = item["system"]["price"]["value"].copperValue
        value /= 100
        if (item["type"] === "armor") {
            value = Math.max(value, this.getArmourValue(item, "price"))
        }
        value /= item["system"]["price"]["per"]
        return value.toFixed(2)
    }

    insertIntoDatabase() {
        for (const key of Object.keys(this.players)) {
            for (const player of this.players[key]) {
                const inventory = player["inventory"].entries();
                const itemIDs: String[] = [];
                for (const [key, item] of inventory) {
                    itemIDs.push(item["id"]);
                    const itemName = item["name"];
                    const itemLevel = this.getItemLevel(item).toString();
                    const itemValue = this.getItemValue(item).toString();
                    const itemQuantity = item["system"]["quantity"].toString();
                    const itemTotal = (itemValue * itemQuantity).toFixed(2).toString();
                    const itemConsumable = ((item["type"] === "consumable") ? 1 : 0).toString();
                    this.ddb.putItem(
                        {
                            TableName: 'items',
                            Item: {
                                'id': {"S": item["id"]},
                                'name': {"S": itemName},
                                'level': {"S": itemLevel},
                                'value': {"S": itemValue},
                                'quantity': {"S": itemQuantity},
                                'total': {"S": itemTotal},
                                'consumable': {"N": itemConsumable}
                            }
                        }, function(err, data) {})
                }
                this.ddb.putItem(
                    {
                        TableName: 'characters',
                        Item: {
                            'id': {"S": player["id"]},
                            'name': {"S": player["name"]},
                            'items': {"SS": itemIDs}
                        }
                    }
                ,function(err, data) {}
                    )
            }
        }
    }
}