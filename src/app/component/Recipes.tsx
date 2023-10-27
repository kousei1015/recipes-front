import useFetchRecipes from "../../../hooks/useFetchRecipes";
import styles from "./Recipes.module.css";
import Image from "next/image";
import Link from "next/link";
import NoImage from "./../../../public/1560031.jpg";

const Recipes = async () => {
  const { recipes } = await useFetchRecipes();

  return (
    <div className={styles.wrapper}>
      {recipes.recipes.map((recipe) => (
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
          </Link>
        </article>
      ))}
    </div>
  );
};

export default Recipes;
