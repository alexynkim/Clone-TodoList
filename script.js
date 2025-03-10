//Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.querySelector(".counter-container p span");
//const addButton = document.querySelector(".btn-Add");
const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");

console.log(todo);

// initialize
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

function addTask() {
    // add Task when click Add button
    //console.log("add Task");
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask,
            disabled: false,
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

function deleteAllTasks() {
    // delete all tasks
    //console.log("delete all tasks");

    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function displayTasks() {
    // display tasks
    console.log("display tasks");

    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <div class="todo-inner">
                    <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}></input>
                    <p id="todo-${index}" class="todo-text ${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
                </div>
                <button id="delete-${index}" class="delete-btn" onclick="deleteTask(${index})">\u2A2F</button>
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p);
    });

    todoCount.textContent = todo.length;
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    inputElement.className = "editTaskInput";
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", () => {
        const updateText = inputElement.value;
        if (updateText) {
            todo[index].text = updateText;
            saveToLocalStorage();
        } else {
            todo.splice(index, 1);
            saveToLocalStorage();
        }
        displayTasks();
    });

    inputElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const updateText = inputElement.value;
            if (updateText) {
                todo[index].text = updateText;
                saveToLocalStorage();
            } else {
                todo.splice(index, 1);
                saveToLocalStorage();
            }
            displayTasks();
        }
    });
}

function toggleTask(index) {
    //console.log("Edit task", index);
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteTask(index) {
    //console.log("Delete task", index);
    todo.splice(index, 1);
    saveToLocalStorage();
    displayTasks();
}
