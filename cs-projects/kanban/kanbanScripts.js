let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let taskBase = "<button onclick='deleteTask(this)'>x</button>n";

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
    if (div.classList.contains("tasks")) {
        draggedElement = div
        let box = draggedElement.getBoundingClientRect();
        offsetX = event.pageX - box.left;
        offsetY = event.pageY - box.top;
        window.addEventListener("mousemove", move);
    }
}

function mouseUp(event) {
    let elementUnder = document.elementsFromPoint(event.pageX, event.pageY);

    if (elementUnder[0].classList.contains("tasks") && elementUnder[1].classList.contains("container")) {
        let oldParent = draggedElement.parentNode;
        elementUnder[1].appendChild(draggedElement);

        updateContainer(oldParent);
    } 

    if (draggedElement) {
        draggedElement.style.position = "absolute";
        updateContainer(draggedElement.parentNode);
    }

    draggedElement = null;
    window.removeEventListener("mousemove", move);
}

function updateContainer(obj) {
    let topPosition = 10;
    for (var i=0; i < obj.children.length; i++) {
        let child = obj.children[i];
        child.style.position = "absolute";
        child.style.top = topPosition + "px";
        child.style.left = "10%";

        topPosition += child.offsetHeight + 10;
    }
}

function deleteTask(button) {
    let parent = button.parentNode;
    let grandparent = parent.parentNode;
    grandparent.removeChild(parent);
    updateContainer(grandparent);
}

function addTask() {
    let container = document.querySelector(".container");
    let newTask = document.createElement("div");
    newTask.classList.add("tasks");
    newTask.innerHTML = taskBase;
    container.appendChild(newTask);
    updateContainer(container);
}

function resizeElements() {
    let containers = document.querySelectorAll(".container");
    for (var i=0; i<containers.length; i++) {
        for (var j=0; j<containers[i].children.length; j++) {
            containers[i].children[j].style.width= containers[i].getBoundingClientRect().width*0.8 + "px";
            containers[i].children[j].style.left = "10%";
        }
    }
}

updateContainer(document.getElementsByClassName("container")[0]);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("mouseup", mouseUp);
window.addEventListener("resize", resizeElements);