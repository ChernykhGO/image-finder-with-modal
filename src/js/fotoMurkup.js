import '../css/style.css'
// ..........................................................Работа с бекендом
import NewsApiService from './apiService';
//........................................................... Получение рефов
import getRefs from './refs';
const refs = getRefs();
// ...........................................................Делаю себе экземляр, что бы получить объект с методами и свойствами
const newsApiService = new NewsApiService();

import fotoCardTpl from '../templates/foto-cards.hbs'

// .................................................................Добавляю уведомления
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { success, error, defaults } from '@pnotify/core';
defaults.delay = 3000;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.style.display = 'none';
refs.backOnTop.style.display = 'none';


// .............................................................................открывается большое изображение
import onLightboxOpen from './lightBox';
refs.cardContainer.addEventListener('click', onLightboxOpen);



function onSearch(e) {
    e.preventDefault();
    //......................................................................... использую query, т.к. есть геттер и сеттер
  newsApiService.query = e.currentTarget.elements.query.value;

// ...............................................................................Если пустая строка- выходим из функции
if (newsApiService.query === '' || !newsApiService.query.trim()) {
   error({
        text: "You need enter the word",
    });
    newsApiService.resetPage();
    return
}

  // ..............................................................................................Получаем значение импута и вставляем значение в функцию
  newsApiService.query = e.currentTarget.elements.query.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(hits => {
        if (hits.length === 0) {
          error({
            text: 'Cannot find images. Try again, please!',
          });
          refs.loadMoreBtn.style.display = 'none'
          return;
        }
    clearHitsContainer();
    appendHitsMarkup(hits);
    success({
        title: 'Success!',
        text: 'That thing that you were trying to do worked.'
      });
  });
};

function onLoadMore () {
    newsApiService.fetchArticles().then(appendHitsMarkup);
    scrollMore ();
};

//.....................................................................................................Функция вставляет результат вызова шаблона
function appendHitsMarkup(hits) {
    refs.cardContainer.insertAdjacentHTML('beforeend', fotoCardTpl(hits));
    refs.loadMoreBtn.style.display = 'block';
    refs.backOnTop.style.display = 'block';
};

// .................................................................................Добавляю скрол при клике на кнопку Load more
function scrollMore() {
    setTimeout(() => {
        refs.loadMoreBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, 500);
};

    //.............................................................................. Функция для очистки контейнера при новом сабмите
function clearHitsContainer() {
    refs.cardContainer.innerHTML= '';
}




