const sendForm = (id) => {
  const errorMessage = "Что то пошло не так...",
    loadMessage = "Загрузка",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";
  let animateLoad;

  const form = document.getElementById(id);

  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 2rem";

  const postData = (body) => {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    function getArrayElements(elements) {
      let arr = [];
      for (let i = 0; i < elements.length; i++) {
        arr.push(elements[i]);
      }
      return arr;
    }

    const elementsForm = getArrayElements(form.elements).filter((item) => {
      return item.tagName.toLowerCase() !== "button" && item.type !== "button";
    });

    let checker = true;
    elementsForm.forEach((el) => {
      if (el.classList.contains("error")) {
        checker = false;
      }
    });

    if (checker) {
      console.log(123);
      form.appendChild(statusMessage);
      let countPoints = 0;
      animateLoad = setInterval(() => {
        let points = "";
        for (let i = 0; i < countPoints; i++) {
          points += ".";
        }
        statusMessage.textContent = loadMessage + points;
        countPoints++;
        if (countPoints > 3) {
          countPoints = 0;
        }
      }, 400);

      const formData = new FormData(form);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then((response) => {
          clearInterval(animateLoad);
          if (response.status !== 200) {
            throw new Error("Ошибка в отправки fetch");
          }
          statusMessage.textContent = successMessage;
          const elements = form.elements;
          for (let i = 0; i < elements.length; i++) {
            elements[i].value = "";
          }
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    }
  });
};

export default sendForm;
