import LoadingIndicator from "@/components/loading";
import { Button } from "@/components/ui/button";
import CustomFormError from "@/components/ui/custom-error";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loadingButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditInventoryDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}
const EditInventoryDialog = ({ id, setOpen }: EditInventoryDialogProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["edit-inventory"],
    queryFn: async () => {
      const res = await axios.get(`/api/inventory/${id}`);
      return res.data.data;
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      quantity: data?.quantity,
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      await axios.put("/api/inventory", {
        ...formData,
        quantity: parseFloat(formData.quantity),
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
          <DialogTitle>Edit Inventory</DialogTitle>
          <DialogDescription>{data.product.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              {...register("quantity", { required: "Quantity is required" })}
              type="number"
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
            >
              Cancel
            </Button>
            <LoadingButton loading={mutation.isPending} type="submit">
              Confirm
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInventoryDialog;
