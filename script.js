// ********** Initializing variables **********
var smallBtnWrapper = document.getElementsByClassName("small-btn-wrapper")[0];
var formWrapper = document.getElementsByClassName("form-wrapper")[0];


// ********** Buttons **********
const btnHeader = document.getElementsByClassName("header-wrapper")[0];
var btnTask = document.getElementById("btn-task");
var btnPeople = document.getElementById("btn-people");
var trashCan = document.getElementsByClassName("trash-can-wrapper")[0];


// ********** Event handlers **********
btnTask.addEventListener("click", function() { generateButtons("task") });
btnPeople.addEventListener("click", function() { generateButtons("people") });
btnHeader.addEventListener("click", function() { generateButtons("header") });
trashCan.addEventListener("dragover", function() { onDragOver(event) });
trashCan.addEventListener("drop", function(){ deleteElement(event) });


// ********** Functions **********

// Function stores an increment number in local storage to create unique IDs for objects. The number is always increasing, which results in uneven increments for individual elements, but will not affect anything on the front end.
function getIncrementNumber() {
    // If the number doesnt exist, add 0 to local storage and return
    if(!localStorage.getItem("incrementNumber")) {
        localStorage.setItem("incrementNumber", "0");
        return 0;
    } else {
        // If it does exist, retrieve it from localstorage, add 1, store it, and return
        const incString = localStorage.getItem("incrementNumber");
        const incInt = parseInt(incString) + 1;
        localStorage.setItem("incrementNumber", incInt);
        return incInt;
    }
}

// Print buttons inside wrapper and assign event handlers individually, then render given section (task/people)
function generateButtons(isTask) {
    switch(isTask) {
        case 'task':
            // Prøvde å få til at TASK- og PEOPLE-knappene endrer farge så man vet hvilken seksjon man er inne på, fungerer foreløpig ikke

            //btnPeople.style.color = "#F0C17C";
            //btnTask.style.color = "#165C73";

            
            smallBtnWrapper.innerHTML = '<button class="btn-small" id="btn-new-list">NEW LIST</button><button class="btn-small" id="btn-new-task">NEW TASK</button><button class="btn-small" id="btn-delete-list">DELETE LIST</button>';

            document.getElementById("btn-new-list").addEventListener("click", function(){ printForm("newList") });
            document.getElementById("btn-new-task").addEventListener("click", function(){ printForm("newTask") });
            document.getElementById("btn-delete-list").addEventListener("click", function(){ printForm("deleteList") });

            formWrapper.innerHTML = "";
            renderTask();
        break;

        case 'people':
            //btnPeople.style.color = "#165C73";
            //btnTask.style.color = "#F0C17C";

            smallBtnWrapper.innerHTML = '<button class="btn-small" id="btn-new-group">NEW GROUP</button><button class="btn-small" id="btn-new-person">NEW PERSON</button><button class="btn-small" id="btn-delete-group">DELETE GROUP</button>';

            document.getElementById("btn-new-group").addEventListener("click", function() { printForm("newGroup") });
            document.getElementById("btn-new-person").addEventListener("click", function() { printForm("newPerson") });
            document.getElementById('btn-delete-group').addEventListener("click", function() { printForm("deleteGroup")});

            formWrapper.innerHTML = '';
            renderPeople();
        break;

        // When header is clicked, clear all containers
        case 'header':
            smallBtnWrapper.innerHTML = '';
            formWrapper.innerHTML = '';
            document.getElementById("list-container").innerHTML = '';
        break;

    }
}

