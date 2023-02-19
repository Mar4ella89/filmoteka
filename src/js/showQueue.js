import { localStorageApi } from './filmsQueue';
import toastr from 'toastr';

import './toastr.config';
import 'toastr/build/toastr.min.css';

const refs = {
  showWatchedBtn: document.querySelector('#showWatchedBtn'),
  showQueueBtn: document.querySelector('#showQueueBtn'),
  queueList: document.querySelector('.main-list'),
};

export const makesBtnActive = btn => {
  btn.dataset.current = 'true';
};

export const makesBtnInactive = btn => {
  btn.dataset.current = 'false';
};

const onShowQueueBtnClick = () => {
  refs.showWatchedBtn.classList.remove('active');

  makesBtnActive(refs.showQueueBtn);
  makesBtnInactive(refs.showWatchedBtn);

  const filmsQueue = JSON.parse(localStorage.getItem(localStorageApi.key));

  if (filmsQueue.length === 0)
    toastr.warning('There are no films in the queue yet');

  // localStorageApi.render(refs.queueList, filmsQueue);
};

localStorageApi.createsDataModel();

refs.showQueueBtn.addEventListener('click', onShowQueueBtnClick);
