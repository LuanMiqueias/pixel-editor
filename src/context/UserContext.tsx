import React from "react";
import { string } from "yup/lib/locale";
import api from "../services/api";
import { GlobalContext } from "./GlobalContext";

interface IUserProviderProps {}

interface IUserProps {
  auth: boolean;
  loading: boolean;
  user: IUser;
  arts: IArts[];
  selectedIDArt: string;
  changeLoading: (active: boolean) => void;
  signin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  changeToken: (token: string) => void;
  changeArt: (id: string) => void;
  userData: () => void;
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
  const [token, setToken] = React.useState<string>();
  const [arts, setArts] = React.useState<IArts[]>();
  const [selectedIDArt, setSelectedIDArt] = React.useState<string>();
  const { showMessage } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (!localStorage.token) return;
    (async () => {
      changeToken(localStorage.token);
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
    userData();
  }, [token, auth]);
  async function signin(email: string, password: string) {
    try {
      changeLoading(true);
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
      changeLoading(false);
      setAuth(await isAuth());
    }
  }
  async function logout() {
    changeToken("");
    setAuth(false);
  }
  function changeLoading(active: boolean) {
    setLoading(active);
  }
  function changeToken(token: string) {
    setToken(token);
    localStorage.token = token;
  }
  function changeArt(id: string) {
    if (!user?.arts?.find((art) => art._id === id)) return;
    setSelectedIDArt(id);
  }
  async function isAuth() {
    if (token) {
      changeLoading(true);
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
        changeLoading(false);
      }
    }
  }

  async function userData() {
    if (!auth) return;

    try {
      const responce = await api.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (responce.data.error) {
        showMessage("error", responce.data.error);
      } else {
        setUser({ ...responce.data.user, arts: responce.data.arts });
      }
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      changeLoading(false);
    }
  }
  return (
    <UserContext.Provider
      value={{
        auth,
        user,
        loading,
        arts,
        selectedIDArt,
        userData,
        changeArt,
        changeLoading,
        signin,
        logout,
        changeToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
