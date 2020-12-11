import React from 'react';
import { Provider } from 'react-redux';
import { Spinner } from 'react-activity';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './state/store';
import App from './App';
import GlobalStyle from './GlobalStyle';

const { store, persistor } = configureStore();

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <GlobalStyle />
        <App />
      </PersistGate>
    </Provider>
  );
};

export default Root;
