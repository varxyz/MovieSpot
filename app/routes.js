// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        // debugger
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

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
        // debugger
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
      path: '/signin',
      name: 'signin',
      getComponent(nextState, cb) {
        // debugger
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
        // debugger
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
