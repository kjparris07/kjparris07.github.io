function toggleNavBar() {
    console.log("toggleNavBar()")
    var linkContainer = document.getElementById("links");
    
    if (linkContainer.classList.length == 0) {
        linkContainer.classList.add("active");
    } else {
        linkContainer.classList.remove("active");
    }
    console.log(linkContainer.classList);
}

function scrollToAbout() {
    var screenHeight = window.innerHeight;
    window.scroll({top: screenHeight, left: 0, behavior: "smooth"});
}
