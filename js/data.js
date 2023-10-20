import {createRandomRangeGeneratorNoRepetitions} from './util.js';
import {getRandomInteger} from './util.js';

const descriptions = ['Беспутничать', 'Дежа', 'Задорина', 'Испортиться', 'Обоюдный', 'Отпороть', 'Поверье', 'Прошляпить', 'Трасса', 'Хлюпать'];
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

const generateCommentId = createRandomRangeGeneratorNoRepetitions(1, 1000);

const createMessage = (count) => {
  let message = '';
  for (let i = 1; i <= count; i++) {
    // eslint-disable-next-line prefer-template
    message += messages[getRandomInteger(0, messages.length - 1)] + ' ';
  }

  return message;
};

const createComment = () => ({
  id: generateCommentId(),
  // eslint-disable-next-line prefer-template
  avatar: 'img/avatar-' + getRandomInteger (1, 6) + '.svg',
  message: createMessage(getRandomInteger (1,2)),
  name: userNames[getRandomInteger (0, userNames.length - 1)]
});

const dataComments = Array.from({length:getRandomInteger (1, 30)}, () => createComment());

const createPhoto = (id) => ({
  id,
  // eslint-disable-next-line prefer-template
  url: 'photos/' + id + '.jpg',
  description: descriptions[getRandomInteger(0, descriptions.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: dataComments
});

// eslint-disable-next-line no-unused-vars
const dataPhotos = Array.from({length : 25},(_,index) => createPhoto(index + 1));

export {dataPhotos};
