import { ClerkProvider } from '@clerk/clerk-react';
import { Outlet, useNavigate } from 'react-router-dom';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const RootLayout = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(dest) => navigate(dest)}
      routerReplace={(dest) => navigate(dest, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <Outlet />
    </ClerkProvider>
  );
}
