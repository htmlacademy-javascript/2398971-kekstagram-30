import {isEscapeKey} from './util.js';
import {pristine, isInputFocused} from './img-validate.js';
import {initSlider, deleteEffect, setSlider} from './img-editing-effects.js';
import {resetScale} from './img-editing-scale.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeOverlay = uploadForm.querySelector('.img-upload__cancel');

const removeUploadKeydownEvent = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};

const addUploadKeydownEvent = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};


const hideUploadForm = () => {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeUploadKeydownEvent();
  deleteEffect();
  resetScale();
}; // Закрыть форму

const showUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  addUploadKeydownEvent();
  //uploadPreview.src = '';
  //initValidator();
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

export {hideUploadForm, showUploadForm, removeUploadKeydownEvent, addUploadKeydownEvent};
