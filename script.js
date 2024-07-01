let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    startStopButton.textContent = 'Start';
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

updateDisplay();
