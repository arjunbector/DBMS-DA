import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Textarea } from "./ui/textarea";

interface AddCategoryDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddSupplierDialog = ({ setOpen }: AddCategoryDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      await axios.post("/api/supplier", formData);
    },
    onSuccess: () => {
      toast.success("Category added successfully");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
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
  return (
    <Dialog open onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Supplier</DialogTitle>
          <DialogDescription>
            Enter the details for a new supplier
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="name">Supplier name</Label>
            <Input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <CustomFormError>{errors.name?.message}</CustomFormError>
            )}
          </div>
          <div>
            <Label htmlFor="contactInformation">
              Contact Information (Optional)
            </Label>
            <Textarea
              id="contactInformation"
              {...register("contactInformation")}
            />
          </div>
          <div>
            <Label htmlFor="address">Address (Optional)</Label>
            <Textarea id="address" {...register("address")} />
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

export default AddSupplierDialog;
