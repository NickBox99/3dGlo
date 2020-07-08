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

                if (document.documentElement.clientWidth >= 768) {
                    animated();
                } else {
                    modalMenu.style.transform = `translate(0)`;
                }
            } else {
                modalMenu.style.transform = `translate(-100%)`;
            }
        };

        document.addEventListener('click', event => {
            const target = event.target;

            if (target.closest(".menu") || target.closest(".close-btn") ||
            (modalMenu.style.transform === `translate(0%)` && target !== modalMenu)) {
                handlerMenu();
            }

            const targetLink = target.closest("a");
            if (targetLink) {
                event.preventDefault();
                const hrefAtr = targetLink.getAttribute('href'),
                    topSlide = document.querySelector(hrefAtr).offsetTop;
                let thisTop = window.scrollY;

                const animate = function() {

                    if (thisTop < topSlide) {
                        if (thisTop + 100 > topSlide) {
                            thisTop = topSlide + 1;
                        }

                        window.scrollTo(0, thisTop);
                        thisTop += 100;
                        requestAnimationFrame(animate);
                    }
                };
                animate();
            }

        });

    };

    const tooglePopup = function() {
        const parentPopup = document.querySelector('#service-block'),
            modalPopup = document.querySelector('.popup');


        parentPopup.addEventListener('click', event => {
            if (event.target.classList.contains('popup-btn')) {
                modalPopup.style.display = "block";

                if (document.documentElement.clientWidth >= 768) {
                    modalPopup.style.opacity = 0;
                    let opacity = 0;

                    const animated = function() {
                        opacity += 0.05;
                        modalPopup.style.opacity = opacity;

                        if (opacity < 1) {
                            requestAnimationFrame(animated);
                        }
                    };
                    animated();
                }

            }
        });

        modalPopup.addEventListener('click', event => {
            const target = event.target;

            if (target.classList.contains("popup-close") || !target.closest(".popup-content")) {
                modalPopup.style.display = "none";
            }
        });
    };

    toogleMenu();
    tooglePopup();
}

//Табы
const tabs = function() {
    const tabHeader = document.querySelector(".service-header"),
        tab = document.querySelectorAll(".service-header-tab"),
        tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContext = function(index) {
        for (let i = 0; i < tab.length; i++) {
            if (i === index) {
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tab[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    };

    tabHeader.addEventListener('click', event => {
        const target = event.target.closest(".service-header-tab");

        if (target) {
            tab.forEach((item, i) => {
                if (item === target) {
                    toggleTabContext(i);
                    return;
                }
            });
        }

    });
};

//Слайдер
const slider = function(interval = 1500) {
    const sliders = document.querySelector("#all-progects"),
        slide = sliders.querySelectorAll(".portfolio-item"),
        dots = sliders.querySelector(".portfolio-dots");

    for (let i = 0; i < slide.length; i++) {
        const element = document.createElement('li');
        element.classList.add('dot');
        dots.append(element);
    }

    const dot = dots.querySelectorAll('.dot');
    if (dot.length > 0) {
        dot[0].classList.add('dot-active');
    }

    let currenSlide = 0;

    const nextSlide = function(slide, index, strClass) {
        slide[index].classList.add(strClass);
    };

    const prevSlide = function(slide, index, strClass) {
        slide[index].classList.remove(strClass);
    };

    const autoPlaySlide = function() {
        prevSlide(slide, currenSlide, "portfolio-item-active");
        prevSlide(dot, currenSlide, "dot-active");

        currenSlide++;
        if (currenSlide >= slide.length) {
            currenSlide = 0;
        }
        nextSlide(slide, currenSlide, "portfolio-item-active");
        nextSlide(dot, currenSlide, "dot-active");
    };

    let intervalSliders;

    const startSlide = function() {
        intervalSliders = setInterval(autoPlaySlide, interval);
    };

    const stopSlide = function() {
        clearInterval(intervalSliders);
    };

    sliders.addEventListener('click', event => {
        const target = event.target;

        if (!event.target.matches(".portfolio-btn, .dot")) {
            return;
        }

        event.preventDefault();
        prevSlide(slide, currenSlide, "portfolio-item-active");
        prevSlide(dot, currenSlide, "dot-active");

        if (target.matches("#arrow-left")) {
            currenSlide--;
        } else if (target.matches("#arrow-right")) {
            currenSlide++;
        } else if (target.matches(".dot")) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currenSlide = index;
                }
            });
        }


        if (currenSlide >= slide.length) {
            currenSlide = 0;
        } else if (currenSlide < 0) {
            currenSlide = slide.length - 1;
        }
        nextSlide(slide, currenSlide, "portfolio-item-active");
        nextSlide(dot, currenSlide, "dot-active");
    });

    startSlide();
    sliders.addEventListener('mouseover', event => {
        if (event.target.matches(".portfolio-btn, .dot")) {
            stopSlide();
        }
    });

    sliders.addEventListener('mouseout', event => {
        if (event.target.matches(".portfolio-btn, .dot")) {
            startSlide();
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    timer("30 July 2020");
    addModalEventListener();
    tabs();
    slider(1500);
});

