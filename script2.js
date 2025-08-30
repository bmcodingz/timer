const doc = document;
const timeDisplay = doc.querySelector('.time-display');
const startBtn = doc.querySelector('.start-btn');
const pauseBtn = doc.querySelector('.pause-btn');
const resetBtn = doc.querySelector('.reset-btn');
const errorMessage = doc.querySelector('.error-message');

let interval;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

//تابعی که بروز رسانی کند
const updateTime = () => {

    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    const formattedTime =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

    timeDisplay.textContent = formattedTime;
};

//دکمه شروع
startBtn.addEventListener('click', () => {

    if (isRunning) return;

    isRunning = true;
    errorMessage.textContent = '';

    interval = setInterval(updateTime, 1000);

    startBtn.textContent = 'ادامه';
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
});

//دکمه توقف
pauseBtn.addEventListener('click', () => {

    if (!isRunning) return;

    clearInterval(interval);
    isRunning = false;
    errorMessage.textContent = '';

    startBtn.disabled = false;
    startBtn.textContent = 'ادامه';
    pauseBtn.disabled = true
});

//دکمه ریست
resetBtn.addEventListener('click', () => {

    clearInterval(interval);
    isRunning = false;

    seconds = 0;
    minutes = 0;
    hours = 0;

    timeDisplay.textContent = '00:00:00';

    startBtn.textContent = 'شروع';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    errorMessage.textContent = '';
});

// مشخص کردن لینک فعال بر اساس صفحه
const currentPath = window.location.pathname;

const timerLink = document.querySelector('.timer-link');
const kornometrLink = document.querySelector('.kornometr-link');

if (currentPath.includes('index.html')) {
    timerLink.classList.add('active');
} else if (currentPath.includes('index2.html')) {
    kornometrLink.classList.add('active');
}
