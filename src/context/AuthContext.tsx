import { createContext, useContext, useState } from 'react';

import { parseCookies } from 'nookies';

import useFirebaseAuth from '@/hooks/useFirebaseAuth';

import type { User } from 'firebase/auth';

type UserInfo = {
  avatar: string | null;
  id: number;
  name: string;
};

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  loginWithFirebase: (method: string) => Promise<User | undefined>;
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
  const { currentUser, loading, loginWithFirebase, logout } = useFirebaseAuth();
  const [userInfo, setUserInfo] = useState({
    avatar: cookies.avatar,
    id: Number(cookies.id),
    name: cookies.name,
  });

  const updateUserInfo = (newUserInfo: UserInfo) => {
    setUserInfo({
      ...userInfo,
      avatar: newUserInfo.avatar || '',
      name: newUserInfo.name,
    });
  };

  const AuthContext: AuthContextType = {
    currentUser: currentUser,
    loading: loading,
    loginWithFirebase: loginWithFirebase,
    logout: logout,
    updateUserInfo: updateUserInfo,
    userInfo: userInfo,
  };

  return <AuthCtx.Provider value={AuthContext}>{children}</AuthCtx.Provider>;
}

export const useAuthContext = () => useContext(AuthCtx);
