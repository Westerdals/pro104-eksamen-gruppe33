

var buttonM = document.getElementById("buttons").addEventListener('click', function(evt){
    var buttonPushed = evt.target;
    var newT = document.getElementById("taskU");
    var newP = document.getElementById("peopleU");
    var taskUnderline = document.getElementById("taskInput");
    var listUnderline = document.getElementById("listInput");
     if(buttonPushed.id === 'showT'){
        newT.style.display = "block";
        newP.style.display = "none";
     }else if(buttonPushed.id === 'showP'){
         newP.style.display = "block";
        newT.style.display = "none";
        taskUnderline.style.display = "none";
        listUnderline.style.display = "none";
    }
 })

 var buttonTask = document.getElementById("taskU").addEventListener('click', function(evt){
     var taskButtonPushed = evt.target;
     var taskUnderline = document.getElementById("taskInput");
    var listUnderline = document.getElementById("listInput");
     if(taskButtonPushed.id === 'newTask'){
         taskUnderline.style.display = "block";
         listUnderline.style.display = "none";
     }else if(taskButtonPushed.id === 'newList'){
        listUnderline.style.display = "block";
        taskUnderline.style.display = "none";
     }
 })