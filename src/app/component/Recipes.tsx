import styles from "./Recipes.module.css";
import Image from "next/image";
import Link from "next/link";
import { RECIPES } from "../types";
import Button from "./Button";
import NoImage from "./../../../public/1560031.jpg";

const Recipes = ({ recipesData }: { recipesData: RECIPES }) => {
  const isLogin = recipesData.is_login;

  return (
    <div className={styles.wrapper}>
      {recipesData?.recipes.map((recipe) => (
        <article key={recipe.id} className={styles.recipe}>
          <Link href={`/${recipe.id}`}>
            <div className={styles.img_wrapper}>
              <Image
                src={recipe.image_url || NoImage}
                alt={recipe.image_url ? "レシピ画像" : "画像なし"}
                width={100}
                height={100}
              />
              <span className={styles.name}>{recipe.recipe_name}</span>
            </div>
            <p>ユーザー名: {recipe.user_name}</p>
            <div className={styles.btn_wrapper}>
              {isLogin && (
                <>
                  {recipe.follow_id ? (
                    <Button follow_id={recipe.follow_id}>フォローを解除</Button>
                  ) : (
                    <Button user_id={recipe.user_id}>フォローする</Button>
                  )}
                  {recipe.favorite_id ? (
                    <Button favorite_id={recipe.favorite_id}>
                      お気に入りを解除
                    </Button>
                  ) : (
                    <Button recipe_id={recipe.id}>保存</Button>
                  )}
                </>
              )}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default Recipes;
