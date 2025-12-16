import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ChatInterface } from "./chat-interface";

export function WorkflowChat({ workflowId }: { workflowId: string }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					size="lg"
					className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform">
					<MessageSquare className="h-6 w-6" />
				</Button>
			</SheetTrigger>

			<SheetContent
				side="right"
				className="w-full sm:max-w-[500px] p-0 flex flex-col">
				{/* Header */}
				<SheetHeader className="px-6 py-4 border-b shrink-0">
					<div className="flex items-center justify-between">
						<SheetTitle>Chat with Workflow</SheetTitle>
					</div>
				</SheetHeader>

				<ChatInterface workflowId={workflowId} />
			</SheetContent>
		</Sheet>
	);
}
