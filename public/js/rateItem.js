// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
document.addEventListener("DOMContentLoaded", function () {
  //read all items
  const readallItems = new Promise((resolve, reject) => {
    const readallItemsCallback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus === 200) {
        const itemList = document.getElementById("allItemNames");
        itemList.innerHTML = "";
        responseData.forEach((item) => {
          if (!item.item_id) {
            return;
          }
          const newItem = document.createElement("option");
          newItem.value = item.item_id;
          newItem.innerText = item.item_name;
          itemList.appendChild(newItem);
        });
      }
    };
    axiosMethod(currentUrl + "/api/items", readallItemsCallback);
  });

  const starRatingForm = document.getElementById("starRatingForm");
  starRatingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const item_id = document.getElementById("allItemNames").value;
    const rating = document.getElementById("ratingFromUser").value;
    const feedback = document.getElementById(
      "floatingTextareaForFeedback"
    ).value;
    // window.alert("item_id"+item_id+"Rating: " + rating + " Feedback: " + feedback);
    // window.alert(user_id);
    const data = {
      item_id,
      rating,
      feedback,
      user_id,
    };
    const addRating = new Promise((resolve, reject) => {
      const addRatingCallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        const ratingReply = document.getElementById("ratingReply");
        if (responseStatus === 201) {
          ratingReply.innerText = responseData.message;
          ratingReply.style.color = "green";
        } else {
          ratingReply.innerText = responseData.message;
          ratingReply.style.color = "red";
        }
      };
      // Call the axiosMethod function to send a POST request to the server to add a new rating
      axiosMethod(currentUrl + "/api/rating", addRatingCallback, "POST", data);
    });
    starRatingForm.reset();
  });
});
