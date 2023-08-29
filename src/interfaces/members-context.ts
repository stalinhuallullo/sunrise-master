import { createContext, useContext } from 'react';
import { BasicInfoFile } from './boxToDrag-interface';

export interface GlobalContent {
  arrayMembers: BasicInfoFile;
  setArrayMembers: (c: BasicInfoFile) => void;
}

export const MyGlobalContext = createContext<GlobalContent>({
  arrayMembers: {
    newData: [],
    filename: ''
  },
  setArrayMembers: () => {}
});

export const useGlobalContext = () => useContext(MyGlobalContext);
