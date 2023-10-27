import styles from "./../component/Recipes.module.css";
import UnfavoriteButton from "../component/Button/UnfavoriteButton";
import { FavRecipes } from "../types";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import NoImage from "./../../../public/1560031.jpg";

const fetchFavoriteRecipes = async () => {
  const cookieStore = cookies();
  const client = cookieStore.get("client");
  const accessToken = cookieStore.get("access-token");
  const uid = cookieStore.get("uid");
  if (client && accessToken && uid) {
    const res = await fetch("http://localhost:3000/v1/favorites", {
      headers: {
        uid: uid.value,
        client: client.value,
        "access-token": accessToken.value,
      },
      cache: "no-store",
    });
    const favoriteRecipes = await res.json();
    return favoriteRecipes;
  }
};

const Page = async () => {
  const favoriteRecipes: FavRecipes = await fetchFavoriteRecipes();
  return (
    <>
      <h2 className={styles.heading}>保存済みレシピ</h2>
      <div className={styles.wrapper}>
        {favoriteRecipes.map((recipe) => {
          return (
            <article key={recipe.favorite_id} className={styles.recipe}>
              <Link href={`/${recipe.recipe_id}`}>
                <h4 className={styles.name}>{recipe.recipe_name}</h4>
                <div className={styles.img_wrapper}>
                  <Image
                    src={recipe.image_url || NoImage}
                    alt={recipe.image_url ? "レシピ画像" : "画像なし"}
                    width={100}
                    height={100}
                  />
                </div>
                <p>ユーザー名: {recipe.user_name}</p>
                <UnfavoriteButton favorite_id={recipe.favorite_id} />
              </Link>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default Page;
