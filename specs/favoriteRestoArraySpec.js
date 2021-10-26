import { itActsAsFavoriteRestoModel } from "./contract/favoriteRestoContract";

let favoriteRestos = [];

const FavoriteRestoArray = {

 getMovie(id) {
  if (!id) {
   return;
  }

  return favoriteRestos.find((movie) => movie.id == id);
 },

 getAllMovies() {
  return favoriteRestos;
 },

 putMovie(movie) {
  if (!movie.hasOwnProperty('id')) {
   return;
  }

  //pastikan id ini belum ada di dalam daftar favoriteResto
  if (this.getMovie(movie.id)) {
   return;
  }

  favoriteRestos.push(movie);
 },

 deleteMovie(id) {
  // cara boros menghapus film dengan meng-copy film yang ada
  // kecuali film dengan id == id
  favoriteRestos = favoriteRestos.filter((movie) => movie.id != id);
 },


 searchRestos(query) {
  return this.getAllMovies()
   .filter((movie) => {
    const loweredCaseRestoTitle = (movie.title || '-').toLowerCase();
    const jammedRestoTitle = loweredCaseRestoTitle.replace(/\s/g, '');

    const loweredCaseQuery = query.toLowerCase();
    const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

    return jammedRestoTitle.indexOf(jammedQuery) !== -1;
   });
 }
};

describe('Favorite Movie Array Contract Test Implementation', () => {
 afterEach(() => favoriteRestos = []);

 itActsAsFavoriteRestoModel(FavoriteRestoArray);
});