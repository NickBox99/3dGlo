const calcEvent = function () {
  const calcBlock = document.querySelector(".calc-block"),
    calcType = document.querySelector(".calc-type"),
    totalValue = document.getElementById("total"),
    calcSquare = document.querySelector(".calc-square"),
    calcCount = document.querySelector(".calc-count"),
    calcDay = document.querySelector(".calc-day");

  const getTotal = (price = 100) => {
    let total = 0,
      countValue = 1,
      dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value,
      sqareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue *= (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && sqareValue) {
      total = price * typeValue * sqareValue * countValue * dayValue;
    }
    return total;
  };

  let statusAnimated = false;
  let needTotal = 0;
  let timeoutCalc;

  const animateTotal = () => {
    let nowTotal = +totalValue.textContent;

    if (needTotal === nowTotal) {
      statusAnimated = false;
    } else {
      let speed = Math.abs(needTotal - nowTotal);
      if (speed % 10 === 0) {
        speed = 10;
      } else if (speed % 5 === 0) {
        speed = 5;
      } else if (speed % 3 === 0) {
        speed = 3;
      } else if (speed % 2 === 0) {
        speed = 2;
      } else {
        speed = 1;
      }

      if (nowTotal < needTotal) {
        nowTotal += speed;
        totalValue.textContent = nowTotal;
      } else {
        nowTotal -= speed;
        totalValue.textContent = nowTotal;
      }
      requestAnimationFrame(animateTotal);
    }
  };

  const startAnimate = function () {
    timeoutCalc = setTimeout(animateTotal, 1);
    statusAnimated = true;
  };

  calcBlock.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches("input.calc-item")) {
      target.value = target.value.replace(/\D/, "");
      needTotal = getTotal(100);

      if (statusAnimated) {
        clearTimeout(timeoutCalc);
        startAnimate();
      }
      if (!statusAnimated) {
        startAnimate();
      }
    }
  });

  calcType.addEventListener("change", () => {
    needTotal = getTotal(100);
    if (statusAnimated) {
      clearTimeout(timeoutCalc);
      startAnimate();
    }
    if (!statusAnimated) {
      startAnimate();
    }
  });
};

export default calcEvent;