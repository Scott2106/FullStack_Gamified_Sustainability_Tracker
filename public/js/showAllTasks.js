// STUDENT'S NAME: SOE ZAW AUNG
// CLASS: DIT/FT/1B/08
// ADMIN NO: 2340474
document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    responseData.forEach((task) => {
      const taskList = document.getElementById("taskLists");
      const newTask = document.createElement("div");
      task.galleons = task.points * 0.8;
      newTask.className = "col mb-2";
      newTask.style.position = "relative";
      newTask.innerHTML = `
          <div class="card border-1 shadow-sm rounded-3 h-100">
          <div class="d-flex justify-content-center my-4">
            <img src="http://localhost:3000/images/${task.image_path}" alt="" style="width: 100px; height: 100px; object-fit: cover;"> 
          </div>
          <div>
            <p class="text-center h5">${task.galleons} galleons</p>
            <p class="text-center mt-2 text-danger">${task.title}</p> 
            <details class="mx-4 mb-3">
              <summary class="text-dark h6 my-0">task description</summary>
              <span class="small text-dark">${task.description}</span>
            </details>
            <button type="button" class="btn modal-button" data-task-id=${task.task_id} style="position: absolute; top: 10px; right: 10px; z-index: 1000;"><i class="bi bi-clipboard-plus"></i> Add</button>
          </div>
        </div>
      `;
      taskList.appendChild(newTask);
    });
    const modalButton = document.querySelectorAll(".modal-button");
    let task_id_from_button;
    modalButton.forEach((button) => {
      button.addEventListener("click", function () {
        var myModal = new bootstrap.Modal(document.getElementById("Modal"), {
          keyboard: false,
        });
        myModal.show();
        task_id_from_button = button.getAttribute("data-task-id");
      });
    });
    const taskform = document.getElementById("taskForm");
    taskform.addEventListener("submit", function (event) {
      event.preventDefault();
      const description = document.getElementById("description").value;
      const data = {
        task_id: task_id_from_button,
        user_id: user_id,
        notes: description,
        completion_date: new Date().toISOString().slice(0, 10),
      };
      const addNewTaskProgress = new Promise((resolve, reject) => {
        const taskProgressCallback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus === 201) {
            window.alert("Task added! You may preview it in your profile.");
            window.location.reload();
          } else {
            window.alert(
              "Sorry there are errors in adding the task. Try again!"
            );
          }
        };
        axiosMethod(
          currentUrl + "/api/task_progress",
          taskProgressCallback,
          "POST",
          data
        );
        taskform.reset();
      });
    });
  };

  axiosMethod(currentUrl + "/api/tasks", callback);
});
