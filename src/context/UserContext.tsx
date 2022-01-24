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
  const { canvasIsBlank, resetCells } = React.useContext(CanvasContext);

  React.useEffect(() => {
    if (!localStorage.token) return;
    (async () => {
      changeToken(localStorage.token);
      setToken(localStorage.token)
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
  React.useEffect(() => {
    if (!user) return;
    user.arts && setArts(user.arts)
  }, [user])
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
    // if (!user?.arts?.find((art) => art._id === id)) {};
    canvasIsBlank && resetCells();
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
    if (!auth) {
      return
      // const defaultData = [
      //   {
      //     _id: "123456",
      //     title: "My first project",
      //     size: 16,
      //     colors: [
      //       "#041B3E",
      //       "#FFFFFF",
      //       "#490505",
      //       "#572102",
      //       "#064904",
      //       "#000000",
      //       "#EB1212",
      //       "#C45414",
      //       "#6D8E10",
      //       "#166714",
      //       "#11A466",
      //       "#371383"
      //     ],
      //     image: "data:image/png;base64,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"
      //   }
      // ]
      // setUser({
      //   arts: defaultData
      // });
    };

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
        token,
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
