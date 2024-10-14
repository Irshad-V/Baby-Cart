import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { store } from './store/Store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

);


