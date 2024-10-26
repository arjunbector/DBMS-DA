"use client";
import { Trash2Icon } from "lucide-react";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
interface DeleteItemButtonProps {
  id: string;
  apiEndpoint: string;
  queryKey: string;
}
const DeleteItemButton = ({
  apiEndpoint,
  id,
  queryKey,
}: DeleteItemButtonProps) => {
  const queryClient = useQueryClient();
  const [showAlert, setShowAlert] = useState(false);
  const mutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/${apiEndpoint}/${id}`);
    },
    onSuccess: () => {
      toast.success("Item deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [queryKey],
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
