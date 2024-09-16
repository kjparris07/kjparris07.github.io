var template = '<div class="item"><button class="x" onclick="deleteTask(this)"><i class="fa-solid fa-x"></i></button><input class="checkbox" type="checkbox" onclick="crossOut(this)"> <a class="task" onblur="stopEditingTask(this)">Enter Your Task Here...</a> <div class="icons"><i class="fa-solid fa-caret-up caret" onclick="moveUp(this)"></i><i class="fa-solid fa-caret-down caret" onclick="moveDown(this)"></i><i class="fa-solid fa-pencil icon pencil" onclick="toggleTask(this)"></i><i class="fa-solid fa-check icon check" onclick="toggleTask(this)"></i></div></div>';

let listDiv = document.getElementById("toDoList");

for (let i=0; i < 3; i++) {
    listDiv.innerHTML += template;
    listDiv.children[i].querySelector(".task").innerHTML = "Sample Task " + (i+1);
}
updateCarets();

function crossOut(checkbox) {
    let parent = checkbox.parentElement;
    let task = parent.querySelector(".task");
    let classes = Array.from(task.classList);

    // move task to bottom if completed
    if (classes.indexOf("completed") < 0) {
        listDiv.insertBefore(parent, listDiv.children[listDiv.children.length]);
    }
    task.classList.toggle("completed"); 
    updateCarets();
}

function toggleTask(icon) {
    let parent = icon.parentElement.parentElement;
    let task = parent.querySelector(".task");

    let check = parent.querySelector(".icons .check");
    let pencil = parent.querySelector(".icons .pencil");
    
    if (task.contentEditable === "true") {
        task.contentEditable = "false";
        check.style.display = "none";
        pencil.style.display = "inline";
    } else {
        task.contentEditable = "true";
        task.focus();
        check.style.display = "inline";
        pencil.style.display = "none";
    }
}

function stopEditingTask(task) {
    let parent = task.parentElement;
    let icon = parent.querySelector(".check");
    toggleTask(icon);
}

function addTask() {
    listDiv.innerHTML += template;

    let newTask = document.querySelector("#toDoList").lastChild;
    toggleTask(newTask.querySelector(".check"));
    updateCarets();
}

function deleteTask(button) {
    let parent = button.parentElement;
    parent.remove();
    updateCarets()
}

function moveUp(caret) {
    let item = caret.parentElement.parentElement;
    let index = getChildIndex(item);
    listDiv.insertBefore(item, listDiv.children[index-1]);
    updateCarets()
}

function moveDown(caret) {
    let item = caret.parentElement.parentElement;
    let index = getChildIndex(item);
    listDiv.insertBefore(item, listDiv.children[index+2]);
    updateCarets();
}

function updateCarets() {
    for (let i=0; i<listDiv.children.length; i++) {
        if (listDiv.children.length == 1) {
            listDiv.children[i].querySelector(".fa-caret-up").style.display = "none";
            listDiv.children[i].querySelector(".fa-caret-down").style.display = "none";
        } else if (i==0) {
            listDiv.children[i].querySelector(".fa-caret-up").style.display = "none";
            listDiv.children[i].querySelector(".fa-caret-down").style.display = "inline";
        } else if (i == listDiv.children.length-1) {
            listDiv.children[i].querySelector(".fa-caret-down").style.display = "none";
            listDiv.children[i].querySelector(".fa-caret-up").style.display = "inline";
        } else {
            listDiv.children[i].querySelector(".fa-caret-up").style.display = "inline";
            listDiv.children[i].querySelector(".fa-caret-down").style.display = "inline";
        }
    }
}

function getChildIndex(childElement) {
    let parent = childElement.parentElement;
    let children = Array.from(parent.children);
    return children.indexOf(childElement)
}
