import { AxiosResponse, isAxiosError } from "axios";
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { api } from "../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface IUser {
  access_token: string; 
  name: string; 
  email: string; 
  sub: number;
}

interface ILoginUserInfo {
  user: IUser;
}

interface ILoginErrorInfo {
  message?: string; 
  error?: string; 
  statusCode?: number;
}

interface IReturnLogin extends ILoginUserInfo, ILoginErrorInfo{}

interface AuthContextProps {
  user: IUser | null;
  signed: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setTokenApiHeader: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStorageData = async () => {
      setLoading(true);

      const storageUser = localStorage.getItem('@Auth:user');
      const storageToken = localStorage.getItem('@Auth:token');
  
      if(storageUser && storageToken){
        setLoading(false);
        setUser(JSON.parse(storageUser));
      }

      setLoading(false);
    };

    loadStorageData();
  }, []);

  const logout = () => {
    localStorage.removeItem('@Auth:user');
    localStorage.removeItem('@Auth:token');

    window.location.pathname = '/login';
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const response: AxiosResponse<IReturnLogin> = await api.post('/auth/login', { email, password });

      const { data } = response;
  
      setUser((prevUser: any) => ({
        ...prevUser,
        name: data.user.name,
        email: data.user.email
      }));
  
      api.defaults.headers.common['Authorization'] = `Bearer ${data.user.access_token}`;
  
      localStorage.setItem('@Auth:token', data.user.access_token);
      localStorage.setItem('@Auth:user', JSON.stringify({
        id: data.user.sub,
        name: data.user.name,
        email: data.user.email
      }));

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if(isAxiosError(error)){
        alert(error?.response?.data?.message);
      }
    }
  };

  const setTokenApiHeader = () => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, loading, logout, setTokenApiHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
