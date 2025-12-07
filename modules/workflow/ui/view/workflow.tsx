import { getExitingWorkFlow } from "../../server/workflow.action";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Agent } from "@/types";
import Link from "next/link";
import { Bot, Zap, ChevronRight, Sparkles, Plus } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import { DeleteAgentButton } from "../components/delete-workflow";
import { CreateWorkFlowTemplate } from "../components/create-workflow-template";

export const WorkFlowView = async ({ userId }: { userId: string }) => {
	"use cache";
	cacheLife("hours");
	cacheTag("workflow-agent-create");
	const result = await getExitingWorkFlow(userId);
	if (!result.success) {
		console.error(result.error);
		return <div className="text-red-500">Failed to load Workflow</div>;
	}
	const getWorkflow = result.data;
	if (!getWorkflow || getWorkflow.length === 0) {
		return (
			<CreateWorkFlowTemplate/>
		);
	}
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{getWorkflow?.map((agent: Agent) => (
				<div key={agent.id} className="relative">
					<Link href={`/workflow/${agent.id}`}>
						<Card className="group relative border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
							<CardContent className="p-6">
								{/* Icon */}
								<div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
									<Bot className="w-6 h-6 text-white" />
								</div>

								{/* Title */}
								<CardTitle className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
									{agent.name}
								</CardTitle>

								{/* Footer with action */}
								<div className="flex items-center justify-between pt-4 border-t border-gray-100">
									<div className="flex items-center gap-1.5 text-blue-600">
										<Zap className="w-4 h-4" />
										<span className="text-xs font-medium">Ready to use</span>
									</div>
									<ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
								</div>
							</CardContent>

							{/* Hover effect overlay */}
							<div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
						</Card>
					</Link>

					{/* Delete button outside the Link */}
					{userId && (
						<div className="absolute top-2 right-2">
							<DeleteAgentButton userId={userId} agentId={agent.id} />
						</div>
					)}
				</div>
			))}
		</div>
	);
};
