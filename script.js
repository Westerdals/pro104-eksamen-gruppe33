// ********** Initializing variables **********


// ********** Buttons **********
const btnHeader = document.getElementsByClassName("header-wrapper")[0];
var btnTask = document.getElementById("btn-task");
var btnPeople = document.getElementById("btn-people");


var smallBtnWrapper = document.getElementsByClassName("small-btn-wrapper")[0];
var formWrapper = document.getElementsByClassName("form-wrapper")[0];


// ********** Assigning event listeners to buttons **********

btnTask.addEventListener("click", function() { generateButtons("task") });
btnPeople.addEventListener("click", function() { generateButtons("people") })
btnHeader.addEventListener("click", function() { generateButtons("header") })


// ********** Initializing functions **********






// ********** Functions **********

// Function stores an increment number to create unique IDs for objects
function getIncrementNumber() {
    if(!localStorage.getItem("incrementNumber")) {
        localStorage.setItem("incrementNumber", "0");
        return 0;
    } else {
        const incString = localStorage.getItem("incrementNumber");
        const incInt = parseInt(incString) + 1;
        localStorage.setItem("incrementNumber", incInt);
        return incInt;
    }
}


// Function to generate buttons for each section. If/else statement to determine which section
function generateButtons(isTask) {
    switch(isTask) {
        case 'task':
            // Prøvde å få til at TASK- og PEOPLE-knappene endrer farge så man vet hvilken seksjon man er inne på, fungerer foreløpig ikke

            //btnPeople.style.color = "#F0C17C";
            //btnTask.style.color = "#165C73";

            smallBtnWrapper.innerHTML = '<button class="btn-small" id="btn-new-list">NEW LIST</button><button class="btn-small" id="btn-new-task">NEW TASK</button>';
            document.getElementById("btn-new-list").addEventListener("click", function() { printForm("newList") });
            document.getElementById("btn-new-task").addEventListener("click", function() { printForm("newTask") });

            formWrapper.innerHTML = "";
            renderTask();
        break;

        case 'people':
            //btnPeople.style.color = "#165C73";
            //btnTask.style.color = "#F0C17C";

            smallBtnWrapper.innerHTML = '<button class="btn-small" id="btn-new-group">NEW GROUP</button><button class="btn-small" id="btn-new-person">NEW PERSON</button>';
            document.getElementById("btn-new-group").addEventListener("click", function() { printForm("newGroup") });
            document.getElementById("btn-new-person").addEventListener("click", function() { printForm("newPerson") });

            formWrapper.innerHTML = "";
            renderPeople();
        break;

        case 'header':
            smallBtnWrapper.innerHTML = "";
            formWrapper.innerHTML = "";
            document.getElementById("list-container").innerHTML = "";
        break;

    }
}

// Function to print form (determined by switch statement)
function printForm(formType, taskId) {
    switch(formType) {
        case "newList":
            formWrapper.innerHTML = '<form onsubmit="createList(event)"><div class="form-input-field"><label for="list-name">LIST NAME:</label><input name="list-name-input" type="text"></div><div class="form-input-field"><label for="list-description">LIST DESCRIPTION:</label><input name="list-description-input" type="text"></div><div class="form-input-field"><button type="submit">ADD LIST</button></div></form>';
        break;

        case "newTask":
            formWrapper.innerHTML = '<form onsubmit="createTask(event)"><div class="form-input-field"><label for="task-text">TASK:</label><input name="task-text" type="text"></div><div class="form-input-field"><div class="form-input-field"><label for="list-menu">LIST:</label><select name="list-menu" id="list-menu"></select></div><button type="submit">ADD TASK</button></div></form>';
            
            renderSelectListMenu();
        break;
        case "newGroup":
            formWrapper.innerHTML = '<form onsubmit="createGroup(event)"><label for="group-name-input">GROUP NAME:</label><input name="group-name-input" type="text"></div><div class="form-input-field"><button type="submit">ADD GROUP</button></div></form>';
        break;

        case "newPerson" :
            formWrapper.innerHTML = '<form onsubmit="createPerson(event)"><div class="form-input-field"><label for="person-name-input"> PERSON NAME:</label><input name="person-name-input" type="text"></div><div class="form-input-field"><label for="group-menu">GROUP:</label><select name="group-menu" id="group-menu"></select></div><div class="form-input-field"><button type="submit">ADD PERSON</button></div></form>';
            
            renderSelectGroupMenu();
        break;

        case "personToTask":
            formWrapper.innerHTML = `<form onsubmit="addPersonToTask(event, '${taskId}')"><div class="form-input-field"><label for="person-to-task-menu">PERSON TO ASSIGN:</label><select id="person-to-task-menu" name="person-to-task-menu"></select></div><div class="form-input-field"><button type="submit">ADD PERSON TO TASK</button></div></form></form>`;

            renderSelectPersonToTaskMenu();
        break;
    }
}

