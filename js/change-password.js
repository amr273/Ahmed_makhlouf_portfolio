const AUTH_KEY = "portfolio_dashboard_auth";
const PASSWORD_KEY = "portfolio_dashboard_password";
const DEFAULT_PASSWORD = "admin123";

const changePasswordForm = document.getElementById("changePasswordForm");
const currentPasswordInput = document.getElementById("currentPassword");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const changePasswordMessage = document.getElementById("changePasswordMessage");

function getStoredPassword() {
  const savedPassword = localStorage.getItem(PASSWORD_KEY);

  if (!savedPassword) {
    localStorage.setItem(PASSWORD_KEY, DEFAULT_PASSWORD);
    return DEFAULT_PASSWORD;
  }

  return savedPassword;
}

if (localStorage.getItem(AUTH_KEY) !== "true") {
  window.location.href = "login.html";
}

function showMessage(message, type = "success") {
  changePasswordMessage.textContent = message;
  changePasswordMessage.classList.remove("error", "success");
  changePasswordMessage.classList.add(type);
}

changePasswordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const currentPassword = currentPasswordInput.value.trim();
  const newPassword = newPasswordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!currentPassword || !newPassword || !confirmPassword) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (currentPassword !== getStoredPassword()) {
    showMessage("Current password is incorrect.", "error");
    currentPasswordInput.value = "";
    currentPasswordInput.focus();
    return;
  }

  if (newPassword.length < 6) {
    showMessage("New password must be at least 6 characters long.", "error");
    newPasswordInput.focus();
    return;
  }

  if (newPassword !== confirmPassword) {
    showMessage("New password and confirmation do not match.", "error");
    confirmPasswordInput.value = "";
    confirmPasswordInput.focus();
    return;
  }

  localStorage.setItem(PASSWORD_KEY, newPassword);
  changePasswordForm.reset();
  showMessage("Password changed successfully! Redirecting to dashboard...");

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1200);
});
