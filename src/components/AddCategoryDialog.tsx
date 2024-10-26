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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface AddCategoryDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddCategoryDialog = ({ setOpen, open }: AddCategoryDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      await axios.post("/api/category", formData);
    },
    onSuccess: () => {
      toast.success("Category added successfully");
      setOpen(false);
    },
    onError: (error) => {
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
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Enter the details for a new category
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="name">Category name</Label>
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
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" {...register("description")} />
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

export default AddCategoryDialog;
