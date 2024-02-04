function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.classList.toggle("visible")
}

const settings = {
    difficulty: {},
    dishCategory: {},
    price: {},
    recipeCategory: {},
    tolerance: {},
    unit: {},
}

function onChangeRadioHandler(event){
    settings[event.target.name] = event.target.value;
    console.log(settings);
}

function onChangeCheckboxHandler(event){
    if(event.target.checked){
        settings[event.target.name][event.target.value] = true;
    } else {
        delete settings[event.target.name][event.target.value];
    }
    console.log(settings)
}