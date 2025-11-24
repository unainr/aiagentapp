import { CreateAgentDialog } from "@/modules/workflow/ui/components/create-agent-dialog";

export const HomeView = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<CreateAgentDialog />
		</div>
	);
};
