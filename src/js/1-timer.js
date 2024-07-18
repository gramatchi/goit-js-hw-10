import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDateRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
const daysTimerRef = document.querySelector('[data-days]');
const hoursTimerRef = document.querySelector('[data-hours]');
const minutesTimerRef = document.querySelector('[data-minutes]');
const secondsTimerRef = document.querySelector('[data-seconds]');

let userSelectedDate = 0;
btnStartRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    //console.log(selectedDates[0].getTime());
    if (userSelectedDate < new Date().getTime()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      btnStartRef.disabled = true;
    } else {
      btnStartRef.disabled = false;
    }
  },
};

flatpickr(inputDateRef, options);

btnStartRef.addEventListener('click', startTimer);

function startTimer() {
  btnStartRef.disabled = true;
  inputDateRef.disabled = true;

  const intervalId = setInterval(() => {
    inputDateRef.classList.add('active-clock');
    const currentTime = new Date().getTime();
    const timeDifference = userSelectedDate - currentTime;
    updateTimer(convertMs(timeDifference));

    if (timeDifference < 1000) {
      clearInterval(intervalId);
      //btnStartRef.disabled = false;
      inputDateRef.disabled = false;
    }
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysTimerRef.textContent = addLeadingZero(days);
  hoursTimerRef.textContent = addLeadingZero(hours);
  minutesTimerRef.textContent = addLeadingZero(minutes);
  secondsTimerRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//console.log(convertMs(2000));
//console.log(convertMs(140000));
//console.log(convertMs(24140000));
