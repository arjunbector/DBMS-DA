import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { CodesandboxIcon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 backdrop-blur-md">
      <MaxWidthWrapper className="flex items-center justify-between py-2">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-3xl font-bold text-primary"
          >
            <CodesandboxIcon className="size-8 shrink-0" />
            InventoryPro
          </Link>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <Link href="/">Home</Link>
          <Link href="/inventory">Inventory</Link>
          <Link href="/products">Produts</Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
