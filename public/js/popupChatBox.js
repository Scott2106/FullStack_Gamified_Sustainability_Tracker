// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function closeForm2() {
  document.getElementById("editForm").style.display = "none";
  document.getElementById("editMessageForm").reset();
}

document.addEventListener("DOMContentLoaded", function () {
  const newMessageForm = document.getElementById("newMessageForm");
  newMessageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const textarea = document.querySelector('textarea[name="msg"]');
    const message = textarea.value;
    const postMessagePromise = new Promise((resolve, reject) => {
      const callback = (responseStatus, responseData) => {
        if (responseStatus === 201) {
          window.location.reload();
        } else {
          window.alert(responseData);
        }
      };
      const data = {
        message_text: message,
        user_id: user_id,
      };
      // Call the axiosMethod function to send a POST request to the server to add a new message
      axiosMethod(currentUrl + `/api/message`, callback, "POST", data);
    });
  });
  const editMessageForm = document.getElementById("editMessageForm");
  editMessageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const textarea = document.querySelector('textarea[name="editMsg"]');
    const message = textarea.value;
    if(message == oldMessage){
      window.alert("You have not made any changes!");
      return;
    }
    const putMessagePromise = new Promise((resolve, reject) => {
      const callback = (responseStatus, responseData) => {
        if (responseStatus === 200) {
          window.location.reload();
        } else {
          window.alert(responseData);
        }
      };
      const data = {
        message_text: message,
      };
      // Call the axiosMethod function to send a PUT request to the server to update the message
      axiosMethod(currentUrl + `/api/message/${message_id}`, callback, "PUT", data);
    });
  });

});
