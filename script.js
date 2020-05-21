
/*var listName = document.getElementById("lName");
var listDescription = document.getElementById("descript");
var addList = document.getElementById("submit");*/

var list = document.getElementsByClassName("newL")[0];

//Printing buttons for list
function printForm(formType) {
    switch(formType) {
        case "newList":
            list.innerHTML = '<form onsubmit="createList(event)"><div id="inputField"><label for="list-name">LIST NAME:</label><input name="list-name-input" type="text"></div><div id="inputField"><label for="list-description">LIST DESCRIPTION:</label><input name="list-description-input" type="text"></div><div id="inputField"><button type="submit">ADD LIST</button></div></form>';
        break;
    }
}

function renderTaskList() {
    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];
    const listContainer = document.getElementById("listContainer");
    listContainer.innerHTML = "";
    

    for(const listObj of listArray) {
        const listElement = document.createElement("div");
        listElement.className = "list-div";
        listElement.innerText =  ` ${listName} + ${listDescription}`;
        listContainer.appendChild(listElement);
    }
}

function addList() {
    //event.preventDefault();
    var list = document.getElementById("newL");
    
    const listName = document.getElementById("list-name-input").value;
    const listDescription = document.getElementById("list-description-input").value;

    const listObj = {listName, listDescription};

    console.log(listObj);

    const listArray = JSON.parse(window.localStorage.getItem("listArray")) || [];
    listArray.push(listObj);
    window.localStorage.setItem("listArray", JSON.stringify(listArray));

    list.style.display = "none";

    renderTaskList();
    list.innerHTML = "";
}



/*var list = document.getElementById("newL");

var whatTask = document.getElementById("tasks");
var button = document.getElementById("buttons").addEventListener('click', function(evt){
    var buttonPushed = evt.target;
    if(buttonPushed.id === 'newList'){
        list.style.display = "block";
    }else if(buttonPushed.id === 'newTask'){
        list.style.display = "none";
    }
})*/