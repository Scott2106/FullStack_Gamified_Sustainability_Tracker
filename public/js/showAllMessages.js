// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
let message_id;
let oldMessage;
function showDropdown(event) {
  const messageItem = event.currentTarget;
  const messageButton = messageItem.querySelector(".messageButton");
  messageButton.style.display = "block";
  messageButton.style.width = `50px`;
  messageButton.style.zIndex = 1000;
  messageButton.style.position = "absolute";
  messageButton.style.right = 0;
}
function hideDropdown(event) {
  const messageItem = event.currentTarget;
  const messageButton = messageItem.querySelector(".messageButton");
  messageButton.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus === 200 && responseData.length > 0) {
      const messageList = document.getElementById("messages");
      responseData.forEach((messages) => {
        if (messages.image_link == null) {
          messages.image_link =
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
        }
        const msg_date = messages.created_at.split(" ")[0];
        let msg_time = messages.created_at.split(" ")[1];
        msg_time=(msg_time.split(":")).slice(0, 2);
        if(msg_time[0]>12){
          msg_time[0]=msg_time[0]-12;
          msg_time=msg_time.join(":")+" PM";
        }else{
          msg_time=msg_time.join(":")+" AM";
        }

        const monthsList = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const msg_date_in_words =
          monthsList[parseInt(msg_date.split("-")[1]) - 1] +
          " " +
          msg_date.split("-")[2] +
          " " +
          msg_date.split("-")[0];
        const messageItem = document.createElement("div");
        messageItem.style.position = "relative";
        messageItem.className = "row text-info my-4 w-50 mx-auto message-box";
        messageItem.innerHTML = `
          <div class="col-4 d-flex justify-content-end"><img src="${messages.image_link}" class="rounded-circle" style="width: 50px; height: 50px; object-fit: cover;" alt=""></div>
          <div class="col-8">
            <div class="row lead">
            <p class="m-0 p-0">${messages.username}<span class="small badge text-secondary"> ${msg_date_in_words} ${msg_time}</span></p></div>
            <div class="row small text-secondary">${messages.message_text}</div>
          </div>
        `;
        if (messages.user_id == user_id) {
          messageItem.addEventListener("mouseover", showDropdown);
          messageItem.addEventListener("mouseout", hideDropdown);
          const messageButton = document.createElement("div");
          messageButton.className = "badge text-bg-secondary messageButton";
          messageButton.style.display = "none";
          messageButton.innerHTML = `
            <i class="fa-solid fa-trash text-white deleteButton" data-message-id=${messages.id}></i>&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-pen text-white editButton" data-message-id=${messages.id}></i>
          `;
          messageItem.appendChild(messageButton);
        }
        messageList.appendChild(messageItem);
        if (messageItem.querySelector(".deleteButton")) {
          const deleteButton = messageItem.querySelector(".deleteButton");
          deleteButton.addEventListener("click", function () {
            const messageId = deleteButton.getAttribute("data-message-id");
            const deleteMessageCallback = (responseStatus, responseData) => {
              if (responseStatus === 200) {
                window.alert("Message deleted!");
                window.location.reload();
              } else {
                window.alert(
                  "Sorry there are errors in deleting the message. Try again!"
                );
              }
            };
            const deletePromise = new Promise((resolve, reject) => {
              axiosMethod(
                currentUrl + `/api/message/${messageId}`,
                deleteMessageCallback,
                "DELETE"
              );
            });
          });
        }
        if (messageItem.querySelector(".editButton")) {
          const editButton = messageItem.querySelector(".editButton");
          editButton.addEventListener("click", function () {
            message_id = editButton.getAttribute("data-message-id");
            const editForm = document.getElementById("editForm");
            oldMessage = messages.message_text;
            editForm.querySelector(
              "textarea"
            ).innerText = `${messages.message_text}`;
            editForm.style.display = "block";
          });
        }
      });
    } else {
      const messageList = document.getElementById("messages");
      const errorMsg = document.createElement("p");
      errorMsg.className = "display-1 mt-4 text-danger text-center";
      errorMsg.innerText = "404 No messages found!";
      messageList.appendChild(errorMsg);
    }
  };

  axiosMethod(currentUrl + "/api/message", callback);
});
