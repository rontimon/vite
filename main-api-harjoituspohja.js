import './styles.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { fetchData } from './fetch.js';

document.querySelector('#app').innerHTML = 'Moi tässä oman APIn harjoituksia';
const bt1 = document.querySelector('.get_users');
bt1.addEventListener('click', getAllUsers);

async function getAllUsers() {
    console.log('toimii');

    try {
        const response = await fetch('http://127.0.0.1:3000/api/users');
        console.log(response);

        const data = await response.json();
        console.log(data);

        data.forEach(element => {
            console.log(element.username);
        });

        // tönne tiedot
       const tbody = document.querySelector('.tbody');
        tbody.innerHTML = '';
        

        data.forEach(element => {
            console.log(element.username);

            // Create the <tr> element
            const tr = document.createElement('tr');

            // Create the first <td> element and set its content
            const td1 = document.createElement('td');
            td1.textContent = element.username;

            // Create the second <td> element and set its content
            const td2 = document.createElement('td');
            td2.textContent = element.user_level;

            // Create the third <td> element and the first button inside it
            const td3 = document.createElement('td');
            const button1 = document.createElement('button');
            button1.setAttribute('class', 'check');
            button1.setAttribute('data-id', '1');
            button1.textContent = 'Info';
            td3.appendChild(button1);

            // Create the fourth <td> element and the second button inside it
            const td4 = document.createElement('td');
            const button2 = document.createElement('button');
            button2.setAttribute('class', 'del');
            button2.setAttribute('data-id', '1');
            button2.textContent = 'Delete';
            td4.appendChild(button2);

            // Create the fifth <td> element and set its content
            const td5 = document.createElement('td');
            td5.textContent = element.user_id;

            // Append all <td> elements to the <tr> element
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            // Finally, append the <tr> element to the desired <table> or <tbody> element in your document
            // For example, assuming you have a <tbody> element with an id="myTableBody"
            tbody.appendChild(tr);

        });

    } catch (error) {
        console.log(error);
    }
}