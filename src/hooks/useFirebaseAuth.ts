import { useState, useEffect } from 'react';

import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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
      return;
    }

    setLoading(true);
    setCurrentUser(user);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, nextOrObserver);
    return unsubscribe;
  }, []);

  return {
    currentUser,
    loading,
    loginWithGoogle,
    logout,
  };
}
