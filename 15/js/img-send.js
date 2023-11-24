import {isEscapeKey} from './util.js';
import {removeUploadKeydownEvent, addUploadKeydownEvent} from './img-upload.js';

const successSendPhotoTemplate = document.querySelector('#success').content;
const errorSendPhotoTemplate = document.querySelector('#error').content;


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    deleteSuccessModal();
  }
};

const onDocumentKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    deleteErrorModal();
  }
};


const onClickOutsideSuccessModal = (evt) => {
  if (evt.target.querySelector('.success__inner')) {
    deleteSuccessModal();
  }
};

const onClickOutsideErrorModal = (evt) => {
  if (evt.target.querySelector('.error__inner')) {
    deleteErrorModal();
  }
};

const onCloseSuccessButton = () => deleteSuccessModal();
const onCloseErrorButton = () => deleteErrorModal();

function deleteSuccessModal () {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onClickOutsideSuccessModal);
}

function deleteErrorModal () {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onDocumentKeydownError);
  document.removeEventListener('click', onClickOutsideErrorModal);
  addUploadKeydownEvent();
}

function showSuccessModal () {
  const successElement = successSendPhotoTemplate.cloneNode(true);
  document.body.appendChild(successElement);

  const successModal = document.querySelector('.success');
  const closeSuccessModal = successModal.querySelector('.success__button');
  closeSuccessModal.addEventListener('click', onCloseSuccessButton);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onClickOutsideSuccessModal);
}

function showErrorModal () {
  removeUploadKeydownEvent();

  const errorElement = errorSendPhotoTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  const errorModal = document.querySelector('.error');
  const closeErrorModal = errorModal.querySelector('.error__button');
  closeErrorModal.addEventListener('click', onCloseErrorButton);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click', onClickOutsideErrorModal);
}

export {showSuccessModal, showErrorModal};
