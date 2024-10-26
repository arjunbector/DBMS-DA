import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoadingIndicator from "./loading";
import { Button } from "./ui/button";
import CustomFormError from "./ui/custom-error";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import LoadingButton from "./ui/loadingButton";

interface AddInventoryDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddInventoryDialog = ({ setOpen }: AddInventoryDialogProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["add-inventory"],
    queryFn: async () => {
      const res = await axios.get("/api/product");
      return res.data.data;
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
      await axios.post("/api/inventory", {
        ...formData,
        quantity: parseFloat(formData.quantity),
      });
    },
    onSuccess: () => {
      toast.success("Item added to inventory successfully");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
        refetchType: "all", // refetch both active and inactive queries
      });
    },
    onError: () => {
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
          <DialogTitle>Add Product to Inventory</DialogTitle>
          <DialogDescription>
            Enter the details for a the product
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="productId">Select Product</Label>
            <select
              id="productId"
              {...register("productId", {
                required: "Product is required",
                validate: (value) => value !== "none" || "Product is required",
              })}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
            >
              <option value="none">--Select Product--</option>
              {data?.map((product: any) => (
                <option key={product.productId} value={product.productId}>{product.name}</option>
              ))}
            </select>
            {errors.productId && (
              <CustomFormError>{errors.productId?.message}</CustomFormError>
            )}
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              type="number"
              id="quantity"
              {...register("quantity", { required: "Quantity is required" })}
            />
            {errors.quantity && (
              <CustomFormError>{errors.quantity?.message}</CustomFormError>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setOpen(false);
              }}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={mutation.isPending}
              disabled={mutation.isPending}
              type="submit"
            >
              Add
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventoryDialog;
