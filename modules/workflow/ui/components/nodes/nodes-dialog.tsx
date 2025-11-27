"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface NodeDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: NodeData) => void;
  nodeType: string;
  initialData?: NodeData;
}

export interface NodeData {
  label?: string;
  instruction?: string;
  apiEndpoint?: string;
  condition?: string;
  loopCondition?: string;
}

export const NodeDialog = ({ open, onClose, onSave, nodeType, initialData }: NodeDialogProps) => {
  const [data, setData] = useState<NodeData>(initialData || {});

  const handleSave = () => {
    onSave(data);
    onClose();
  };

  const renderFields = () => {
    switch (nodeType) {
      case "AgentNode":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="label">Agent Name</Label>
              <Input
                id="label"
                value={data.label || ""}
                onChange={(e) => setData({ ...data, label: e.target.value })}
                placeholder="Enter agent name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instruction">Instructions</Label>
              <Textarea
                id="instruction"
                value={data.instruction || ""}
                onChange={(e:any) => setData({ ...data, instruction: e.target.value })}
                placeholder="Enter instructions for this agent..."
                rows={6}
                className="resize-none"
              />
            </div>
          </>
        );

      case "IfElseNode":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="label">Condition Name</Label>
              <Input
                id="label"
                value={data.label || ""}
                onChange={(e) => setData({ ...data, label: e.target.value })}
                placeholder="Enter condition name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">Condition Logic</Label>
              <Textarea
                id="condition"
                value={data.condition || ""}
                onChange={(e:any) => setData({ ...data, condition: e.target.value })}
                placeholder="Define the condition (e.g., if user input contains 'help')"
                rows={4}
              />
            </div>
          </>
        );

      case "WhileNode":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="label">Loop Name</Label>
              <Input
                id="label"
                value={data.label || ""}
                onChange={(e) => setData({ ...data, label: e.target.value })}
                placeholder="Enter loop name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loopCondition">Loop Condition</Label>
              <Textarea
                id="loopCondition"
                value={data.loopCondition || ""}
                onChange={(e:any) => setData({ ...data, loopCondition: e.target.value })}
                placeholder="Define when to continue looping"
                rows={4}
              />
            </div>
          </>
        );

      case "APINode":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="label">API Name</Label>
              <Input
                id="label"
                value={data.label || ""}
                onChange={(e) => setData({ ...data, label: e.target.value })}
                placeholder="Enter API name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiEndpoint">API Endpoint</Label>
              <Input
                id="apiEndpoint"
                value={data.apiEndpoint || ""}
                onChange={(e) => setData({ ...data, apiEndpoint: e.target.value })}
                placeholder="https://api.example.com/endpoint"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instruction">Request Configuration</Label>
              <Textarea
                id="instruction"
                value={data.instruction || ""}
                onChange={(e:any) => setData({ ...data, instruction: e.target.value })}
                placeholder="Define headers, body, method, etc."
                rows={4}
              />
            </div>
          </>
        );

      case "EndNode":
        return (
          <div className="space-y-2">
            <Label htmlFor="instruction">Final Message</Label>
            <Textarea
              id="instruction"
              value={data.instruction || ""}
              onChange={(e:any) => setData({ ...data, instruction: e.target.value })}
              placeholder="Enter the final message to display..."
              rows={4}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configure {nodeType.replace("Node", "")} Node</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {renderFields()}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};