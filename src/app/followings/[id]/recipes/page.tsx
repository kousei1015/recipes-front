import styles from "./../../../component/Recipes.module.css";
import Button from "./../../../component/Button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { RECIPES } from "./../../../types";
import NoImage from "./../../../../../public/1560031.jpg";

const fetchRecipesByUser = async (id: string) => {
  const cookieStore = cookies();
  const client = cookieStore.get("client");
  const accessToken = cookieStore.get("access-token");
  const uid = cookieStore.get("uid");

  if (client && accessToken && uid) {
    const res = await fetch(`http://localhost:3000/v1/users/${id}/recipes`, {
      headers: {
        uid: uid.value,
        client: client.value,
        "access-token": accessToken.value,
      },
      cache: "no-store",
    });
    const recipes = await res.json();
    return recipes;
  }
};

const Page = async ({ params }: { params: { id: string } }) => {
  const recipesData: RECIPES = await fetchRecipesByUser(params.id);
  return (
    <>
      <div className={styles.wrapper}>
        {recipesData?.recipes.map((recipe) => (
          <article key={recipe.id} className={styles.recipe}>
            <Link href={`/${recipe.id}`}>
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
              <div className={styles.btn_wrapper}>
                {recipe.favorite_id ? (
                  <Button favorite_id={recipe.favorite_id}>
                    お気に入りを解除
                  </Button>
                ) : (
                  <Button recipe_id={recipe.id}>保存</Button>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
};

export default Page;
