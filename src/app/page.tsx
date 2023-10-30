import { Suspense } from "react";
import styles from "./page.module.css";
import Header from "./component/Header";
import Recipes from "./component/Recipes";

const Page = async () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>レシピ一覧</h2>

      <Suspense fallback={<h3>レシピを取得中です...</h3>}>
        {/* @ts-expect-error Server Component */}
        <Header />
        {/* @ts-expect-error Server Component */}
        <Recipes />
      </Suspense>
    </div>
  );
};

export default Page;
