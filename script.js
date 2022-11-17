const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('result-list');
const recipeDetails = document.querySelector('.recipe-details');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const listTitle = document.getElementById('result-text');

// event handlers

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getRecipe);
recipeCloseBtn.addEventListener('click', () => {
    console.log(recipeDetails.parentElement.classList.remove('showRecipe'))
});


function getMealList() {
    listTitle.innerText = "Best matches:"
    let searchItem = document.getElementById('search-value').value.trim()
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchItem}`)
        .then(res => res.json())
        .then(data => {
            let result = "";
            if(data.meals){
                data.meals.forEach(meal => {
                    result += `
                        <article class="meal-info" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal} photo">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-open-btn">Get Recipe</a>
                            </div>
                        </article>
                    `
                });
            }else{
                console.log("not found")
                listTitle.innerText = "No recipe with such ingredient"
            }
            mealList.innerHTML = result;
        })
}

function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains("recipe-open-btn")){
        let mealId = e.target.parentElement.parentElement.dataset.id
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => recipeModal(data.meals[0]))
    }
}

function recipeModal(meal){
    let modalContent = `
        <h3 class="recipe-title">${meal.strMeal}</h3>
        <p class="recipe-category">Category: ${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h4>Instructions:</h4>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal} photo">
        </div>
        <div class="recipe-vlink">
            <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer">Open Video</a>
        </div>
    `;
    recipeDetails.innerHTML = modalContent;
    recipeDetails.parentElement.classList.add('showRecipe');

}