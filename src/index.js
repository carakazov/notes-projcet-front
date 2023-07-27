import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './i18n/config'
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
