'use strict';
console.log('the script starts');

function synchronousFunction() {
  let number = 1;
  for(let i = 1; i < 10000; i++){
    number += i;
    console.log('synchronousFunction running');
  }
  console.log('regular function complete', number);
}

function synchronousFunction2() {
    console.log('Huh vihdoin täällä!!!!');
}



// suoritetaan async muodossa
async function asynchronousFunction() {

    console.log('Async haku alkaa');

    // fetch(URL, {options})

    // haetaan ilman async await rakennetta perinteisesti käyttäen .then notaatiota.

    fetch('https://reqres.in/api/users?page=2')
    .then((response) => {

        // tee jotain vastaukselle
        console.log('Vastaus');
        // console.log(response);

        // response.ok

        if (!response.ok) {
        throw new Error('Verkkovastaus ei ollut kunnossa');
        }
        return response.json();
    })
    .then((data) => {
        // tee jotain vastauksen ja tiedon kanssa
        console.log(data);
    })
    .catch((error) => {
        console.error('Fetch-operaatiossa ilmeni ongelma:', error);
    });
    }

    async function asynchronousFunction2() {
        try {
          const response = await fetch('https://reqres.in/api/users?page=2');

          // parsee eli muuttaa vastauksen json muotoon
          // tämäkin kestää, siksi async
          const data = await response.json();
          console.log(data);
          console.log(data.data);
          console.log(data.total_pages);
          console.log(data.data[0].email)
        } catch (error) {
          console.error('Virhe:', error);
        }
      }

      async function getfromownapi() {
        console.log('haen omaa dataa')
        try {
          const response = await fetch('http://127.0.0.1:3000/items');

          // parsee eli muuttaa vastauksen json muotoon
          // tämäkin kestää, siksi async
          const data = await response.json();
          console.log(data);
          
        } catch (error) {
          console.error('Virhe:', error);
        }
      }

      async function posttoownapi() {
        console.log('postaan omaa dataa')

    // fetch(URL, {options})

        try {
          const response = await fetch('http://127.0.0.1:3000/items', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              name: 'Yee uusi nimi',
            }),
          });

          // TODOO virheentarkastus

          // parsee eli muuttaa vastauksen json muotoon
          // tämäkin kestää, siksi async
          const data = await response.json();
          console.log(data);
          
        } catch (error) {
          console.error('Virhe:', error);
        }
      }
//synchronousFunction();

//synchronousFunction2();

// asynchronousFunction();
// asynchronousFunction2();


// async function main() {
//   try {
//   await getfromownapi();
//   await posttoownapi();
//   await getfromownapi();
//   } catch (error) {
//     console.log('virhe');
//   }
// }
// main();