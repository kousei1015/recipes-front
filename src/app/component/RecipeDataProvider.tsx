import Recipes from "./Recipes";
import { RECIPES } from "../types";
import Links from "./Links";
import { cookies } from "next/headers";

const fetchRecipes = async () => {
  const url = "http://localhost:3000/v1/recipes";
  const cookieStore = cookies();
  const client = cookieStore.get("client");
  const accessToken = cookieStore.get("access-token");
  const uid = cookieStore.get("uid");
  if (client && accessToken && uid) {
    const res = await fetch(url, {
      headers: {
        uid: uid.value,
        client: client.value,
        "access-token": accessToken.value,
      },
      cache: "no-store",
    });
    const recipes = await res.json();
    return recipes;
  } else {
    const res = await fetch(url, {
      cache: "no-store",
    });
    const recipes = await res.json();
    return recipes;
  }
};

const RecipeDataProvider = async () => {
  const recipesData: RECIPES = await fetchRecipes();

  return (
    <>
      <Links is_login={recipesData.is_login} />
      <Recipes recipesData={recipesData} />
    </>
  );
};

export default RecipeDataProvider;
