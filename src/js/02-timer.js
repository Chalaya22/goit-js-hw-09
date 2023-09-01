import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnEl = document.querySelector('[data-start]');

const calendarEl = document.querySelector('input#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;
let selectedDate = null;
let currentDate = null;

startBtnEl.disabled = true;

// календар
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future!');
    } else {
      Notify.success('Please, click on button start');
      startBtnEl.disabled = false;
      selectedDate = selectedDates[0].getTime();
    }
  },
};
const fp = flatpickr(calendarEl, options);

const counter = {
  start() {
    timerId = setInterval(() => {
      startBtnEl.disabled = true;
      calendarEl.disabled = true;
      currentDate = Date.now();
      const delta = selectedDate - currentDate;

      convertMs(delta);

      updateIimer(convertMs(delta));
      if (delta <= 1000) {
        this.stop();
        Notify.success('You can choose a new date and time');
      }
    }, 1000);
  },
  stop() {
    clearInterval(timerId);
    startBtnEl.disabled = true;
    calendarEl.disabled = false;
    return;
  },
};
startBtnEl.addEventListener('click', onStartClick);
function onStartClick() {
  counter.start();
}

// оновлення  таймера
function updateIimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
