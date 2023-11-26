import {createRandomRangeGeneratorNoRepetitions, debounce} from './util.js';
import {createMiniatures} from './img-miniatures.js';

const RANDOM_COMMENTS_COUNT = 10;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

const FilterSwitch = {
  'filter-default': (dataPhotos) => dataPhotos,
  'filter-random': (dataPhotos) => {
    const getRandomPhotoId = createRandomRangeGeneratorNoRepetitions(0, dataPhotos.length - 1);
    const randomDataPhotos = [];
    Array.from({length : RANDOM_COMMENTS_COUNT}, () => {
      const randomPhotoId = getRandomPhotoId();
      const findRandomPhoto = dataPhotos.find(({ id }) => id === randomPhotoId);
      randomDataPhotos.push(findRandomPhoto);
    });

    return randomDataPhotos;
  },
  'filter-discussed': (dataPhotos) =>
    [...dataPhotos].sort((element1, element2) => element2.comments.length - element1.comments.length)
};


const pasteFilteredPhoto = (evt, dataPhotos) => {
  const filteredData = FilterSwitch[evt.target.id] (dataPhotos);
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((element) => element.remove());
  createMiniatures(filteredData);
};

const debouncedPasteFilteredPhoto = debounce(pasteFilteredPhoto);

const setFilter = (evt, dataPhotos) => {
  Array.from({length : imgFiltersForm.length}, (_,index) => imgFiltersForm[index].classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');

  debouncedPasteFilteredPhoto(evt, dataPhotos);
};


const initImgFilters = (dataPhotos) => {
  imgFilters.classList.remove('img-filters--inactive');
  Array.from({length : imgFiltersForm.length}, (_,index) => imgFiltersForm[index].addEventListener('click',(evt) => setFilter (evt, dataPhotos)));
};

export {initImgFilters};

