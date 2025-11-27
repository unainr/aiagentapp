"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addAgent } from "../../server/workflow.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export function CreateAgentDialog() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [agentName, setAgentName] = useState("");
	const [open, setOpen] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setLoading(true);
			const data = await addAgent({ agentName });
			if (data) {
				setOpen(false);
				router.push(`/workflow/${data.id}`);
			} else {
				toast.error("Agent not created");
			}
		} catch (error: any) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Add Agent</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Add New Agent</DialogTitle>
						<DialogDescription>
							Enter the agent name and submit the form.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="agent-name">Agent Name</Label>
							<Input
								id="agent-name"
								name="agentName"
								placeholder="Type agent name..."
								value={agentName}
								onChange={(e) => setAgentName(e.target.value)}
							/>
						</div>
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline" type="button">
								Cancel
							</Button>
						</DialogClose>

						<Button type="submit">
							{loading ? (
								<>
									Agent Creating... <Spinner />
								</>
							) : (
								"Add Agent"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
