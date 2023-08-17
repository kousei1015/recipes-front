"use client";
import { useState } from "react";
import styles from "./../../../styles/Sign.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/v1/auth/sign_in",
      {
        email,
        password,
        name,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    const { uid, client, "access-token": accessToken } = response.headers;
    Cookies.set("client", client);
    Cookies.set("access-token", accessToken);
    Cookies.set("uid", uid);
    router.refresh();
    router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <h2>新規登録</h2>
      <input
        type="text"
        value={email}
        onChange={handleChangeEmail}
        placeholder="emailを入力してください"
      />
      <input
        type="password"
        value={password}
        onChange={handleChangePassword}
        placeholder="passwordを入力してください"
      />
      <input
        type="text"
        value={name}
        onChange={handleChangeName}
        placeholder="名前を入力して下さい"
      />
      <button
        className={styles.btn}
        onClick={handleClick}
        disabled={!email || !password || !name}
      >
        送信する
      </button>
    </div>
  );
};

export default Page;
