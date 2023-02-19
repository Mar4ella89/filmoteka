import { localStorageApi } from './filmsQueue';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { loadMoreWatched } from './library-pagin-wathed';

const refs = {
  showQueueBtn: document.querySelector('#showQueueBtn'),
  queueList: document.querySelector('.main-list'),
};

let filmsQueue = JSON.parse(localStorage.getItem(localStorageApi.key));
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

async function paginatorLocalStorageQueue(page) {
  try {
    pagination.reset(filmsQueue.length);
    let clonefilmsQueue = [...filmsQueue];
    const actualMovies = clonefilmsQueue.splice(
      page * PER_PAGE - PER_PAGE,
      PER_PAGE
    );
    localStorageApi.render(refs.queueList, actualMovies);
    paginationRef.classList.remove('is-hidden');
  } catch {}
}

async function loadMoreQueue(event) {
  filmsQueue = JSON.parse(localStorage.getItem(localStorageApi.key));

  const currentPage = event.page;
  refs.queueList.innerHTML = '';
  pagination.off('beforeMove', loadMoreWatched);
  pagination.off('beforeMove', loadMoreQueue);
  pagination.on('beforeMove', loadMoreQueue);
  await paginatorLocalStorageQueue(currentPage);
}
// pagination.on('beforeMove', loadMoreWatched);

refs.showQueueBtn.addEventListener('click', loadMoreQueue);
