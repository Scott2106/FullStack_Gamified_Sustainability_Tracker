// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
document.addEventListener("DOMContentLoaded", function () {
  const warningModalHeader = document.getElementById("warningModalHeader");
  const warningModalText = document.getElementById("warningModalText");
  const warningModalContent = document.getElementById("modal-content-notice");
  const modal_button = document.getElementById("modal-button");
  const loginForm = document.getElementById("loginForm");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 201) {
      // Check if login was successful
      if (responseData.token) {
        // Store the token in local storage
        localStorage.setItem("token", responseData.token);
        // Redirect or perform further actions for logged-in user
        warningModalContent.classList.add("bg-success");
        warningModalHeader.innerText = "Success";
        warningModalText.innerText = "You have successfully registered!";
        modal_button.innerHTML = '<i class="bi bi-house-heart"></i> HOME';
        modal_button.addEventListener("click", function () {
          window.location.href = "index.html";
        });
      }
    } else {
      warningModalHeader.innerText = "Error";
      warningModalText.innerText = responseData.message;
    }
  };
  // Add event listener to the login form
  loginForm.addEventListener("submit", function (event) {
    console.log("loginForm.addEventListener");
    event.preventDefault();

    const username = document.getElementById("nameInput").value;
    const password = document.getElementById("passwordInput").value;

    const data = {
      username: username,
      password: password,
    };
    // Perform login request
    axiosMethod(currentUrl + "/api/users/login", callback, "POST", data);

    // Reset the form fields
    loginForm.reset();
  });
});
