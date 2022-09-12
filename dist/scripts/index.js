import Tagify from '@yaireo/tagify';
Hooks.on('init', async function () {
    await game["settings"].registerMenu("foundry-vtt-offline-viewer", "foundry-vtt-offline-viewer-settings", {
        name: "Wealth Settings",
        label: "Open Me!",
        hint: "This dialogue would allow you to insert players and treasury using Tagify.",
        icon: "fas fa-bars",
        type: TagifyInputs,
        restricted: true
    });
    await game["settings"].register('foundry-vtt-offline-viewer', 'wealthIDs', {
        scope: 'world',
        config: false,
        type: Object,
        default: {
            "priorityIDs": [],
            "IDs": []
        },
    });
});
class TagifyInputs extends FormApplication {
    activateListeners() {
        const priorityInput = document.querySelector(`input[name="priorityWealthInput"]`);
        const regularInput = document.querySelector(`input[name="wealthInput"]`);
        new Tagify(priorityInput);
        new Tagify(regularInput);
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['form'],
            popOut: true,
            template: `modules/foundry-vtt-offline-viewer/dist/forms/wealthForm.html`,
            id: 'foundry-vtt-offline-viewer-wealth-form',
            title: 'Wealth Form',
            height: 220,
            width: 800,
        });
    }
    _updateObject(event, formData) {
        let IDs = { "priorityIDs": [], "IDs": [] };
        if (formData["priorityWealthInput"] !== "") {
            for (const element of JSON.parse(formData["priorityWealthInput"])) {
                IDs["priorityIDs"].push(element["value"]);
            }
        }
        if (formData["wealthInput"] !== "") {
            for (const element of JSON.parse(formData["wealthInput"])) {
                IDs["IDs"].push(element["value"]);
            }
        }
        // @ts-ignore
        return game.settings.set('foundry-vtt-offline-viewer', 'wealthIDs', IDs);
    }
    // @ts-ignore
    getData() {
        // @ts-ignore
        const wealthIDs = game.settings.get('foundry-vtt-offline-viewer', 'wealthIDs');
        let priorityIDs = wealthIDs["priorityIDs"].join();
        let IDs = wealthIDs["IDs"].join();
        return { "IDs": IDs, "priorityIDs": priorityIDs };
    }
}
Hooks.on('ready', async function () {
});
