import { createContext, useContext } from 'react';
import { User } from './userFromSunlight';

export interface UserInfoGlobalContent {
  userDataSession: User;
  setUserDataSession: (c: User) => void;
}

export const UserSunlightContext = createContext<UserInfoGlobalContent>({
  userDataSession: {},
  setUserDataSession: () => {}
});

export const useUserInfoGlobalContent = () => useContext(UserSunlightContext);
