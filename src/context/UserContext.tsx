import React from "react";
import api from "../services/api";
import { CanvasContext } from "./CanvasContext";
import { GlobalContext } from "./GlobalContext";

interface IUserProviderProps { }

interface IUserProps {
  auth: boolean;
  loading: boolean;
  user: IUser;
  arts: IArts[];
  selectedIDArt: string;
  token: string;
  currentArt: IArts;
  changeLoading: (active: boolean) => void;
  changeArt: (id: string) => void;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  changeAuth: (isAuth: boolean) => void;
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (data: { name: string, email: string, password: string }) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

interface IUser {
  name?: string;
  email?: string;
  arts: IArts[];
}
interface IArts {
  _id: string;
  colors: string[];
  image: string;
  title: string;
  size: number;
}
export const UserContext = React.createContext({} as IUserProps);

export const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const [auth, setAuth] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<IUser>();
  const [arts, setArts] = React.useState<IArts[]>();
  const [selectedIDArt, setSelectedIDArt] = React.useState<string>();
  const [token, setToken] = React.useState('');
  const [currentArt, setCurrentArt] = React.useState<IArts>(null);

  const { showMessage } = React.useContext(GlobalContext);
  const { canvasIsBlank, resetCells } = React.useContext(CanvasContext);

  React.useEffect(() => {
    console.log('token-user', token)
    console.log('auth-user', auth)
    console.log('data-user', user)
  }, [auth, token, user]);

  React.useEffect(() => {
    if (!localStorage.token) return;
    (async () => {
      changeLoading(true);
      changeToken(localStorage.token)
      changeLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    if (!token) return;
    (async () => {
      const isAuthValue = await isAuth();
      setAuth(isAuthValue);
    })();
  }, [token]);

  React.useEffect(() => {
    if (!auth) return;
    getUser();
  }, [auth, token]);

  React.useEffect(() => {
    if (!user) return;
    console.log(user)
    user.arts && setArts(user.arts)
  }, [user])

  function changeLoading(active: boolean) {
    setLoading(active);
  }

  function changeAuth(isAuth: boolean) {
    setAuth(isAuth)
  }

  function changeArt(id: string) {
    canvasIsBlank && resetCells();
    setSelectedIDArt(id);
    const art = user?.arts?.find((art) => art._id === id);
    art && setCurrentArt(art)
  }

  const getUser = async () => {
    if (!auth) return;
    try {
      const responce = await api.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (responce.data.error) {
        showMessage("error", responce.data.error);
      }
      if (responce.data.user && responce.data.arts && responce.status === 200) {
        console.log(responce)
        setUser({ ...responce.data.user, arts: responce.data.arts })
      }
    } catch (err) {
      console.log(err)
      showMessage("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const responce = await api.post("/user/signin", {
        email,
        password,
      });
      if (responce.data.error) {
        showMessage("error", responce.data.error);
        return false;
      } else {
        changeToken(responce.data.token);
        return true;
      }
    } catch (err) {
      showMessage("error", err.message);
      return false;
    } finally {
      setLoading(false);
      const result = await isAuth();
      console.log(result)
      changeAuth(result);
    }
  };

  const signup = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    setLoading(true);
    try {
      const responce = await api.post("/user/signup", {
        name: name,
        email: email,
        password: password,
      });
      console.log(responce)
      if (responce.data.error) {
        showMessage("error", responce.data.error);
      }
      if (responce.status === 200 && responce.data._id && !responce.data.error) {
        const auth = await signin(email, password);
        return auth;
      }
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      changeAuth(false);
      changeToken('');

      return true
    } catch (err) {
      showMessage("error", err.message);
      return false;
    }
  };

  const isAuth = async () => {
    if (token) {
      setLoading(true);
      try {
        const responce = await api.get("/user/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (responce.data.error) {
          showMessage("error", responce.data.error);
          return false;
        }
        return true;
      } catch (err) {
        showMessage("error", err.message);
        return false;
      } finally {
        setLoading(false);
      }
    }
  }

  function changeToken(token: string) {
    setToken(token);
    localStorage.token = token;
  }

  return (
    <UserContext.Provider
      value={{
        auth,
        user,
        loading,
        arts,
        selectedIDArt,
        token,
        currentArt,
        setUser,
        setAuth,
        changeArt,
        changeLoading,
        changeAuth,
        signin,
        signup,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
