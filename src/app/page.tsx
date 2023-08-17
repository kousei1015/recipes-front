import { Suspense } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import RecipeDataProvider from "./component/RecipeDataProvider";

const Page = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>レシピ一覧</h2>
      <div className={styles.links}>
        <Link href="/sign_in">ログイン</Link>
        <Link href="/sign_up">新規登録</Link>
        <Link href="/create">レシピ投稿</Link>
      </div>

      <Suspense fallback={<h3>レシピを取得中です...</h3>}>
        {/* @ts-expect-error Server Component */}
        <RecipeDataProvider />
      </Suspense>
    </div>
  );
};

export default Page;
