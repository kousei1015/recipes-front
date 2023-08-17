"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { BtnProps } from "../types";


const Button = ({
  user_id,
  recipe_id,
  favorite_id,
  follow_id,
  children,
}: BtnProps) => {
  const router = useRouter();

  const headers = {
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
    "access-token": Cookies.get("access-token"),
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const url = `http://localhost:3000/v1`;
    switch (children) {
      case "削除":
        await axios.delete(`${url}/recipes/${recipe_id}`, { headers });
        break;
      case "フォローする":
        await axios.post(`${url}/relationships`, { user_id }, { headers });
        break;
      case "フォローを解除":
        await axios.delete(`${url}/relationships/${follow_id}`, { headers });
        break;
      case "保存":
        await axios.post(`${url}/favorites`, { recipe_id }, { headers });
        break;
      case "お気に入りを解除":
        await axios.delete(`${url}/favorites/${favorite_id}`, { headers });
        break;
      default:
        break;
    }
    router.refresh();
  };

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
