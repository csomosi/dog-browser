import '../css/contentComponent.css';
import LazyLoad from 'vanilla-lazyload';
import preloading from '../img/preloading.gif';

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

  // a keresett fajta képeinek lekérése a dog API-ról (https://dog.ceo/dog-api/):
  async getImages(dogBreed) {
    // handling upper case characters in user input (conslole.log for testing):
    // console.log(dogBreed);
    dogBreed = dogBreed.toLowerCase();
    // console.log(dogBreed);

    // kezelni kell az 1 és 2 szóból álló fajták keresését:
    dogBreed = dogBreed.split(' ');
    let urlString;
    if (dogBreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogBreed[0]}/images`;
    } else if (dogBreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${dogBreed[1]}/${dogBreed[0]}/images`;
    }
    const response = await fetch(urlString);
    // hiba kezelés, ha nincs olyan fajta:
    if (response.status === 404) {
      return;
    }
    if (!response.ok) {
      throw new Error('API response error');
    }
    // ha nincs hiba, akkor visszaadjuk a response-t:
    const data = await response.json();
    return data.message;
  }

  // random kép megjelenítése egy img html element létrehohzásával:
  displayImage(imageList) {
    const image = document.createElement('img');
    const classes = image.classList;
    classes.add('lazy');
    image.src = preloading;
    image.dataset.src = imageList[Math.floor(Math.random() * imageList.length)];

    // this.clearContent();
    this.clearErrors();
    var lazyLoadInstance = new LazyLoad({});
    document.querySelector('#content').appendChild(image);
    lazyLoadInstance.update();
  }

  handleSearch() {
    // az input field értékét kiszedjük egy változóba:
    const searchTerm = document.querySelector('#dogSearchInput').value;
    // query the number from input field and convert it with Number function and Math.floor function:
    let count = Math.floor(Number(document.querySelector('#imageNumberInput').value));
    // number will be 1 if input field is empty or is NaN:
    if (!count) {
      count = 1;
    } else if (isNaN(count)) {
      count = 1;
    } else {
    }

    // hibakezelés, ha nincs beírva semmi, akkor meghívunk egy metódust:
    if (!searchTerm) {
      this.displayError('Please enter a search term!');
      return;
    }
    // a this.getImages metódus indítása, majd várakoztatással megjelentjük az oldalon az egyik elemét (képet), egy metódus segítségével:
    this.getImages(searchTerm)
      .then((imageList) => {
        // hibakezelés, ha nem megfelelő fajtát írt a keresőbe:
        if (imageList) {
          this.clearContent();
          for (let i = 1; i < count + 1; i++) {
            this.displayImage(imageList);
          }
        } else {
          this.displayError('Breed not found! Please try to list breeds first.');
        }
      })
      // minden egyéb hibát elkapunk a catch metódussal:
      .catch((error) => {
        this.displayError('Something went wrong. Please try again later.');
        console.error(error);
      });
  }

  setSearchTerm(item) {
    document.querySelector('#dogSearchInput').value = item.textContent;
    this.handleSearch();
  }
}
