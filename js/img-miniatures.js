import {createDataPhotos} from './data.js';

const pictureListData = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const dataPhotos = createDataPhotos;
const pictureList = document.createDocumentFragment();

dataPhotos.forEach(({url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureList.appendChild(pictureElement);
});

pictureListData.appendChild(pictureList);

