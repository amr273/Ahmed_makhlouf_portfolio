const AUTH_KEY = 'portfolio_dashboard_auth';
const PASSWORD_KEY = 'portfolio_dashboard_password';
const DEFAULT_PASSWORD = 'admin123';

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const passwordInput = document.getElementById('password');

function getStoredPassword() {
  const savedPassword = localStorage.getItem(PASSWORD_KEY);

  if (!savedPassword) {
    localStorage.setItem(PASSWORD_KEY, DEFAULT_PASSWORD);
    return DEFAULT_PASSWORD;
  }

  return savedPassword;
}

if (localStorage.getItem(AUTH_KEY) === 'true') {
  window.location.href = 'dashboard.html';
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const password = passwordInput.value.trim();

  if (password === getStoredPassword()) {
    localStorage.setItem(AUTH_KEY, 'true');
    window.location.href = 'dashboard.html';
    return;
  }

  loginMessage.textContent = 'Incorrect password. Please try again.';
  loginMessage.classList.add('error');
  passwordInput.value = '';
  passwordInput.focus();
});
