const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentListFragment = document.createDocumentFragment();

const showComments = (photo) => {
  const comments = photo.comments;
  const newCommentElements = [];
  comments.forEach(({avatar, message, name}) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.classList.add('hidden');
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentListFragment.appendChild(commentElement);
    newCommentElements.push(commentElement);
  });

  commentList.replaceChildren(...newCommentElements);
};

export {showComments,commentList};

