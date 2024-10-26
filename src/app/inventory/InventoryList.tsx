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
import EditInventoryButton from "./EditInventoryButton";

const InventoryList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const res = await fetch("/api/inventory");
      const inventoryData = await res.json();
      return inventoryData.data;
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
      <AddRecords />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((inventoryItem: any) => {
            const updatedAtTime = new Date(
              inventoryItem.lastUpdated,
            ).toLocaleTimeString();
            const updatedAtDate = new Date(
              inventoryItem.lastUpdated,
            ).toDateString();
            return (
              <TableRow key={inventoryItem.inventoryId}>
                <TableCell>{inventoryItem.inventoryId}</TableCell>
                <TableCell>{inventoryItem.product.name}</TableCell>
                <TableCell>{inventoryItem.quantity}</TableCell>
                <TableCell>{updatedAtTime + " | " + updatedAtDate}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <DeleteItemButton
                    apiEndpoint="inventory"
                    id={inventoryItem.inventoryId}
                    queryKey="inventory"
                  />
                  <EditInventoryButton id={inventoryItem.inventoryId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryList;
