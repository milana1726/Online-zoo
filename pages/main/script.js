// BURGER MENU
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
);

// PETS SLIDER
async function getDataPets(){
        let response = await fetch('./pets.json');
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            alert("Error HTTP: " + response.status);
        }
}

window.addEventListener('DOMContentLoaded', () => {
    createCards();
    createFeedbacks(rangeValue);
});
window.addEventListener('resize', () => {
    createCards();
    createFeedbacks(rangeValue);
});

const pets_container = document.querySelector('.cards_container');
const btn_left = document.querySelector('.arrow_left');
const btn_right = document.querySelector('.arrow_right');

let petsArr = [];

function createPetCard({name, img, location, foodImg, icon}) {
    let fragment = document.createDocumentFragment();

    let card = document.createElement('div');
    card.classList.add('pet_card', 'fade');
    card.innerHTML = `
            <img class ="pet_image" src="${img}" alt="pet_photo">
            <div class="pet_info">
                <div class="pet_info_text">
                    <h4>${name}</h4>
                    <p>${location}</p>
                </div>
                <img class="${icon}" src="${foodImg}" alt="food_icon">
            </div>`;

    fragment.append(card);

    return fragment;
}

function createCards() {
    if (window.innerWidth > 640) {
        petsArr = [0, 1, 2, 3, 4, 5];
    } else {
        petsArr = [0, 1, 2, 3];
    };
    while (pets_container.firstChild) {
        pets_container.removeChild(pets_container.firstChild);
    }
    createSlider(petsArr);
};

async function createSlider(arr, btnInfo) {
    let pets = await getDataPets();
    arr.forEach(item => {
        if (btnInfo === 'next') {
            pets_container.append(createPetCard(pets[item]));
        } else {
            pets_container.prepend(createPetCard(pets[item]));
        }
    });
}

btn_right.addEventListener('click', () => {
    showCards('next');
});
btn_left.addEventListener('click', () => {
    showCards('prev');
});

function showCards(btnInfo) {
    const randomArr = randomArray(petsArr);
    createSlider(randomArr, btnInfo);
    setTimeout(() => {
        removeCards(petsArr, btnInfo);
    }, 500);
    petsArr = randomArr;
};

function removeCards(arr, btnInfo) {
    for (let i = 0; i < arr.length; i++) {
        btnInfo === 'next' ? pets_container.removeChild(pets_container.firstChild) : pets_container.removeChild(pets_container.lastChild);
    }
}

const randomArray = (arr) => {
    let currentIndex = arr.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}

// TESTMONIALS SLIDER
let feedbackArr = [];
const sliderContainer = document.querySelector('.testimonials_container');
const slider = document.getElementById("slider_range");

async function getDataFeedbacks(){
    let response = await fetch('../../pages/main/feedbacks.json');
    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        alert("Error HTTP: " + response.status);
    }
}

function createFeedbacks(rangeValue) {
    let i = rangeValue;
    if (i != 0) {
        i--;
    };
    if (window.innerWidth > 1000) {
        feedbackArr = [0 + i, 1 + i, 2 + i, 3 + i];
    } else {
        feedbackArr = [0 + i, 1 + i, 2 + i];
    };
    while (sliderContainer.firstChild) {
        sliderContainer.removeChild(sliderContainer.firstChild);
    }
    createSliderRange(feedbackArr);
};

async function createSliderRange(arr) {
    let feedbacks = await getDataFeedbacks();
    arr.forEach(item => sliderContainer.append(createUserCard(feedbacks[item])));
    slider.max = feedbacks.length;
}

function createUserCard({name, img, location, date, description}) {
    let fragment = document.createDocumentFragment();

    let card = document.createElement('div');
    card.classList.add('user_card', 'fade');
    card.addEventListener('click', () =>
        openModal(name, img, location, date, description));
    card.innerHTML = `
        <div class="user_info">
            <img class="user_icon" src="${img}" alt="user_icon">
            <div class="user_text">
                <h4>${name}</h4>
                <p>${location}&ensp;•&ensp;${date}</p>
            </div>
        </div>
        <div class="user_feedback">
            <p>${description}</p>
        </div>`

    fragment.append(card);

    return fragment;
}

function openModal(name, img, location, date, description) {
    let output = '';
    output += `
            <div class="user_info">
                <img class="user_icon" src="${img}" alt="user_icon">
                <div class="user_text">
                    <h4>${name}</h4>
                    <p>${location}&ensp;•&ensp;${date}</p>
                </div>
            </div>
            <div class="user_feedback">
                <p>${description}</p>
            </div>
            <div class="modal_close" type="button">+<div>`;
        document.getElementById("modal_container").classList.add("visible"),
        document.documentElement.style.overflowY = "hidden",
        document.querySelector(".user_modal_card").innerHTML = output;

        document.querySelector(".modal_close").addEventListener("click", function () {
            document.getElementById("modal_container").classList.remove("visible"),
                document.documentElement.style.overflowY = "visible";
        });


        document.getElementById("modal_container").addEventListener("click", function (e) {
            const click = e.composedPath().includes(document.getElementById("more_content"));
            if (!click) {
                document.getElementById("modal_container").classList.remove("visible");
                document.documentElement.style.overflowY = "visible";
            }
        });
};

let rangeValue = 0;

slider.addEventListener('input', () => {
    rangeValue = slider.value;
    createFeedbacks(rangeValue);
});
