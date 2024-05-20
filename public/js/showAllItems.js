// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    const overview = document.getElementById("overview");
    const itemLists = document.getElementById("itemLists");
    responseData.forEach((item) => {
      if (item.overview) {
        overview.innerHTML = item.overview;
        return;
      }
      //star ratings
      let star_rating;
      if (item.rating == 0) {
        item.rating = "No rating yet";
        star_rating = '<i class="bi bi-star text-danger"></i>';
      } else {
        const int = item.rating.toString().split(".")[0];
        const dec = item.rating.toString().split(".")[1];
        console.log(int, dec);

        star_rating = "";
        for (let i = 0; i < 5; i++) {
          if (i < int) {
            star_rating =
              star_rating + '<i class="bi bi-star-fill text-warning"></i>';
          }
        }
        if (dec > 0) {
          star_rating =
            star_rating + '<i class="bi bi-star-half text-warning"></i>';
          item.rating = item.rating.toFixed(1) + " stars";
        } else if (item.rating == 1) {
          item.rating = item.rating + " star";
        } else {
          item.rating = item.rating + " stars";
        }
      }
      if (item.image_path == null) {
        item.image_path =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoiGQIDt4p4O5AQtsRQkQcqpLgJnSWYdNejw&usqp=CAU";
      } else {
        item.image_path = "http://localhost:3000/images/" + item.image_path;
      }
      const newItem = document.createElement("div");
      newItem.className = "col mb-3";
      newItem.innerHTML = `
      <div class="card h-100 mx-auto">
        <div class="card-image">
          <img src="${item.image_path}" class="card-img-top img-fluid" style="object-fit: cover; height: 261px;" alt="...">
        </div>
        <div class="card-body">
        <div class="my-0 d-flex flex-column align-items-center">
        <h5 class="card-title">${item.item_name}</h5>
        <div>${star_rating}&nbsp;&nbsp;${item.rating}</div>
        <p class="card-title mt-1">${item.galleons} galleons</p>
        </div>
          <hr>
          <details class="mb-3">
            <summary class="text-dark h6 my-0">item description</summary>
            <span class="small text-dark">${item.description_of_the_items}</span>
          </details>
          <details class="mb-2">
            <summary class="text-dark h6 my-0">real life scenario</summary>
            <span class="small text-dark">${item.sustainable_Lifestyle_Usage}</span>
          </details>
          <button type="button" class="btn p-0 buy-button" data-item-name="${item.item_name}" data-item-id="${item.item_id}"><i class="bi bi-cart text-primary"></i> Buy</button><button type="button" class="btn trade-button" data-item-name="${item.item_name}" data-item-id="${item.item_id}"><i class="fa-regular fa-handshake text-success"></i> Trade</button>
        </div>
      </div>`;
      itemLists.appendChild(newItem);
    });
    const buyButton = document.querySelectorAll(".buy-button");
    let item_id_for_buying;
    buyButton.forEach((button) => {
      button.addEventListener("click", function () {
        let myModal = new bootstrap.Modal(
          document.getElementById("buyItemModal"),
          {
            keyboard: false,
          }
        );
        let itemName = document.getElementById("buyItemTitle"); // Update this line
        itemName.innerText = button.getAttribute("data-item-name");
        myModal.show();
        item_id_for_buying = button.getAttribute("data-item-id");
      });
    });
    const buy_modal_button = document.getElementById("buy-modal-button");
    buy_modal_button.addEventListener("click", function () {
      const buyItem = new Promise((resolve, reject) => {
        const buyItemCallback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus === 201) {
            window.alert("Item bought! You may preview it in your profile.");
            window.location.reload();
          } else {
            window.alert(responseData.message);
          }
        };
        axiosMethod(
          currentUrl + "/api/transaction/" + user_id + "/" + item_id_for_buying,
          buyItemCallback,
          "post"
        );
      });
    });

    const tradeButton = document.querySelectorAll(".trade-button");
    let item_id_for_trading;
    tradeButton.forEach((button) => {
      button.addEventListener("click", function () {
        let myModal = new bootstrap.Modal(
          document.getElementById("tradeItemModal"),
          {
            keyboard: false,
          }
        );
        item_id_for_trading = button.getAttribute("data-item-id");
        const itemName = document.getElementById("tradeItemTitle");
        itemName.innerText = button.getAttribute("data-item-name");
        const readItemsUsersHaveOwned = new Promise((resolve, reject) => {
          const readItemsUsersHaveOwnedCallback = (
            responseStatus,
            responseData
          ) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            if (responseStatus === 200) {
              const itemsUserOwnList =
                document.getElementById("itemsUserOwnList");
              itemsUserOwnList.innerHTML = "";
              responseData.forEach((item) => {
                const newItem = document.createElement("option");
                newItem.value = item.item_id;
                newItem.innerText = item.item_name;
                itemsUserOwnList.appendChild(newItem);
              });
            } else {
              const label = document.getElementById("labelForTrading");
              label.innerText = responseData.message;
              const itemsUserOwnList =
                document.getElementById("itemsUserOwnList");
              itemsUserOwnList.classList.add("d-none");
              const tradeButton = document.getElementById("trade-modal-button");
              tradeButton.disabled = true;
            }
          };
          axiosMethod(
            currentUrl + "/api/items/UserOwns/" + user_id,
            readItemsUsersHaveOwnedCallback
          );
        });
        myModal.show();
        // task_id_from_button = button.getAttribute("data-task-id");
      });
    });
    const tradingForm = document.getElementById("tradingForm");
    tradingForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const itemsSelect = document.getElementById("itemsUserOwnList");
      const selectedValue = itemsSelect.value;
      const tradeItem = new Promise((resolve, reject) => {
        const tradeItemCallback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus === 200) {
            window.alert("Item traded! You may preview it in your profile.");
            window.location.reload();
          } else {
            window.alert(responseData.message);
          }
        };
        const data = {
          wanted_Item_Id: item_id_for_trading,
        };
        axiosMethod(
          currentUrl + "/api/transaction/" + user_id + "/" + selectedValue,
          tradeItemCallback,
          "PUT",
          data
        );
      });
    });
  };

  axiosMethod(currentUrl + "/api/items", callback);
});
