// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const logoutButton = document.getElementById("logoutButton");
const token = localStorage.getItem("token");
const data = null;
let user_id;
// This is a promise that will be resolved when the token is decoded
const decodedToken = new Promise((resolve, reject) => {
  const decodeCallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log(responseData.message);
    if (responseStatus == 200) {
      user_id = responseData.user_id;
      resolve(user_id);
    } else {
      window.alert("Your session has expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "login.html";
      loginButton.classList.remove("d-none");
      registerButton.classList.remove("d-none");
      logoutButton.classList.add("d-none");
      reject("Error decoding token");
    }
  };
  axiosMethod(
    currentUrl + "/api/users/verifyToken",
    decodeCallback,
    "GET",
    data,
    token
  );
});
