import type { BetterAuthSession, BetterAuthUser } from '~/lib/auth-client';

export type SignInClient = 'email' | 'google';

export const useAuthStore = () => {
  const user = useState<BetterAuthUser | null>('auth-user', () => null);
  const session = useState<BetterAuthSession | null>(
    'auth-session',
    () => null
  );
  const lastSignInClient = useState<SignInClient | null>(
    'last-sign-in-client',
    () => null
  );

  // Load from sessionStorage on client only
  if (import.meta.client) {
    const savedUser = sessionStorage.getItem('auth-user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
    }

    const savedSession = sessionStorage.getItem('auth-session');
    if (savedSession) {
      session.value = JSON.parse(savedSession);
    }

    const savedLastSignInClient = localStorage.getItem(
      'last-sign-in-client'
    ) as SignInClient | null;
    if (savedLastSignInClient) {
      lastSignInClient.value = savedLastSignInClient;
    }
  }

  const setUser = (value: BetterAuthUser | null) => {
    user.value = value;
    if (import.meta.client) {
      if (value !== null) {
        sessionStorage.setItem('auth-user', JSON.stringify(value));
      } else {
        sessionStorage.removeItem('auth-user');
      }
    }
  };

  const setSession = (value: BetterAuthSession | null) => {
    session.value = value;
    if (import.meta.client) {
      if (value) {
        sessionStorage.setItem('auth-session', JSON.stringify(value));
      } else {
        sessionStorage.removeItem('auth-session');
      }
    }
  };

  const setLastSignInClient = (value: SignInClient | null) => {
    lastSignInClient.value = value;
    if (import.meta.client) {
      if (value) {
        localStorage.setItem('last-sign-in-client', value);
      } else {
        localStorage.removeItem('last-sign-in-client');
      }
    }
  };

  return {
    user,
    setUser,

    session,
    setSession,

    lastSignInClient,
    setLastSignInClient
  };
};
