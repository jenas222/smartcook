function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.classList.toggle("visible")
}
//Obsolete now - changed to formData for filter
// const settings = {
//     difficulty: {},
//     dishCategory: {},
//     price: {},
//     recipeCategory: {},
//     tolerance: {},
//     unit: {},
// }

// function onChangeRadioHandler(event) {
//     settings[event.target.name] = event.target.value;
//     console.log(settings);
// }

// function onChangeCheckboxHandler(event) {
//     if (event.target.checked) {
//         settings[event.target.name][event.target.value] = true;
//     } else {
//         delete settings[event.target.name][event.target.value];
//     }
//     console.log(settings)
// }

async function getAllRecipes(){
    try {
        const res = await fetch('https://www.smartcook-project.eu/api/recipes', {
            method: 'GET',
        })
        const result = await res.json();
        return result.data;
    } catch (error) {
        console.log("Error occured:", error)
        throw error;
    }
}

async function insertData(recipes){
    const dataContainer = document.getElementById('data');
    dataContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        const h2 = document.createElement('h2');
        h2.textContent = recipe.name;
        const p = document.createElement('p');
        p.textContent = recipe.description || "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem similique rerum excepturi ipsum odit quo sequi optio odio dicta. Iure blanditiis at, quas non ipsa aut sunt! Reprehenderit, non aspernatur!";
        recipeDiv.appendChild(h2);
        recipeDiv.appendChild(p);
        dataContainer.appendChild(recipeDiv);
    });
}

async function load(){
    insertData(await getAllRecipes());
}
load();

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
    //insertData(await getAllFilteredRecipes(filter))
}
document.getElementById("form").addEventListener("submit", (e) => handleSubmit(e))

//Future implementation
// async function getAllFilteredRecipes(filter) {
//     const secret = "1234";
//     const user = "1";
//     const time = Math.floor(Date.now() / 1000);
//     let data = {
//         "attributes": ["id", "name", "author", "description"],
//         "filter": filter,
//         "user": user,
//         "time": time,
//     }
//     const signature = await sha256(JSON.stringify(data), secret)
//     data.sign= signature;
//     console.log(data)
//     try {
//         const res = await fetch('https://www.smartcook-project.eu/api/recipes', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: data,
//         })
//         const result = await res.json();
//         return result;
//     } catch (error) {
//         console.log("Error occured:", error)
//         throw error;
//     }
// }

// async function sha256(message, secret) {
//     const msgBuffer = new TextEncoder().encode(message + secret);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));                
//     const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//     return hashHex;
// }
