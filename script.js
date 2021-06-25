const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});




// get meal list that matches with the ingredients
function getMealList(){
    const appid = "32f6e213"
    const appkey = "9d099139071f28755280dccbbe504d86"
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.edamam.com/search?q=${searchInputTxt}&app_id=${appid}&app_key=${appkey}&to=21 `)
    .then(response => response.json())
            
    .then(data => {
        console.log(data)
        let html = "";
        if(data.hits){
             data.hits.forEach(recipe => {
               
                html += `
                    <div class = "meal-item" data-id = "">
                        <div class = "meal-img">
                            <img src = "${recipe.recipe.image}" alt = "food">
                        </div>
                        
                        <div class = "meal-name">
                             <h4 class='calories'>Calorie : ${recipe.recipe.calories.toFixed(0)}</h4>
                            <p class='item-text'>${recipe.recipe.mealType}</p>
                            <h3>${recipe.recipe.label}</h3>
                            <a href = "#" data-recipe='${JSON.stringify(recipe.recipe)}' class = "recipe-btn" >Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.getAttribute('data-recipe');
       let recipe = JSON.parse(mealItem)
      mealRecipeModal(recipe);
     
        

    }
}


// create a modal
function mealRecipeModal(recipe){
    console.log(recipe);
    let html = `
        <h2 class = "recipe-title">${recipe.label}</h2>
        <p class = "recipe-category">${recipe.cuisineType}</p>
        <div class = "recipe-instruct">
            <h3>Ingredient Lines:</h3>
            <p>${recipe.ingredientLines}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${recipe.image}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${recipe.url}" target = "blank">Check Recipe</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe'); 
}