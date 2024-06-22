let isOpen = false;

function openHamburgerNav () {
    let hamburgerButton = document.getElementById("hamburger-nav-container");

    if (isOpen) {
        hamburgerButton.style.display = "none";
        isOpen = false;
    } else {
        hamburgerButton.style.display = "flex";
        isOpen = true;
    }           
}