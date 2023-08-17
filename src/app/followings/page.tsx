import styles from "./../../../styles/Follow.module.css";
import Button from "../component/Button";
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

const fetchFollowings = async (id: number) => {
  const cookieStore = cookies();
  const client = cookieStore.get("client");
  const accessToken = cookieStore.get("access-token");
  const uid = cookieStore.get("uid");
  if (client && accessToken && uid) {
    const res = await fetch(`http://localhost:3000/v1/users/myfollowings`, {
      headers: {
        uid: uid.value,
        client: client.value,
        "access-token": accessToken.value,
      },
      cache: "no-store",
    });
    const followings = await res.json();
    return followings;
  }
};

const Page = async () => {
  const userInfo = await fetchUserSelf();
  const followings: FOLLOW = await fetchFollowings(userInfo.id);
  return (
    <div className={styles.wrapper}>
      <h2>フォロー</h2>
      {followings.map((following) => {
        return (
          <div key={following.id}>
            <h3 className={styles.name}>{following.user_name}</h3>
            <Link href={`followings/${following.followed_id}/recipes`}>
              この人の投稿を見る
            </Link>
            <Button follow_id={following.id}>フォローを解除</Button>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
