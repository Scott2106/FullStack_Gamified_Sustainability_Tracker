// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
document.addEventListener("DOMContentLoaded", function () {
  const luckyDrawButton = document.getElementById("luckyDrawButton");
  luckyDrawButton.addEventListener("click", function () {
    const progressBar = new Promise((resolve, reject) => {
      const progress25 = document.getElementById("progress25");
      const progress50 = document.getElementById("progress50");
      const progress75 = document.getElementById("progress75");
      const progress100 = document.getElementById("progress100");
      // progress bar animation
      setTimeout(() => {
        progress25.classList.remove("d-none");
        resolve();
      }, 800);

      setTimeout(() => {
        progress25.classList.add("d-none");
        progress50.classList.remove("d-none");
      }, 1600);

      setTimeout(() => {
        progress50.classList.add("d-none");
        progress75.classList.remove("d-none");
      }, 2400);

      setTimeout(() => {
        progress75.classList.add("d-none");
        progress100.classList.remove("d-none");
      }, 3200);

      setTimeout(() => {
        progress100.classList.add("d-none");
      }, 4000);
    });

    progressBar.then(() => {
      let item_user_won;
      let item_user_won_id;
      let item_list;
      //read all items user can win
      const readallItemsForLuckyDraw = new Promise((resolve, reject) => {
        const readallItemsCallback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus === 200) {
            item_list = responseData
              .filter((item, index) => index !== 0 && item.item_id)
              .map((item) => item.item_name);
            console.log("item_list:", item_list);
            resolve(item_list);
          }
        };
        axiosMethod(currentUrl + "/api/items", readallItemsCallback);
      });
      //win or lose lucky draw decided by 3 random numbers
      readallItemsForLuckyDraw
        .then((item_list) => {
          const randomNumber1 = Math.floor(Math.random() * 4) + 1;
          const randomNumber2 = Math.floor(Math.random() * 4) + 1;
          const randomNumber3 = Math.floor(Math.random() * item_list.length);

          if (randomNumber1 === randomNumber2) {
            item_user_won = item_list[randomNumber3];
            item_user_won_id = item_list.indexOf(item_user_won) + 1;

            const winLuckyDraw = new Promise((resolve, reject) => {
              const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                window.alert(responseData.message);
              };
              const data = {
                result: "YES",
                item_name: item_user_won,
              };
              //update user's inventory
              axiosMethod(
                currentUrl + `/api/luckydraw/${user_id}/${item_user_won_id}`,
                callback,
                "POST",
                data
              );
              resolve();
            });

            return winLuckyDraw;
          } else {
            console.log("Sorry! You lost");
            const loseLuckyDraw = new Promise((resolve, reject) => {
              const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                window.alert(responseData.message);
              };
              const data = {
                result: "NO",
              };
              //record user daily lucky draw history
              axiosMethod(
                currentUrl + `/api/luckydraw/${user_id}/1000000000`,
                callback,
                "POST",
                data
              );
              resolve();
            });

            return loseLuckyDraw;
          }
        })
        .catch((error) => {
          console.log("Error retrieving items:", error);
        });
    });
  });
});
