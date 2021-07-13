const API_KEY  = '22345544-d7e856a59bd0b8410f42b3802';
const BASE_URL = 'https://pixabay.com/api';

export default class NewsApiService {
    //.............................................................................. В конструкторе термин запроса и номер группы
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
//........................................................................................ Метод отвечающий за http запросы
    fetchArticles() {
        const url = `${BASE_URL}/?key=${API_KEY}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12&q=${this.searchQuery}`;
     
        return fetch(url)
        // .............................................................................сделали фетч и распарсили ответ от бекенда, нам вернулись данные если запрос успешный мы увеличиваем page на единицу
        .then(response => response.json())
        .then(({hits}) => {
            this.incrementPage();
            return hits;
        });
    }

incrementPage() {
    this.page += 1;
}
// .............................................................................сброс страницы в исходное состояние
    resetPage() {
    this.page = 1;
    }

get query() {
    return this.searchQuery;
}
set query(newQuery) {
     this.searchQuery = newQuery;
}
}

