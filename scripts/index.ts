import Tagify from '@yaireo/tagify'

Hooks.on('init', async function() {
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
            "Treasury": "",
            "Players": []
        },
    });

});

class TagifyInputs extends FormApplication {
    override activateListeners(): void {
        const input = document.querySelector(`input[name="wealthForm"]`)
        new Tagify(input)
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['form'],
            popOut: true,
            template: `modules/foundry-vtt-offline-viewer/dist/forms/wealthForm.html`,
            id: 'foundry-vtt-offline-viewer-wealth-form',
            title: 'Wealth Form',
        });

    }

    protected _updateObject(event: Event, formData?: object): Promise<unknown> {
        // @ts-ignore
        return game.settings.set('foundry-vtt-offline-viewer', 'wealthIDs', formData)
    }
    getData() {
        // @ts-ignore
        return game.settings.get('foundry-vtt-offline-viewer', 'wealthIDs');
    }


}

Hooks.on('ready', async function() {

});
