import { RECIPE } from "../src/app/types";
import { cookies } from "next/headers";

const useFetchRecipe = async (id: string) => {
  const cookieStore = cookies();
  const client = cookieStore.get("client");
  const accessToken = cookieStore.get("access-token");
  const uid = cookieStore.get("uid");
  const res = await fetch(`http://localhost:3000/v1/recipes/${id}`, {
    headers: {
      uid: uid?.value || "",
      client: client?.value || "",
      "access-token": accessToken?.value || "",
    },
    cache: "no-store",
  });
  const recipe: RECIPE = await res.json();
  return { recipe };
};

export default useFetchRecipe;
