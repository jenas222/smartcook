function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.classList.toggle('visible');
}

function filterRecipes() {
    var difficulty = document.querySelector('input[name="difficulty"]:checked');
    var dishCategory = document.querySelector('input[name="dishCategory"]:checked');
    var price = document.querySelector('input[name="price"]:checked');
    var recipeCategory = document.querySelector('input[name="recipeCategory"]:checked');
    var toleranceCheckboxes = document.querySelectorAll('input[name="tolerance"]:checked');
    var unit = document.querySelector('input[name="unit"]:checked');

    // Filter recipes based on selected options
    var recipes = document.querySelectorAll('.reciepe');

    recipes.forEach(function(recipe) {
        var showRecipe = true;

        if (difficulty && recipe.dataset.difficulty !== difficulty.value) {
            showRecipe = false;
        }

        if (dishCategory && recipe.dataset.dishCategory !== dishCategory.value) {
            showRecipe = false;
        }

        if (price && recipe.dataset.price !== price.value) {
            showRecipe = false;
        }

        if (recipeCategory && recipe.dataset.recipeCategory !== recipeCategory.value) {
            showRecipe = false;
        }

        toleranceCheckboxes.forEach(function(checkbox) {
            if (!recipe.dataset.tolerance.includes(checkbox.value)) {
                showRecipe = false;
            }
        });

        if (unit && recipe.dataset.unit !== unit.value) {
            showRecipe = false;
        }

        // Show or hide the recipe based on filtering result
        if (showRecipe) {
            recipe.style.display = 'block';
        } else {
            recipe.style.display = 'none';
        }
    });
}

// Attach the filterRecipes function to the change event of the options
document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(input) {
    input.addEventListener('change', filterRecipes);
});
