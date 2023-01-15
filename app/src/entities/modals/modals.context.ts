import { createContext } from 'react';

export interface ModalsContextType {
  onLoad: () => void;
}

export const ModalsContext = createContext<ModalsContextType>({} as ModalsContextType);

ModalsContext.displayName = 'ModalsContext';
