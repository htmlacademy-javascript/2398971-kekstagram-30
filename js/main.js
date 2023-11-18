//import {createDataPhotos} from './data.js';
import {createMiniatures} from './img-miniatures.js';
import './img-review.js';
import {hideUploadForm} from './img-upload.js';
import {addOnFormSubmit} from './img-validate.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {initImgFilters} from './img-filter.js';

getData()
  .then((dataPhotos) => {
    createMiniatures(dataPhotos);
    initImgFilters(dataPhotos);
  })
  .catch(() => showAlert());

addOnFormSubmit(hideUploadForm);
