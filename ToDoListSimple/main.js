const addTask = document.querySelector(".add");
const removeTask = document.querySelector(".remove");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
// const liList = document.querySelectorAll("li");

const addTaskToList = () => {
  const newItem = input.value;
  let li = document.createElement("li");
  let btn = document.createElement("button");
  btn.textContent = "X";
  li.textContent = newItem;
  li.appendChild(btn);
  ul.appendChild(li);

  const removeSelectedTask = () => {
    document.querySelector("li").remove();
  };
  btn.addEventListener("click", removeSelectedTask);
};

const removeAllTaskFromList = () => {
  document.querySelectorAll("li").forEach((elem) => elem.remove());
};

const filterTasks = () => {
  const newItem = input.value.toLowerCase();
  const list = document.querySelector("ul");
  const liItems = list.getElementsByTagName("li");

  for (const li of liItems) {
    const itemText = li.textContent.toLowerCase();
    if (itemText.includes(newItem)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
  }
};

addTask.addEventListener("click", addTaskToList);
removeTask.addEventListener("click", removeAllTaskFromList);
input.addEventListener("input", filterTasks);
