// Get elements
const timeDisplay = document.querySelector('.time-display');
const startBtn = document.querySelector('.start-btn');
const shortBreakBtn = document.querySelector('.short-break-btn');
const longBreakBtn = document.querySelector('.long-break-btn');

// Set default values
let timeInSeconds = 1500; // 25 minutes in seconds
let intervalId;
let isTimerRunning = false;

// Function to display time
function displayTime() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to start timer
function startTimer() {
    clearInterval(intervalId); // Clear any existing timer
    timeInSeconds = 1500; // Reset time to 25 minutes
    isTimerRunning = true;
    displayTime();
    intervalId = setInterval(() => {
        timeInSeconds--;
        displayTime();
        if (timeInSeconds <= 0) {
            clearInterval(intervalId);
            alert("Time's up!");
            isTimerRunning = false;
        }
    }, 1000);
}

// Event listeners
startBtn.addEventListener('click', () => {
    startTimer();
});

shortBreakBtn.addEventListener('click', () => {
    timeInSeconds = 300; // 5 minutes in seconds
    displayTime();
    isTimerRunning = false;
});

longBreakBtn.addEventListener('click', () => {
    timeInSeconds = 900; // 15 minutes in seconds
    displayTime();
    isTimerRunning = false;
});

// Initialize timer display
displayTime();
