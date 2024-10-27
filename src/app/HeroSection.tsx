import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import heroSectionImage from "@/../public/hero-section.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const HeroSection = () => {
  return (
    <MaxWidthWrapper>
      <div className="h-[50vh]">
        <div className="flex min-h-[50vh] items-center justify-center bg-[url('/hero-section.jpg')] bg-cover">
          <div className="w-fit space-y-2 rounded-lg bg-white/80 px-16 py-10">
            <h1 className="text-3xl font-bold">Welcome to InventoryPro</h1>
            <p>Manage your inventory efficiently and effortlessly</p>
            <div className="flex gap-2">
              <Button asChild className="w-full">
                <Link href="/products">Add Product</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/inventory">Go to inventory</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-full p-10 shadow-xl">
          <h1 className="text-2xl font-semibold">How does it work?</h1>
          <ol className="list-inside list-disc text-lg">
            <li>Add categories and suppliers.</li>
            <li>Add Products using the categories and suppliers.</li>
            <li>Add Products to inventory.</li>
          </ol>
          <p className="text-lg">
            That&apos;all! You can now manage your inventory efficiently and
            effortlessly.🔥
          </p>
        </div>
        <div className="w-full p-10 shadow-xl space-y-3">
          <h1 className="text-2xl font-semibold">Add a new product</h1>
          <p className="text-lg">
            Easily add products to your inventory with our streamlined process.
          </p>
          <div>
            <Button asChild>
              <Link href="/products">Add Product</Link>
            </Button>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default HeroSection;
