import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import _ from 'lodash';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import rootReducer, { storeInitialState } from './rootReducer';

const migrate = (state: any): Promise<any> => {
  return Promise.resolve(_.defaultsDeep(state, storeInitialState));
};

const persistConfig = {
  key: 'root',
  storage,
  migrate,
  whitelist: ['settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore() {
  const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
  const persistor = persistStore(store);

  return { store, persistor };
}

export default configureStore;
