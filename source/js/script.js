`use strict`;

// Mobile menu

let nav = document.querySelector(`.nav`);
let navToggle = document.querySelector(`.nav__burger`);
let catalog = document.querySelector(`.catalog`);
if (nav && navToggle) {
  nav.classList.remove(`nav--nojs`);
  navToggle.addEventListener(`click`, function () {
    if (nav.classList.contains(`nav--closed`)) {
      nav.classList.remove(`nav--closed`);
      nav.classList.add(`nav--opened`);
      document.body.style.overflowY = `hidden`;
    } else {
      nav.classList.add(`nav--closed`);
      nav.classList.remove(`nav--opened`);
      document.body.style.overflowY = `auto`;
    }
  });
}
if (catalog) {
  catalog.classList.remove(`catalog--nojs`);
}

// Jump element
const TABLET_MEDIA_QUERY = 1023;
let navList = document.querySelector(`.nav__menu-list`);
let navListHidden = document.querySelector(`.nav__menu-list--hidden`);
let navMenu = document.querySelector(`.nav__menu`);
let topHeader = document.querySelector('.nav__top');
let logo = document.querySelector('.nav__logo');
let initList = document.querySelector('.nav__init-list');
let bas = document.querySelector('.nav__init-item--bas');
let search = document.querySelector(`.nav__search`);
let login = document.querySelector(`.nav__init-item--login`);
if (window.screen.width < TABLET_MEDIA_QUERY) {
  navMenu.insertBefore(search, navList);
  navMenu.insertBefore(login, navListHidden);
}
window.addEventListener(`resize`, function () {
  if (window.screen.width < TABLET_MEDIA_QUERY) {
    navMenu.insertBefore(search, navList);
    navMenu.insertBefore(login, navListHidden);
  }
  else {
    topHeader.insertBefore(search, logo);
    initList.insertBefore(login, bas);
  }
});

// Swiper
new Swiper(`.new-in__slider`, {
  navigation: {
    nextEl: `.new-in__slider-btn--next`,
    prevEl: `.new-in__slider-btn--prev`
  },

  breakpoints: {
    320: {
      pagination: {
        el: `.new-in__slider-pagination`,
        type: `fraction`,
        renderFraction: function (currentClass, totalClass) {
          return `<span class=" ${currentClass} "></span> of <span class=" ${totalClass} "></span>`;
        },
      },
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2
    },
    768: {
      pagination: {
        el: `.new-in__slider-pagination`,
        type: `bullets`,
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}">${index + 1}</span>`;
        },
      },
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2
    },
    1024: {
      pagination: {
        el: `.new-in__slider-pagination`,
        type: `bullets`,
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class=" ${className} "> ${index + 1} </span>`;
        },
      },
      slidesPerView: 4,
      spaceBetween: 30,
      //Кол-во пролистываемых слайдов
      slidesPerGroup: 4
    },
  },
});

// Accordion index.html
let accordionTrigger = document.querySelectorAll(`.questions__accordion-trigger`);
let accordionItem = document.querySelectorAll(`.questions__accordion-item`);
if (accordionTrigger && accordionItem) {
  accordionTrigger.forEach(function (accordionItem) {
    accordionItem.addEventListener(`click`, function () {
      let parent = accordionItem.parentNode;
      if (parent.classList.contains(`questions__accordion-item--active`)) {
        parent.classList.remove(`questions__accordion-item--active`);
      }
      else {
        document.querySelectorAll(`.questions__accordion-item`)
          .forEach((child) => child.classList.remove(`questions__accordion-item--active`))
        parent.classList.add(`questions__accordion-item--active`);
      }
    })
  })
}

// Accordion filter catalog.html
let filterTrigger = document.querySelectorAll(`.filter__accordion-trigger`);
let filterAccordeon = document.querySelector(`.filter__accordion`);

if (filterAccordeon) {
  filterAccordeon.classList.add(`js-on`);
  filterTrigger.forEach(function (item) {
    item.addEventListener(`click`, function () {
      let parent = item.parentNode;
      parent.classList.toggle(`filter__accordion-item--active`);
    })
  })
}

// Modals
let loginPopup = document.querySelector(`.popup-login`);
let loginPopupOpen = document.querySelector(`.nav__init-link--login`);
let loginPopupClose = loginPopup.querySelector(`.popup-login__close-btn`);
let filterPopup = document.querySelector(`.filter`);
let filterPopupOpen = document.querySelector(`.catalog__filter-open-btn`);
let filterPopupClose = document.querySelector(`.filter__close-btn`);
let addPopup = document.querySelector(`.modal-add`);
let addPopupClose = document.querySelector(`.modal-add__btn-close`);
let addPopupOpen = document.querySelector(`.product__btn-open`);
let body = document.querySelector(`body`);
let lastFocusedElement;

const getOpenPopup = (openPopup, popup) => {
  let focusElement = popup.querySelector(`*[data-focus]`);
  openPopup.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    lastFocusedElement = document.activeElement;
    popup.classList.add(`open`);
    document.body.style.overflow = `hidden`;
    document.querySelector('*:focus').blur();
    setTimeout(function timeout() {
      focusElement.focus();
    }, 0);
  });
};

const getClosePopup = (closePopup, popup) => {
  closePopup.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    popup.classList.remove(`open`);
    document.body.style.overflow = `auto`;
    lastFocusedElement.focus();
  });

  let onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      popup.classList.remove(`open`);
      document.body.style.overflow = `auto`;
      lastFocusedElement.focus();
    }
  };
  document.addEventListener(`keydown`, onPopupEscPress);
};

if (loginPopupOpen && loginPopup) {
  getOpenPopup(loginPopupOpen, loginPopup);
  getClosePopup(loginPopupClose, loginPopup);
}
if (filterPopup && filterPopupOpen) {
  getOpenPopup(filterPopupOpen, filterPopup);
  getClosePopup(filterPopupClose, filterPopup);
};
if (addPopup && addPopupOpen) {
  getOpenPopup(addPopupOpen, addPopup);
  getClosePopup(addPopupClose, addPopup);
};
