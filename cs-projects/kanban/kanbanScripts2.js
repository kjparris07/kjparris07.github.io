let offsetX = 0;
let offsetY = 0

function move(event) {
    let div = document.querySelector("#test");

    div.style.position = "relative";
    div.style.top = event.pageY - offsetY/2 + "px";
    div.style.left = event.pageX - offsetX/2 + "px";
}

function mouseUp(event) {
    window.removeEventListener('mousemove', move);
    let div = document.querySelector("#test");

    let box = document.elementsFromPoint(event.pageX, event.pageY);
    if (box.length >= 3) {
        if (typeof box[1] != undefined & box[1].classList.length != 0 & box[0] === div) {
            if (box[1].classList[0] == "container") {
                
                box[0].style.postion = "absolute";
                box[0].style.top = "0";
                box[0].style.left = "0";

                box[1].appendChild(box[0]);
                console.log(box[1].childNodes);
                box[0].style.backgroundColor = "blue";
            }
        }
    } else if (box[0] == div) {
        box[0].style.backgroundColor = "red";
        console.log("hi");
        // box[0].parentNode.removeChild(box[0]);
    }
    
}

function handleMousePress(event) {
    let posX = event.pageX;
    let posY = event.pageY;

    let div = document.querySelector("#test");
    let divRect = div.getBoundingClientRect();

    console.log(posX, posY, divRect);
    let divX = divRect.x;
    let divY = divRect.y;
    let divWidth = div.offsetWidth;
    let divHeight = div.offsetHeight;

    offsetX = divWidth/2;
    offsetY = divWidth/2; 

    if (posX >= divX && posX <= (divX+divWidth) && posY >= divY && posY <= (divY+divHeight)) {
        window.addEventListener('mousemove', move);
    }
}

window.addEventListener('mousedown', handleMousePress);
window.addEventListener('mouseup', mouseUp);