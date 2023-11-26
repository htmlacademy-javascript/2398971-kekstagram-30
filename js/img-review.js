import {isEscapeKey} from './util.js';
import {showComments, commentList} from './img-comments.js';

const userPhoto = document.querySelector('.big-picture');
const closeUserPhoto = userPhoto.querySelector('.big-picture__cancel');

const commentsButton = userPhoto.querySelector('.social__comments-loader');
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
}

function showUserBigPhoto () {
  userPhoto.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function insertPhotogData(dataPhoto) {
  const bigPhotoElement = userPhoto.querySelector('.big-picture__img');
  const bigPhotoElementUrl = bigPhotoElement.querySelector('img');
  const bigPhotoElementLikes = userPhoto.querySelector('.likes-count');
  const bigPhotoElementCommentCountTotal = userPhoto.querySelector('.social__comment-total-count');
  const bigPhotoElementCommentDescription = userPhoto.querySelector('.social__caption');

  bigPhotoElementUrl.src = dataPhoto.url;
  bigPhotoElementLikes.textContent = dataPhoto.likes;
  bigPhotoElementCommentCountTotal.textContent = dataPhoto.comments.length;
  showComments(dataPhoto);
  bigPhotoElementCommentDescription.textContent = dataPhoto.description;
}

const getVisibleComment = () => {
  const allCommentsCount = commentList.children.length;
  const startComment = visibleCommentCount - COMMENT_STEP_ADD;
  visibleCommentCount = Math.min(visibleCommentCount, allCommentsCount);

  for (let i = Math.min(startComment, allCommentsCount); i < visibleCommentCount; i++) {
    commentList.children[i].classList.remove('hidden');
  }
  userPhoto.querySelector('.social__comment-shown-count').textContent = visibleCommentCount;

  if (visibleCommentCount >= allCommentsCount) {
    visibleCommentCount = allCommentsCount;
    userPhoto.querySelector('.comments-loader').classList.add('hidden');
  }

  visibleCommentCount += COMMENT_STEP_ADD;
};

commentsButton.addEventListener('click', () => {
  getVisibleComment(commentList);
});

export const openBigPhoto = (photo) => {
  showUserBigPhoto();
  insertPhotogData(photo);
  getVisibleComment();
};

const onBigPhotoCloseButton = () => hideUserBigPhoto();
closeUserPhoto.addEventListener('click', onBigPhotoCloseButton);
