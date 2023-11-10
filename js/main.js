import {createDataPhotos} from './data.js';
import {createMiniatures} from './img-miniatures.js';
import {initBigPhoto} from './img-review.js';

const DATA_PHOTOS = createDataPhotos;

createMiniatures(DATA_PHOTOS);
initBigPhoto(DATA_PHOTOS);
