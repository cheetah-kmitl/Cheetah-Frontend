import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './index.css'

import { RootLayout } from './layout/RootLayout';
import { PrivateLayout } from './layout/PrivateLayout';

import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/",     element: <HomePage /> },
      { path: "/auth", element: <AuthPage /> },
      {
        element: <PrivateLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
