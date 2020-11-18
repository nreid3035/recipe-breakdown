let store = {
    searchTerms: [],
    searching: false,
    response: '',
    chosenRecipeIdx: ''
}






/*****************HTML FUNCTIONS******************/
function returnHomePage() {
    return `
    <div class="hero-container">
          <img src="" alt="hero-image">
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
            <input type="button" name="add-item" id="add-item" value="ADD ITEM">
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




/*********RENDER FUNCTION **************/
function render() {
    $('main').empty();
    if (store.searching === false) {
        $('main').append(returnHomePage())
    } else if (store.searching === true) {
      console.log(store.response)
        $('main').append(returnRecipesPage(store.response))
    }
}



/*******FETCH FUNCTIONS **********/
const edamamApiParams = {
    app_url: 'https://api.edamam.com/search',
    app_id: '10b62213',
    app_key: '9a9a4d0eba510cffc8d26aed4315c06b'
}  
function fetchRecipes(query) {
    fetch(`https://api.edamam.com/search?q=${query}&app_id=10b62213&app_key=9a9a4d0eba510cffc8d26aed4315c06b`)
      .then(response => response.json())
      .then(responseJson => {
          store.response = responseJson;
          store.searching = true;
          render();
      })
      .catch(error => console.log(error))
}


function fetchFullNutrition(hitsIdx) {
    let data = {
        mode: 'no-cors',
        title: store.response.hits[hitsIdx].recipe.label,
        ingredientLines: store.response.hits[hitsIdx].recipe.ingredientLines
    }
    fetch(`https://api.edamam.com/api/nutrition-details?app_id=10b62213&app_key=9a9a4d0eba510cffc8d26aed4315c06b&title=${store.response.hits[hitsIdx].recipe.label}&${store.response.hits[hitsIdx].ingredientLines}`, {
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
}










/**********EVENT LISTENERS ***********/

function addItem() {
    $('main').on('click', '#add-item', function(event) {
        store.searchTerms.push($('#search-term').val())
        console.log(store.searchTerms)
        $('.search-display').removeClass('hidden')
        $('.search-display').append(returnSearchTerm(store.searchTerms[store.searchTerms.length - 1]))


    })
}

function submitSearch() {
    $('main').on('submit', '#js-search-form', function(event) {
        event.preventDefault();
        // fetch search results with store.searchTerms data
        fetchRecipes(store.searchTerms[0]);
        // render
    })
}

function getRecipeButton() {
    $('main').on('click', '.recipe-button', function(event) {
       let hitsIdx = $(this).attr('id')
       fetchFullNutrition(hitsIdx);
    })
}






function runFunctions() {
    $(addItem)
    $(submitSearch)
    $(getRecipeButton)
    $(render)
}


$(runFunctions)