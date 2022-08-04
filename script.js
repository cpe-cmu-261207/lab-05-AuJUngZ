const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

let state = true;

inputAdd.onkeyup = (event) => {
  state = true;
  if (event.key !== "Enter") return;
  if (inputAdd.value === "") {
    alert("Todo cannot be empty");
  } else {
    addTodo(inputAdd.value, false);
    saveTodo();
  }
  //your code here
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);

  doneBtn.style.visibility = "hidden";
  deleteBtn.style.visibility = "hidden";

  div.onmouseover = () => {
    doneBtn.style.visibility = "visible";
    deleteBtn.style.visibility = "visible";
  };

  div.onmouseout = () => {
    doneBtn.style.visibility = "hidden";
    deleteBtn.style.visibility = "hidden";
  };

  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through") {
      span.style.textDecoration = "none";
      //edit in local storage
      const data = JSON.parse(localStorage.getItem("todoListData"));
      for (const i in data) {
        if (data[i].title === title) {
          data[i].completed = false;
        }
      }
    } else {
      span.style.textDecoration = "line-through";
      //edit in local storage
      const data = JSON.parse(localStorage.getItem("todoListData"));
      for (const i in data) {
        if (data[i].title === title) {
          data[i].completed = true;
        }
      }
    }
    saveTodo();
  };
  deleteBtn.onclick = () => {
    div.remove();
    //delete from local storage
    const data = JSON.parse(localStorage.getItem("todoListData"));
    for (const i in data) {
      if (data[i].title === title) {
        data.splice(i, 1);
      }
    }
    saveTodo();
  };
  if (state === true) {
    todoCtn.prepend(div);
  } else {
    todoCtn.appendChild(div);
  }
  inputAdd.value = "";
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoobj = {};
    todoobj.title = todoDiv.children[0].innerText;
    todoobj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoobj);
  }
  const json = JSON.stringify(data);
  localStorage.setItem("todoListData", json);
}

function loadTodo() {
  state = false;
  const dataStr = localStorage.getItem("todoListData");
  const data = JSON.parse(dataStr); //array of objects
  console.log(data);

  for (const todoobj of data) {
    addTodo(todoobj.title, todoobj.completed);
  }
}

loadTodo();
