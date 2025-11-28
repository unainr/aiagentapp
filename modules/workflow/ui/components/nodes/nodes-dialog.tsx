"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

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
	apiMethod?: string;
	apiHeaders?: string;
	apiBody?: string;
	condition?: string;
	loopCondition?: string;
}

export const NodeDialog = ({
	open,
	onClose,
	onSave,
	nodeType,
	initialData,
}: NodeDialogProps) => {
	const [data, setData] = useState<NodeData>(initialData || {});

	// Reset data when dialog opens with new initialData
	useEffect(() => {
		if (open && initialData) {
			setData(initialData);
		}
	}, [open, initialData]);

	const handleSave = () => {
		onSave(data);
		onClose();
		// Reset data after save
		setData({});
	};

	const handleClose = () => {
		onClose();
		// Reset data on cancel
		setData({});
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
								onChange={(e: any) =>
									setData({ ...data, instruction: e.target.value })
								}
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
								onChange={(e: any) =>
									setData({ ...data, condition: e.target.value })
								}
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
								onChange={(e: any) =>
									setData({ ...data, loopCondition: e.target.value })
								}
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
								placeholder="Enter API name (e.g., Weather API)"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="apiEndpoint">API Endpoint URL</Label>
							<Input
								id="apiEndpoint"
								value={data.apiEndpoint || ""}
								onChange={(e) =>
									setData({ ...data, apiEndpoint: e.target.value })
								}
								placeholder="https://api.example.com/endpoint"
								type="url"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="apiMethod">HTTP Method</Label>
							<Select
								value={data.apiMethod || "GET"}
								onValueChange={(value) =>
									setData({ ...data, apiMethod: value })
								}>
								<SelectTrigger id="apiMethod">
									<SelectValue placeholder="Select HTTP method" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="GET">GET</SelectItem>
									<SelectItem value="POST">POST</SelectItem>
									<SelectItem value="PUT">PUT</SelectItem>
									<SelectItem value="PATCH">PATCH</SelectItem>
									<SelectItem value="DELETE">DELETE</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="apiHeaders">Headers (JSON format)</Label>
							<Textarea
								id="apiHeaders"
								value={data.apiHeaders || ""}
								onChange={(e) =>
									setData({ ...data, apiHeaders: e.target.value })
								}
								placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
								rows={3}
								className="resize-none font-mono text-sm"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="apiBody">Request Body (JSON format)</Label>
							<Textarea
								id="apiBody"
								value={data.apiBody || ""}
								onChange={(e) => setData({ ...data, apiBody: e.target.value })}
								placeholder='{"key": "value", "data": "{{userInput}}"}'
								rows={4}
								className="resize-none font-mono text-sm"
							/>
							<p className="text-xs text-muted-foreground">
								Use {"{{userInput}}"} to include user's message, {"{{context}}"}{" "}
								for previous output
							</p>
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
							onChange={(e: any) =>
								setData({ ...data, instruction: e.target.value })
							}
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
					<DialogTitle>
						Configure {nodeType.replace("Node", "")} Node
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-4">{renderFields()}</div>
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
