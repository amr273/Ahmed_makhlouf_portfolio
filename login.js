const AUTH_KEY = 'portfolio_dashboard_auth';
const DEFAULT_PASSWORD = 'admin123';

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const passwordInput = document.getElementById('password');

if (localStorage.getItem(AUTH_KEY) === 'true') {
  window.location.href = 'dashboard.html';
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const password = passwordInput.value.trim();

  if (password === DEFAULT_PASSWORD) {
    localStorage.setItem(AUTH_KEY, 'true');
    window.location.href = 'dashboard.html';
    return;
  }

  loginMessage.textContent = 'Incorrect password. Please try again.';
  loginMessage.classList.add('error');
  passwordInput.value = '';
  passwordInput.focus();
});
