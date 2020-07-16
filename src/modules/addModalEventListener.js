function addModalEventListener() {
  const toogleMenu = function () {
    const modalMenu = document.querySelector("menu");

    const handlerMenu = function () {
      if (
        !modalMenu.style.transform ||
        modalMenu.style.transform === `translate(-100%)`
      ) {
        let i = -100;

        const animated = function () {
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

    document.addEventListener("click", (event) => {
      const target = event.target;

      if (
        target.closest(".menu") ||
        target.closest(".close-btn") ||
        (modalMenu.style.transform === `translate(0%)` &&
          (target !== modalMenu &&
          !target.closest("li")))
      ) {
        handlerMenu();
      }

      const targetLink = target.closest("a");
      if (targetLink) {
        event.preventDefault();
        const hrefAtr = targetLink.getAttribute("href");

        if (hrefAtr !== "#close" && hrefAtr !== "#") {
          handlerMenu();
          const topSlide = document.querySelector(hrefAtr).offsetTop;
          let thisTop = window.scrollY;

          const animate = function () {
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
      }
    });
  };

  const tooglePopup = function () {
    const parentPopup = document.querySelector("#service-block"),
      modalPopup = document.querySelector(".popup");

    parentPopup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup-btn")) {
        modalPopup.style.display = "block";

        if (document.documentElement.clientWidth >= 768) {
          modalPopup.style.opacity = 0;
          let opacity = 0;

          const animated = function () {
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

    modalPopup.addEventListener("click", (event) => {
      const target = event.target;

      if (
        target.classList.contains("popup-close") ||
        !target.closest(".popup-content")
      ) {
        modalPopup.style.display = "none";
      }
    });
  };

  toogleMenu();
  tooglePopup();
}

export default addModalEventListener;
