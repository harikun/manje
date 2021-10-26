// Yang Mengikat Kita

import { itActsAsFavoriteRestoModel } from "./contract/favoriteRestoContract";
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

describe('Favorite Resto Idb Contract Test Implementation', () => {
 afterEach(async () => {
  (await FavoriteMovieIdb.getAllMovies()).forEach(async (movie) => {
   await FavoriteMovieIdb.deleteMovie(movie.id);
  });
 });

 itActsAsFavoriteRestoModel(FavoriteMovieIdb);
});