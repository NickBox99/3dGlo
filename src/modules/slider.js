const slider = function (interval = 1500) {
  const sliders = document.querySelector("#all-progects"),
    slide = sliders.querySelectorAll(".portfolio-item"),
    dots = sliders.querySelector(".portfolio-dots");

  for (let i = 0; i < slide.length; i++) {
    const element = document.createElement("li");
    element.classList.add("dot");
    dots.append(element);
  }

  const dot = dots.querySelectorAll(".dot");
  if (dot.length > 0) {
    dot[0].classList.add("dot-active");
  }

  let currenSlide = 0;

  const nextSlide = function (slide, index, strClass) {
    slide[index].classList.add(strClass);
  };

  const prevSlide = function (slide, index, strClass) {
    slide[index].classList.remove(strClass);
  };

  const autoPlaySlide = function () {
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

  const startSlide = function () {
    intervalSliders = setInterval(autoPlaySlide, interval);
  };

  const stopSlide = function () {
    clearInterval(intervalSliders);
  };

  sliders.addEventListener("click", (event) => {
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
  sliders.addEventListener("mouseover", (event) => {
    if (event.target.matches(".portfolio-btn, .dot")) {
      stopSlide();
    }
  });

  sliders.addEventListener("mouseout", (event) => {
    if (event.target.matches(".portfolio-btn, .dot")) {
      startSlide();
    }
  });
};

export default slider;