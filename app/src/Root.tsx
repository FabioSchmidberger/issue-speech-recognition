import React from 'react';
import { Provider } from 'react-redux';
import { Spinner } from 'react-activity';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './state/store';
import App from './App';

const { store, persistor } = configureStore();

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default Root;
