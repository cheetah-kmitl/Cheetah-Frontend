import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { DashboardPage } from './pages/DashboardPage';
import { RootLayout } from './layouts/RootLayout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootLayout>
      <DashboardPage />
    </RootLayout>
  </StrictMode>
);
