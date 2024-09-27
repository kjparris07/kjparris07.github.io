let carousels = [0, 0, 0];

let carousel1 = ["imgs/carousel/carousel1/reliquary2.jpg", "imgs/carousel/carousel1/reliquary1.jpg", "imgs/carousel/carousel1/reliquary3.jpg"]
let carousel2 = ["imgs/carousel/carousel2/foot1.jpeg", "imgs/carousel/carousel2/foot2.jpeg", "imgs/carousel/carousel2/foot3.jpeg"]
let carousel3 = ["imgs/carousel/carousel3/bust1.jpeg", "imgs/carousel/carousel3/bust2.jpeg", "imgs/carousel/carousel3/bust3.jpeg"]

function toggleNavBar() {
    var links = document.getElementById("links");

    links.classList.add("allow-transition");
    links.classList.toggle("active");
}

function closeNavBar() {
    var links = document.getElementById("links");

    links.classList.add("allow-transition");
    links.classList.remove("active");
}

function scrollToElement(id) {
    var element = document.getElementById(id)
    var top = element.getBoundingClientRect().top;
    window.scroll({top: top + window.scrollY - 60, left: 0, behavior: "smooth"});
}

function handleResize() {
    const links = document.getElementById("links");
    if (window.innerWidth > 965) {
        links.classList.remove("allow-transition");
        links.classList.remove("active");
    }
}

function handleClick() {
    closeNavBar();
}

function prevImage(index) {
    let image = document.querySelectorAll(".card .carousel")[index].querySelector("img");
    var imgArr, i;

    if (index === 0) {
        imgArr = carousel1;
    } else if (index === 1) {
        imgArr = carousel2;
    } else if (index === 2) {
        imgArr = carousel3;
    }
    i = imgArr.indexOf(image.getAttribute("src"))-1;
    if (i === -1) {
        i = imgArr.length-1;
    } 
    image.src = imgArr[i];
}

function nextImage(index) {
    let image = document.querySelectorAll(".card .carousel")[index].querySelector("img");
    var imgArr, i;

    if (index === 0) {
        imgArr = carousel1;
    } else if (index === 1) {
        imgArr = carousel2;
    } else if (index === 2) {
        imgArr = carousel3;
    }
    i = imgArr.indexOf(image.getAttribute("src"))+1;
    if (i === imgArr.length) {
        i = 0;
    } 
    image.src = imgArr[i];
}

window.addEventListener("resize", handleResize);
