const doc = document;
const timeDisplay = doc.querySelector('.time-display');
const inputElem = doc.querySelector('#time-input');
const startBtn = doc.querySelector('.start-btn');
const pauseBtn = doc.querySelector('.pause-btn');
const resetBtn = doc.querySelector('.reset-btn');
const errorMessage = doc.querySelector('.error-message');

let timer = null;
let totalSeconds = 0;
let isRunning = false;

inputElem.addEventListener('focus', () => {

    if (!inputElem.value.trim()) {
        inputElem.value = '00:00:00';
    }
});

startBtn.addEventListener('click', () => {

    if (!isRunning) {
        // شروع یا ادامه تایمر
        const input = inputElem.value.trim();
        const parts = input.split(':').map(Number);

        if (
            parts.length !== 3 ||
            parts.some(isNaN) ||
            parts.some(num => num < 0) ||
            parts[1] > 59 ||
            parts[2] > 59
        ) {
            errorMessage.textContent = 'لطفاً زمان را به‌ صورت صحیح وارد کنید.';
            return;
        }

        if (totalSeconds === 0) {
            totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
            if (totalSeconds <= 0) {
                errorMessage.textContent = 'زمان باید بزرگتر از صفر باشد.';
                return;
            }
        }

        errorMessage.textContent = '';
        startBtn.disabled = true;
        startBtn.textContent = 'ادامه';
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        inputElem.disabled = true;
        isRunning = true;

        updateDisplay(totalSeconds);

        timer = setInterval(() => {
            totalSeconds--;
            updateDisplay(totalSeconds);

            if (totalSeconds <= 0) {
                clearInterval(timer);
                timer = null;
                errorMessage.textContent = 'زمان تمام شد!';
                isRunning = false;
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                resetBtn.disabled = false;
                inputElem.disabled = false;
                startBtn.textContent = 'شروع';
                totalSeconds = 0;
            }
        }, 1000);
    }
});

pauseBtn.addEventListener('click', () => {

    if (isRunning) {
        clearInterval(timer);
        timer = null;
        isRunning = false;
        startBtn.disabled = false;
        startBtn.textContent = 'ادامه';
        pauseBtn.disabled = true;
    }
});

resetBtn.addEventListener('click', () => {

    clearInterval(timer);
    timer = null;
    totalSeconds = 0;
    isRunning = false;
    timeDisplay.textContent = '00:00:00';
    inputElem.value = '';
    inputElem.disabled = false;
    errorMessage.textContent = '';
    startBtn.disabled = false;
    startBtn.textContent = 'شروع';
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
});

function updateDisplay(seconds) {

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formatted = [hours, minutes, secs]
        .map(n => n.toString().padStart(2, '0'))
        .join(':');

    timeDisplay.textContent = formatted;
}

// مشخص کردن لینک فعال بر اساس صفحه
const currentPath = window.location.pathname;

const timerLink = document.querySelector('.timer-link');
const kornometrLink = document.querySelector('.kornometr-link');

if (currentPath.includes('index.html')) {
    timerLink.classList.add('active');
} else if (currentPath.includes('index2.html')) {
    kornometrLink.classList.add('active');
}
