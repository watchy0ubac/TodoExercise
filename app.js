const form = document.querySelector("#add-todo");
const input = document.querySelector("#newTodo");
const todoList = document.querySelector("#todo-list");
const hiddenBtns = document.getElementsByClassName("undo");

for (let btn of hiddenBtns) {
  btn.style.visibility = "hidden";
}
// let todoStorage = [
//   "Pet Cats",
//   "Clean Litter",
//   "Feed Cats",
//   "Fill Water",
//   "Play with Cats!",
// ];
// localStorage.setItem("fullList", JSON.stringify(todoStorage));

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("DOM loaded!");
  console.log(localStorage);
  const startList = JSON.parse(localStorage.fullList);
  console.log(startList);
  for (let item of startList) {
    const newItem = document.createElement("li");
    const finBtn = document.createElement("button");
    const undoBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "Remove";
    finBtn.innerHTML = "Finished";
    finBtn.setAttribute("class", "finishedBtn");
    undoBtn.innerHTML = "Undo";
    undoBtn.setAttribute("class", "undo");
    delBtn.setAttribute("class", "delete");
    newItem.innerText = item + " ";
    console.log(item);
    console.log(newItem);
    newItem.appendChild(finBtn);
    newItem.appendChild(undoBtn).style.visibility = "hidden";
    newItem.appendChild(delBtn);
    todoList.appendChild(newItem);
  }
});

todoList.addEventListener("click", function (e) {
  //   console.log(e.target.tagName);
  if (e.target.tagName === "BUTTON") {
    // console.log(e.target.parentElement.textContent);
    // console.log(e.target.className);
    // e.target.parentElement.remove();
    if (e.target.parentElement.className != "finished") {
      e.target.parentElement.className = "finished";
      e.target.style.visibility = "hidden";
      //   console.log(e.target.parentElement.querySelector(".undo"));
      const setUndo = e.target.parentElement.querySelector(".undo");
      setUndo.style.visibility = "visible";
    } else if (e.target.className != "finished") {
      //   console.log("its one or the other");
      e.target.parentElement.className = "not-finished";
      e.target.style.visibility = "hidden";
      //   console.log(e.target.parentElement.querySelector(".finishedBtn"));
      const setFinished = e.target.parentElement.querySelector(".finishedBtn");
      setFinished.style.visibility = "visible";
    }
    if (e.target.className == "delete") {
      const tmpString = e.target.parentElement.textContent.replace(
        "FinishedUndoRemove",
        ""
      );
      //   console.log(e.target.parentElement);
      let tmpArr = JSON.parse(localStorage.fullList);
      const removeVal = tmpArr.indexOf(tmpString.trim());
      console.log(removeVal);
      console.log(tmpArr.splice(removeVal, 1));
      console.log(tmpArr);
      localStorage.setItem("fullList", JSON.stringify(tmpArr));
      e.target.parentElement.remove();
      console.log("deleting element");
    }
    let trgBtn = e.target;
    const undoBtn = document.createElement("button");
    undoBtn.innerHTML = "Undo";
    trgBtn = undoBtn;
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value == "") {
    console.log("Empty!");
  } else {
    //   console.log(input.value);
    const newItem = document.createElement("li");
    const finBtn = document.createElement("button");
    const undoBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "Remove";
    finBtn.innerHTML = "Finished";
    finBtn.setAttribute("class", "finishedBtn");
    undoBtn.innerHTML = "Undo";
    undoBtn.setAttribute("class", "undo");
    delBtn.setAttribute("class", "delete");

    newItem.innerText = input.value + " ";
    newItem.appendChild(finBtn);
    newItem.appendChild(undoBtn).style.visibility = "hidden";
    newItem.appendChild(delBtn);
    let tmpArr = JSON.parse(localStorage.fullList);
    tmpArr.push(input.value);
    input.value = "";
    todoList.appendChild(newItem);
    // console.log(tmpArr);
    localStorage.setItem("fullList", JSON.stringify(tmpArr));
  }
});
