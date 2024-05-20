// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
decodedToken
  .then((user_id) => {
    const userOptions = document.getElementById("userOptions");
    userOptions.addEventListener("change", function () {
      const selectedOption = userOptions.value;

      if (selectedOption === "1") {
        window.location.href = "singleUserDetails.html";
      } else if (selectedOption === "2") {
        window.location.href = "allUsers.html";
      }
    });
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      let userDetailFromAxios = responseData;

      const singleUserDetails = document.getElementById("ownUserDetails");
      singleUserDetails.classList.remove("d-none");
      if (userDetailFromAxios.image_link == null) {
        userDetailFromAxios.image_link =
          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
      }

      let completedTasks;
      if (userDetailFromAxios.completed_tasks.length > 0) {
        completedTasks = document.createElement("div");
        userDetailFromAxios.completed_tasks.forEach((task) => {
          completedTasks.innerHTML += `
            <p class="text-primary mx-4 small my-0">${task.title}<br>(${task.completion_date})</p>
            `;
        });
      } else {
        completedTasks = document.createElement("div");
        completedTasks.innerHTML = `
          <p class="text-primary  mx-4 small my-1">No tasks completed yet!</p>
          `;
      }

      let ownedItems;
      if (userDetailFromAxios.owned_items.length > 0) {
        ownedItems = document.createElement("div");
        userDetailFromAxios.owned_items.forEach((item) => {
          ownedItems.innerHTML += `
            <p class="text-primary mx-4 small my-0">${item}</p>
            `;
        });
      } else {
        ownedItems = document.createElement("div");
        ownedItems.innerHTML = `
          <p class="text-primary  mx-4 small my-1">No items possessed yet!</p>
          `;
      }

      singleUserDetails.innerHTML = `
        <div class="card shadow w-50 border-0 bg-yellow text-white h-100 rounded-4">
          <div class="row">
            <div class="col">
                <div class="col my-4 mx-3 d-flex justify-content-center align-items-center"><img src="${userDetailFromAxios.image_link}" class="img-fluid rounded-circle"
                    style="width: 200px; height:200px; object-fit: cover;" alt="">
                </div>
                <div class="d-flex mb-4 justify-content-center align-items-center"><button type="button" data-bs-toggle="modal" data-bs-target="#myModal" class="btn btn-danger">Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="updateButton" class="btn btn-info">Update</button></div>
            </div>
            <div class="col my-auto">
              <div class="row my-4">
                <p class="text-center text-dark h5 mb-0">${userDetailFromAxios.username} (id- ${user_id})</p>
                <div class="text-center text-info small">${userDetailFromAxios.email}</div>
              </div>
              <div class="row mb-4" style="margin-left: 63px;">
                <p class="text-dark h6 ">ranking - #${userDetailFromAxios.ranking}</p>
                <details>
                  <summary class="text-dark h6">completed_task - ${userDetailFromAxios.no_completed_tasks}</summary>
                  ${completedTasks.innerHTML}
                </details>
                <details>
                  <summary class="text-dark h6">owned items - ${userDetailFromAxios.no_owned_items}</summary>
                  ${ownedItems.innerHTML}
                </details>
                <p class="text-dark h6 ">total galleons - ${userDetailFromAxios.total_galleons}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModal" aria-hidden="true"
          data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark">
              <div class="modal-header">
                <h1 class="modal-title fs-5 text-light">Confirm?</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-light lead">Are you sure you want to delete this user? By pressing the confirm button, it will completely delete your account and all the related data.
              </div>
              <div class="modal-footer">
                <button id="deleteButton" type="button" class="btn btn-secondary"><i
                    class="bi bi-check"></i>Confirm</button>
              </div>
            </div>
          </div>
        </div>
        `;
    };
    axiosMethod(currentUrl + `/api/users/${user_id}`, callback);
    const singleUserDetails = document.getElementById("ownUserDetails");
    singleUserDetails.addEventListener("click", async function (event) {
      if (event.target.id === "deleteButton") {
        window.location.href = `deleteUser.html?user_id=${user_id}`;
        console.log("Delete button clicked");
      } else if (event.target.id === "updateButton") {
        window.location.href = `updateSingleUser.html?user_id=${user_id}`;
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
