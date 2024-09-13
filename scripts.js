function toggleNavBar() {
    var linkContainer = document.getElementById("links");
    
    if (linkContainer.classList.length == 0) {
        linkContainer.classList.add("active");
    } else {
        linkContainer.classList.remove("active");
    }
    console.log(linkContainer.classList);
}

function scrollToElement(id) {
    var element = document.getElementById(id)
    var top = element.getBoundingClientRect().top;
    window.scroll({top: top + window.scrollY - 60, left: 0, behavior: "smooth"});
}