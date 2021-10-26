// Membangun Fitur Menggunakan TDD

import FavoriteRestoSearchPresenter from "../src/scripts/views/pages/liked-restos/favorite-resto-search-presenter";
import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restos/favorite-resto-search-view';
import FavoriteMovieIdb from "../src/scripts/data/favorite-movie-idb";


describe('Searching restos', () => {
  let presenter;
  let favoriteMovies;
  let view;

  const searchRestos = (query) => {
   const queryElement = document.getElementById('query');
   queryElement.value = query;
   queryElement.dispatchEvent(new Event('change'));
  }

  const setRestosSearchContainer = () => {
    view = new FavoriteRestoSearchView();
    document.body.innerHTML = view.getTemplate();
  }

  const constructPresenter = () => {
    favoriteMovies = spyOnAllFunctions(FavoriteMovieIdb);
    presenter = new FavoriteRestoSearchPresenter({
      favoriteMovies,
      view,
    })
  }

 beforeEach(() => {
    setRestosSearchContainer();
    constructPresenter();
 });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestos('resto a');

      expect(presenter.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search for liked restos', () => {
      searchRestos('resto a');

      expect(favoriteMovies.searchRestos)
    .toHaveBeenCalledWith('resto a');
    });

    it('should show - when the movie returned does not contain a title', (done) => {
      document.getElementById('resto-search-container').addEventListener('movies:searched:updated', () => {
        const restoTitle = document.querySelectorAll('.movie__title');
        expect(restoTitle.item(0).textContent).toEqual('-');

        done();
      });

      favoriteMovies.searchRestos.withArgs('resto a').and.returnValues([
        {id: 444},
      ]);

      searchRestos('resto a');
    })
  //  Rahasia Seorang Mata-Mata
    it('should show the resto found by Favorite Restos', (done) => {
      document.getElementById('resto-search-container')
        .addEventListener('movies:searched:updated', () => {
          expect(document.querySelectorAll('.movie').length).toEqual(3);
          done();
        })

      favoriteMovies.searchRestos.withArgs('resto a').and.returnValues([
        { id: 111, title: 'resto abc'},
        { id: 222, title: 'ada juga resto abcde'},
        { id: 111, title: 'ini juga boleh resto a'},
      ])

      searchRestos('resto a');

    })

    it('sholud show the name of the restos found by Favorite Restos', (done) => {
      document.getElementById('resto-search-container').addEventListener('movies:searched:updated', () => {
        const restoTitles = document.querySelectorAll('.movie__title');
        expect(restoTitles.item(0).textContent).toEqual('resto abc');
        expect(restoTitles.item(1).textContent).toEqual('ada juga resto abcde');
        expect(restoTitles.item(2).textContent).toEqual('ini juga boleh resto a');

        done();
      });

      favoriteMovies.searchRestos.withArgs('resto a').and.returnValues([
        {id: 111, title: 'resto abc' },
        {id: 222, title: 'ada juga resto abcde' },
        {id: 333, title: 'ini juga boleh resto a' },
      ]);

      searchRestos('resto a');
      })

  });

  describe('when query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestos(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('      ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('');
      expect(presenter.latestQuery.length).toEqual(0);

      expect(presenter.latestQuery.length).toEqual(0);
      searchRestos('\t');
    });

    it('should show all favorite restos', () => {
      searchRestos('   ');

      expect(favoriteMovies.getAllMovies)
        .toHaveBeenCalled();
    })
  });

  // Ketika Hampa
  describe('when no favorite restos cound be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('resto-search-container')
        .addEventListener('movies:searched:updated', () => {
          expect(document.querySelectorAll('.movies__not__found').length)
            .toEqual(1);
          done();
        });

        favoriteMovies.searchRestos.withArgs('resto a').and.returnValues([]);

        searchRestos('resto a');
    });

    it('should not show any movie', (done) => {
      document.getElementById('resto-search-container').addEventListener('movies:searched:updated', () => {
        expect(document.querySelectorAll('.movie').length).toEqual(0);
        done();
      });

      favoriteMovies.searchRestos.withArgs('resto a').and.returnValues([]);

      searchRestos('resto a');
    })
  })

});