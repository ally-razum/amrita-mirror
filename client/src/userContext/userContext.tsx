/* eslint-disable react-refresh/only-export-components */
import  { createContext, useState, useContext, ReactNode } from 'react';


interface User {
  id: number;
  userEmail: string;
  userFullName: string;
  userLogin: string;
  userRole: string;
  // Добавьте другие поля по необходимости
}
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  // console.log(UserContext,'ЮЗЕР КОНТЕКСТ from UserContext.tsx');
  
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
 
  const [user, setUser] = useState<User | null>(null);
  // console.log('USER from context:',user?.userFullName);
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
