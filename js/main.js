//Таймер
function timer(dedline) {
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
        const modalMenu = document.querySelector("menu");

        const handlerMenu = function() {
            if (!modalMenu.style.transform || modalMenu.style.transform === `translate(-100%)`) {
                let i = -100;

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

        document.addEventListener('click', (event)=>{
            const target = event.target;

            if(target.closest(".menu") || target.closest(".close-btn") || 
            (modalMenu.style.transform === `translate(0px)` && target !== modalMenu)){
                handlerMenu();
            }

        });

    };

    const tooglePopup = function() {
        const parentPopup = document.querySelector('#service-block'),
            modalPopup = document.querySelector('.popup');


        parentPopup.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup-btn')){
                modalPopup.style.display = "block";
                
                if (document.documentElement.clientHeight >= 768) {
                    modalPopup.style.opacity = 0;
                    let opacity = 0;

                    const animated = function(){
                        opacity += 0.05;
                        modalPopup.style.opacity = opacity;

                        if(opacity < 1)
                        {
                            requestAnimationFrame(animated);
                        }
                    }
                    animated();
                } 

            }
        })  

        modalPopup.addEventListener('click', (event) => {
            const target = event.target;

            if(target.classList.contains("popup-close") || !target.closest(".popup-content")){
                modalPopup.style.display = "none";
            }
        });
    };

    toogleMenu();
    tooglePopup();
}

//Табы
const tabs = function(){
    const tabHeader = document.querySelector(".service-header"),
    tab = document.querySelectorAll(".service-header-tab"),
    tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContext = function(ir){
        for(let i=0;i< tab.length; i++){
            if(i === ir){
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            }else{
                tab[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    }

    tabHeader.addEventListener('click', (event)=>{
        let target = event.target.closest(".service-header-tab");

        if(target){
            tab.forEach((item, i) => {
                if(item === target){
                    toggleTabContext(i);
                    return;
                }
            });
        }

    });
}

document.addEventListener('DOMContentLoaded', () => {
    timer("30 July 2020");
    addModalEventListener();
    tabs();
});

