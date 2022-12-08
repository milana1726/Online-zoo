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

let petsArr = [];
const pets_container = document.querySelector('.cards_container');
const btn_left = document.querySelector('.arrow_left');
const btn_right = document.querySelector('.arrow_right');

window.addEventListener('DOMContentLoaded', () => {
    createCards();

    fetch('./feedbacks.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let feedbacks = data.map((item, index) => ({...item, id: index}));
        return feedbacks;
    })
    .then(data => {
        createUserCard(data);
    });
});

window.addEventListener('resize', () => {
    createCards();

    fetch('./feedbacks.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let feedbacks = data.map((item, index) => ({...item, id: index}));
        return feedbacks;
    })
    .then(data => {
        createUserCard(data);
    });
});

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
    transformSlide(petsArr);
};

async function createSlider(arr) {
    let pets = await getDataPets();
    arr.forEach(item => {
        pets_container.append(createPetCard(pets[item]))
    });
}

btn_right.addEventListener('click', () => {
    showCards('next');
});
btn_left.addEventListener('click', () => {
    showCards('prev');
});

function showCards(btnInfo) {
    const randomArr = randomArrayFunc(petsArr);
    createSlider(randomArr);
    transformSlide(petsArr, btnInfo);
    setTimeout(() => {
        removeCards(petsArr);
    }, 1000);
    petsArr = randomArr;
};

function transformSlide(arr, btnInfo) {
    let wrapperWidth;
    switch(arr.length) {
        case 4: wrapperWidth = 640; break;
        case 6: wrapperWidth = 1600; break;
    }
    if (btnInfo === 'next') {
        pets_container.style.justifyContent = 'flex-start';
        pets_container.style.transform = `translateX(-${wrapperWidth}px)`;
        pets_container.style.transition = '0.5s ease-in-out';
    } else if(btnInfo === 'prev'){
        pets_container.style.justifyContent = 'flex-end';
        pets_container.style.transform = `translateX(${wrapperWidth}px)`;
        pets_container.style.transition = '0.5s ease-in-out';
    }
}

function removeCards(arr, btnInfo) {
    pets_container.style.transform = 'translateX(0)';
    pets_container.style.transition = '0s';
    for (let i = 0; i < arr.length; i++) {
        pets_container.removeChild(pets_container.firstChild);
    }
}

function randomArrayFunc(arr) {
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
const sliderContainer = document.querySelector('.testimonials_container');
const slider = document.getElementById("slider_range");

const screenWidth = window.screen.width;

if (screenWidth < 1000) {
  const testimonials = document.querySelectorAll(".testimonials-card");

  if (testimonials) {
    testimonials.forEach((item) => {
      item.addEventListener("click", (event) => showPopup(event));
    });
  }
}

function createUserCard(data) {
    let output = '';
    let index = 0;
    for (let item of data) {
        output += `
        <div class="user_card fade" id="${index}">
            <div class="user_info">
                <img class="user_icon" src="${item.img}" alt="user_icon">
                <div class="user_text">
                    <h4>${item.name}</h4>
                    <p>${item.location}&ensp;•&ensp;${item.date}</p>
                </div>
            </div>
            <div class="user_feedback">
                <p>${item.description}</p>
            </div>
        </div>`;
        index++;
    }

    sliderContainer.innerHTML = output;

    const userCard = document.querySelectorAll('.user_card');
    if (window.innerWidth < 1000) {
        userCard.forEach((card, id = card.id) => {
            card.onclick = () => {
                openModal(data, id);
            }
        });
    }
};

function openModal(data, id) {
    let output = '';
    output += `
            <div class="user_info">
                <img class="user_icon" src="${data[id].img}" alt="user_icon">
                <div class="user_text">
                    <h4>${data[id].name}</h4>
                    <p>${data[id].location}&ensp;•&ensp;${data[id].date}</p>
                </div>
            </div>
            <div class="user_feedback">
                <p>${data[id].description}</p>
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
}

slider.addEventListener('input', () => {
    rangeValue();
});

function rangeValue() {
    const cardUser = document.querySelector('.user_card');

    let rangeValue = Number(slider.value);
    let cardWidth = cardUser.offsetWidth;
    let gap = 30;

    cardWidth = Number.parseInt(cardWidth, 10);
    let size = cardWidth + gap;
    sliderContainer.setAttribute("style", `transform: translate(-${rangeValue * size}px);`);
}