let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let taskBase = "n<button onclick='deleteTask(this)'>x</button>"

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
        let index = Array.prototype.indexOf.call(elementUnder[1].children, draggedElement);
        let height = 10;

        if (index >= 1) {
            let sibling = elementUnder[1].children[index-1].getBoundingClientRect();
            height += sibling.height + sibling.top;
        }
        
        draggedElement.style.position = "absolute";
        draggedElement.style.top = height + "px";
        draggedElement.style.left = "10%";

        updateContainer(oldParent);
    } 

    draggedElement = null;
    window.removeEventListener("mousemove", move);
}

function updateContainer(obj) {
    for (var i=0; i < obj.children.length; i++) {
        if (i === 0) {
            obj.children[i].style.top = "10px";
        } else {
            let sibling = obj.children[i-1].getBoundingClientRect();
            obj.children[i].style.top = sibling.height + sibling.top + 10 + "px";
        }
        
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

updateContainer(document.getElementsByClassName("container")[0]);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("mouseup", mouseUp);