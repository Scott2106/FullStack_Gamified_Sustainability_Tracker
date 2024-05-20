// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
const userOptions = document.getElementById("userOptions");

userOptions.addEventListener("change", function() {
  const selectedOption = userOptions.value;
  
  if (selectedOption === "1") {
    window.location.href = "singleUserDetails.html"; 
  } else if(selectedOption === "2") {
    return;
  }
});

const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const userList = document.getElementById("userList");
  userList.classList.remove("d-none")
  responseData.details.forEach((user) => {
    if (user.image_link == null){
      user.image_link = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
    }
    responseData.ranking.forEach((ranking) => {
      if (ranking.user_id == user.user_id){
        const userItem = document.createElement("div");
        userItem.innerHTML = `
        <div class="col mb-2">
          <div class="card shadow border-0 bg-yellow text-white h-100 rounded-4">
            <div class="d-flex justify-content-center my-4">
              <img src="${user.image_link}" class="img-fluid rounded-circle" style="width: 100px; height:100px; object-fit: cover;"
                alt="">
            </div>
            <div>
              <p class="text-center text-dark h5 mb-0">${user.username} (id- ${user.user_id})</p>
              <div class="text-center text-info small">${user.email}</div>
              <div class="row my-3">
                <div class="col-4 d-flex flex-column align-items-center"><i class="fa-solid fa-ranking-star fa-2x text-dark"></i>#${ranking.ranking}</div>
                <div class="col-4 d-flex flex-column align-items-center"><i class="fa-solid fa-bars-progress fa-2x text-dark"></i>${user.tasks_done}</div>
                <div class="col-4 d-flex flex-column align-items-center"><i class="fa-solid fa-coins fa-2x text-dark"></i>${user.total_galleons}</div>
              </div>
            </div>
          </div>
        </div>`;
        userList.appendChild(userItem);
      }
    });


  });
};

axiosMethod(currentUrl + "/api/users/allDetails", callback);
