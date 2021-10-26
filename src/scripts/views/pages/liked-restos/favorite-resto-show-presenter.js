class FavoriteRestoShowPresenter {
  constructor({ view, favoriteRestos }) {
    this._view = view;
    this._favoriteRestos = favoriteRestos;

    this._showFavoriteRestos();
  }

  async _showFavoriteRestos() {
    const restos = this._favoriteRestos.getAllMovies();
    this._displayRestos(restos);
  }

  _displayRestos(restos) {
    this._view.showFavoriteRestos(restos);
  }
}

export default FavoriteRestoShowPresenter;
