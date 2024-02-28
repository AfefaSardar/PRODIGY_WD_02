let startTime;
let elapsedTime = 0;
let timerInterval;

function startPause() {
    if (!startTime) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        document.getElementById("startPause").textContent = "Pause";
    } else {
        clearInterval(timerInterval);
        startTime = null;
        document.getElementById("startPause").textContent = "Start";
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = null;
    elapsedTime = 0;
    updateDisplay();
    document.getElementById("startPause").textContent = "Start";
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (startTime) {
        const lapTime = Date.now() - startTime;
        const formattedTime = formatTime(lapTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = formattedTime;
        document.getElementById("laps").appendChild(lapItem);
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    document.querySelector(".display").textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const centiseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}.${centiseconds}`;
}

document.getElementById("startPause").addEventListener("click", startPause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
