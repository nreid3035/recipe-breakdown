let store = {
    searchTerms: [],
    searching: false,
    response: ''
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
    return `
    <h1>Testing: ${responseJson.hits[0].recipe.label}</h1>`
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






function runFunctions() {
    $(addItem)
    $(submitSearch)
    $(render)
}


$(runFunctions)