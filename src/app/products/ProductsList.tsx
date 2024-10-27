"use client";
import DeleteItemButton from "@/components/DeleteItemButton";
import LoadingIndicator from "@/components/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import AddRecords from "./AddRecords";

const ProductsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/product");
      const productsData = await res.json();
      return productsData.data;
    },
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Products</h1>
      <AddRecords />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Id</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product: any) => {
            return (
              <TableRow key={product.productId}>
                <TableCell>{product.productId}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.supplier.name}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description || "-"}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <DeleteItemButton
                    apiEndpoint="product"
                    id={product.productId}
                    queryKey="products"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsList;
