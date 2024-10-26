import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}
const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto px-4 md:px-10", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