// Create task list and save to local storage
function createList(event) {
    event.preventDefault();
    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];

    const listName = document.querySelector("[name='list-name-input']").value;
    const listId = "listId"  + getIncrementNumber();

    const listObj = {listName, listId};

    listArray.push(listObj);
    window.localStorage.setItem("listArray", JSON.stringify(listArray));

    renderTask();
    formWrapper.innerHTML = "";
}

// Create group (people) and save to local storage
function createGroup(event) {
    event.preventDefault();
    const groupArray = JSON.parse(window.localStorage.getItem("groupArray")) || [];
    
    const groupName = document.querySelector("[name='group-name-input']").value;
    const groupId = "groupId" + getIncrementNumber();

    const groupObj = {groupName, groupId};

    groupArray.push(groupObj);
    window.localStorage.setItem("groupArray", JSON.stringify(groupArray));

    renderPeople();
    formWrapper.innerHTML = "";
}

// Create task and assign to list
function createTask(event) {
    event.preventDefault();

    const taskText = document.querySelector("[name='task-text']").value;
    const assignedList = document.querySelector("[name='list-menu']").value;
    const assignedPersons = [];

    // getIncrementNumber() is an ever-increasing number stored in local storage to make sure the IDs are unique. Function is used for every id generated, which means the IDs for tasks (for example) will not increase incrementally.
    const taskId = "taskId" + getIncrementNumber();
    

    const taskObj = {taskText, assignedPersons, assignedList, taskId};

    const taskArray = JSON.parse(window.localStorage.getItem("taskArray")) || [];

    taskArray.push(taskObj);
    window.localStorage.setItem("taskArray", JSON.stringify(taskArray));

    renderTask();
    formWrapper.innerHTML = "";
}

// Function that adds personId inside taskObj.assignedPersons (which is an array)
function addPersonToTask(event, taskId) {
    event.preventDefault();

    const personToAssign = document.querySelector("[name='person-to-task-menu']").value;
    let personAlreadyAdded = false;

    const taskArray = JSON.parse(window.localStorage.getItem("taskArray")) || [];
    for(const taskObj of taskArray) {
        if(taskObj.taskId === taskId) {
            for(let i = 0; i < taskObj.assignedPersons.length; i++) {
                if(taskObj.assignedPersons[i] === personToAssign) {
                    personAlreadyAdded = true;
                }
            }
            if(!personAlreadyAdded) {
                taskObj.assignedPersons.push(personToAssign);
                window.localStorage.setItem("taskArray", JSON.stringify(taskArray));
            }
        }
    }

    renderTask();
    formWrapper.innerHTML = "";
}

// Create person and assign to group
function createPerson(event) {
    event.preventDefault();

    const personName = document.querySelector("[name='person-name-input']").value;
    const assignedGroup = document.querySelector("[name='group-menu']").value;
    const personId = "personId" + getIncrementNumber();

    const personObj = {personName, assignedGroup, personId};

    const personArray = JSON.parse(window.localStorage.getItem("personArray")) || [];

    personArray.push(personObj);
    window.localStorage.setItem("personArray", JSON.stringify(personArray));

    renderPeople();
    formWrapper.innerHTML = "";
}

// Render all task lists and tasks
function renderTask() {
    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";

    for(const listObj of listArray) {
        const listElement = document.createElement("div");
        listElement.className = "list-div";
        listElement.id = listObj.listId;

        listElement.addEventListener("dragover", function() {onDragOver(event)});
        listElement.addEventListener("drop", function() { taskDrop(event) });
        
        listElement.innerText = `${listObj.listName} `;
        listContainer.appendChild(listElement);
    }

    renderTasksInsideLists();
}

// Render all groups and people
function renderPeople() {
    const groupArray  = JSON.parse(window.localStorage.getItem("groupArray"))  || [];
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";

    for(const groupObj of groupArray) {
        const groupElement = document.createElement("div");
        groupElement.className = "list-div";
        groupElement.id = groupObj.groupId;

        groupElement.addEventListener('dragover', function() {onDragOver(event)});
        groupElement.addEventListener("drop", function() { personDrop(event) });

        groupElement.innerText = `${groupObj.groupName}`;
        listContainer.appendChild(groupElement);
    }

    renderPeopleInsideGroups();
}

