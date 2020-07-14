document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const select = document.getElementById("cars"),
    output = document.getElementById("output");

  const getCar = () => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", "./cars.json");
      request.addEventListener("readystatechange", () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const data = JSON.parse(request.responseText);
          data.cars.forEach((item) => {
            if (item.brand === select.value) {
              const { brand, model, price } = item;
              let result = `Тачка ${brand} ${model} <br>
                    Цена: ${price}$`;
              console.log("result: ", result);
              resolve(result);
            }
          });
          reject("Произошла ошибка");
        }
      });
      request.send();
    });
  };

  select.addEventListener("change", () => {
    const test = getCar();
    test.then(
      (resolve) => {
        output.innerHTML = resolve;
      },
      (reject) => {
        output.innerHTML = reject;
      }
    );
  });
});
