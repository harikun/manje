import { createMovieItemTemplate } from '../../templates/template-creator';

// Tak Semuanya Perlu Diketahui
class FavoriteRestoSearchView {
  getTemplate() {
    return `
    <div id="resto-search-container">
      <input id="query" type="text">
        <div class="resto-result-container">
        <ul class="movies">
        </ul>
      </div>
    </div>
    `;
  }

  getFavoriteRestoTemplate() {
    return ` <div class="content">
        <h2 class="content__heading">Your Liked Resto</h2>
        <div id="movies" class="movies">

        </div>
    </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestos(restos) {
    let html;
    if (restos.length > 0) {
      html = restos.reduce(
        (carry, resto) => carry.concat(`<li class="movie"><span class="movie__title">${resto.title || '-'}</span></li>`),
        '',
      );
    } else {
      html = '<div class="movies__not__found">Resto tidak ditemukan</div>';
    }

    document.querySelector('.movies').innerHTML = html;

    document.getElementById('resto-search-container')
      .dispatchEvent(new Event('movies:searched:updated'));
  }

  showFavoriteRestos(restos = []) {
    let html;
    if (restos.length) {
      html = restos.reduce((carry, resto) => carry.concat(createMovieItemTemplate(resto)), '');
    } else {
      html = this._getEmptyRestoTemplate();
    }

    document.getElementById('movies').innerHTML = html;

    document.getElementById('movies').dispatchEvent(new Event('movies:updated'));
  }

  _getEmptyRestoTemplate() {
    return '<div class="movie-item__not__found movies__not__found">Resto tidak ditemukan</div>';
  }
}

export default FavoriteRestoSearchView;
