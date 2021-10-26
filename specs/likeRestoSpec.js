// Kutangkap Bugs Dengan Jaring Pengaman

import FavoriteMovieIdb from './../src/scripts/data/favorite-movie-idb';
import * as TestFactories from './helper/testFactories';

describe('Liking A Resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

 it('should show the like buttton when the resto has not been liked before', async () => {
  await TestFactories.createLikeButtonPresenterWithResto({ id: 1})

  expect(document.querySelector('[aria-label="like this resto"]'))
   .toBeTruthy();
 });

 it('should show the unlike buttton when the resto has not been liked before', async () => {
  await TestFactories.createLikeButtonPresenterWithResto({ id: 1})

  expect(document.querySelector('[aria-label="unlike this resto"]'))
   .toBeFalsy();
 });

 it('should be able to like the resto', async () => {
  await TestFactories.createLikeButtonPresenterWithResto({ id: 1})

  document.querySelector('#likeButton').dispatchEvent(new Event('click'));
  const resto = await FavoriteMovieIdb.getMovie(1);

  expect(resto).toEqual({ id: 1 });

  FavoriteMovieIdb.deleteMovie(1);
 });

 it('should not add a resto again when its already liked', async () => {
   await TestFactories.createLikeButtonPresenterWithResto({ id: 1})

   //tambahkan resto dengan ID 1 ke daftar resto yang disukai
   await FavoriteMovieIdb.putMovie({ id: 1 });
   // simulasikan pengguna menekan tombol suka film 
   document.querySelector('#likeButton').dispatchEvent(new Event('click'));
   // tidak ada film yang ada
   expect(await FavoriteMovieIdb.getAllMovies()).toEqual([{ id: 1}]);

   FavoriteMovieIdb.deleteMovie(1);
 });

 it('should not add a resto when it has no id', async () => {
   await TestFactories.createLikeButtonPresenterWithResto({})

   document.querySelector('#likeButton').dispatchEvent(new Event('click'));

   expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
 });
});
