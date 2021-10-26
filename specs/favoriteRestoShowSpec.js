import FavoriteRestoSearchView
from '../src/scripts/views/pages/liked-restos/favorite-resto-search-view';
import FavoriteRestoShowPresenter
from '../src/scripts/views/pages/liked-restos/favorite-resto-show-presenter'
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

describe('Showing all favorite restos', () => {
 let view;

 const renderTemplate = () => {
  view = new FavoriteRestoSearchView();
  document.body.innerHTML = view.getFavoriteRestoTemplate();
 }

 beforeEach(() => {
  renderTemplate();
 });

  describe('When no restos have been liked', () => {
   it('should ask for the favorite restos', () => {
     const favoriteRestos = spyOnAllFunctions(FavoriteMovieIdb);

     new FavoriteRestoShowPresenter({
       view,
       favoriteRestos,
     });

     expect(favoriteRestos.getAllMovies).toHaveBeenCalledTimes(1)
   })

   it('should show the information that no restos have been liked', (done) => {
    document.getElementById('movies').addEventListener('movies:updated', () => {
      expect(document.querySelectorAll('.movie-item__not__found').length)
        .toEqual(1);

      done();
    });

    const favoriteRestos = spyOnAllFunctions(FavoriteMovieIdb);
    favoriteRestos.getAllMovies.and.returnValues([]);

    new FavoriteRestoShowPresenter({
     view,
     favoriteRestos,
    });
   });
  });
});
