import '../css/contentComponent.css';

export default class ContentComponent {
  /* így csináljuk az object-et, majd exportáljuk normál esetben, a fenti ennek az egy sorba írt változata:
class ContentComponent {}

export default ContentComponent; */

  // metódus a hibaüzenet megjelenítéséhez a html-ben:
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.textContent = message;
    document.querySelector('.errors').appendChild(popupMessage);
  }

  // ahhoz, hogy ne írja ki sokszor az error message-et, ezzel a metódussal mindig töröljük a meglévő error message-et (az adott div tartalmát):
  clearErrors() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
  }

  // a képet mindig töröljük a következő keresés előtt, hogy csak 1 jelenjen meg. Ez ugyanolyan kódrész mint a clearError, onnan másoljuk, az error változó benne maradhat is:
  clearContent() {
    const errors = document.querySelector('#content');
    errors.innerHTML = '';
  }
}
