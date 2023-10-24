import { AUTHINFO } from "../src/app/types";
import { cookies } from "next/headers";

const useAuthInfo = async () => {
  const cookieStore = cookies();
  const client = cookieStore.get("client");
  const accessToken = cookieStore.get("access-token");
  const uid = cookieStore.get("uid");
  const res = await fetch("http://localhost:3000/v1/users", {
    headers: {
      uid: uid?.value as any,
      client: client?.value as any,
      "access-token": accessToken?.value as any,
    },
    cache: "no-store",
  });
  const authData: AUTHINFO = await res.json();
  return { authData };
};

export default useAuthInfo;
