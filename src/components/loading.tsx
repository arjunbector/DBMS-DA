import { Loader2Icon } from "lucide-react";
import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Loader2Icon className="mx-auto size-6 animate-spin" />
      <h1>Loading...</h1>
    </div>
  );
};

export default LoadingIndicator;
