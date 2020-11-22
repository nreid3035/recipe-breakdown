let store = {
    searchTerms: [],
    initialImage: '',
    searching: false,
    responseSaved: false,
    response: '',
    savedRecipe: ''
}






/*****************HTML FUNCTIONS******************/
function returnHomePage(responseJson) {
    return `
    <div class="image-space">
      <div class="hero-container">
          <img class="hero-img" src="${responseJson.image}" alt="hero-image">
      </div>
    </div>
    <div class="other-space">
        <h2 class="search-instructions">Make a list of ingredients to search for recipes, select styles of cuisine as well</h2>
        <form action='' id="js-search-form">
            <label class="form-elem" for="search-term">Search by ingredient below:</label>
            <input class="form-elem" type="text" name="search-term" id="search-term" placeholder="ex: garlic, chicken">
            <input class="form-elem" type="submit" id="search-submit">
        </form>
    </div>
    `
}

function returnRecipesPage(responseJson) {
    let results = [];
    for (let i = 0; i < responseJson.hits.length; i++) {
        results.push(`
        <div class="recipe">
          <h1>${responseJson.hits[i].recipe.label}</h1>
          <div class="recipe-img-container">
            <img src="${responseJson.hits[i].recipe.image}" alt="recipe image"/>
          </div>
          <button class="recipe-button" id="${i}">Get more info on ${responseJson.hits[i].recipe.label} here!</button>
        </div>`)
    }
    results.unshift('<div class="recipe-page-container">');
    results.push('</div>');
    return results.join('')
}

function returnRecipeDetails(savedRecipe, obj) {
    let result = [];
    result.push(`<h2>${savedRecipe.label}</h2>
    <div class="food-img-container">
      <img src="${savedRecipe.image}"/>
    </div>
    <h3>Source: ${savedRecipe.source}</h3>
    <p>Calories: ${savedRecipe.calories}</p>`);
    
    let ingredientList = [];
    for (let i = 0; i < savedRecipe.ingredientLines.length; i++) {
      ingredientList.push(`<li>${savedRecipe.ingredientLines[i]}</li>`)
    }
    ingredientList.unshift('<ul>');
    ingredientList.push('</ul>');
    ingredientList.unshift('<h4>Ingredients</h4>')
    result.push(ingredientList.join(''));

    let nutrientList = [];
    for (let prop in obj) {
        console.log(prop)
      nutrientList.push(`
      <li>${obj[prop].label}: ${obj[prop].quantity}${obj[prop].unit}</li>
      `)
    }
    nutrientList.unshift('<ul>');
    nutrientList.push('</ul>');
    nutrientList.unshift('<h4>Nutrition Information</h4>')
    result.push(nutrientList.join(''))

    result.push(`<a href="${savedRecipe.url}" target="_blank">Click here for recipe directions</a>`);
    result.unshift('<div class="recipe-info">')
    result.push('</div>')

    return result.join('')
}







/*******FETCH FUNCTIONS **********/
const edamamApiParams = {
    app_url: 'https://api.edamam.com/search',
    app_id: '10b62213',
    app_key: '9a9a4d0eba510cffc8d26aed4315c06b'
}  
function fetchRecipes(query) {
    fetch(`https://api.edamam.com/search?q=${query}&q=chicken&app_id=10b62213&app_key=9a9a4d0eba510cffc8d26aed4315c06b`)
      .then(response => response.json())
      .then(responseJson => {
          store.response = responseJson;
          store.searching = true;
          render();
      })
      .catch(error => console.log(error))
}

function fetchFoodishImage() {
    fetch(`https://foodish-api.herokuapp.com/api/`)
      .then(response => response.json())
      .then(responseJson => 
        $('main').append(returnHomePage(responseJson)))
      .catch(error => console.log(error))
}


/*********RENDER FUNCTION **************/
function render() {
    $('main').empty();
    if (store.responseSaved === true) {
        $('main').append(returnRecipeDetails(store.savedRecipe, store.savedRecipe.totalNutrients));
        return
    }
    if (store.searching === false) {
        fetchFoodishImage();
    } else if (store.searching === true) {
        console.log(store.response)
        $('main').append(returnRecipesPage(store.response))
    }
}







/**********EVENT LISTENERS ***********/


function submitSearch() {
    $('main').on('submit', '#js-search-form', function(event) {
        event.preventDefault();
        let query = $('#search-term').val()
        // fetch search results with store.searchTerms data
        fetchRecipes(query);
        // render
    })
}

function getRecipeButton() {
    $('main').on('click', '.recipe-button', function(event) {
       let hitsIdx = $(this).attr('id')
       store.savedRecipe = store.response.hits[hitsIdx].recipe;
       store.responseSaved = true;
       render();
    })
}

function handleHomeButton() {
    $('header').on('click', '.home-button', function(event) {
        store.searching = false;
        store.responseSaved = false;
        render();
    })
}






function runFunctions() {
    $(submitSearch)
    $(getRecipeButton)
    $(handleHomeButton)
    $(render)
}


$(runFunctions)