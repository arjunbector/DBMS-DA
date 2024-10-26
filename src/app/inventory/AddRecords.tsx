import AddInventoryDialog from "@/components/AddInventoryDialog";
import AddProductDialog from "@/components/AddProductDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AddRecords = () => {
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [showAddInventoryDialog, setShowAddInventoryDialog] = useState(false);
  return (
    <div className="my-10 flex justify-end gap-4">
      {showAddProductDialog && (
        <AddProductDialog setOpen={setShowAddProductDialog} />
      )}
      {showAddInventoryDialog && (
        <AddInventoryDialog setOpen={setShowAddInventoryDialog} />
      )}

      <Button
        variant="outline"
        onClick={() => {
          setShowAddProductDialog(true);
        }}
      >
        Add Product
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setShowAddInventoryDialog(true);
        }}
      >
        Add into inventory
      </Button>
    </div>
  );
};

export default AddRecords;
