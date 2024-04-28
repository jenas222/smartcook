function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.classList.toggle("visible")
}

async function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(document.getElementById("form"));
    const formDataObject = {};
    formData.forEach((value, key) => {
        if (formDataObject[key] !== undefined) {
            if (!Array.isArray(formDataObject[key])) {
                formDataObject[key] = [formDataObject[key]];
            }
            formDataObject[key].push(value);
        } else {
            formDataObject[key] = value;
        }
    });
    const filters = JSON.stringify(formDataObject);
    console.log(filters);
}
document.getElementById("form").addEventListener("submit", (e) => handleSubmit(e))

if(document.getElementById("description")){
    let div = document.getElementById("description")
    let number = div.classList[0]
    document.getElementById(number).appendChild(div)
}