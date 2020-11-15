

let searchTerms = [];
function addItem() {
    $('main').on('click', '#add-item', function(event) {
        searchTerms.push($('#search-term').val())
        console.log(searchTerms)
    })
}






function runFunctions() {
    $(addItem)
}


$(runFunctions)