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

//События наведения мышки
const mouseEvent = function(){
    const changeAttr = (event) => {
        const target = event.target;

        if(target.hasAttribute("data-img")){
            const saveAttr = target.getAttribute("src");
            target.setAttribute("src", target.getAttribute("data-img"));
            target.setAttribute("data-img", saveAttr);
        }
    }

    document.addEventListener('mouseover', changeAttr);

    document.addEventListener('mouseout', changeAttr);
}

//События для калькулятора
const calcEvent = function(){
    const calcBlock = document.querySelector(".calc-block"),
        calcType = document.querySelector(".calc-type"),
        totalValue = document.getElementById("total"),
        calcSquare = document.querySelector(".calc-square"),
        calcCount = document.querySelector(".calc-count"),
        calcDay = document.querySelector(".calc-day");

    const getTotal = (price = 100) =>{

        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
        sqareValue = +calcSquare.value;
        
        
        if(calcCount.value > 1){
            countValue *= (calcCount.value - 1) / 10;
        }

        if(calcDay.value && calcDay.value < 5){
            dayValue *= 2;
        }else if(calcDay.value && calcDay.value < 10){
            dayValue *= 1.5;
        }

        if(typeValue && sqareValue){
            total = price * typeValue * sqareValue * countValue * dayValue;
        }
        return total;
    }


    let statusAnimated = false;
    let needTotal = 0;
    let timeoutCalc;

    const animateTotal = () =>{
        let nowTotal = +totalValue.textContent;
        
        if(needTotal === nowTotal){
            statusAnimated = false;
            
        }else{
            let speed = Math.abs(needTotal - nowTotal);
            if(speed % 10 === 0) {
                speed = 10;
            }
            else if(speed % 5 === 0) {
                speed = 5;
            }else if(speed % 3 === 0){
                speed = 3;
            }else if(speed % 2 === 0){
                speed = 2;
            }else{
                speed = 1;
            }

            if(nowTotal < needTotal){
                nowTotal+= speed;
                totalValue.textContent = nowTotal;
            }
            else{
                nowTotal-= speed;
                totalValue.textContent = nowTotal;
            }
            requestAnimationFrame(animateTotal);
        }
    }

    const startAnimate = function() {
        timeoutCalc = setTimeout(animateTotal, 1);
        statusAnimated = true;
    };

    calcBlock.addEventListener("input", (event) => {
        const target = event.target;
        if(target.matches("input.calc-item")){
            target.value = target.value.replace(/\D/, '');
            needTotal = getTotal(100);

            if(statusAnimated){
                clearTimeout(timeoutCalc);
                startAnimate();
            }
            if(!statusAnimated){
                startAnimate();
            }
        }
    });

    calcType.addEventListener("change", ()=>{
        needTotal = getTotal(100);
        if(statusAnimated){
            clearTimeout(timeoutCalc);
            startAnimate();
        }
        if(!statusAnimated){
            startAnimate();
        }
    });
}

//Ajax
const sendForm = (id) => {
    const errorMessage = "Что то пошло не так...",
        loadMessage = "Загрузка",
        successMessage = "Спасибо! Мы скоро с вами свяжемся!";
    let animateLoad;
    
    const form = document.getElementById(id);

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        let countPoints = 0;
        animateLoad = setInterval(() => {
            let points = '';
            for(let i = 0; i< countPoints; i ++){
                points+='.';
            }
            statusMessage.textContent = (loadMessage + points);
            countPoints++;
            if(countPoints > 3){
                countPoints = 0;
            }
        }, 400);

        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        postData(body,
            () => {
                statusMessage.textContent = successMessage;
                const elements = form.elements;
                for(let i = 0; i< elements.length; i++){
                    elements[i].value = '';
                }
            },
            (error) => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            }
        );
    });

    const postData = (body, outputData, errorData) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
            if(request.readyState !== 4){
                return;
            }
            clearInterval(animateLoad);
            if(request.status === 200){
                outputData();
            } else {
                errorData(request.status);
            }
        });
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(body));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    timer("30 July 2020");
    addModalEventListener();
    tabs();
    slider(1500);
    mouseEvent();
    calcEvent();

    //Ajax
    sendForm('form1');
    sendForm('form2');
    sendForm('form3');
});

