import LoginForm from "@/imports/pages/login";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect } from "react";
export default function Home() {
  const { token } = nookies.get({});
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/product");
    }
  }, []);
  return (
    <>
      <LoginForm />
    </>
  );
}
