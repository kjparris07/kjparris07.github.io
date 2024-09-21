let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

function move(event) {
    if (draggedElement) {
        draggedElement.style.position = "fixed";
        draggedElement.style.left = event.pageX - offsetX + "px";
        draggedElement.style.top = event.pageY - offsetY + "px";
        draggedElement.style.width= draggedElement.parentNode.getBoundingClientRect().width*0.8 + "px";
    }
    
}

function mouseDown(event) {
    let div = event.target;
    if (div.classList.contains("tasks") || div.classList.contains("text")) {
        if (div.classList.contains("tasks")) {
            draggedElement = div
        } else {
            draggedElement = div.parentNode;
        }
        
        let box = draggedElement.getBoundingClientRect();
        offsetX = event.pageX - box.left;
        offsetY = event.pageY - box.top;
        window.addEventListener("mousemove", move);
    }
}

function mouseUp(event) {
    let elementUnder = document.elementsFromPoint(event.pageX, event.pageY);

    if (elementUnder[0] !== undefined) {
        if ((elementUnder[0].classList.contains("tasks") || elementUnder[0].classList.contains("text")) && (elementUnder[1].classList.contains("container") || elementUnder[2].classList.contains("container"))) {
            let oldParent = draggedElement.parentNode;
            if (elementUnder[0].classList.contains("text")) {
                elementUnder[2].appendChild(draggedElement);
            } else {
                elementUnder[1].appendChild(draggedElement);
            }
            updateContainer(oldParent);
        } 
    }
    

    if (draggedElement) {
        draggedElement.style.position = "absolute";
        updateContainer(draggedElement.parentNode);
    }

    draggedElement = null;
    window.removeEventListener("mousemove", move);
}

function updateContainer(obj) {
    let topPosition = 40;
    for (var i=1; i < obj.children.length; i++) {
        let child = obj.children[i];
        child.style.position = "absolute";
        child.style.top = topPosition + "px";
        child.style.left = "10%";

        topPosition += child.getBoundingClientRect().height + 10;
    }
}

function deleteTask(button) {
    let parent = button.parentNode;
    let grandparent = parent.parentNode;
    let greatGrandparent = grandparent.parentNode
    greatGrandparent.removeChild(grandparent);
    updateContainer(greatGrandparent);
}

function addTask() {
    let container = document.querySelector(".container");
    let taskText = document.querySelector("#taskText").value;
    let taskBase = `<div class='text'><i class='fa-solid fa-xmark' onclick='deleteTask(this)'></i>${taskText}</div>`;

    if (taskText.length !== 0) {
        let newTask = document.createElement("div");

        newTask.classList.add("tasks");
        newTask.innerHTML = taskBase;
        container.appendChild(newTask);
        updateContainer(container);
    }
    document.querySelector("#taskText").value = "";
}

function editTask(pencil) {
    let parent = pencil.parentNode;
    let text = parent.children[0];
    text.contentEditable = "true";
    text.style.border = "1px solid #a3885d";
    text.style.backgroundColor = "#f0eadf";
    console.log(parent.children);
}

function resizeElements() {
    containers = document.querySelectorAll(".container");
    for (var i=0; i<containers.length; i++) {
        for (var j=1; j<containers[i].children.length; j++) {
            containers[i].children[j].style.width= containers[i].getBoundingClientRect().width*0.8 + "px";
            containers[i].children[j].style.left = "10%";
        }
        updateContainer(containers[i]);
    }
}

let containers = document.querySelectorAll(".container");
for (var i=0; i<containers.length; i++) {
    updateContainer(containers[i]);
}

window.addEventListener("mousedown", mouseDown);
window.addEventListener("mouseup", mouseUp);
window.addEventListener("resize", resizeElements);