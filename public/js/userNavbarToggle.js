// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");
  const dropdown_divider=document.getElementById("divider");
  // Check if token exists in local storage
  const token = localStorage.getItem("token");
  if (token) {
    // Token exists, show profile button and hide login and register buttons
    loginButton.classList.add("d-none");
    registerButton.classList.add("d-none");
    logoutButton.classList.remove("d-none");
    dropdown_divider.remove();
  } else {
    // Token does not exist, show login and register buttons and hide profile and logout buttons
    loginButton.classList.remove("d-none");
    registerButton.classList.remove("d-none");
    logoutButton.classList.add("d-none");
  }

  logoutButton.addEventListener("click", function () {
    // Remove the token from local storage and redirect to index.html
    localStorage.removeItem("token");
    window.location.href = "index.html";
    window.alert("You have successfully logged out!");
  });
});