// Render select options for task lists
function renderSelectListMenu() {
    listMenu = document.getElementById("list-menu");
    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];
    listMenu.innerHTML = "";

    for(const listObj of listArray) {
        listMenu.innerHTML += `<option value="${listObj.listId}">${listObj.listName}</option>`;
    }
    
}

// Render select options for person groups
function renderSelectGroupMenu() {
    groupMenu = document.getElementById("group-menu");
    const groupArray = JSON.parse(window.localStorage.getItem("groupArray")) || [];
    groupMenu.innerHTML = "";

    for(const groupObj of groupArray) {
        groupMenu.innerHTML += `<option value="${groupObj.groupId}">${groupObj.groupName}</option>`;
    }
}

function renderSelectPersonToTaskMenu() {
    const personToTaskMenu = document.getElementById("person-to-task-menu");
    personToTaskMenu.innerHTML = "";

    const personArray = JSON.parse(window.localStorage.getItem("personArray")) || [];
    for(const personObj of personArray) {
        personToTaskMenu.innerHTML += `<option value="${personObj.personId}">${personObj.personName}</option>`;
    }
}

// Render tasks inside lists (called from renderTask)
function renderTasksInsideLists() {
    const taskArray = JSON.parse(window.localStorage.getItem("taskArray")) || [];

    // Loop through every task object inside local storage and print them out to assigned list. Get the assigned list by id (taskObj.assignedList) and print inside through innerHTML. Give the div id=taskObj.id to make sure every task div is unique. Task variable (247) is initialized to send to drag handlers (dragStart).
    for(const taskObj of taskArray) {
        document.getElementById(taskObj.assignedList).innerHTML += `<div class="list-element" draggable="true" ondragstart="dragStart(event, ${taskObj.taskId})" id="${taskObj.taskId}">${taskObj.taskText} <button class="btn-person-to-task" onclick="printForm('personToTask','${taskObj.taskId}')">+</button></div>`;

        if(taskObj.assignedPersons.length) {
            for(let i = 0; i < taskObj.assignedPersons.length; i++) {
                const personArray = JSON.parse(window.localStorage.getItem("personArray")) || [];
                for(const personObj of personArray) {
                    if(personObj.personId == taskObj.assignedPersons[i]) {
                        document.getElementById(taskObj.taskId).innerHTML += `<div class="assigned-person">${personObj.personName}</div>`;
                    }
                }
                
            }
        }
        
        
    }
}



// Render people inside groups (called from renderPeople)
function renderPeopleInsideGroups() {
    const personArray = JSON.parse(window.localStorage.getItem("personArray")) || [];

    for(const personObj of personArray) {
        document.getElementById(personObj.assignedGroup).innerHTML += `<div class="list-element" draggable="true" ondragstart="dragStart(event, ${personObj.personId})" id="${personObj.personId}">${personObj.personName}</div>`;
    
    }
}

// Handler for drag start
function dragStart(event, dragged) {
    localStorage.setItem("dragged", dragged.id);
}

// Handler for drag over
function onDragOver(event) {
    event.preventDefault();
}

// Function for being called when task is dropped to change taskObj.assignedList to list that is being hovered over
function taskDrop(event) {
    const draggedId = localStorage.getItem("dragged");
    const listId = event.target.id;

    // Get taskArray from local storage. Loop through and if taskId matches divId (id of item being dragged), make taskObj.assignedList = event.target.id (list id). Then renderTask again to show changes.
    const taskArray = JSON.parse(window.localStorage.getItem("taskArray"));
    for(const taskObj of taskArray) {
        if((taskObj.taskId === draggedId) && (listId.substring(0, 6) === "listId")) {
            taskObj.assignedList = event.target.id;
            window.localStorage.setItem("taskArray", JSON.stringify(taskArray));
            renderTask();
            
        }
    }
}

function personDrop(event) {
    const draggedId = localStorage.getItem("dragged");
    const groupId = event.target.id;
    const personArray = JSON.parse(window.localStorage.getItem("personArray"));

    for(const personObj of personArray) {
        if((personObj.personId === draggedId) && (groupId.substring(0, 7) === "groupId")) {
            personObj.assignedGroup = event.target.id;
            window.localStorage.setItem("personArray", JSON.stringify(personArray));
            renderPeople();
            
        }
    }
    //
}
