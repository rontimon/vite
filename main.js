import './style.css'
import './minunstyle.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { showjoke } from './joke.js';
import { showcats } from './cats.js';
import { showDiaryEntries } from './diaryentries.js';
// import { showcards } from './cards.js';

document.querySelector('#app').innerHTML = 'Moi täällä ollaan!'

// heataan nappula ja tarjotaan showjoke funktiolle.
let element = document.querySelector('.chuck');
console.log(element);

showjoke(element);

showjoke(document.querySelector('.toinen'));

showcats(document.querySelector('.pics'));

const diaryButton = document.querySelector('.diary'); 
diaryButton.addEventListener('click', showDiaryEntries);

// showjoke(document.querySelector('.pics'));

// setupCounter(document.querySelector('button'));
// setupCounter(document.querySelector('button2'));
// setupCounter(document.querySelector('button3'));

// `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite! Täällä ollaan!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'));
