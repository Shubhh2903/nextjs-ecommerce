import dynamic from "next/dynamic";
import React from "react";

const AdminProduct = dynamic(() => import("@/imports/pages/adminProduct"), {
  ssr: false,
});
const product = () => {
  return <AdminProduct />;
};

export default product;
