let store = {
    searchTerms: [],
    searching: false
}






/**HTML FUNCTIONS*/
function returnHomePage() {
    return `
    <div class="hero-container">
          <img src="" alt="hero-image">
        </div>
        <h2>Make a list of ingredients to search for recipes, select styles of cuisine as well</h2>
        <div class="search-display hidden">

        </div>
        <form action=''>
          <div>
            <label for="search-term">Add ingredients below:</label>
            <input type="text" name="search-term" id="search-term" placeholder="ex: garlic, italian">
            <input type="button" name="add-item" id="add-item" value="ADD ITEM">
            <input type="submit" id="search-submit">
          </div>
        </form>
    `
}




/*********RENDER FUNCTION **************/
function render() {
    if (store.searching === false) {
        $('main').append(returnHomePage())
    }
}



function addItem() {
    $('main').on('click', '#add-item', function(event) {
        store.searchTerms.push($('#search-term').val())
        console.log(store.searchTerms)
    })
}






function runFunctions() {
    $(addItem)
    $(render)
}


$(runFunctions)