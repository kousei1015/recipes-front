"use client";
import styles from "./../../../styles/Sign.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sign } from "../types";
import axios from "axios";
import Cookies from "js-cookie";

const validationSchema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスを入力して下さい")
    .email("正しいメールアドレスを入力して下さい"),
  password: z.string().nonempty().min(6, "パスワードは6文字以上入力して下さい"),
  name: z.string().nonempty("名前を入力して下さい"),
});

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Sign>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: Sign) => {
    const response = await axios.post("http://localhost:3000/v1/auth/", data);
    const { uid, client, "access-token": accessToken } = response.headers;
    Cookies.set("client", client);
    Cookies.set("access-token", accessToken);
    Cookies.set("uid", uid);
    router.refresh();
    router.push("/");
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <h2>新規登録</h2>
      <input
        type="text"
        {...register("email")}
        placeholder="emailを入力してください"
      />
      <input
        type="password"
        {...register("password")}
        placeholder="passwordを入力してください"
      />
      <input
        type="text"
        {...register("name")}
        placeholder="名前を入力して下さい"
      />
      <button className={styles.btn} type="submit">
        送信する
      </button>
    </form>
  );
};

export default Page;
