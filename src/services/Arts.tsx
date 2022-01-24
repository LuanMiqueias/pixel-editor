import React from "react";
import { GlobalContext } from "../context/GlobalContext";
import { UserContext } from "../context/UserContext";
import api from "./api";

interface IArtUpdate {
  _id?: string;
  colors?: string[];
  image?: string;
  title?: string;
  size?: number;
}
interface IArts {
  _id?: string;
  colors: string[];
  image: string;
  title: string;
  size: number;
}
export const Art = () => {
  const { token } = React.useContext(UserContext);
  const { showMessage } = React.useContext(GlobalContext);
  const [arts, setArts] = React.useState<IArts>(null);
  const [loadingArt, setLoadingArt] = React.useState(false);

  const getAllArts = async () => {
    setLoadingArt(true);
    try {
      const responce = await api.get("/art", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (responce.data.error) {
        showMessage("error", responce.data.error);
      } else {
        console.log(responce)
        setArts({ ...responce.data });
      }
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setLoadingArt(false);
    }
  };
  const newArt = async (art: IArts) => {
    setLoadingArt(true);
    try {
      const responce = await api({
        method: 'post',
        url: '/art',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          ...art
        }
      });
      if (responce.data.error) {
        showMessage("error", responce.data.error);
      } else {
        setArts({ ...arts, ...responce.data });
      }
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setLoadingArt(false);
    }
  };
  const updateArt = async (art: IArtUpdate, id: string) => {
    console.log(token);
    setLoadingArt(true);
    try {
      const responce = await api({
        method: 'put',
        url: `art/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          ...art
        }
      });
      if (responce.data.error) {
        showMessage("error", responce.data.error);
      } else {
        console.log(responce)
        setArts({ ...arts, ...responce.data });
      }
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setLoadingArt(false);
    }
  };
  const deleteArt = async (id: string) => {
    try {
      const responce = await api({
        method: 'delete',
        url: `art/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (responce.data.error) {
        showMessage("error", responce.data.error);
      } else {
        setArts({ ...arts, ...responce.data });
      }
    } catch (err) {
      showMessage("error", err.message);
    } finally {
      setLoadingArt(false);
    }
  };

  return { getAllArts, newArt, deleteArt, updateArt, loadingArt, arts }
}



