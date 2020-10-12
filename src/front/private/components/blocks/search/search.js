const searchTabs = {
    changeTabs(){
        $('.search__tabs-item').on('click', function (e) {
            e.preventDefault();
            $('.search__tabs-item').removeClass('search__tabs-item--active');
            $('.search__content-item').removeClass('search__content-item--active');
        });
    }
}

export default searchTabs;