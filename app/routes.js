import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

const requireAuth = (store) => (nextState, replace) => {
  if (!store.getState().toJS().auth.authenticated) {
    replace('/signin');
  }
};


export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);
        // console.log(store.getState().toJS());
        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    }, {
      path: '/name/:id',
      name: 'name',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NamePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/NamePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('name', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    }, {
      path: '/watchlist',
      name: 'watchlist',
      onEnter: requireAuth(store),
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/WatchListPage/'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('name', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    }, {
      path: '/signin',
      name: 'signin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/auth/reducer'),
          import('containers/auth/sagas'),
          import('containers/SignIn'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('name', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    }, {
      path: '/movie/:id',
      name: 'movie',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MoviePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/MoviePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('movie', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    },
    {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/MoviePage',
      name: 'moviePage',
      getComponent(location, cb) {
        import('containers/MoviePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