// Function to print forms (determined by switch statement)
function printForm(formType, taskId) {
    switch(formType) {
        // Form to create new list, values passed to createList() function
        case "newList":
            formWrapper.innerHTML = '<form onsubmit="createList(event)"><div class="form-input-field"><label for="list-name">LIST NAME:</label><input name="list-name-input" type="text"></div><div class="form-input-field"><button type="submit">ADD LIST</button></div></form>';
        break;

        // Form to create new task, values passed to createTask() function
        case "newTask":
            formWrapper.innerHTML = '<form onsubmit="createTask(event)"><div class="form-input-field"><label for="task-text">TASK:</label><input name="task-text" type="text"></div><div class="form-input-field"><div class="form-input-field"><label for="list-menu">LIST:</label><select name="list-menu" id="list-menu"></select></div><button type="submit">ADD TASK</button></div></form>';
            
            // Calling function to render options inside the select drop-down menu
            renderSelectListMenu();
        break;

        // Form to create new group, values passed to createGroup() function
        case "newGroup":
            formWrapper.innerHTML = '<form onsubmit="createGroup(event)"><label for="group-name-input">GROUP NAME:</label><input name="group-name-input" type="text"></div><div class="form-input-field"><button type="submit">ADD GROUP</button></div></form>';
        break;

        // Form to create new person, values passed to createPerson() function
        case "newPerson" :
            formWrapper.innerHTML = '<form onsubmit="createPerson(event)"><div class="form-input-field"><label for="person-name-input"> PERSON NAME:</label><input name="person-name-input" type="text"></div><div class="form-input-field"><label for="group-menu">GROUP:</label><select name="group-menu" id="group-menu"></select></div><div class="form-input-field"><button type="submit">ADD PERSON</button></div></form>';
            
            // Calling function to render options inside the select drop-down menu
            renderSelectGroupMenu();
        break;

        // Form to assign a person to a given task. This is being called by printing button inside each task at line 390. This makes the buttons call with their unique task ID.
        case "personToTask":
            formWrapper.innerHTML = `<form onsubmit="addPersonToTask(event, '${taskId}')"><div class="form-input-field"><label for="person-to-task-menu">PERSON TO ASSIGN:</label><select id="person-to-task-menu" name="person-to-task-menu"></select></div><div class="form-input-field"><button type="submit">ADD PERSON TO TASK</button></div></form></form>`;

            // Calling function to render options inside the select drop-down menu
            renderSelectPersonToTaskMenu();
        break;

        // Form to choose which list to delete
        case "deleteList":
            formWrapper.innerHTML = '<form onsubmit="deleteList(event)"><div class="form-input-field"><label for="list-delete-menu">LIST TO DELETE:</label><select id="list-delete-menu" name="list-delete-menu"></select></div><div class="form-input-field"><button type="submit">DELETE LIST (AND TASKS)</button></div></form></form>';

            // Calling function to render options inside the select drop-down menu
            renderSelectListToDelete();
        break;

        // Form to choose which group to delete
        case "deleteGroup":
            formWrapper.innerHTML = '<form onsubmit="deleteGroup(event)"><div class="form-input-field"><label for="group-delete-menu">GROUP TO DELETE:</label><select id="group-delete-menu" name="group-delete-menu"></select></div><div class="form-input-field"><button type="submit">DELETE GROUP (AND PEOPLE)</button></div></form></form>';

            // Calling function to render options inside the select drop-down menu
            renderSelectGroupToDelete();
    }
}

// Create task list and save to local storage
function createList(event) {
    event.preventDefault();

    // Retrieve the list array from localStorage, if it doesn't exit, initialize an empty array
    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];
    
    // Initialize listName and assign value entered by user in form. The listId is assigned by adding "listId" and a number from the getIncrement() function
    const listName = document.querySelector("[name='list-name-input']").value;
    const listId = "listId"  + getIncrementNumber();

    // Create the list object and push it into the array, then save the array.
    const listObj = {listName, listId};
    listArray.push(listObj);
    window.localStorage.setItem("listArray", JSON.stringify(listArray));

    // Clear the form container and render the task-section to show results.
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

    // Retrieve user-entered values form form
    const taskText = document.querySelector("[name='task-text']").value;
    const assignedList = document.querySelector("[name='list-menu']").value;
    // Initialize and empty array inside object where we later can add person IDs to assign persons to tasks.
    const assignedPersons = [];
    const taskId = "taskId" + getIncrementNumber();
    const taskObj = {taskText, assignedPersons, assignedList, taskId};

    // Retrieve the task array, push the newly made object inside the array, and save it. Then clear all wrappers and render task-section.
    const taskArray = JSON.parse(window.localStorage.getItem("taskArray")) || [];
    taskArray.push(taskObj);
    window.localStorage.setItem("taskArray", JSON.stringify(taskArray));
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

// Function that adds personId inside taskObj.assignedPersons array
function addPersonToTask(event, taskId) {
    event.preventDefault();

    // Retrieve chosen person ID from form
    const personToAssign = document.querySelector("[name='person-to-task-menu']").value;
    // Boolean to later determine if person is already added (done inside loop)
    let personAlreadyAdded = false;
    const taskArray = JSON.parse(window.localStorage.getItem("taskArray")) || [];

    // Loop through task objects. If the ID matches the ID given to the function in the parameter, loop through its assigned persons to check if the person is already added. If the flag is true, nothing will happen, but if the person ID isnt in assigned persons, personAlreadyAdded will remain false and the person will be added in the array.
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

// Deletes list and its assigned tasks
function deleteList(event) {
    event.preventDefault();

    // Retrieve selected list ID from form
    const listId = document.querySelector("[name='list-delete-menu']").value;

    const taskArray = JSON.parse(window.localStorage.getItem("taskArray")) || [];
    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];

    // Loop through all tasks and delete if assigned list is same as the list being deleted
    for(let i = 0; i < taskArray.length; i++) {
        if(taskArray[i].assignedList === listId) {
            taskArray.splice(i, 1);
        }
    }

    // Loop through all lists and delete when list ID matches our given list ID (line 246)
    for(let i = 0; i < listArray.length; i++) {
        if(listArray[i].listId === listId) {
            listArray.splice(i, 1);
        }
    }

    // Store updated arrays and render section to show results
    window.localStorage.setItem("taskArray", JSON.stringify(taskArray));
    window.localStorage.setItem("listArray", JSON.stringify(listArray));
    renderTask();
    formWrapper.innerHTML = "";
}

