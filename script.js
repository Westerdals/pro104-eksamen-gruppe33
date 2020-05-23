// ********** Initializing variables **********


// ********** Buttons **********

var btnTask = document.getElementById("btn-task");
var btnPeople = document.getElementById("btn-people");


var smallBtnWrapper = document.getElementsByClassName("small-btn-wrapper")[0];
var formWrapper = document.getElementsByClassName("form-wrapper")[0];


// ********** Assigning event listeners to buttons **********

btnTask.addEventListener("click", function() { generateButtons(true) });
btnPeople.addEventListener("click", function() { generateButtons(false) })


// ********** Initializing functions **********





// ********** Functions **********

// Function to generate buttons for each section. If/else statement to determine which section
function generateButtons(isTask) {
    if(isTask) {
        // Prøvde å få til at TASK- og PEOPLE-knappene endrer farge så man vet hvilken seksjon man er inne på, fungerer foreløpig ikke

        //btnPeople.style.color = "#F0C17C";
        //btnTask.style.color = "#165C73";

        smallBtnWrapper.innerHTML = '<button class="btn-small" id="btn-new-list">NEW LIST</button><button class="btn-small" id="btn-new-task">NEW TASK</button>';
        document.getElementById("btn-new-list").addEventListener("click", function() { printForm("newList") });
        document.getElementById("btn-new-task").addEventListener("click", function() { printForm("newTask") });

        formWrapper.innerHTML = "";
        renderTask();

    } else {
        //btnPeople.style.color = "#165C73";
        //btnTask.style.color = "#F0C17C";

         smallBtnWrapper.innerHTML = '<button class="btn-small" id="btn-new-group">NEW GROUP</button><button class="btn-small" id="btn-new-person">NEW PERSON</button>';
        document.getElementById("btn-new-group").addEventListener("click", function() { printForm("newGroup") });
        document.getElementById("btn-new-person").addEventListener("click", function() { printForm("newPerson") });

        formWrapper.innerHTML = "";
        renderPeople();
    }
}

// Function to print form (determined by switch statement)
function printForm(formType) {
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
    }
}

// Create task list and save to local storage
function createList(event) {
    event.preventDefault();

    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];

    const listName = document.querySelector("[name='list-name-input']").value;
    const listDescription = document.querySelector("[name='list-description-input']").value;

    const idNumber = "";
    const listId = "listId"  + listArray.length;

    const listObj = {listName, listDescription, listId};

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
    const groupId = "groupId" + groupArray.length;

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

    const taskObj = {taskText, assignedList};

    const taskArray = JSON.parse(window.localStorage.getItem("taskArray")) || [];

    taskArray.push(taskObj);
    window.localStorage.setItem("taskArray", JSON.stringify(taskArray));

    renderTask();
    formWrapper.innerHTML = "";
}

// Create person and assign to group
function createPerson(event) {
    event.preventDefault();

    const personName = document.querySelector("[name = 'person-name-input']").value;
    const assignedGroup = document.querySelector("[name='group-menu']").value;

    const personObj = {personName, assignedGroup};

    const personArray = JSON.parse(window.localStorage.getItem("personArray")) || [];

    console.log(personObj);

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
        
        listElement.innerText = `${listObj.listName} `;
        // + ${listObj.listDescription}
        listContainer.appendChild(listElement);
    }

    renderTasksInsideLists();
}

// Render all groups and people
function renderPeople() {

    const groupArray  = JSON.parse(window.localStorage.getItem("groupArray"))  || [];
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";

    for(const groupObj of groupArray){
        const groupElement = document.createElement("div");
        groupElement.className = "list-div";
        groupElement.id = groupObj.groupId;
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
        listObj.listId;
    }
    
}

// Render select options for person groups
function renderSelectGroupMenu() {
    groupMenu = document.getElementById("group-menu");
    const groupArray = JSON.parse(window.localStorage.getItem("groupArray")) || [];
    groupMenu.innerHTML = "";

    for(const groupObj of groupArray){
        groupMenu.innerHTML += `<option value="${groupObj.groupId}">${groupObj.groupName}</option>`;
    }
}

function renderTasksInsideLists() {
    const taskArray = JSON.parse(window.localStorage.getItem("taskArray")) || [];

    for(const taskObj of taskArray) {
        document.getElementById(taskObj.assignedList).innerHTML += "<br>" + taskObj.taskText;
    
    }
}

function renderPeopleInsideGroups() {
    const personArray = JSON.parse(window.localStorage.getItem("personArray")) || [];

    for(const personObj of personArray) {
        console.log(personObj.assignedGroup);
        document.getElementById(personObj.assignedGroup).innerHTML += "<br>" + personObj.personName;
    
    }
}

