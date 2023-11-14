const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const uploadForm = document.querySelector('.img-upload__form');
const controlSmaller = uploadForm.querySelector('.scale__control--smaller');
const controlBigger = uploadForm.querySelector('.scale__control--bigger');
const controlValue = uploadForm.querySelector('.scale__control--value');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');

const changeScale = (scaleValue) => {
  uploadPreview.style.transform = `scale(${scaleValue / 100})`;
  controlValue.value = `${scaleValue}%`;
};


const onSmallerControlClick = () => changeScale(Math.max(parseInt(controlValue.value, 10) - STEP_SCALE, MIN_SCALE));

const onBiggerControlClick = () => changeScale(Math.min(parseInt(controlValue.value, 10) + STEP_SCALE, MAX_SCALE));

const resetScale = () => changeScale(DEFAULT_SCALE);

controlSmaller.addEventListener('click',onSmallerControlClick);
controlBigger.addEventListener('click',onBiggerControlClick);

export {resetScale};
