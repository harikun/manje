class FavoriteRestoSearchPresenter {
  constructor({ favoriteMovies, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteMovies = favoriteMovies;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestos(latestQuery);
    });
  }

  async _searchRestos(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundRestos;
    if (this.latestQuery.length > 0) {
      foundRestos = await this._favoriteMovies.searchRestos(this.latestQuery);
    } else {
      foundRestos = await this._favoriteMovies.getAllMovies();
    }

    this._showFoundRestos(foundRestos);
  }

  _showFoundRestos(restos) {
    this._view.showRestos(restos);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestoSearchPresenter;
