import { AgentWorkFlowSkeleton } from "@/modules/workflow/ui/components/agent-workflow-skeleton";
import { WorkFlowView } from "@/modules/workflow/ui/view/workflow";
import { Suspense } from "react";

const WorkFlowPage = () => {
	return (
		<>
			<div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-8 pt-24">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="mb-12">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Your Agents
						</h1>
						<p className="text-gray-600">Manage and deploy your AI agents</p>
					</div>

					{/* Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Suspense fallback={<AgentWorkFlowSkeleton />}>
							<WorkFlowView />
						</Suspense>
					</div>
				</div>
			</div>
		</>
	);
};

export default WorkFlowPage;
