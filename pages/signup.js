import SignUpForm from "@/imports/pages/signup";
import React, { useEffect } from "react";
import nookies from "nookies";
import { useRouter } from "next/router";
const signup = () => {
  const router = useRouter();
  const { token } = nookies.get({});
  useEffect(() => {
    if (token) {
      router.push("/product");
    }
  }, []);
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default signup;
