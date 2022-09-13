import Tagify from '@yaireo/tagify'

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
});




Hooks.on("updateItem", async function (equipment, system, diff, user) {
    if (user != game["user"].id) { return;}

})

class TagifyInputs extends FormApplication {
    inputNames = ["priorityIDs", "IDs"]
    override activateListeners(): void {
        for(const input of this.inputNames) {
            const inputElement = document.querySelector("#" + input)
            Tagify(inputElement)
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
            width: 840,
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
