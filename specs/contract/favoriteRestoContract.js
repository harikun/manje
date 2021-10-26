// Yang Mengikat Kita

const itActsAsFavoriteRestoModel = (favoriteResto) => {
 it('should return the resto that has been added', async () => {
  favoriteResto.putMovie({ id: 1 });
  favoriteResto.putMovie({ id: 2 });

  expect(await favoriteResto.getMovie(1))
   .toEqual({ id: 1});
  expect(await favoriteResto.getMovie(2))
   .toEqual({ id: 2});
  expect(await favoriteResto.getMovie(3))
   .toEqual(undefined);
 });

 it('should refuse a resto from being added if it does not have the correct property', async () => {
  favoriteResto.putMovie({ aProperty: 'property'});

  expect(await favoriteResto.getAllMovies())
   .toEqual([])
 });

 it('can return all of the restos that have been added', async () => {
  favoriteResto.putMovie({ id: 1});
  favoriteResto.putMovie({ id: 2});

  expect(await favoriteResto.getAllMovies())
   .toEqual([
    {id: 1},
    {id: 2},
   ]);
 });

 it('should remove favorite resto', async () => {
   favoriteResto.putMovie({ id: 1});
   favoriteResto.putMovie({ id: 2});
   favoriteResto.putMovie({ id: 3});

   await favoriteResto.deleteMovie(1);

   expect(await favoriteResto.getAllMovies())
    .toEqual([
     {id: 2},
     {id: 3},
    ]);
 });

 it('should handle request to remove a resto event though the resto has not been added', async () => {
  favoriteResto.putMovie({ id: 1});
  favoriteResto.putMovie({ id: 2});
  favoriteResto.putMovie({ id: 3});

  await favoriteResto.deleteMovie(4);

  expect(await favoriteResto.getAllMovies())
   .toEqual([
    {id: 1},
    {id: 2},
    {id: 3},
   ]);
 });

  // Yang kucari akhirnya tiba
 it('should be able to search for restos', async () => {
   favoriteResto.putMovie({ id: 1, title: 'resto a'});
   favoriteResto.putMovie({ id: 2, title: 'resto b'});
   favoriteResto.putMovie({ id: 3, title: 'resto abc'});
   favoriteResto.putMovie({ id: 4, title: 'ini mah resto abcd'});

   expect(await favoriteResto.searchRestos('resto a')).toEqual([
     { id: 1, title: 'resto a'},
     { id: 3, title: 'resto abc'},
     { id: 4, title: 'ini mah resto abcd'},
   ]);
 });
};

export {itActsAsFavoriteRestoModel };