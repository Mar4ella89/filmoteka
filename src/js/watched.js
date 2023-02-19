import { LocalStorageApi } from './localStorageApi';
import { fetchMovieById } from './fetchMovieById';

export const localStorageApi = new LocalStorageApi('filmsWatched');

const refs = {
  modal: document.querySelector('.modal'),
};

const onWatchedModalBtnClick = async e => {
  if (!e.target.classList.contains('modal-movie__btn-watched')) return;
  const currentMovieId = e.target.dataset.id;

  const data = await fetchMovieById(currentMovieId);

  if (!data) return;

  if (
    JSON.parse(localStorage.getItem(localStorageApi.key)).some(
      ({ id }) => id === data.id
    )
  ) {
    localStorageApi.removeData(data);

    e.target.textContent = 'add to watched';
    return;
  }

  localStorageApi.saveData(data);

  e.target.textContent = 'remove from watched';
};

localStorageApi.createsDataModel();

refs.modal.addEventListener('click', onWatchedModalBtnClick);
