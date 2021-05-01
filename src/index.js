import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from 'react-redux'
import store from './store/index'
window.store = store

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
