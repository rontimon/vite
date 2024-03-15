import './style.css';
import { fetchData } from './fetch.js';

document.addEventListener('DOMContentLoaded', () => {
  attachEventListeners();
  showUserName();
  getUsers();
});

function attachEventListeners() {
  document.querySelector('.get_users').addEventListener('click', getUsers);

  document.querySelector('.tbody').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('check')) {
      const userId = target.getAttribute('data-id');
      openEditModal(userId);
    } else if (target.classList.contains('del')) {
      const userId = target.getAttribute('data-id');
      deleteUser(userId);
    }
  });

  document.getElementById('editUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    updateUserData();
  });

  document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('editUserModal').close();
  });
}

async function getUsers() {
  const url = 'http://localhost:3000/api/users';
  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  const data = await fetchData(url, options);
  createTable(data);
}

function createTable(data) {
  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';
  data.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.username}</td>
      <td>${user.user_level}</td>
      <td><button class="check" data-id="${user.user_id}">Info</button></td>
      <td><button class="del" data-id="${user.user_id}">Delete</button></td>
      <td>${user.user_id}</td>
    `;
    tbody.appendChild(tr);
  });
}

async function openEditModal(userId) {
  const url = `http://localhost:3000/api/users/${userId}`;
  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  const user = await fetchData(url, options);
  const modal = document.getElementById('editUserModal');
  document.getElementById('userId').value = user.user_id;
  document.getElementById('username').value = user.username;
  document.getElementById('userlevel').value = user.user_level;
  modal.showModal();
}

async function updateUserData() {
  const userId = document.getElementById('userId').value;
  const updatedUser = {
    username: document.getElementById('username').value,
    user_level: document.getElementById('userlevel').value,
  };

  const url = `http://localhost:3000/api/users/${userId}`;
  const token = localStorage.getItem('token');
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  };

  await fetchData(url, options);
  document.getElementById('editUserModal').close();
  getUsers();
}

async function deleteUser(userId) {
  const confirmed = confirm('Are you sure you want to delete this user?');
  if (!confirmed) {
    return;
  }

  const url = `http://localhost:3000/api/users/${userId}`;
  const token = localStorage.getItem('token');
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  await fetchData(url, options);
  getUsers();
}

async function showUserName() {
  // Implement if needed
}
