import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formRef: document.querySelector('.form'),
  btnRef: document.querySelector('button'),
};

refs.formRef.addEventListener('submit', showPromiseNotification);

function showPromiseNotification(event) {
  event.preventDefault();
  const delay = parseInt(event.target.elements.delay.value);
  const state = event.target.elements.state.value;
  //console.log(delay);
  //console.log(state);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });

  promise
    .then(() => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}
