// Kenalkan, saya Codecept
const assert = require('assert');

Feature('Liking Restourant');

Before(({ I }) => {
  I.amOnPage('/#/upcoming');
});

Scenario('show empty favorite restourant', ({ I }) => {
  I.seeElement('#movies');
  I.see("You don't have any Favorite Restaurant", '#movies');
});

Scenario('liking one resto', async ({ I }) => {
  I.see("You don't have any Favorite Restaurant", '#movies');

  I.amOnPage('/');
  I.seeElement('.movie-item__content p a');

  const firstResto = locate('.movie-item__content p a').first();
  const firsRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/upcoming');
  I.seeElement('.movie-item');
  const LikedRestoTitle = await I.grabTextFrom('.movie-item__content p a');

  assert.strictEqual(firsRestoTitle, LikedRestoTitle);
});

Scenario('unliking one resto', async ({ I }) => {
  I.see("You don't have any Favorite Restaurant", '#movies');

  I.amOnPage('/');
  I.seeElement('.movie-item__content p a');

  const firstResto = locate('.movie-item__content p a').first();
  const firsRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/upcoming');
  I.seeElement('.movie-item');
  const LikedRestoTitle = await I.grabTextFrom('.movie-item__content p a');

  assert.strictEqual(firsRestoTitle, LikedRestoTitle);

  I.click(LikedRestoTitle);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/upcoming');
  I.seeElement('#movies');
  const onFavResto = await I.grabTextFrom('#movies');

  assert.strictEqual(onFavResto, "You don't have any Favorite Restaurant")
})
// Scenario('searching restos', async ({ I }) => {
//   I.see("You don't have any Favorite Restaurant", '#movies');
//   I.amOnPage('/');
//   I.seeElement('.movie-item__content p a');

//   const titles = [];

//   for (let i = 1; i <= 3; i++) {
//     I.click(locate('.movie-item__content p a').at(i));
//     I.seeElement('#likeButton');
//     I.click('#likeButton');
//     titles.push(await I.grabTextFrom('p a'));
//     I.amOnPage('/');
//   }

//   I.amOnPage('/#/upcoming');
//   I.seeElement('#movies');

//   const searchQuery = titles[1].substring(1, 3);
//   const matchingRestos = titles.filter((title) => title.indexOf(searchQuery) !== -1);

//   I.fillField('#movies', searchQuery);
//   I.pressKey('Enter');

//   const visibleLikedRestos = await I.grabNumberOfVisibleElements('.movie-item');
//   assert.strictEqual(matchingRestos.length, visibleLikedRestos);

//   matchingRestos.forEach(async (title, index) => {
//     const visibleTitle = await I.grabTextFrom(locate('p a').at(index + 1));
//     assert.strictEqual(title, visibleTitle);
//   });
// })