const menu = document.querySelector(".nav_burger");
const menuItems = document.querySelectorAll(".nav_item");
// const hamburger= document.querySelector(".icon_nav_hidden");
const menuIcon = document.querySelector(".icon_burger");

function toggleMenu() {
  if (menu.classList.contains("show_menu")) {
    menu.classList.remove("show_menu");
    menuIcon.style.display = "block";
    menuIcon.style.transform = "rotate(180deg)";
    menuIcon.src = "../../assets/icons/burger_menu.png";


  } else {
    menu.classList.add("show_menu");
    menuIcon.style.transform = "rotate(90deg)";
    document.body.style.overflow = 'hidden';
    menuIcon.display = "block";
    menuIcon.src = "../../assets/icons/burger_menu_dark.png";
  }
}

menuItems.forEach(
  function(menuItem) {
    menuItem.addEventListener("click", toggleMenu);
  }
)