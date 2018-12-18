import _ from 'lodash';
import printMe from './print.js';
import './less/style.css';
import Icon from './img/app.png';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  btn.innerHTML = 'Click me and check the console!';

  btn.onclick = printMe;
  element.appendChild(btn);

  var myIcon = new Image();
  myIcon.src = Icon;
  console.log(98309);
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());