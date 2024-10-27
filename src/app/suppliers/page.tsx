import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import SuppliersList from "./SuppliersList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suppliers",
  description: "Suppliers page",
};

const SuppliersPage = () => { 
  return (
    <MaxWidthWrapper>
      <SuppliersList />
    </MaxWidthWrapper>
  );
};

export default SuppliersPage;
