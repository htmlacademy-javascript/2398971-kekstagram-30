// eslint-disable-next-line no-unused-vars
const getStringLength = (string, maxLength) => string.length <= maxLength;

// eslint-disable-next-line no-unused-vars
const checkPolydrome = (string) => {
  const stringNormalize = string.replaceAll(' ', '').toLowerCase();
  let stringReverse = '';
  for (let i = stringNormalize.length - 1; i > -1; i--) {
    stringReverse += stringNormalize.at(i);
  }
  return stringNormalize === stringReverse;
};

// eslint-disable-next-line no-unused-vars
const getNumbersString = (string) => {
  let number = '';
  string += '';
  Array.from(string.trim(), (element) => {
    if(Number.isNaN(parseInt(element, 10)) === false) {
      number += element;
    }
  });
  if(Number(number) === 0) {
    return Number.NaN;
  } else {
    return Number(number);
  }
};

const getMinute = (time) => {
  const minutes = time.split(':');
  const minute = Number(minutes[0]) * 60 + Number(minutes[1]);

  return minute;
};

// eslint-disable-next-line no-unused-vars
const checkMeetingTime = (timeStart, timeFinish, timeMeeting, meetingLength) => (
  getMinute(timeStart) <= getMinute(timeMeeting) && getMinute(timeFinish) >= getMinute(timeMeeting) + meetingLength);

