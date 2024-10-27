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
import AddRecords from "../products/AddRecords";

const CategoriesList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/category");
      const categoriesData = await res.json();
      return categoriesData.data;
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
      <h1 className="text-center text-3xl font-bold">Categories</h1>
      <AddRecords />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category: any) => {
            return (
              <TableRow key={category.categoryId}>
                <TableCell>{category.categoryId}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description || "-"}</TableCell>
                <TableCell>
                  <DeleteItemButton
                    apiEndpoint="category"
                    id={category.categoryId}
                    queryKey="categories"
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

export default CategoriesList;
