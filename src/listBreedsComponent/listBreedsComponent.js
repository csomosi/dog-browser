import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

let existingList = false;

class listBreeds extends ContentComponent {
  constructor() {
    super();
    this.render();
  }

  async getFullList() {
    // this if statement is examining if breedlist is already fetched and stored. If not, it fetches:
    if (!existingList) {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (!response.ok) {
        throw new Error('API response error');
      }
      const data = await response.json();
      existingList = data.message;
      localStorage.setItem('existingList', JSON.stringify(existingList));
      return existingList;
      // if yes, it uses local storage:
    } else {
      existingList = JSON.parse(localStorage.getItem('existingList'));
      return existingList;
    }
  }
  /**
   * displays a single breed
   * @param {string} breedName name of the breed
   */
  createListItem(breedName) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.textContent = breedName;
    document.querySelector('#content').appendChild(item);
  }
  /**
   * displays the list of breeds
   * @param {Object} breedList - object containing the list of breeds
   */
  displayList(breedList) {
    // for (let ... in...) ciklus arra való, hogy egy object-en menjünk végig:
    for (let breed in breedList) {
      if (breedList[breed].length !== 0) {
        // ha van alfaj:
        for (const subBreed of breedList[breed]) {
          this.createListItem(`${subBreed} ${breed}`);
        }
      } else {
        this.createListItem(breed);
      }
    }
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.textContent = 'List breeds';
    button.addEventListener('click', () => {
      this.clearContent();
      this.getFullList()
        .then((breedList) => {
          breedList && this.displayList(breedList);
        })
        .catch((error) => {
          this.displayError('Error listing breeds');
          console.log(error);
        });
    });
    document.querySelector('#header').appendChild(button);
  }
}

export default listBreeds;
