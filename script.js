// Initializing variables

// Buttons
var btnTask = document.getElementById("btn-task");
var btnPeople = document.getElementById("btn-people");

var smallBtnWrapper = document.getElementsByClassName("small-btn-wrapper")[0];
var formWrapper = document.getElementsByClassName("form-wrapper")[0];
var groupWrapp = document.getElementsByClassName("group-wrapper")[0];

//Initializing functions

renderTaskList();
renderGroup();

// Assigning event listeners to buttons

btnTask.addEventListener("click", function() { generateButtons(true) });
btnPeople.addEventListener("click", function() { generateButtons(false) })


// Functions

function generateButtons(isTask) {
    if(isTask) {
        // Prøvde å få til at TASK- og PEOPLE-knappene endrer farge så man vet hvilken seksjon man er inne på, fungerer foreløpig ikke

        //btnPeople.style.color = "#F0C17C";
        //btnTask.style.color = "#165C73";
        smallBtnWrapper.innerHTML = '<button class="btn-small" id="btn-new-list">NEW LIST</button><button class="btn-small" id="btn-new-task">NEW TASK</button>';
        document.getElementById("btn-new-list").addEventListener("click", function() { printForm("newList") });
        document.getElementById("btn-new-task").addEventListener("click", function() { printForm("newTask") });

    } else {
        //btnPeople.style.color = "#165C73";
        //btnTask.style.color = "#F0C17C";
         smallBtnWrapper.innerHTML = '<button class="btn-small" id="btn-new-group">NEW GROUP</button><button class="btn-small" id="btn-new-person">NEW PERSON</button>';
        document.getElementById("btn-new-group").addEventListener("click", function() { printForm("newGroup") });
        document.getElementById("btn-new-person").addEventListener("click", function() { printForm("newPerson") });
    }
}

function printForm(formType) {
    switch(formType) {
        case "newList":
            formWrapper.innerHTML = '<form onsubmit="createList(event)"><div class="form-input-field"><label for="list-name">LIST NAME:</label><input name="list-name-input" type="text"></div><div class="form-input-field"><label for="list-description">LIST DESCRIPTION:</label><input name="list-description-input" type="text"></div><div class="form-input-field"><button type="submit">ADD LIST</button></div></form>';
        break;

        case "newTask":
            formWrapper.innerHTML = '<form onsubmit="createTask(event)"><div class="form-input-field"><label for="task-text">TASK:</label><input name="task-text" type="text"></div><div class="form-input-field"><div class="form-input-field"><label for="list-menu">LIST:</label><select name="list-menu" id="list-menu"></select></div><button type="submit">ADD TASK</button></div></form>';

            renderSelectListMenu();
        break;
            
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
            groupWrapp.innerHTML = '<form onsubmit="createGroupList(event)"><div class="form-input-field"><label for="groupNumber">Group Number:</label><input name="groupNumberInput" type="number"></div><button type="submit">ADD GROUP</button></div></form>';
        break;

        case "newPerson" :
            groupWrapp.innerHTML = '<form onsubmit="createPerson(event)"><div class="form-input-field"><label for="personName"> First Name:</label><input name="personNameInput" type="text"></div><div class="form-input-field"><label for="groupMenu">Select group:</label><select name="groupMenu" id="groupMenu"></select></div><button type="submit">ADD PERSON TO GROUP</button></div></form>';
            
            renderSelectGroups();
            
        break;
    }
}
    }
}



function renderTaskList() {

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
}

function renderGroup(){
    const groupArray  = JSON.parse(window.localStorage.getItem("groupArray"))  || [];
    const groupS = document.getElementById("Group-container");
    groupS.innerHTML = "";

    for(const groupObj of groupArray){
        const groupElement = document.createElement("div");
        groupElement.className = "groupDiv";
        groupElement.innerText = `${groupObj.groupNumber} + ${groupObj.personName}`;
        groupS.appendChild(groupElement);
    }
}

function renderSelectGroups(){
    groupMenu = document.getElementById("groupMenu");
    const groupArray = JSON.parse(window.localStorage.getItem("groupArray")) || [];
    
    groupMenu.innerHTML = "";
    for(const groupObj of groupArray){
        groupMenu.innerHTML += `<option id="${groupObj.groupName}">${groupObj.groupName}</option>`;
    }
}

function createGroupList(event){
    event.preventDefault();

    const groupNumber = document.querySelector("[name = 'groupNumberInput']").value;
    
    const groupObj = {groupNumber};

    console.log(groupObj);

    const groupArray = JSON.parse(window.localStorage.getItem(groupArray)) || [];
    groupArray.push(groupObj);
    window.localStorage.setItem("groupArray", JSON.stringify(groupArray));

    renderSelectGroups();
    groupWrapp.innerHTML = "";
}

function createPerson(event){
    event.preventDefault();

    const firstName = document.querySelector("[name = 'personName']").value;
    const assingToGroup = document.querySelector("[name = 'groupMenu']").value;

    const personObj ={firstName, assingToGroup};

    const personArray = JSON.parse(window.localStorage.getItem(personArray)) || [];
    personArray.push(personObj);

    window.localStorage.setItem("personArray", JSON.stringify(personArray));

    renderSelectGroups();
    groupWrapp.innerHTML = "";
}


