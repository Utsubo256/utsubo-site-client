import { createContext, useContext, useState } from 'react';

import { parseCookies } from 'nookies';

import useFirebaseAuth from '@/hooks/useFirebaseAuth';

import type { User } from 'firebase/auth';

type UserInfo = {
  avatar: string | null;
  name: string;
  uid: string;
};

type AuthContextType = {
  currentUser: User | null | undefined;
  loading: boolean;
  loginWithGoogle: () => Promise<User | undefined>;
  logout: () => Promise<void>;
  updateUserInfo: (newUserInfo: UserInfo) => void;
  userInfo: UserInfo;
};

type Props = {
  children: React.ReactNode;
};

const AuthCtx = createContext<AuthContextType>({} as AuthContextType);

const cookies = parseCookies();

export function AuthContextProvider({ children }: Props) {
  const { currentUser, loading, loginWithGoogle, logout } = useFirebaseAuth();
  const [userInfo, setUserInfo] = useState({
    avatar: cookies.avatar,
    name: cookies.name,
    uid: cookies.uid,
  });

  const updateUserInfo = (newUserInfo: UserInfo) => {
    setUserInfo({
      ...userInfo,
      avatar: newUserInfo.avatar || '',
      name: newUserInfo.name,
      uid: newUserInfo.uid,
    });
  };

  const AuthContext: AuthContextType = {
    currentUser: currentUser,
    loading: loading,
    loginWithGoogle: loginWithGoogle,
    logout: logout,
    updateUserInfo: updateUserInfo,
    userInfo: userInfo,
  };

  return <AuthCtx.Provider value={AuthContext}>{children}</AuthCtx.Provider>;
}

export const useAuthContext = () => useContext(AuthCtx);
