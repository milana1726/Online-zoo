//BURGER MENU
const menu = document.querySelector(".nav_burger");
const menuItems = document.querySelectorAll(".nav_item");
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

//AMOUNT
let yellow_dots = document.querySelectorAll('input.dot');
let amount = document.getElementById('donate_amount');
let amount_checked = document.getElementById('value100');
let range_value = 100;

yellow_dots.forEach(elem => {
  elem.addEventListener('click', (e) => {
    range_value = e.target.value;
    amount.value = range_value;
  });
});

function matchAmountDots(input_value) {
  if (input_value.value !== '5000' || input_value.value !== '2000' ||
      input_value.value !== '1000' || input_value.value !== '500' ||
      input_value.value !== '250' || input_value.value !== '100' ||
      input_value.value !== '50' || input_value.value !== '25') {
        document.getElementById('value5000').checked = false;
        document.getElementById('value2000').checked = false;
        document.getElementById('value1000').checked = false;
        document.getElementById('value500').checked = false;
        document.getElementById('value250').checked = false;
        document.getElementById('value100').checked = false;
        document.getElementById('value50').checked = false;
        document.getElementById('value25').checked = false;
  }
  switch (input_value.value) {
      case '5000':
          document.getElementById('value5000').checked = true;
          break;
      case '2000':
          document.getElementById('value2000').checked = true;
          break;
      case '1000':
          document.getElementById('value1000').checked = true;
          break;
      case '500':
          document.getElementById('value500').checked = true;
          break;
      case '250':
          document.getElementById('value250').checked = true;
          break;
      case '100':
          document.getElementById('value100').checked = true;
          break;
      case '50':
          document.getElementById('value50').checked = true;
          break;
      case '25':
          document.getElementById('value25').checked = true;
          break;
      default:
          return;
  }
}

window.addEventListener('DOMContentLoaded', () => {
    amount.value = range_value;
    amount_checked.checked = true;
});