// Deletes group and its assigned people
function deleteGroup(event) {
    event.preventDefault();

    const groupId = document.querySelector("[name='group-delete-menu']").value;
    const personArray = JSON.parse(window.localStorage.getItem("personArray")) || [];
    const groupArray = JSON.parse(window.localStorage.getItem("groupArray")) || [];

    for(let i = 0; i < personArray.length; i++) {
        if(personArray[i].assignedGroup === groupId) {
            personArray.splice(i, 1);
        }
    }

    for(let i = 0; i < groupArray.length; i++) {
        if(groupArray[i].groupId === groupId) {
            groupArray.splice(i, 1);
        }
    }

    window.localStorage.setItem("personArray", JSON.stringify(personArray));
    window.localStorage.setItem("groupArray", JSON.stringify(groupArray));

    renderPeople();
    formWrapper.innerHTML = "";
}


// Render all task lists and tasks
function renderTask() {
    // Retrieve listArray from storage and store inside variable. Initialize container (to print inside) variable and clear it.
    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";

    // Loop through list objects, make a div for each one, give them a class name and add drag handlers to them, so we can drag tasks between them. Print list names inside.
    for(const listObj of listArray) {
        const listElement = document.createElement("div");
        listElement.className = "list-div";
        listElement.id = listObj.listId;

        listElement.addEventListener("dragover", function() {onDragOver(event)});
        listElement.addEventListener("drop", function() { taskDrop(event) });
        
        listElement.innerText = `${listObj.listName} `;
        listContainer.appendChild(listElement);
    }

    // Function call to print tasks inside lists
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
    // Get the select input element, and clear it
    listMenu = document.getElementById("list-menu");
    listMenu.innerHTML = "";

    // Loop through every list object and print out options. List name goes inside the tags where the users can see them, but we pass the list ID as a value so we can identify the lists uniquely.
    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];
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

// Render select options for choosing list to delete
function renderSelectListToDelete() {
    deleteListMenu = document.getElementById('list-delete-menu');
    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];

    for(const listObj of listArray) {
        deleteListMenu.innerHTML += `<option value="${listObj.listId}">${listObj.listName}</option>`;
    
    }
}

// Render select options for choosing group to delete
function renderSelectGroupToDelete() {
    deleteGroupMenu = document.getElementById('group-delete-menu');
    const groupArray = JSON.parse(window.localStorage.getItem("groupArray")) || [];

    for(const groupObj of groupArray) {
        deleteGroupMenu.innerHTML += `<option value="${groupObj.groupId}">${groupObj.groupName}</option>`;
    }
}

// Render select options for assigning person to task
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
    // Retrieve taskArray
    const taskArray = JSON.parse(window.localStorage.getItem("taskArray")) || [];

    // Loop through every task object inside local storage and print them out to assigned list. Get the assigned list by id (taskObj.assignedList) and print inside through innerHTML. Give the div id=taskObj.id to make sure every task div is unique. Task variable (247) is initialized to send to drag handlers (dragStart).
    for(const taskObj of taskArray) {
        document.getElementById(taskObj.assignedList).innerHTML += `<div class="list-element" draggable="true" ondragstart="dragStart(event, ${taskObj.taskId})" id="${taskObj.taskId}">${taskObj.taskText} <button class="btn-person-to-task" onclick="printForm('personToTask','${taskObj.taskId}')">+</button></div>`;

        // If the task object har assigned persons, loop through them and print inside the tasks
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
    
    // Loop through personArray, and print individual divs for every person. document.getElementById(personObj.assignedGroup) makes sure the divs are printed in the correct lists, since the group IDs are unique. When they are dragged, they pass the values to the drag handlers to be stored.
    for(const personObj of personArray) {
        document.getElementById(personObj.assignedGroup).innerHTML += `<div class="list-element" draggable="true" ondragstart="dragStart(event, ${personObj.personId})" id="${personObj.personId}">${personObj.personName}</div>`;
    }
}

// Handler for drag start. "dragged" parameter is passed from the unique IDs that are assigned when the divs are printed.
function dragStart(event, dragged) {
    localStorage.setItem("dragged", dragged.id);
}

// Handler for drag over.
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

// Function for handling drag and drop functionaly for persons
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
    
}

// Handler for task or person elements being dropped in trash can (delete)
function deleteElement(event) {
    event.preventDefault();
    const draggedId = localStorage.getItem("dragged");

    // If else statement to determine whether a task or a person is being dragged (substring). Then loop through the correct array for the element and delete (splice) the index of given element. Save to local storage and render.
    if(draggedId.substring(0, 6) === "taskId") {
        const taskArray = JSON.parse(window.localStorage.getItem("taskArray"));
        for(let i = 0; i < taskArray.length; i++) {
            if(taskArray[i].taskId === draggedId) {
                taskArray.splice(i, 1);
                window.localStorage.setItem("taskArray", JSON.stringify(taskArray));
            }
        }
        renderTask();
    } else if(draggedId.substring(0, 8) ==="personId") {
        const personArray = JSON.parse(window.localStorage.getItem("personArray"));
        for(let i = 0; i < personArray.length; i++) {
            if(personArray[i].personId === draggedId) {
                personArray.splice(i, 1);
                window.localStorage.setItem("personArray", JSON.stringify(personArray));
            }
        }
        renderPeople();
    }
}


