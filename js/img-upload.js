import {isEscapeKey} from './util.js';
import {pristine, isInputFocused} from './img-validate.js';
import {initSlider, deleteEffect, setSlider} from './img-editing-effects.js';
import {resetScale} from './img-editing-scale.js';

const fileTypes = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeOverlay = uploadForm.querySelector('.img-upload__cancel');
const fileChooser = document.querySelector('.img-upload__input');
const uploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

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
};

const showUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  addUploadKeydownEvent();
  pasteLoadPhoto();
  initSlider();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isInputFocused()) {
    evt.preventDefault();
    hideUploadForm ();
  }
}

const onPhotoLoadChange = () => showUploadForm();
const onFormCloseButton = () => hideUploadForm();

function pasteLoadPhoto () {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = fileTypes.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((element) => {
      element.style.backgroundImage = `url(${uploadPreview.src})`;
    });
  }
}

uploadForm.addEventListener('change', onPhotoLoadChange);
closeOverlay.addEventListener('click', onFormCloseButton);
setSlider();

export {hideUploadForm, showUploadForm, removeUploadKeydownEvent, addUploadKeydownEvent};
