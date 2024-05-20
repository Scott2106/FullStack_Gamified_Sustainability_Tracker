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
    const updateProfileForm = document.getElementById("updateProfileForm");

    // Add an event listener to the form's submit event
    updateProfileForm.addEventListener("submit", async function (event) {
      const deleteUserCallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 200) {
          window.location.href = "singleUserDetails.html";
        } else {
          window.alert(
            "Sorry, we ran into error in updating your profile picture. Please try again later."
          );
        }
      };
      const data = {
        image_link: document.getElementById("image_link").value,
      };

      axiosMethod(
        currentUrl + `/api/users/updateProfile/${user_id}`,
        deleteUserCallback,
        "PUT",
        data
      );
      event.preventDefault();
    });
  })
  .catch((err) => {
    console.log(err);
  });
