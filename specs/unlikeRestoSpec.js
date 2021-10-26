// Ketika Pikiranku Berubah

import FavoriteMovieIdb from "../src/scripts/data/favorite-movie-idb";
import * as TestFactories from './helper/testFactories';

const addLikeButtonContainer = () => {
 document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking A Resto', () => {
 beforeEach(async () => {
  addLikeButtonContainer();
  await FavoriteMovieIdb.putMovie({ id: 1 });
 });

 afterEach(async () => {
  await FavoriteMovieIdb.deleteMovie(1);
 });

 it('should display unlike widget when the resto has been liked', async () => {
  await TestFactories.createLikeButtonPresenterWithResto({ id: 1});

  expect(document.querySelector('[aria-label="unlike this resto"]'))
   .toBeTruthy();
 });

 it('shoult not display like widget when the resto has been liked', async () => {
  await TestFactories.createLikeButtonPresenterWithResto({ id: 1});

  expect(document.querySelector('[aria-label="like this resto"]'))
   .toBeFalsy();
 });

 it('should be able to remove liked resto from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1});

  document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));

  expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
 });

 it('should not throw error if the unlike resto is not in the list', async () => {
  await TestFactories.createLikeButtonPresenterWithResto({ id: 1});

  // hapus dulu resto dari daftar film yang disukai
  await FavoriteMovieIdb.deleteMovie(1);

  // kemudian, simulasikan pengguna menekan widget batal menyukai resto
  document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'))

  expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
 });
});