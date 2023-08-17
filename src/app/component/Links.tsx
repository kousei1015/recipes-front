import styles from "./Links.module.css";
import Link from "next/link";

const Info = ({ is_login }: { is_login: boolean }) => {
  if (is_login) {
    return (
      <div className={styles.wrapper}>
        <Link href="/followings">
          <h3 className={styles.link}>フォローしている人を見る</h3>
        </Link>
        <Link href="/followers">
          <h3 className={styles.link}>フォロワーを見る</h3>
        </Link>
        <Link href="/favorites">
          <h3 className={styles.link}>保存済みレシピを見る</h3>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <p>レシピを投稿したり、お気に入り機能、フォロー機能を使うにはログインして下さい</p>
      </div>
    );
  }
};

export default Info;
