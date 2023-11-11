import {openBigPhoto} from './img-review.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

const createMiniatures = (photos) => {
  photos.forEach((photo) => {
    const {id, url, description, likes, comments } = photo;
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').id = id;
    pictureElement.querySelector('.picture__img').dataset.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', () => openBigPhoto(photo));
    pictureListFragment.appendChild(pictureElement);
  });

  return pictureList.appendChild(pictureListFragment);

};

export {createMiniatures};
