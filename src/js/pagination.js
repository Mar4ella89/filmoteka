import { MovieApiService } from "./popular_film_key";
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const containerPaginationRef = document.getElementById("pagination");

const containerRef = document.querySelector(".container");

const PER_PAGE = 20;

const unsplash = new MovieApiService({ per_page: PER_PAGE });
const pagination = new Pagination(containerPaginationRef);
const options = {
  totalItems: 0,
  itemsPerPage: PER_PAGE,
  visiblePages: 7,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
};

// const paginat = new Pagination(containerPaginationRef, options);
const paginat = new Pagination('pagination', options);

const page = paginat.getCurrentPage();
console.log("paginat", paginat);


const loadMorePopylarMovie = event => {
  console.log("currentPage", event.page);
  const currentPage = event.page;
  // spinerPlay();
  unsplash
    .axiosApiMovie(currentPage)
    .then(({ results }) => {
      const markup = renderImg(results);

      containerRef.innerHTML = markup;
    })
    .catch(error => {
      Notify.failure(error.message);
      containerPaginationRef.classList.add('is-hidden');
    })
    .finally(() => {
      spinerStop();
    });
};
console.log('<<<<<paginat', paginat);

paginat.on('beforeMove', loadMorePopylarMovie);

paginat.off('beforeMove', loadMorePopylarMovie);

      // paginat.reset(total);

paginat.on('beforeMove', evt => {
    console.log(11111)
  const { page } = evt;
  const result = ajax.call({page});

  if(result) {
    pagination.movePageTo(page);
  } else {
    return false;
  }
});

paginat.on('afterMove', ({ page }) => console.log(page));