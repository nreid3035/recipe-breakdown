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
    <div class="hero-container">
          <img src="${responseJson.image}" alt="hero-image">
    </div>
        <h2>Make a list of ingredients to search for recipes, select styles of cuisine as well</h2>
        <div class="search-display hidden">
          <ul id="js-search-list">
            
          </ul>
        </div>
        <form action='' id="js-search-form">
          <div>
            <label for="search-term">Add ingredients below:</label>
            <input type="text" name="search-term" id="search-term" placeholder="ex: garlic, italian">
            <input type="submit" id="search-submit">
          </div>
        </form>
    `
}

function returnRecipesPage(responseJson) {
    let results = [];
    for (let i = 0; i < responseJson.hits.length; i++) {
        results.push(`<h1>${responseJson.hits[i].recipe.label}</h1>
        <div>
          <img src="${responseJson.hits[i].recipe.image}" alt="recipe image"
        </div>
        <button class="recipe-button" id="${i}">Get the ${responseJson.hits[i].recipe.label} recipe here!</button>
        `)
    }
    return results.join('')
}

function returnSearchTerm(value) {
    return `
    <li>${value}</li>
    `
}

function returnRecipeDetails(savedRecipe, obj) {
    let result = [];
    result.push(`<h2>${savedRecipe.label}</h2>
    <div>
    <img src="${savedRecipe.image}"
    </div>
    <h3>Source: ${savedRecipe.source}</h3>
    <p>Calories: ${savedRecipe.calories}</p>`);
    
    let ingredientList = [];
    for (let i = 0; i < savedRecipe.ingredientLines.length; i++) {
      ingredientList.push(`<li>${savedRecipe.ingredientLines[i]}</li>`)
    }
    ingredientList.unshift('<ul>');
    ingredientList.push('</ul>');
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
    result.push(nutrientList.join(''))

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



/*function fetchFullNutrition(hitsIdx) {
    let data = {
        mode: 'no-cors',
        title: store.response.hits[hitsIdx].recipe.label,
        ingredientLines: store.response.hits[hitsIdx].recipe.ingredientLines
    }
    fetch(`https://api.edamam.com/api/nutrition-details?app_id=10b62213&app_key=9a9a4d0eba510cffc8d26aed4315c06b&title=${store.response.hits[hitsIdx].recipe.label}&ingr=${store.response.hits[hitsIdx].ingredientLines}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson)
    })
}*/

/*function fetchNutrition(hitsIdx) {
    let encodedIngr = encodeURI(`${store.response.hits[hitsIdx].recipe.ingredientLines}`)
    console.log(encodedIngr)
    fetch(``)
}*/



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






function runFunctions() {
    $(submitSearch)
    $(getRecipeButton)
    $(render)
}


$(runFunctions)