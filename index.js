let store = {
    searchTerms: [],
    searching: false
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

function returnSearchTerm(value) {
    return `
    <li>${value}</li>
    `
}




/*********RENDER FUNCTION **************/
function render() {
    if (store.searching === false) {
        $('main').append(returnHomePage())
    }
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
        // render
    })
}






function runFunctions() {
    $(addItem)
    $(render)
}


$(runFunctions)