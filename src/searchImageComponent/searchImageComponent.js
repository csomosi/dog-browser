import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

class SearchImage extends ContentComponent {
  constructor() {
    super();
    // egyből futtatjuk is amit megírunk lentebb:
    this.render();
  }

  render() {
    const markup = `
    <form class="dog-search">
      <span class="search-icon"></span>
      <input type="text" id="dogSearchInput">
      <input type="text" id="imageNumberInput" placeholder="1">
      <button type="submit">Search</button>
    </form>
   `;

    //  a render változó egy sztringként tárolja a html kódot, amit ezzel renderelünk az oldalon:
    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);
    //  figyeljük, hogy kattintás történik-e a search gombra:
    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      // megakadályozzuk, hogy újratöltsön az oldal:
      event.preventDefault();
      this.handleSearch();
    });
  }
}

export default SearchImage;
