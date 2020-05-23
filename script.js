// Initializing variables

// Buttons
var formWrapper = document.getElementsByClassName("form-wrapper")[0];
var groupWrapp = document.getElementsByClassName("group-wrapper")[0];

//Initializing functions

//renderTaskList();


// Functions


function generateTask() {
    const taskbuttons = document.getElementById("smallbtnTask");
    taskbuttons.style.display = "block";
}
const taskInput = document.getElementById("taskForm");
const listInput = document.getElementById("lists");

function newlist(){
    
    listInput.style.display="block";
    taskInput.style.display = "none";
}

function newTask(){
    taskInput.style.display = "block";
    listInput.style.display="none";
}

function createList(event){
    event.preventDefault();
    
    const listName = document.querySelector("[name = 'listName']").value;
    const listdescripe = document.querySelector("[name = 'listD']").value;

    const taskList = {listName, listdescripe};

    console.log(taskList);

    const listTask = [taskList];
    window.localStorage.setItem("listTask", JSON.stringify(listTask));

    event.target.reset();
}

/*function renderTaskList() {

    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";

    for(const listObj of listArray) {
        const listElement = document.createElement("div");
        listElement.className = "list-div";
        listElement.innerText = `${listObj.listName} --- ${listObj.listDescription}`;
        listContainer.appendChild(listElement);
    }
}

function renderSelectListMenu() {
    listMenu = document.getElementById("list-menu");
    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];

    listMenu.innerHTML = "";
    for(const listObj of listArray) {
        listMenu.innerHTML += `<option id="${listObj.listName}">${listObj.listName}</option>`;
    }
    
}

function createList(event) {
    event.preventDefault();

    const listName = document.querySelector("[name='list-name-input']").value;
    const listDescription = document.querySelector("[name='list-description-input']").value;
    

    const listObj = {listName, listDescription};

    console.log(listObj);

    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];
    listArray.push(listObj);
    window.localStorage.setItem("listArray", JSON.stringify(listArray));

    renderTaskList();
    formWrapper.innerHTML = "";
}

function createTask(event) {
    event.preventDefault();

    const taskText = document.querySelector("[name='task-text']").value;
    const assignedList = document.querySelector("[name='list-menu']").value;

    const taskObj = {taskText, assignedList};

    const taskArray = JSON.parse(window.localStorage.getItem(taskArray)) || [];
    taskArray.push(taskObj);
    window.localStorage.setItem("taskArray", JSON.stringify(taskArray)); 
}*/




