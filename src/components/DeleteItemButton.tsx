"use client";
import { Trash2Icon } from "lucide-react";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
interface DeleteItemButtonProps {
  id: string;
  apiEndpoint: string;
}
const DeleteItemButton = ({ apiEndpoint, id }: DeleteItemButtonProps) => {
  const queryClient = useQueryClient();
  const [showAlert, setShowAlert] = useState(false);
  const mutation = useMutation({
    mutationFn: async () => {
      await fetch(`/api/${apiEndpoint}/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      toast.success("Item deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [`${apiEndpoint}s`],
        refetchType: "all",
      });
      setShowAlert(false);
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
  return (
    <>
      <Button
        variant="destructive"
        onClick={() => {
          setShowAlert(true);
        }}
      >
        <Trash2Icon className="size-5 shrink-0" />
      </Button>
      {showAlert && (
        <DeleteAlertDialog
          open={showAlert}
          setOpen={setShowAlert}
          onConfirm={() => {
            mutation.mutate();
          }}
          pending={mutation.isPending}
        />
      )}
    </>
  );
};

export default DeleteItemButton;
