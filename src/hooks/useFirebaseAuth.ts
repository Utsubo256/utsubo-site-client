import { useState, useEffect } from 'react';

import { signOut, signInWithPopup, GoogleAuthProvider, onIdTokenChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

import { auth } from '@/lib/initFirebase';

import type { User } from 'firebase/auth';

export default function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result) {
      const user = result.user;

      router.push('/');
      return user;
    }
  };

  const clear = () => {
    setCurrentUser(null);
    setLoading(false);
    router.push('/');
  };

  const logout = () => signOut(auth).then(clear);

  const nextOrObserver = async (user: User | null) => {
    if (!user) {
      setLoading(false);
      setCurrentUser(null);
      nookies.set(undefined, 'token', '', { path: '/' });
      return;
    }

    setLoading(true);
    const token = await user.getIdToken();
    setCurrentUser(user);
    nookies.set(undefined, 'token', token, { path: '/' });
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, nextOrObserver);
    return unsubscribe;
  }, []);

  // 1時間毎にtokenを再取得する
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 60 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return {
    currentUser,
    loading,
    loginWithGoogle,
    logout,
  };
}
