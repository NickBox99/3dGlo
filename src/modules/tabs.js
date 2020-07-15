const tabs = function () {
  const tabHeader = document.querySelector(".service-header"),
    tab = document.querySelectorAll(".service-header-tab"),
    tabContent = document.querySelectorAll(".service-tab");

  const toggleTabContext = function (index) {
    for (let i = 0; i < tab.length; i++) {
      if (i === index) {
        tab[i].classList.add("active");
        tabContent[i].classList.remove("d-none");
      } else {
        tab[i].classList.remove("active");
        tabContent[i].classList.add("d-none");
      }
    }
  };

  tabHeader.addEventListener("click", (event) => {
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

export default tabs;