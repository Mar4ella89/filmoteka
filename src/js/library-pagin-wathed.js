import { localStorageApi } from './watched';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const refs = {
  showWatchedBtn: document.querySelector('#showWatchedBtn'),
  watchedList: document.querySelector('.main-list'),
};

let watchedFilms = JSON.parse(localStorage.getItem(localStorageApi.key));
const paginationRef = document.querySelector('.tui-pagination');
const PER_PAGE = 6;

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

pagination.on('beforeMove', loadMoreWatched);

refs.showWatchedBtn.addEventListener('click', loadMoreWatched);
async function paginatorLocalStorageWatched(page) {
  try {
    pagination.reset(watchedFilms.length);
    let cloneWatchedFilms = [...watchedFilms];
    const actualMovies = cloneWatchedFilms.splice(
      page * PER_PAGE - PER_PAGE,
      PER_PAGE
    );
    localStorageApi.render(refs.watchedList, actualMovies);
    paginationRef.classList.remove('is-hidden');
  } catch {}
}

export async function loadMoreWatched(event) {
  watchedFilms = JSON.parse(localStorage.getItem(localStorageApi.key));

  const currentPage = event.page;
  refs.watchedList.innerHTML = '';
  await paginatorLocalStorageWatched(currentPage);
}
