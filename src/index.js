import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import elementClosest from 'element-closest';
elementClosest(window);

import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";


import timer from './modules/timer';
import addModalEventListener from "./modules/addModalEventListener";
import tabs from './modules/tabs';
import slider from './modules/slider';
import mouseEvent from './modules/mouseEvent';
import calcEvent from './modules/calcEvent';
import sendForm from "./modules/sendForm";

import Validator from "./modules/validator";

timer("30 July 2020");
addModalEventListener();
tabs();
slider(1500);
mouseEvent();
calcEvent();

const valid1 = new Validator({
  selector: "#form1",

  method: {
    "form1-phone": [["notEmpty"], ["pattern", "phone"]],
    "form1-email": [["notEmpty"], ["pattern", "email"]],
    "form1-name": [["notEmpty"], ["pattern", "onlyRusText"]],
  },
});
valid1.init();
sendForm("form1");

const valid2 = new Validator({
  selector: "#form2",

  method: {
    "form2-phone": [["notEmpty"], ["pattern", "phone"]],
    "form2-email": [["notEmpty"], ["pattern", "email"]],
    "form2-name": [["notEmpty"], ["pattern", "onlyRusText"]],
    "form2-message": [["notEmpty"], ["pattern", "onlyRusText"]],
  },
});
valid2.init();
sendForm("form2");

const valid3 = new Validator({
  selector: "#form3",

  method: {
    "form3-phone": [["notEmpty"], ["pattern", "phone"]],
    "form3-email": [["notEmpty"], ["pattern", "email"]],
    "form3-name": [["notEmpty"], ["pattern", "onlyRusText"]],
  },
});
valid3.init();
sendForm("form3");
