'use strict'

async function getChuckfromApi() {
    console.log('Keksin vitsiä')
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');

      const data = await response.json();
      console.log(data);

      const jokeElement = document.querySelector('.show_joke');
      if (jokeElement !== null) {
        jokeElement.innerHTML = data.value;
      } else {
        console.error('vitsi error');
      }
      
    } catch (error) {
      console.error('Virhe:', error);
    }
  }

// getChuckfromApi();

document.addEventListener('DOMContentLoaded', () => {
    const chuckButton = document.querySelector('.chuck');
    if (chuckButton !== null) {
        chuckButton.addEventListener('click', getChuckfromApi);
    } else {
        console.error('nappi error')
    }
})

// document.querySelector('.chuck').addEventListener('click', getChuckfromApi);