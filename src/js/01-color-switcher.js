const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

stopBtnEl.addEventListener('click', onStopBtn);
startBtnEl.addEventListener('click', onStartBtn);

let timerId = 0; // створюєм таймер

function onStartBtn(evt) {
  evt.target.disabled = true; //откл
  stopBtnEl.disabled = false; //вкл

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStopBtn(evt) {
  startBtnEl.disabled = false; //вкл
  evt.target.disabled = true; //откл

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
} // c конспекта
