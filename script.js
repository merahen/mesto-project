// РЕДАКТИРОВАТЬ ПРОФИЛЬ

const editProfile = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close-icon');

const formElement = popup.querySelector('.form')
const formSubmit = formElement.querySelector('.form__button')
const inputName = formElement.querySelector('.form__profile-name');
const inputDescription = formElement.querySelector('.form__profile-description');


function popupToggle() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popup.classList.toggle("popup_opened");
}

editProfile.addEventListener('click', popupToggle);

popupClose.addEventListener('click', popupToggle);


function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.toggle("popup_opened");
}

formElement.addEventListener('submit', formSubmitHandler);
