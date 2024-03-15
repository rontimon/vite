import "./styles1.css";
import { fetchData } from "./fetch.js";

const bt1 = document.querySelector(".get_entry");
bt1.addEventListener("click", async () => {
  console.log("klikki toimii");

  // # Get entries by id
  // GET http://localhost:3000/api/entries/:id
  const url = "http://localhost:3000/api/entries/1";

  fetchData(url).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);
  });
});

// haetaan kaikki käyttäjät ja luodaan niistä taulukko
// 1.hae ensin nappula ja kutsu funktiota
const allButton = document.querySelector(".get_users");
allButton.addEventListener("click", getUsers);

async function getUsers() {
  console.log("Haetaan kaikki käyttäjät");
  const url = "http://localhost:3000/api/users";
  let token = localStorage.getItem('token');
  console.log("Tämä on haettu LocalStoragesta", token);

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer: " + token,
    },
  };
  fetchData(url, options).then((data) => {
    createTable(data);
  });
}

function createTable(data) {
  console.log(data);

  // etsitään tbody elementti
  const tbody = document.querySelector(".tbody");
  tbody.innerHTML ='';

  // luodaan loopissa jokaiselle tietoriville oikeat elementit
  // elementtien sisään pistetään oikeat tiedot
  data.forEach((element) => {
    console.log(element.user_id, element.username, element.user_level);

    // Luodaan jokaiselle riville ensin TR elementti alkuun
    const tr = document.createElement("tr");

    // luodaan soluja mihin tiedot
    const td1 = document.createElement("td");
    td1.innerText = element.username;

    tr.appendChild(td1);
    tbody.appendChild(tr);

    const td2 = document.createElement("td");
    td2.innerText = element.user_level;

    const td3 = document.createElement("td");
    const button1 = document.createElement("button");
    button1.className = "check";
    button1.setAttribute("data-id", element.user_id);
    button1.innerText = "Info";
    td3.appendChild(button1);

    button1.addEventListener("click", getUser);

    const td4 = document.createElement("td");
    const button2 = document.createElement("button");
    button2.className = "del";
    button2.setAttribute("data-id", element.user_id);
    button2.innerText = "Delete";
    td4.appendChild(button2);

    button2.addEventListener("click", deleteUser);

    const td5 = document.createElement("td");
    td5.innerText = element.user_id;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);
  });
}

function getUser() {
  console.log("Haet tietoa");
}

async function deleteUser(evt) {
  console.log("deletoit tietoa");
  console.log(evt);

  // tapa 1, haetaan arvo tutkimalla eventtiä
  const id = evt.target.attributes["data-id"].value;
  console.log(id);

  // tapa 2 haetaan "viereinen elementti"
  const id2 = evt.target.parentElement.nextElementSibling.textContent;
  console.log("toinen tapa", id2);

  const url = `http://localhost:3000/api/users/${id}`;
  let token = localStorage.getItem('token');

  const options = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer: " + token,
    },
  };
  const answer = confirm(
    `Oletko varma että haluat poistaa käyttäjän ID: ${id}`
  );
  if (answer) {
    fetchData(url, options).then((data) => {
      console.log(data);
      getUsers();
    });
  }
}

async function showUserName() {
  // 1. hae käyttäjän tiedot localstoragesta
  // let name = localStorage.getItem('name');
  // document.getElementById('name').innerHTML = name;

  // 2. hae api/auth/me endpointin kautta
  const url = "http://localhost:3000/api/auth/me";
  const muntokeni = localStorage.getItem("token");
  console.log("Tämä on haettu LocalStoragesta", muntokeni);

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer: " + muntokeni,
    },
  };
  fetchData(url, options).then((data) => {
    document.getElementById("name").innerHTML = data.user.username;
  });
}

showUserName();

// 1. testataan ensin YKSI endpoint joka ei vaadi tokenia
// 2. uudelleen strukturoidaan koodi jotta se on modulaarisempi

// tämä toimi ennen autentikaatiota, nyt tarvitsee tokenin, siistitään pian!
// sivuille on nyt myös lisätty navigaatio html sivuun, sekä siihen sopiva CSS koodi, hae siis uusi HTML ja UUSI CSS ennen kun aloitat

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('user-form');
  const updateUserButton = document.getElementById('update-user');
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => response.json())
  .then(user => {
    form.username.value = user.username || '';
    form.email.value = user.email || '';
  })
  .catch(error => {
    console.error('Error fetching user data:', error);
  });

  updateUserButton.addEventListener('click', function() {
    const userData = {
      username: form.username.value,
      password: form.password.value,
      email: form.email.value,
      user_id: userId
    };
    console.log('userdata',  userData);

    fetch('http://localhost:3000/api/users/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('User updated:', data);
      alert('User updated successfully!');
    })
    .catch(error => {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    });
  });
});