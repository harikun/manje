import NowPlaying from '../views/pages/now-playing';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': NowPlaying, // default page
  '/now-playing': NowPlaying,
  '/upcoming': Like,
  '/detail/:id': Detail,
};

export default routes;
