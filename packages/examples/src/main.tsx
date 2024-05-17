import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './router';
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router}></RouterProvider>
    </Suspense>
);
