// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
decodedToken
  .then((user_id) => {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const param_user_id = urlParams.get("user_id");

    if (param_user_id != user_id) {
      window.alert("Invalid User!");
      window.location.href = "singleUserDetails.html";
      return;
    }
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const logoutButton = document.getElementById("logoutButton");

    const deleteUserCallback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      const deleteMessage = document.getElementById("deleteMessage");
      if (responseStatus == 204) {
        deleteMessage.innerText =
          "Account Deleted Successfully. Thanks for using our application. Have a nice day!";
        localStorage.removeItem("token");
        loginButton.classList.remove("d-none");
        registerButton.classList.remove("d-none");
        logoutButton.classList.add("d-none");
      } else {
        deleteMessage.innerText =
          "Sorry, we ran into error in deleting your account. Please try again later.";
      }
    };
    //axiosMethod to delete user
    axiosMethod(
      currentUrl + `/api/users/${user_id}`,
      deleteUserCallback,
      "DELETE"
    );
  })
  .catch((err) => {
    console.log(err);
  });
