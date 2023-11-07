import {createDataPhotos} from './data.js';
import {createMiniatures} from './img-miniatures.js';
import {reviewBigImg} from './img-review.js';

const DATA_PHOTOS = createDataPhotos;

createMiniatures(DATA_PHOTOS);
reviewBigImg(DATA_PHOTOS);
