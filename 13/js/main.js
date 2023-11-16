//import {createDataPhotos} from './data.js';
import {createMiniatures} from './img-miniatures.js';
import './img-review.js';
import {hideUploadForm} from './img-upload.js';
import {onFormSubmit} from './img-validate.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData()
  .then((dataPhotos) => {
    createMiniatures(dataPhotos);
  })
  .catch(() => showAlert());

onFormSubmit(hideUploadForm);
