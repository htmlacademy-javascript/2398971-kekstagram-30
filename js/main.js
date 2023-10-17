const descriptions = ['Беспутничать', 'Дежа', 'Задорина', 'Испортиться', 'Обоюдный', 'Отпороть', 'Поверье', 'Прошляпить', 'Трасса', 'Хлюпать']
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const userNames = [
  'Губка Боб Квадратные штаны',
  'Гэри Уилсон-младший',
  'Патрик Стар',
  'Сквидвард Квентин Тентаклс',
  'Юджин Гарольд «Мистер» Крабс',
  'Сандра «Сэнди» Чикс',
  'Миссис Пафф',
  'Перл Крабс',
  'Шелдон Джей Планктон',
  'Карель «Карен» Планктон',
  'Ларри Лобстер',
  'Летучий Голландец',
  'Сквильям Фенсисон',
  'Бабл Бас',
  'Нептун',
  'Старик Дженкинс',
  'Окунёк Перкинс',
  'Фред',
  'Морской Супермен',
  'Очкарик',
  'СпанчерМен',
  'Патрикарик',
  'Патрикмен',
  'МэнРей',
  'Грязный Пузырь',
  'Джамбо Креветка',
  'Ядерный Излучатель',
  'Вонючий Зловещий Червяк',
  'Капитан Скупердяй',
  'Доктор Негатив',
  'Эластичный Живот',
  'Профессор Магма',
  'Мисс Невидимка',
  'Аррайт Бандерар',
  'Рефлекто',
  'Маргарет Квадратные Штаны',
  'Гарольд Квадратные Штаны',
  'Бабушка',
  'Дядя Капитан Блу',
  'Блэкджек',
  'Стенли С. Квадратные Штаны',
  'Сэм Стар',
  'Мама Сквидварда',
  'Бетси «Миссис» Крабс',
  'Виктор Крабс',
  'Рыжебород Крабс',
  'Лили Планктон',
  'Баббл Бади',
  'Пуши Обнимаш',
  'Котёнок Кенни',
  'РобоКрабс',
  'Компьютерный Вирус',
  'Планктон, вер. Карен',
  'Мистер Крабс, вер. Карен',
  'Сквидвард, вер. Карен',
  'Губка Боб, вер. Карен',
  'Отебешто Стово',
  'Снежный краб',
  'Джим'
];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomRangeGeneratorNoRepetitions (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomRangeGeneratorNoRepetitions(1, 25);
const generateLikes = createRandomRangeGeneratorNoRepetitions(15, 200);
const generateCommentId = createRandomRangeGeneratorNoRepetitions(1, 1000);

const makeMessage = function () {
  const calculateStringCount = getRandomInteger (1,2);
  let message = '';
  for (let i = 1; i <= calculateStringCount; i++) {
    message += messages[getRandomInteger(0, messages.length-1)] + ' ';
  }

  return message;
};

const makeCommentBase = function () {
  const messagesCount = getRandomInteger (1, 30);
  let comments = [];
  for (let i = 1; i <= messagesCount; i++) {
    comments.push(makeComment());
  }
return comments;
};

const makeComment = function () {
  const comment = {id:generateCommentId()};
  comment.avatar = 'img/avatar-' + getRandomInteger (1, 6) + '.svg';
  comment.message = makeMessage ();
  comment.name = userNames[getRandomInteger (0, userNames.length - 1)];

  return comment;
};

const generateDataPhoto = function () {
  const dataPhoto = {id: generatePhotoId()};
  dataPhoto.url = 'photos/' + dataPhoto.id + '.jpg';
  dataPhoto.description = descriptions[getRandomInteger(0, descriptions.length-1)];
  dataPhoto.likes = generateLikes();
  dataPhoto.comments = makeCommentBase();
  return dataPhoto;
};

const DataPhotos = function () {
  let datas = [];
  for (let i = 0; i < 25; i++) {
    datas.push(generateDataPhoto());
  }
return datas;
};


