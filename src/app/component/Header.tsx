import styles from "./Header.module.css";
import Link from "next/link";
import useAuthInfo from "../../../hooks/useFetchAuth";

const Header = async () => {
  const { authData } = await useAuthInfo();

  return (
    <div className={styles.wrapper}>
      {authData.is_login ? (
        <>
          <Link href="/followings">
            <h3 className={styles.link}>フォロー中</h3>
          </Link>
          <Link href="/followers">
            <h3 className={styles.link}>フォロワー</h3>
          </Link>
          <Link href="/favorites">
            <h3 className={styles.link}>保存済みレシピ</h3>
          </Link>
          <Link href="/create">
            <h3 className={styles.link}>レシピ投稿</h3>
          </Link>
        </>
      ) : (
        <>
          <Link href="/sign_in">ログイン</Link>
          <Link href="/sign_up">新規登録</Link>
        </>
      )}
    </div>
  );
};

export default Header;
