interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

import React from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

const LoadingButton = ({
  loading,
  className,
  disabled,
  children,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2Icon className="size-5 animate-spin" />}
      {children}
    </Button>
  );
};

export default LoadingButton;
