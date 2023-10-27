import {createRandomRangeGeneratorNoRepetitions} from './util.js';
import {getRandomInteger} from './util.js';

const ID_COUNT = 25;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const COMMENTS_COUNT = 30;
const ID_COMMENTS_COUNT = 1000;
const AVATAR_COMMENTS_COUNT = 6;
const STRING_COMMENTS_COUNT_MAX = 2;

const DESCRIPTIONS = ['Беспутничать', 'Дежа', 'Задорина', 'Испортиться', 'Обоюдный', 'Отпороть', 'Поверье', 'Прошляпить', 'Трасса', 'Хлюпать'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USER_NAMES = [
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

const generateCommentId = createRandomRangeGeneratorNoRepetitions(1, ID_COMMENTS_COUNT);

const createMessage = (count) => {
  let message = '';
  for (let i = 1; i <= count; i++) {
    message += `${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]} `;
  }

  return message;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COMMENTS_COUNT)}.svg`,
  message: createMessage(getRandomInteger (1,STRING_COMMENTS_COUNT_MAX)),
  name: USER_NAMES[getRandomInteger (0, USER_NAMES.length - 1)]
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from({length:getRandomInteger (1, COMMENTS_COUNT)}, () => createComment())
}
);

const createDataPhotos = Array.from({length : ID_COUNT},(_,index) => createPhoto(index + 1));

export {createDataPhotos};
