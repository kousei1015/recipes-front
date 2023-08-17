import styles from "./../../../styles/Follow.module.css";
import { FOLLOW } from "../types";
import Link from "next/link";
import { cookies } from "next/headers";

const fetchUserSelf = async () => {
  const cookieStore = cookies();
  const client = cookieStore.get("client");
  const accessToken = cookieStore.get("access-token");
  const uid = cookieStore.get("uid");
  if (client && accessToken && uid) {
    const res = await fetch("http://localhost:3000/v1/users", {
      headers: {
        uid: uid.value,
        client: client.value,
        "access-token": accessToken.value,
      },
      cache: "no-store",
    });
    const user = await res.json();
    return user;
  }
};

const fetchFollowers = async (id: number) => {
  const cookieStore = cookies();
  const client = cookieStore.get("client");
  const accessToken = cookieStore.get("access-token");
  const uid = cookieStore.get("uid");
  if (client && accessToken && uid) {
    const res = await fetch(`http://localhost:3000/v1/users/myfollowers`, {
      headers: {
        uid: uid.value,
        client: client.value,
        "access-token": accessToken.value,
      },
      cache: "no-store",
    });
    const followers = await res.json();
    return followers;
  }
};

const Page = async () => {
  const userInfo = await fetchUserSelf();
  const followers: FOLLOW = await fetchFollowers(userInfo.id);
  return (
    <div className={styles.wrapper}>
      <h2>フォロワー</h2>
      {followers.map((follower) => {
        return (
          <div key={follower.id}>
            <h3 className={styles.name}>{follower.user_name}</h3>
            <Link href={`followers/${follower.follower_id}/recipes`}>
              この人の投稿を見る
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
