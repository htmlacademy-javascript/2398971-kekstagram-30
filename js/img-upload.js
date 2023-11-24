import {isEscapeKey} from './util.js';
import {pristine, isInputFocused} from './img-validate.js';
import {initSlider, deleteEffect, setSlider} from './img-editing-effects.js';
import {resetScale} from './img-editing-scale.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeOverlay = uploadForm.querySelector('.img-upload__cancel');
const fileChooser = document.querySelector('.img-upload__input');
const uploadPreview = document.querySelector('.img-upload__preview img');


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
  pasteLoadPhoto();
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

function pasteLoadPhoto () {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
  }
}


export {hideUploadForm, showUploadForm, removeUploadKeydownEvent, addUploadKeydownEvent};
