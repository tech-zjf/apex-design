import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const AtInputPage = lazy(() => import('@/pages/at-input'));
const PokerRoom = lazy(() => import('@/pages/poker'));
const Home = lazy(() => import('@/pages/home'));
const App = lazy(() => import('@/App'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/at-input',
                element: <AtInputPage />
            },
            {
                path: '/poker',
                element: <PokerRoom />
            }
        ]
    }
]);

export default router;
