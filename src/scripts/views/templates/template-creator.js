import CONFIG from '../../globals/config';

const createMovieDetailTemplate = (movie) => `

<div class="movie__info">
<img
  class="lazyload"
  src="${CONFIG.BASE_IMAGE_URL + movie.pictureId}"
  alt="${movie.name}"
  class="movie__poster"
/>
  <h2>${movie.name}</h2>
  <div class="movie__info__header">
  ⭐️ <b>${movie.rating}</b>
    <b>
      ${movie.categories.map((category) => `
        <span>${category.name}</span>`).join(', ')}
      <i class="fas fa-map-marker-alt"></i>
    </b>
    <i>${movie.address}, ${movie.city}</i>
    <p id="description">${movie.description}</p>
  </div>
  <div class="movie__info__category">
    <div>
      <h2>Food</h2>
      <ol> ${movie.menus.foods.map((food) => ` <li>${food.name}</li> `).join(' ')} </ol>
    </div>
    <div>
      <h2>Drinks</h2>
      <ol> ${movie.menus.drinks.map((drink) => ` <li>${drink.name}</li> `).join(' ')} </ol>
    </div>
  </div>
  <div class="movie__info__review_header">
    <h2>Consumer Review</h2>
    <div class="movie__info__review">
    ${movie.customerReviews.map((review) => `
      <h3>${review.name}</h3>
      <small>${review.date}</small>
      <p>${review.review}</p>
    `).join('')}
    </div>
  </div>
</movie
`;

const createMovieItemTemplate = (movie) => `
  <div class="movie-item">
    <div class="movie-item__header">
        <img class="movie-item__header__poster lazyload" alt="${movie.name}"
            data-src="${CONFIG.BASE_IMAGE_URL + movie.pictureId}">
        <div class="movie-item__header__rating">
            <p>⭐️<span class="movie-item__header__rating__score">${movie.rating}</span></p>
        </div>
    </div>
    <div class="movie-item__content">
        <p><a href="${`/#/detail/${movie.id}`}">${movie.name}</a></p>
        <p><b>${movie.city}</b></p>
        <p>${movie.description.slice(0, 150)}...</p>
      </div>
  </div>
  `;

const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createMovieItemTemplate,
  createMovieDetailTemplate,
  createLikeRestoButtonTemplate,
  createUnlikeRestoButtonTemplate,
};
