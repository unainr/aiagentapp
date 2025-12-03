"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteAgent } from "../../server/workflow.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Trash } from "lucide-react";

interface DeleteAgentButtonProps {
  userId: string;
  agentId:string
}

export const DeleteAgentButton: React.FC<DeleteAgentButtonProps> = ({ userId,agentId }) => {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const response = await deleteAgent(agentId,userId);
      if (response.success) {
        toast.success('Agent and its workflows have been deleted.');
      
      } else {
        toast.success('Agent Error');
      }
      setIsDialogOpen(false);
    });
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
        disabled={isPending}
      >
        {isPending ? <Spinner  /> : <Trash className="w-4 h-4" />}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>Are you sure you want to delete this agent? This will also delete all workflows.</p>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
