import {sendData} from './api.js';
import {showSuccessModal, showErrorModal} from './img-send.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Не более ${MAX_HASHTAG_COUNT} хештегов` ,
  TEXT_NOT_UNIQUE: 'Хештеги не должны повторяться',
  INVALID_PATTERN:'Хештег должен начинаться с # и не может быть больше 20 символов'
};
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Идет публикация…'
};

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const isInputFocused = () => document.activeElement === hashtagInput || document.activeElement === descriptionInput;

const normalizeHashtags = (hashtag) => hashtag.trim().split (' ').filter((element) => Boolean(element.length));

const hasValidHashtagsSample = (value) => normalizeHashtags(value).every((element) => VALID_SYMBOLS.test(element));
const hasUniqueHashtags = (value) => {
  const lowerCaseHashtags = normalizeHashtags(value).map((element) => element.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const hasValidHashtagsCount = (value) => normalizeHashtags(value).length <= MAX_HASHTAG_COUNT;

const addOnFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessModal)
        .catch(() => showErrorModal())
        .finally(unblockSubmitButton);
    }
  });
};

pristine.addValidator(
  hashtagInput,
  hasValidHashtagsSample,
  ErrorText.INVALID_PATTERN,
  3,
  true
);

pristine.addValidator(
  hashtagInput,
  hasUniqueHashtags,
  ErrorText.TEXT_NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashtagInput,
  hasValidHashtagsCount,
  ErrorText.INVALID_COUNT,
  1,
  true
);

export {pristine, isInputFocused, addOnFormSubmit};
