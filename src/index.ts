import {tagifyInput} from "./characterTagify";
import {DataHandler} from "./dataHandler"
import {truncateTable} from "./database"

const AWS = require("aws-sdk")

Hooks.on("init", async function() {
    await game["settings"].registerMenu("foundry-vtt-offline-viewer", "foundry-vtt-offline-viewer-settings", {
        name: "Wealth Settings",
        label: "Open Me!",
        hint: "This dialogue would allow you to insert players and treasury using Tagify.",
        icon: "fas fa-bars",
        type: TagifyInputs,
        restricted: true
    });

    await game["settings"].register("foundry-vtt-offline-viewer", "wealthIDs", {
        scope: 'world',
        config: false,
        type: Object,
        default: {
            "priorityIDs": [],
            "IDs": []
        },
    });

    await game["settings"].register("foundry-vtt-offline-viewer", "accessKey", {
        name: "Amazon Access Key",
        hint: "Used to store access key to Amazon DynamoDB database.",
        scope: 'world',
        config: true,
        type: String,
        default: "",
    });

    await game["settings"].register("foundry-vtt-offline-viewer", "secretKey", {
        name: "Amazon Secret Key",
        hint: "Used to store secret key to Amazon DynamoDB database.",
        scope: 'world',
        config: true,
        type: String,
        default: "",
    });
});




Hooks.on("updateItem", async function (equipment, system, diff, user) {
    if (user != game["user"].id) { return;}
    AWS.config.update({region: 'eu-west-2',
        accessKeyId: game["settings"].get("foundry-vtt-offline-viewer", "accessKey"),
        secretAccessKey: game["settings"].get("foundry-vtt-offline-viewer", "secretKey")});
    const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    await truncateTable("characters", AWS)
    await truncateTable("items", AWS)
    new DataHandler(game["settings"].get("foundry-vtt-offline-viewer", "wealthIDs"), ddb)

})

class TagifyInputs extends FormApplication {
    inputNames = ["priorityIDs", "IDs"]
    override activateListeners(): void {
        for(const input of this.inputNames) {
            const inputElement = document.getElementById(input)
            tagifyInput(inputElement)
        }
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["form"],
            popOut: true,
            template: `modules/foundry-vtt-offline-viewer/dist/forms/wealthForm.html`,
            id: "wealthForm",
            title: "Wealth Form",
            height: 255,
            width: 900
        });

    }

    protected _updateObject(event: Event, formData?: object): Promise<unknown> {
        let IDs: { priorityIDs: String[]; IDs: String[] };
        IDs = {"priorityIDs": [], "IDs": []};
        if (formData) {
            for(const input of this.inputNames) {
                if (formData[input] !== "") {
                    for (const element of JSON.parse(formData[input])) {
                        IDs[input].push(element["value"])
                    }
                }
            }
        }
        return game["settings"].set("foundry-vtt-offline-viewer", "wealthIDs", IDs)
    }

    // @ts-ignore
    getData() {
        const wealthIDs = game["settings"].get("foundry-vtt-offline-viewer", "wealthIDs");
        let priorityIDs = wealthIDs["priorityIDs"].join()
        let IDs = wealthIDs["IDs"].join()
        return {"IDs": IDs, "priorityIDs": priorityIDs}
    }


}
