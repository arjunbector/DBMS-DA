import AddCategoryDialog from "@/components/AddCategoryDialog";
import AddProductDialog from "@/components/AddProductDialog";
import AddSupplierDialog from "@/components/AddSupplierDialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const AddRecords = () => {
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false);
  const [showAddSupplierDialog, setShowAddSupplierDialog] = useState(false);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  return (
    <div className="my-10 flex justify-end gap-4">
      {showAddCategoryDialog && (
        <AddCategoryDialog
          open={showAddCategoryDialog}
          setOpen={setShowAddCategoryDialog}
        />
      )}
      {showAddSupplierDialog && (
        <AddSupplierDialog
          open={showAddSupplierDialog}
          setOpen={setShowAddSupplierDialog}
        />
      )}
      {showAddProductDialog && (
        <AddProductDialog
          open={showAddProductDialog}
          setOpen={setShowAddProductDialog}
        />
      )}
      <Button
        variant="outline"
        onClick={() => {
          setShowAddCategoryDialog(true);
        }}
      >
        Add Category
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setShowAddSupplierDialog(true);
        }}
      >
        Add Supplier
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setShowAddProductDialog(true);
        }}
      >
        Add Product
      </Button>
    </div>
  );
};

export default AddRecords;
