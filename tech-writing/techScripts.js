function toggleDropDown(id) {
    var current = document.getElementById(id).style.display;
    if (current === "block") {
        document.getElementById(id).style.display = "none";
    } else {
        document.getElementById(id).style.display = "block";
    }
}

function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({behavior: "smooth"});
}

function swapPageSection(page, id) {
    window.location.href = `${page}#${id}`;
}