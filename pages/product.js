import ProductForm from "@/imports/pages/product";
import React, { useEffect } from "react";
import nookies from "nookies";
import { useRouter } from "next/router";

const product = () => {
  const router = useRouter();
  const { token } = nookies.get({});

  useEffect(() => {
    !token && router.push("/");
  }, []);

  return <ProductForm />;
};

export default product;
