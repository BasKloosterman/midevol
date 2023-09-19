import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store'
import { Provider } from 'react-redux'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Config from './components/Config';
import History from './components/History';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [{
            path: '/',
            index: true,
            element: <Config/>
        }, {
            path: '/history',
            element: <History/>
        }]
    }
]);

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
