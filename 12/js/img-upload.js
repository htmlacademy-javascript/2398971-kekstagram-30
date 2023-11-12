import {isEscapeKey} from './util.js';
import {pristine, isInputFocused, initValidator} from './img-validate.js';
import {initSlider, deleteEffect, setSlider} from './img-editing-effects.js';
import {resetScale} from './img-editing-scale.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeOverlay = uploadForm.querySelector('.img-upload__cancel');

const hideUploadForm = () => {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  deleteEffect();
  resetScale();
}; // Закрыть форму

const showUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  //uploadPreview.src = '';
  initValidator();
  initSlider();
}; // Открыть форму

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isInputFocused()) {
    evt.preventDefault();
    hideUploadForm ();
  }
}

const onPhotoLoadChange = () => showUploadForm();
const onFormCloseButton = () => hideUploadForm();

uploadForm.addEventListener('change', onPhotoLoadChange); // Открыть форму обработчик
closeOverlay.addEventListener('click', onFormCloseButton); // Закрыть форму обработчик
setSlider();
