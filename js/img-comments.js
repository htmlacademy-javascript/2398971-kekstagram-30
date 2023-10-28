const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentListFragment = document.createDocumentFragment();

const createComments = (photos) => {
  const comments = photos['comments'];
  comments.forEach(({avatar, message, name}) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentListFragment.appendChild(commentElement);
  });
  while (commentList.firstChild) {
    commentList.removeChild(commentList.firstChild);
  }

  return commentList.appendChild(commentListFragment);
};

export {createComments};
