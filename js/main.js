
document.addEventListener('DOMContentLoaded', () => {
    Timer("30 July 2020");
});

function Timer(dedline) {
    const timerHours = document.getElementById("timer-hours"),
    timerMinutes = document.getElementById("timer-minutes"),
    timerSeconds = document.getElementById("timer-seconds");

    function getTimeRemaining(){
        const timerDedline = new Date(dedline).getTime(),
        timerNowTime = new Date().getTime(),
        miliSeconds = (timerDedline - timerNowTime) / 1000,
        seconds = Math.floor(miliSeconds % 60),
        minutes = Math.floor((miliSeconds / 60) % 60),
        hours = Math.floor(miliSeconds / 60 / 60);

        return {miliSeconds, hours, minutes, seconds};
    }

    let updateTimer = function (){
        let timer = getTimeRemaining();

        if(timer.miliSeconds <= 0){
            timerHours.textContent = "00";
            timerMinutes.textContent = "00";
            timerSeconds.textContent = "00";
        }else{
            timerHours.textContent = (timer.hours <= 9 ? '0' : '') + timer.hours;
            timerMinutes.textContent = (timer.minutes <= 9 ? '0' : '') + timer.minutes;
            timerSeconds.textContent = (timer.seconds <= 9 ? '0' : '') + timer.seconds;
        }

        const idInterval = setInterval(updateTimer, 1000);
        if(timer.miliSeconds <= 0)
        {
            clearInterval(idInterval);
        }
    }
    updateTimer();
}
