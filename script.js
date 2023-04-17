// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

const editProfile = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup-profile');
const popupProfileClose = popupProfile.querySelector('.popup__close-icon');

const formElement = popupProfile.querySelector('.form');
const formSubmit = formElement.querySelector('.form__button');
const inputName = formElement.querySelector('.form__profile-name');
const inputDescription = formElement.querySelector('.form__profile-description');


function popupToggle() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popupProfile.classList.toggle("popup_opened");
}

editProfile.addEventListener('click', popupToggle);

popupProfileClose.addEventListener('click', popupToggle);


function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popupProfile.classList.toggle("popup_opened");
}

formElement.addEventListener('submit', formSubmitHandler);

// ДОБАВЛЕНИЕ КАРТОЧЕК

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

const card = document.querySelector('#element').content;
const cardsSection = document.querySelector('.elements');

function addCard(title, link) {
  const cardElement = card.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = title;
  cardElement.querySelector('.element__image').src = link;

  // Добавление лайков
  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  })

  // Удаление карточек
  cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  })

  //
  cardElement.querySelector('.element__image').addEventListener('click', (evt) => {
    popupImage.querySelector('.popup__image').src = evt.target.src;
    popupImage.querySelector('.popup__image').alt = evt.target.nextElementSibling.textContent;
    popupImage.querySelector('.popup__caption').textContent =  evt.target.nextElementSibling.textContent;
    popupImage.classList.toggle('popup_opened');
  })

  cardsSection.prepend(cardElement);

 }

 initialCards.forEach(item => {
  addCard(item.name, item.link);
})


const addButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-element');
const popupCardClose = popupCard.querySelector('.popup__close-icon');
const addCardButton = popupCard.querySelector('.form__button')


addButton.addEventListener('click', () => {
  popupCard.classList.toggle('popup_opened');
})

popupCardClose.addEventListener('click', () => {
  popupCard.classList.toggle('popup_opened');
})


function formCardSubmitHandler (evt) {
  evt.preventDefault();
  const cardName = popupCard.querySelector('.form__name');
  const cardLink = popupCard.querySelector('.form__link');
  addCard(cardName.value, cardLink.value)
  popupCard.classList.toggle('popup_opened');
}


addCardButton.addEventListener('click', formCardSubmitHandler);

const popupImage = document.querySelector('.popup-image');
const popupImageCloseButton = popupImage.querySelector('.popup__close-icon');

popupImageCloseButton.addEventListener('click', () => {
  popupImage.classList.toggle('popup_opened');
})
