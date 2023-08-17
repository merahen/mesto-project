// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

const profileEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popups = document.querySelectorAll('.popup')
const popupProfile = document.querySelector('.popup-profile');
const popupProfileClose = popupProfile.querySelector('.popup__close-icon');

const formElement = popupProfile.querySelector('.form'); //Форма для валидации
const formInput = formElement.querySelector('.form__input'); //Инпут для валидации
const formSubmit = formElement.querySelector('.form__button');
const inputName = formElement.querySelector('.form__profile-name');
const inputDescription = formElement.querySelector('.form__profile-description');

const popupImageContainer = document.querySelector('.popup-image');
const popupImageCloseButton = popupImageContainer.querySelector('.popup__close-icon');

const popupImage = popupImageContainer.querySelector('.popup__image')
const popupCaption = popupImageContainer.querySelector('.popup__caption')

const card = document.querySelector('#element').content;
const cardsSection = document.querySelector('.elements');

const addButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-element');
const popupCardClose = popupCard.querySelector('.popup__close-icon');
const addCardButton = popupCard.querySelector('.form__button')
const cardName = popupCard.querySelector('.form__name');
const cardLink = popupCard.querySelector('.form__link');
const cardForm = popupCard.querySelector('.form')

const closeButtons = document.querySelectorAll('.popup__close-icon');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function editProfilePopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function openPopup (popup) {
  popup.classList.add('popup_opened')
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', editProfilePopup);

function submitFormHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
}

formElement.addEventListener('submit', submitFormHandler);

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


function createCard(title, link) {
  const cardElement = card.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = title;
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = title;
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
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.nextElementSibling.textContent;
    popupCaption.textContent =  evt.target.nextElementSibling.textContent;
    openPopup(popupImageContainer);
  })
  return cardElement;
}

function addCard(title, link) {
  const cardElement = createCard(title, link)
  cardsSection.prepend(cardElement);
 }

initialCards.forEach(item => {
  addCard(item.name, item.link);
})

addButton.addEventListener('click', () => {
  openPopup(popupCard);
})

function submitFormCardHandler(evt) {
  evt.preventDefault();
  addCard(cardName.value, cardLink.value);
  closePopup(popupCard);
  evt.target.reset();
}


cardForm.addEventListener('submit', submitFormCardHandler);


// Валидация

// const formElement = popupProfile.querySelector('.form'); //Форма для валидации
// const formInput = formElement.querySelector('.form__input'); //Инпут для валидации
// const formSubmit = formElement.querySelector('.form__button');
// const inputName = formElement.querySelector('.form__profile-name');
// const inputDescription = formElement.querySelector('.form__profile-description');

// const formError = formElement.querySelector(`.${formInput.id}-error`)

function showInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

function hideInputError(form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

function checkInputValidity(form, input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('')
  }
  if(!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

function toggleButtonState(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add('form__button_inactive');
  } else {
    button.classList.remove('form__button_inactive');
  }
}

function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  const buttonElement = form.querySelector('.form__button')

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement)
      checkInputValidity(form, input);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(form);
  })
}

enableValidation();



popups.forEach((popup) => {
  // const popup = button.closest('.popup');
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
      closePopup(popup)
      console.log('1')
    }
  })
});

