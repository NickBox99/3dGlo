//Таймер
function Timer(dedline) {
    const timerHours = document.getElementById("timer-hours"),
        timerMinutes = document.getElementById("timer-minutes"),
        timerSeconds = document.getElementById("timer-seconds");

    function getTimeRemaining() {
        const timerDedline = new Date(dedline).getTime(),
            timerNowTime = new Date().getTime(),
            miliSeconds = (timerDedline - timerNowTime) / 1000,
            seconds = Math.floor(miliSeconds % 60),
            minutes = Math.floor((miliSeconds / 60) % 60),
            hours = Math.floor(miliSeconds / 60 / 60);

        return { miliSeconds, hours, minutes, seconds };
    }

    const updateTimer = function() {
        const timer = getTimeRemaining();

        if (timer.miliSeconds <= 0) {
            timerHours.textContent = "00";
            timerMinutes.textContent = "00";
            timerSeconds.textContent = "00";
        } else {
            timerHours.textContent = (timer.hours <= 9 ? '0' : '') + timer.hours;
            timerMinutes.textContent = (timer.minutes <= 9 ? '0' : '') + timer.minutes;
            timerSeconds.textContent = (timer.seconds <= 9 ? '0' : '') + timer.seconds;
        }

        const idInterval = setInterval(updateTimer, 1000);
        if (timer.miliSeconds <= 0) {
            clearInterval(idInterval);
        }
    };
    updateTimer();
}

//Модальные окна
function addModalEventListener() {

    const toogleMenu = function() {
        const btnMenu = document.querySelector(".menu"),
            modalMenu = document.querySelector("menu"),
            closeBtn = document.querySelector(".close-btn"),
            listLink = modalMenu.querySelectorAll("ul>li");

        const handlerMenu = function() {
            if (!modalMenu.style.transform || modalMenu.style.transform === `translate(-100%)`) {
                let i = -100;
                console.log('i: ', i);

                const animated = function() {
                    i += 5;
                    modalMenu.style.transform = `translate(${i}%)`;

                    if (i < 0) {
                        requestAnimationFrame(animated);
                    }
                };

                if (document.documentElement.clientHeight >= 768) {
                    animated();
                } else {
                    modalMenu.style.transform = `translate(0)`;
                }
            } else {
                modalMenu.style.transform = `translate(-100%)`;
            }
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        listLink.forEach(elem => elem.addEventListener('click', handlerMenu));
    };

    const tooglePopup = function() {
        const btnsPopup = document.querySelectorAll('.popup-btn'),
            modalPopup = document.querySelector('.popup'),
            closeBtn = document.querySelector('.popup-close');

        btnsPopup.forEach(elem => elem.addEventListener('click', () => {
            modalPopup.style.display = "block";
        }));
        closeBtn.addEventListener('click', () => {
            modalPopup.style.display = "none";
        });
    };

    toogleMenu();
    tooglePopup();
}

document.addEventListener('DOMContentLoaded', () => {
    Timer("30 July 2020");
    addModalEventListener();
});

