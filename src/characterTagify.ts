import Tagify from '@yaireo/tagify'

function tagTemplate(tagData){
    return `
        <tag title="${tagData.value}"
                contenteditable='false'
                spellcheck='false'
                tabIndex="-1"
                class="tagify__tag ${tagData.class ? tagData.class : ""}"
                ${this.getAttributes(tagData)}>
            <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
            <div>
                <div class='tagify__tag__avatar-wrap'>
                    <img alt="" src="${tagData.img}">
                </div>
                <span class='tagify__tag-text'>${tagData.name}</span>
            </div>
        </tag>
    `
}

function getWhiteList() {
    let whiteList: {"value": String, "name": String, "img": String}[] = []
    for (const [key, item] of game["actors"].entries()) {
        whiteList.push({"value": key, "name": item["name"], "img": item["img"]})
    }
    return whiteList
}

function suggestionItemTemplate(tagData){
    return `
        <div ${this.getAttributes(tagData)}
            class='tagify__dropdown__item ${tagData.class ? tagData.class : ""}'
            tabindex="0"
            role="option">
            ${ tagData.img ? `
            <div class='tagify__dropdown__item__avatar-wrap'>
                <img src="${tagData.img}" alt="">
            </div>` : ''
    }
            <strong>${tagData.name}</strong>
            <span>${tagData.value}</span>
        </div>
    `
}
export function tagifyInput(inputElement) {
    const whiteList = getWhiteList()
    new Tagify(inputElement, {
        editTags: false,
        tagTextProp: 'name',
        enforceWhitelist: true,
        skipInvalid: true,
        dropdown: {
            closeOnSelect: false,
            enabled: 0,
            classname: 'users-list',
            searchKeys: ['value', 'name']
        },
        templates: {
            tag: tagTemplate,
            dropdownItem: suggestionItemTemplate,
        },
        whitelist: whiteList,
    })
}
