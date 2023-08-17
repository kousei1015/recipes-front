import styles from "./../../../styles/DetailRecipe.module.css";
import Button from "../component/Button";
import NoImage from "./../../../public/1560031.jpg";
import { RECIPE, USERINFO } from "../types";
import Image from "next/image";
import { cookies } from "next/headers";

const fetchRecipeData = async (id: string) => {
  const recipe = await fetch(`http://localhost:3000/v1/recipes/${id}`, {
    cache: "no-cache",
  });
  const result = await recipe.json();
  return result;
};

const fetchUserSelfData = async () => {
  const cookieStore = cookies();
  const client = cookieStore.get("client");
  const accessToken = cookieStore.get("access-token");
  const uid = cookieStore.get("uid");
    const res = await fetch("http://localhost:3000/v1/users", {
      headers: {
        uid: uid?.value as any,
        client: client?.value as any,
        "access-token": accessToken?.value as any,
      },
      cache: "no-store",
    });
    const result = await res.json();
    return result;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const [recipe, userSelf]: [RECIPE, USERINFO] = await Promise.all([
    fetchRecipeData(params.id),
    fetchUserSelfData(),
  ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.recipe}>
        <h2>{recipe.recipe_name}</h2>
        <div className={styles.img_wrapper}>
          <Image
            src={recipe.image_url || NoImage}
            alt={recipe.image_url ? "レシピ画像" : "画像なし"}
            width={100}
            height={100}
          />
        </div>
        <div className={styles.process}>
          <p>{recipe.process}</p>
        </div>
        {recipe.user_id === userSelf?.id ? <Button>削除</Button> : null}
      </div>
    </div>
  );
};

export default Page;
