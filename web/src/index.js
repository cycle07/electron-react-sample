import _ from 'lodash';
// import printMe from './print.js';
import './less/style.css';
import Icon from './img/app.png';

function component() {
  console.log(__DEV__);
  console.log(__PRE__);

  const element = document.createElement('div');
  const btn = document.createElement('button');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  btn.innerHTML = 'Click me and check the console!';

  // 啥了吧，SystemJS可以下岗了...
  btn.onclick = e =>
    import('./print').then(module => {
      const print = module.default;
      print();
    });
  element.appendChild(btn);

  const myIcon = new Image();
  myIcon.src = Icon;
  console.log(1992);
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
