import nookies, { setCookie, destroyCookie } from 'nookies';

type UserInfo = {
  avatar: string | null;
  name: string;
  uid: string;
};

export const setUserInfoCookies = (userInfo: UserInfo) => {
  setCookie(null, 'uid', userInfo.uid, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  setCookie(null, 'name', userInfo.name, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  setCookie(null, 'avatar', userInfo.avatar || '', {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const clearUserInfoCookies = () => {
  nookies.destroy(null, 'token');
  destroyCookie(null, 'uid');
  destroyCookie(null, 'name');
  destroyCookie(null, 'avatar');
};
