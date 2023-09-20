const form = document.querySelector("#add-todo");
const input = document.querySelector("#newTodo");
const todoList = document.querySelector("#todo-list");
const hiddenBtns = document.getElementsByClassName("undo");
let todosArr = [];

for (let btn of hiddenBtns) {
  btn.style.visibility = "hidden";
}

function createButton(item) {
  console.log(item);
  const newItem = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "Remove";
  delBtn.setAttribute("class", "delete");
  newItem.innerText = item.todo + " ";
  newItem.setAttribute("id", item.id);
  newItem.appendChild(delBtn);
  item.isDone && newItem.classList.add("finished");
  todoList.appendChild(newItem);
}

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("DOM loaded!");
  console.log(localStorage);
  const startList = JSON.parse(localStorage.getItem("fullList"));
  if (startList) {
    todosArr = startList;
    for (let item of startList) {
      createButton(item);
    }
  }
});

todoList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    if (e.target.className == "delete") {
      const tmpString = e.target.parentElement.textContent.replace(
        "Remove",
        ""
      );
      let removalID = "";
      for (let item of todosArr) {
        if (tmpString.trim() === item["todo"]) {
          console.log("The remove val is equal to the name of this item:");
          removalID = item["id"];
          console.log("This is the removal id: " + removalID);
          localStorage.setItem(
            "fullList",
            JSON.stringify(todosArr.filter((t) => t.id !== removalID))
          );
        }
      }
      e.target.parentElement.remove();
      console.log("deleting element");
    }
    let trgBtn = e.target;
    const undoBtn = document.createElement("button");
    undoBtn.innerHTML = "Undo";
    trgBtn = undoBtn;
  }
  if (e.target.tagName === "LI") {
    console.log("you clicked an li item");
    e.target.classList.toggle("finished");
    if (e.target.classList == "finished") {
      console.log("All done with this task!");
      const tmpString = e.target.textContent.replace("Remove", "");
      console.log(tmpString);
      for (let item of todosArr) {
        console.log(item["isDone"]);
        if (tmpString.trim() === item["todo"]) {
          item["isDone"] = true;
          console.log("Heres the updated item: " + item["isDone"]);
          localStorage.setItem("fullList", JSON.stringify(todosArr));
        }
      }
    }
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value == "") {
    console.log("Empty!");
  } else {
    const newObj = { todo: input.value, isDone: false, id: Date.now() };
    createButton(newObj);
    todosArr.push(newObj);
    localStorage.setItem("fullList", JSON.stringify(todosArr));
    input.value = "";
  }
});
