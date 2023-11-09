import {isEscapeKey} from './util.js';
import {showComments, commentList} from './img-comments.js';

const userPhoto = document.querySelector('.big-picture');
const closeUserPhoto = userPhoto.querySelector('.big-picture__cancel');

const commentsBotton = userPhoto.querySelector('.social__comments-loader');
const COMMENT_STEP_ADD = 5;
let visibleCommentCount = COMMENT_STEP_ADD;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUserBigPhoto();
  }
};

function hideUserBigPhoto () {
  userPhoto.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  visibleCommentCount = COMMENT_STEP_ADD;
  userPhoto.querySelector('.comments-loader').classList.remove('hidden');
} // Закрыть форму

function showUserBigPhoto () {
  userPhoto.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
} // Открыть форму

function getImgData(dataPhoto) {
  const bigPhotoElement = userPhoto.querySelector('.big-picture__img');
  const bigPhotoElementUrl = bigPhotoElement.querySelector('img');
  const bigPhotoElementLikes = userPhoto.querySelector('.likes-count'); // Найти лайки в разметке
  const bigPhotoElementCommentCountTotal = userPhoto.querySelector('.social__comment-total-count'); // Общее количество комментариев в разметке
  const bigPhotoElementCommentDescription = userPhoto.querySelector('.social__caption'); // Найти описание фото в разметке

  bigPhotoElementUrl.src = dataPhoto.url; // Ссылка на фото
  bigPhotoElementLikes.textContent = dataPhoto.likes; //  Количество лайков
  bigPhotoElementCommentCountTotal.textContent = dataPhoto.comments.length; // Общее количество комментариев
  showComments(dataPhoto); // залить комментарии
  bigPhotoElementCommentDescription.textContent = dataPhoto.description; // описание фото
}

const getVisibleComment = () => {
  const allCommentsCount = commentList.children.length;
  visibleCommentCount = Math.min(visibleCommentCount, allCommentsCount);

  for (let i = 0; i < visibleCommentCount; i++) {
    commentList.children[i].classList.remove('hidden');
  }
  userPhoto.querySelector('.social__comment-shown-count').textContent = visibleCommentCount;

  if (visibleCommentCount >= allCommentsCount) {
    visibleCommentCount = allCommentsCount;
    userPhoto.querySelector('.comments-loader').classList.add('hidden');
  }

  visibleCommentCount += COMMENT_STEP_ADD;
};

commentsBotton.addEventListener('click', () => {
  getVisibleComment(commentList);
});


export const openBigPhoto = (photo) => {
  showUserBigPhoto();
  getImgData(photo);
  getVisibleComment();
};

const initBigPhoto = () => {
  closeUserPhoto.addEventListener('click', () => {
    hideUserBigPhoto();
  });
};

export {initBigPhoto};

