import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import CustomFormError from "./ui/custom-error";
import { Textarea } from "./ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import LoadingIndicator from "./loading";

interface AddCategoryDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddProductDialog = ({ setOpen, open }: AddCategoryDialogProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["add-product"],
    queryFn: async () => {
      const [categoriesData, suppliersData] = await Promise.all([
        axios.get("/api/category"),
        axios.get("/api/supplier"),
      ]);
      return {
        categories: categoriesData.data.data,
        suppliers: suppliersData.data.data,
      };
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      await axios.post("/api/product", {
        ...formData,
        price: parseFloat(formData.price),
      });
    },
    onSuccess: () => {
      toast.success("Product added successfully");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["products"],
        refetchType: "all", // refetch both active and inactive queries
      });
    },
    onError: (error) => {
      toast.error("An error occurred");
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  if (isLoading)
    return (
      <Dialog open onOpenChange={setOpen}>
        <DialogContent>
          <LoadingIndicator />
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog open onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Enter the details for a new product
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="categoryId">Select Category</Label>
            <select
              id="categoryId"
              {...register("categoryId", {
                required: "Category is required",
                validate: (value) => value !== "none" || "Category is required",
              })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
            >
              <option value="none">--Select Category--</option>
              {data?.categories.map((category: any) => (
                <option value={category.categoryId}>{category.name}</option>
              ))}
            </select>
            {errors.categoryId && (
              <CustomFormError>{errors.categoryId?.message}</CustomFormError>
            )}
          </div>
          <div>
            <Label htmlFor="name">Select Supplier</Label>
            <select
              {...register("supplierId", {
                required: "Supplier is required",
                validate: (value) => value !== "none" || "Supplier is required",
              })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
            >
              <option value="none">--Select Supplier--</option>
              {data?.suppliers.map((supplier: any) => (
                <option value={supplier.supplierId}>{supplier.name}</option>
              ))}
            </select>
            {errors.supplierId && (
              <CustomFormError>{errors.supplierId?.message}</CustomFormError>
            )}
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <CustomFormError>{errors.name?.message}</CustomFormError>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" {...register("description")} />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <CustomFormError>{errors.price?.message}</CustomFormError>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
