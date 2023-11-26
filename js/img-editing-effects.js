const EFFECTS = {
  chrome: {style: 'grayscale', unit: '' , min: 0 , max: 1, step: 0.1, visible: true},
  sepia: {style: 'sepia', unit: '' , min: 0, max: 1, step: 0.1, visible: true},
  marvin: {style: 'invert', unit: '%' , min: 0, max: 100, step: 1, visible: true},
  phobos: {style: 'blur', unit: 'px' , min: 0, max: 3, step: 0.1, visible: true},
  heat: {style: 'brightness', unit: '' , min: 1, max: 3, step: 0.1, visible: true},
  none: {style: '', unit: '' , min: 1 , max: 100, step: 1, visible: false},
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
const uploadEffects = uploadForm.querySelector('.img-upload__effects');
const uploadEffectLevel = uploadForm.querySelector('.img-upload__effect-level');
const levelSlider = uploadForm.querySelector('.effect-level__slider');
const levelValue = uploadForm.querySelector('.effect-level__value');

let currentEffect = EFFECTS.none;

const isDefault = () => currentEffect === EFFECTS.none;
const changeEffectVisibility = () => {
  if (currentEffect.visible) {
    uploadEffectLevel.classList.remove('hidden');
  } else {
    uploadEffectLevel.classList.add('hidden');
  }
};

const createSlider = (min, max, step) => {
  noUiSlider.create(levelSlider, {
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower',
    format: {
      to: (value) => Number(value).toFixed(2),
      from: (value) => Number(value).toFixed(2)
    },
  });
};

const updateSlider = (min, max, step)=> {
  levelSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
  });
};

const setSlider = () => createSlider(currentEffect.min, currentEffect.max , currentEffect.step);

const setPhotoStyle = () => {
  if (isDefault()) {
    uploadPreview.style.filter = null;
    return;
  }

  const {value} = levelValue;
  const {style, unit} = currentEffect;
  uploadPreview.style.filter = `${style}(${value}${unit})`;
};

const getScrollSliderData = () => {
  levelSlider.noUiSlider.on('update', () => {
    levelValue.value = levelSlider.noUiSlider.get();
    setPhotoStyle();
  });
};

const onEffectChange = (evt) => {
  currentEffect = EFFECTS[evt.target.value];
  updateSlider(currentEffect.min, currentEffect.max , currentEffect.step);
  changeEffectVisibility();
  setPhotoStyle();
};

const deleteEffect = () => {
  currentEffect = EFFECTS.none;
  updateSlider(currentEffect.min, currentEffect.max , currentEffect.step);
};

const initSlider = () => {
  changeEffectVisibility();
  uploadEffects.addEventListener('change', onEffectChange);
  getScrollSliderData();
};

export {initSlider, deleteEffect, setSlider};

