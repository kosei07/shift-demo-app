import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import createStore from './reducks/store/store'
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history'

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
