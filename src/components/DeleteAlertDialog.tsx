import { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "./ui/alert-dialog";
import LoadingButton from "./ui/loadingButton";

interface DeleteAlertDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  pending: boolean;
}

export const DeleteAlertDialog = ({
  setOpen,
  onConfirm,
  pending = false,
}: DeleteAlertDialogProps) => {
  return (
    <AlertDialog
      open
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            onClick={onConfirm}
            variant="destructive"
            loading={pending}
          >
            Continue
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
