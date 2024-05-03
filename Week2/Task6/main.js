function addTask() {
  var input = document.getElementById("taskInput");
  var task = input.value.trim();
  if (task === "") return;

  var taskList = document.getElementById("taskList");
  var li = document.createElement("li");
  li.textContent = task;
  li.innerHTML +=
    '<button class="delete-btn" onclick="deleteTask(this)">Delete</button>';
  taskList.appendChild(li);

  input.value = "";
}

function deleteTask(btn) {
  var li = btn.parentElement;
  li.remove();
}

document.getElementById("taskList").addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("completed");
  }
});
