export default function getRefs () {
    return {
        cardContainer: document.querySelector('.js-card-container'),
        searchForm: document.querySelector('.js-search-form'),
        loadMoreBtn: document.querySelector('[data-action="load-more"]'),
        backOnTop: document.querySelector('.on-top'),
    };
}
