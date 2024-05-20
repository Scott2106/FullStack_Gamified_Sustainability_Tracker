// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
document.addEventListener("DOMContentLoaded", function () {
  const warningModalHeader = document.getElementById("warningModalHeader");
  const warningModalText = document.getElementById("warningModalText");
  const warningModalContent = document.getElementById("modal-content-notice");
  const signupForm = document.getElementById("signupForm");
  const modal_button = document.getElementById("modal-button");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("nameInput").value;
    const email = document.getElementById("userEmailInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById(
      "passwordConfirmInput"
    ).value;
    // Perform signup logic
    if (password === confirmPassword) {
      // Passwords match, proceed with signup
      console.log("Signup successful");
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password:", password);

      const data = {
        username: username,
        email: email,
        password: password,
      };

      const callback = (responseStatus, responseData = null) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 201) {
          // Check if signup was successful
          if (responseData.token) {
            // Store the token in local storage
            localStorage.setItem("token", responseData.token);
            // Redirect or perform further actions for logged-in user
            warningModalContent.classList.add("bg-success");
            warningModalHeader.innerText = "Success";
            warningModalText.innerText = "You have successfully registered!";
            modal_button.innerText = "HOME";
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

      // Perform signup request
      axiosMethod(currentUrl + "/api/users/register", callback, "POST", data);

      // Reset the form fields
      signupForm.reset();
    } else {
      // Passwords do not match, handle error
      warningModalHeader.innerText = "Error";
      warningModalText.innerText = "Passwords do not match";
    }
  });
});

