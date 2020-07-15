const mouseEvent = function () {
  const changeAttr = (event) => {
    const target = event.target;

    if (target.hasAttribute("data-img")) {
      const saveAttr = target.getAttribute("src");
      target.setAttribute("src", target.getAttribute("data-img"));
      target.setAttribute("data-img", saveAttr);
    }
  };

  document.addEventListener("mouseover", changeAttr);

  document.addEventListener("mouseout", changeAttr);
};

export default mouseEvent;