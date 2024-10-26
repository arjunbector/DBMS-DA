import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Metadata } from "next";
import React from "react";
import ProductsList from "./ProductsList";
export const metadata: Metadata = {
  title: "Products",
  description: "Products page",
};
const ProductsPage = () => {
  return (
    <MaxWidthWrapper>
      <ProductsList />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
