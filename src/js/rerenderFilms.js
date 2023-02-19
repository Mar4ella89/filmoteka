import { LocalStorageApi } from './localStorageApi';

const localStorageApi = new LocalStorageApi();

export const rerenderFilms = ({ libraryLink, watchedBtn, filmsList }) => {
  if (!libraryLink.classList.contains('menu-link--current')) return;

  const films = JSON.parse(
    watchedBtn.dataset.current === 'true'
      ? localStorage.getItem('filmsWatched')
      : localStorage.getItem('filmsQueue')
  );

  localStorageApi.render(filmsList, films);
};
