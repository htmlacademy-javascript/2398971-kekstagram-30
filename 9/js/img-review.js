import {isEscapeKey} from './util.js';
import {createComments} from './img-comments.js';

const reviewBigImg = (photos) => {
  const usersImgs = document.querySelectorAll('.picture');

  usersImgs.forEach((userModalOpenImg) => {
    const userModalImg = document.querySelector('.big-picture');
    const userModalCloseImgs = userModalImg.querySelector('.big-picture__cancel');

    const onDocumentKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        closeUserModal();
      }
    };

    function openUserModal () {
      userModalImg.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', onDocumentKeydown);
    } // Открыть форму

    function closeUserModal () {
      userModalImg.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onDocumentKeydown);
    } // Закрыть форму

    function getImgData() {
      const idPhoto = userModalOpenImg.querySelector('img').id; // получить id фото в разметке
      const dataPhoto = photos.find((item) => item.id === Number(idPhoto)); // найти элементт по id фото в массиве

      const bigPictureElementImg = userModalImg.querySelector('.big-picture__img');
      const bigPictureElementImgUrl = bigPictureElementImg.querySelector('img');
      const bigPictureElementLikes = userModalImg.querySelector('.likes-count'); // Найти лайки в разметке
      const bigPictureElementCommentCountShown = userModalImg.querySelector('.social__comment-shown-count'); // Найти количество показанных комментариев в разметке
      const bigPictureElementCommentCountTotal = userModalImg.querySelector('.social__comment-total-count'); // Общее количество комментариев в разметке
      const bigPictureElementCommentDescription = userModalImg.querySelector('.social__caption'); // Найти описание фото в разметке

      bigPictureElementImgUrl.src = dataPhoto.url; // Ссылка на фото
      bigPictureElementLikes.textContent = dataPhoto.likes; //  Количество лайков
      bigPictureElementCommentCountShown.textContent = dataPhoto.comments.length; // Количество показанных комментариев
      bigPictureElementCommentCountTotal.textContent = dataPhoto.comments.length; // Общее количество комментариев
      createComments(dataPhoto); // залить комментарии
      bigPictureElementCommentDescription.textContent = dataPhoto.description; // описание фото
    }

    userModalOpenImg.addEventListener('click', () => {
      openUserModal();
      getImgData();

      userModalImg.querySelector('.social__comment-count').classList.add('hidden');
      userModalImg.querySelector('.comments-loader').classList.add('hidden');

    });

    userModalCloseImgs.addEventListener('click', () => {
      closeUserModal();
    });

  });
};

export {reviewBigImg};

