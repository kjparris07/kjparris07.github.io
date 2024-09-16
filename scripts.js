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

window.addEventListener("resize", handleResize);

// const form = document.getElementsByTagName("form");
// form.addEventListener("click", handleClick);