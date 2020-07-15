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

timer("30 July 2020");
addModalEventListener();
tabs();
slider(1500);
mouseEvent();
calcEvent();

sendForm("form1");
sendForm("form2");
sendForm("form3");
