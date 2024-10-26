import React from "react";

const CustomFormError = ({ children }: { children: any }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

export default CustomFormError;
