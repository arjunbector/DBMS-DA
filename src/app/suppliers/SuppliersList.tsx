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

const SuppliersList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const res = await fetch("/api/supplier");
      const supplersData = await res.json();
      return supplersData.data;
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
      <h1 className="text-center text-3xl font-bold">Suppliers</h1>
      <AddRecords />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((supplier: any) => {
            return (
              <TableRow key={supplier.supplierId}>
                <TableCell>{supplier.supplierId}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contactInformation}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>
                  <DeleteItemButton
                    apiEndpoint="supplier"
                    id={supplier.supplierId}
                    queryKey="suppliers"
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

export default SuppliersList;
