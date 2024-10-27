import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import CategoriesList from "./CategoriesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Categories page",
};

const CategoriesPage = () => {
  return (
    <MaxWidthWrapper>
      <CategoriesList/>
    </MaxWidthWrapper>
  );
};

export default CategoriesPage;
