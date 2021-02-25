import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunkMiddleware from 'redux-thunk-recursion-detect';
import createRootReducer from '.';

export default function configureStore(preloadedState) {
  let composeEnhancers;

  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  } else {
    composeEnhancers = compose;
  }

  const store = createStore(createRootReducer(), preloadedState, composeEnhancers(applyMiddleware(thunkMiddleware)));

  return store;
}
