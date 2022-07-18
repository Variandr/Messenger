import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './state/store';
import Root from './Components/Unknown/Root/index';
import '@fontsource/roboto';
import theme from './helpers/theme';
import { ThemeProvider } from '@mui/styles';
import { socket, SocketContext } from './api/socket';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </SocketContext.Provider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
