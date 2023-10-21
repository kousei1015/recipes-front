"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useFollow = () => {
  const router = useRouter();
  const headers = {
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
    "access-token": Cookies.get("access-token"),
  };

  const followUser = async (user_id: number) => {
    const url = `http://localhost:3000/v1`;

    try {
      await axios.post(`${url}/relationships`, { user_id }, { headers });
      router.refresh();
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  const unfollowUser = async (follow_id: number) => {
    const url = `http://localhost:3000/v1`;

    try {
      await axios.delete(`${url}/relationships/${follow_id}`, { headers });
      router.refresh();
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return { followUser, unfollowUser };
};

export default useFollow;
