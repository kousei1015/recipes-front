import { cookies } from "next/headers";
import { RECIPES } from "../src/app/types";

const useFetchRecipes = async () => {
  const cookieStore = cookies();
  const client = cookieStore.get("client");
  const accessToken = cookieStore.get("access-token");
  const uid = cookieStore.get("uid");
  const res = await fetch("http://localhost:3000/v1/recipes", {
    headers: {
      uid: uid?.value || "",
      client: client?.value || "",
      "access-token": accessToken?.value || "",
    },
    cache: "no-store",
  });
  const recipes: RECIPES = await res.json();
  return { recipes };
};

export default useFetchRecipes;
