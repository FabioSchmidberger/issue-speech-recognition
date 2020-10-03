import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore() {
  const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
  const persistor = persistStore(store);

  return { store, persistor };
}

export default configureStore;
