
function filterStores() {
    let input = document.getElementById('searchInput');
    let filter = input.value.toLowerCase();
    let stores = document.querySelectorAll('.store');

    stores.forEach(function(store) {
        let location = store.getAttribute('data-location').toLowerCase();
        if (location.indexOf(filter) > -1) {
            store.style.display = "";
        } else {
            store.style.display = "none";
        }
    });
}
