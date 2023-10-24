"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useFavorite = () => {
  const router = useRouter();

  const headers = {
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
    "access-token": Cookies.get("access-token"),
  };

  const saveFavorite = async (recipeId: number) => {
    const url = `http://localhost:3000/v1`;

    try {
      await axios.post(`${url}/favorites`, { recipe_id: recipeId }, { headers });
      router.refresh();
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const unfavorite = async (favoriteId: number) => {
    const url = `http://localhost:3000/v1`;

    try {
      await axios.delete(`${url}/favorites/${favoriteId}`, { headers });
      router.refresh();
    } catch (error) {
      console.error("Error unfavorite recipe:", error);
    }
  };

  return { saveFavorite, unfavorite };
};

export default useFavorite;
