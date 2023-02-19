import MoviesApi from './movie-service';
import { modalWindowMovieMarkup } from './template-modal-movie';
import { modalMovieTrailerMarkup } from './template-modal-movie';

import { missingVideo } from './template-modal-movie';

import { rerenderFilms } from './rerenderFilms';


const modalMoviesApi = new MoviesApi();

const refs = {
  closeModalBtn: document.querySelector('[data-modal-about-close]'),
  modal: document.querySelector('[data-modal-about]'),
  openModalCard: document.querySelector('.main-list'),
  renderModalCard: document.querySelector('.js-modal-window'),
  openTrailerVideo: document.querySelector('.js-modal-window '),
  closeTrailerModalBtn: document.querySelector('[data-modal-trailer-close]'),
  renderTrailerVideo: document.querySelector('.js-modal-window-trailer'),
  modalTrailer: document.querySelector('[data-modal-trailer]'),

  libraryLink: document.querySelector('[aria-label="library"]'),
  showWatchedBtn: document.querySelector('#showWatchedBtn'),
};

const rerenderObjPar = {
  libraryLink: refs.libraryLink,
  watchedBtn: refs.showWatchedBtn,
  filmsList: refs.openModalCard,
};

function showModal() {
  refs.modal.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
}

function closeModal() {
  refs.modal.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onEscKeyPress);
  document.removeEventListener('click', onClickOutsideModal);

  rerenderFilms(rerenderObjPar);
}

function showModalTrailer() {
  refs.modalTrailer.classList.remove('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
  document.removeEventListener('click', onClickOutsideModal);
}

function closeModalTrailer() {
  refs.modalTrailer.classList.add('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('click', onClickOutsideModal);
  clearModalTrailer();
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    closeModal();
    return;
  }
}

function onClickOutsideModal(e) {
  const modalInside = e.target.closest('.modal');
  const modalOut = e.target.closest('.backdrop-trailer');

  if (!modalInside && !modalOut) {
    closeModal();
  }
}

function clearModalInfo() {
  refs.renderModalCard.innerHTML = '';
}

function clearModalTrailer() {
  refs.renderTrailerVideo.innerHTML = '';
}

function renderMarkupModal(data) {
  const renderModal = modalWindowMovieMarkup(data);
  refs.renderModalCard.insertAdjacentHTML('beforeend', renderModal);
}

function renderMarkupVideoTrailer(key) {
  const renderVideoTrailer = modalMovieTrailerMarkup(key);
  refs.renderTrailerVideo.insertAdjacentHTML('beforeend', renderVideoTrailer);
}

function renderMarkupMissingVideo() {
  const renderMissingVideoText = missingVideo();
  refs.renderTrailerVideo.insertAdjacentHTML(
    'beforeend',
    renderMissingVideoText
  );
}

async function createMarkupModal(e) {
  const parentMovieCard = e.target.closest('.film-card__item');
  const idMovieCard = parentMovieCard.dataset.id;

  modalMoviesApi.id = idMovieCard;

  await modalMoviesApi.fetchDetails().then(details => {
    clearModalInfo();
    renderMarkupModal(details.data);
    showModal();

    window.addEventListener('keydown', onEscKeyPress);
    document.addEventListener('click', onClickOutsideModal);
  });
}

async function createMarkupModalVideoTrailer(e) {
  const targetButtonClass = e.target.className;
  if (targetButtonClass !== 'modal-trailer-button') {
    return;
  }
  await modalMoviesApi.fetchVideos().then(response => {
    const videoDetails = response.data.results;
    console.dir(videoDetails);
    const movieKey = videoDetails.find(
      video =>
        video.type === 'Trailer' &&
        video.site === 'YouTube' &&
        video.name.toLowerCase().includes('official')
    );
    if (movieKey) {
      renderMarkupVideoTrailer(movieKey.key);
      showModalTrailer();
      return;
    }

    renderMarkupMissingVideo();
    // const movieKey = videoDetails.map(item => {
    //   console.dir(item);
    // if (item.name.toLowerCase() === 'Official Trailer'.toLowerCase()) {
    //   return renderMarkupVideoTrailer(item.key);
    // }
    // if (
    //   item.name.toLowerCase().includes('official') &&
    //   item.name.toLowerCase().includes('trailer')
    // ) {
    // if (item.name.official) {
    //   renderMarkupVideoTrailer(item.key);
    // }
    // });
    console.log(movieKey);
    // if (movieKey.length === 0) {
    //   renderMarkupMissingVideo();
    // }
    showModalTrailer();
  });
}

refs.openModalCard.addEventListener('click', createMarkupModal);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.openTrailerVideo.addEventListener('click', createMarkupModalVideoTrailer);
refs.closeTrailerModalBtn.addEventListener('click', closeModalTrailer);
