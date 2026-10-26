const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskList = document.getElementById("incompleteTasks");
const completedTasksList = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskDesc) {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskDesc;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  bindTaskEvents(listItem);

  return listItem;
};

const addTask = function () {
  const taskDesc = taskInput.value.trim();
  if (!taskDesc) return;
  const listItem = createNewTaskElement(taskDesc);

  incompleteTaskList.appendChild(listItem);
  taskInput.value = "";
};

const editTask = function (listItem) {
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function (listItem) {
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const onChangeCheckBox = function () {
  const targetList = this.checked ? completedTasksList : incompleteTaskList;

  targetList.appendChild(this.parentNode);
};

addButton.addEventListener("click", addTask);

function bindTaskEvents(listItem) {
  const editButton = listItem.querySelector(".edit");
  const deleteButton = listItem.querySelector(".delete");
  const checkBox = listItem.querySelector("input[type=checkbox]");

  editButton.addEventListener("click", () => editTask(listItem));
  deleteButton.addEventListener("click", () => deleteTask(listItem));
  checkBox.addEventListener("change", onChangeCheckBox);
}

document
  .querySelectorAll("#incompleteTasks li, #completed-tasks li")
  .forEach(bindTaskEvents);
