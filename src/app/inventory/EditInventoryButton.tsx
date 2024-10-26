import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import EditInventoryDialog from "./EditInventoryDialog";

interface EditInventoryButtonProps {
  id: string;
}
const EditInventoryButton = ({ id }: EditInventoryButtonProps) => {
  const [showEditInventoryDialog, setShowEditInventoryDialog] = useState(false);
  return (
    <>
      {showEditInventoryDialog && (
        <EditInventoryDialog id={id} setOpen={setShowEditInventoryDialog} />
      )}
      <Button
        onClick={() => {
          setShowEditInventoryDialog(true);
        }}
      >
        <PencilIcon className="size-5 shrink-0" />
      </Button>
    </>
  );
};

export default EditInventoryButton;
