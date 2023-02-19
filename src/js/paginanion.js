import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import MovieApiService from './movie-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { spinerPlay, spinerStop } from './spiner';
import { createMarkup } from './createMarkup';
import { clearMarkup } from './createMarkup';

const paginationRef = document.querySelector('.tui-pagination');
const formRef = document.querySelector('form');
const PER_PAGE = 20;

const movieApiService = new MovieApiService({ per_page: PER_PAGE });

const options = {
    totalItems: 0,
    itemsPerPage: PER_PAGE,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    template: {
      page: '<a href="#" class="tui-custon">{{page}}</a>',
      currentPage:
        '<span class="tui-custon tui-custon-is-selected">{{page}}</span>',
      moveButton:
        '<a href="#" class="tui-custon tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-custon tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-custon tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
};

const pagination = new Pagination(paginationRef, options);
const page = pagination.getCurrentPage();

async function loadMoreMovies(event) {
  const currentPage = event.page;
  if (currentPage > 1) {
    spinerPlay();
  }
  // spinerPlay();
  clearMarkup();
  await movieApiService
    .fetchMovie(currentPage)
    .then(data => createMarkup(data))
    .catch(error => {
      Notify.failure(error.message);
      paginationRef.classList.add('is-hidden');
    })
    .finally(() => {
      if (currentPage > 1) {
        spinerStop();
      }
    });
}

pagination.on('beforeMove', loadMoreMovies);
// spinerPlay();
movieApiService
  .fetchMovie(page)
  .then(data => {
    pagination.reset(data.total_results);
    createMarkup(data);
    paginationRef.classList.remove('is-hidden');
  })
  .catch(error => {
    Notify.failure(error.message);
  });
// .finally(() => {
//   // spinerStop();
// });

async function loadMoreMoviesByQuery(event) {
  const currentPage = event.page;
  spinerPlay();
  clearMarkup();
  await movieApiService
    .fetchMovieByQuery(currentPage)
    .then(data => createMarkup(data))
    .catch(error => {
      Notify.failure(error.message);
    })
    .finally(() => {
      spinerStop();
    });
}

async function onSearch(e) {
  e.preventDefault();
  clearMarkup();
  movieApiService.query = e.currentTarget.elements.searchFilm.value.trim();
  movieApiService.resetPage();
  e.currentTarget.elements.searchFilm.value = '';
  spinerPlay();
  await movieApiService
    .fetchMovieByQuery(page)
    .then(data => {
      pagination.off('beforeMove', loadMoreMovies);
      pagination.off('beforeMove', loadMoreMoviesByQuery);
      pagination.on('beforeMove', loadMoreMoviesByQuery);
      pagination.reset(data.total_results);
      createMarkup(data);
      paginationRef.classList.remove('is-hidden');
    })
    .catch(error => {
      Notify.failure(error.message);
      paginationRef.classList.add('is-hidden');
    })
    .finally(() => {
      spinerStop();
    });
}

formRef.addEventListener('submit', onSearch);
