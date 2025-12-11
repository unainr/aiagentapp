import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { AgentWorkflowTools } from "@/constants";
import { Workflow } from "lucide-react";
import { DragEvent } from "react";

export const OtherNodes = () => {
	const onDragStart = (event: DragEvent, nodeType: string) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};
	return (
		<Sheet>
			{/* Icon trigger instead of text */}
			<SheetTrigger asChild>
				<Button variant="outline" className="rounded-full">
					<Workflow className="h-4 w-4" />
					Nodes
				</Button>
			</SheetTrigger>

			<SheetContent side="left" className="w-72">
				<SheetHeader>
					<SheetTitle>Workflow Tools</SheetTitle>
				</SheetHeader>

				<div className=" flex flex-col gap-2 p-2">
					{AgentWorkflowTools.map((workflow, index) => (
						<Card
							key={index}
							draggable
							onDragStart={(event) => onDragStart(event, workflow.type)}
							className="rounded-2xl p-2 border cursor-grab active:cursor-grabbing shadow-none">
							<div className="flex gap-3 items-center">
								<workflow.icon
									className="p-2 rounded-lg size-8 text-black"
									style={{ backgroundColor: workflow.bgColor }}
								/>
								<h2 className="text-sm font-medium">{workflow.name}</h2>
							</div>
						</Card>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
};
