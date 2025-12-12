import { getExitingWorkFlow } from "../../server/workflow.action";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Agent } from "@/types";
import Link from "next/link";
import { Bot, Zap, ChevronRight, Sparkles, Plus } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import { DeleteAgentButton } from "../components/delete-workflow";
import { CreateWorkFlowTemplate } from "../components/create-workflow-template";
import { CreateAgentDialog } from "../components/create-agent-dialog";
import { Button } from "@/components/ui/button"; // Added import for Button

export const WorkFlowView = async ({
	userId,
	usage,
}: {
	userId: string;
	usage: { count: number; limit: number; isPro: boolean; canCreate: boolean };
}) => {
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
		return <CreateWorkFlowTemplate />;
	}

	const percentage = usage.isPro
		? 0
		: Math.min((usage.count / usage.limit) * 100, 100);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{/* Create/Limit Card */}
			{!usage.canCreate ? (
				// Limit Reached State
				<Link href="/pricing" className="block h-full">
					<div className="group relative flex flex-col items-center justify-center p-8 h-full min-h-[280px] border-2 border-dashed border-red-200 dark:border-red-900/50 rounded-3xl bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 cursor-pointer">
						<div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
							<Sparkles className="w-8 h-8 text-red-600 dark:text-red-400" />
						</div>
						<h3 className="text-xl font-bold text-foreground mb-2">
							Limit Reached
						</h3>
						<p className="text-muted-foreground text-center text-sm max-w-[200px] mb-6">
							Upgrade to Pro for unlimited workflows
						</p>
						<div className="w-full max-w-[180px] space-y-2">
							<div className="flex justify-between text-xs font-medium text-red-600 dark:text-red-400">
								<span>
									{usage.count} / {usage.limit} Used
								</span>
								<span>100%</span>
							</div>
							<div className="h-2 w-full bg-red-100 dark:bg-red-950 rounded-full overflow-hidden">
								<div className="h-full bg-red-500 rounded-full w-full" />
							</div>
							<Button
								size="sm"
								variant="outline"
								className="w-full mt-4 border-red-200 hover:bg-red-100 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-900/50 dark:hover:text-red-400">
								Upgrade Plan
							</Button>
						</div>
					</div>
				</Link>
			) : (
				// Create New State
				<CreateAgentDialog
					trigger={
						<div className="group relative flex flex-col items-center justify-center p-8 h-full min-h-[280px] border-2 border-dashed border-muted-foreground/25 rounded-3xl bg-muted/5 hover:bg-muted/10 hover:border-primary/50 transition-all duration-300 cursor-pointer">
							<div className="flex-1 flex flex-col items-center justify-center">
								<div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
									<Plus className="w-8 h-8 text-primary" />
								</div>
								<h3 className="text-xl font-bold text-foreground mb-2">
									Create New Workflow
								</h3>
								<p className="text-muted-foreground text-center text-sm max-w-[200px]">
									Start building your next AI automation agent
								</p>
							</div>

							{/* Progress Bar (Only if not Pro) */}
							{!usage.isPro && (
								<div className="w-full max-w-[180px] mt-6 space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
									<div className="flex justify-between text-xs font-medium text-muted-foreground">
										<span>
											{usage.count} / {usage.limit} workflows
										</span>
										<span>{Math.round(percentage)}%</span>
									</div>
									<div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
										<div
											className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
											style={{ width: `${percentage}%` }}
										/>
									</div>
								</div>
							)}
						</div>
					}
				/>
			)}

			{getWorkflow?.map((agent: Agent) => (
				<div key={agent.id} className="relative group/card">
					<Link href={`/workflow/${agent.id}`} className="block h-full">
						<Card className="h-full relative border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden group-hover/card:-translate-y-1">
							<CardContent className="p-8 flex flex-col h-full">
								{/* Header */}
								<div className="flex items-start justify-between mb-6">
									<div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform duration-300">
										<Bot className="w-7 h-7 text-white" />
									</div>
									<div className="p-2 rounded-full bg-background border border-border text-muted-foreground group-hover/card:text-primary transition-colors">
										<ChevronRight className="w-5 h-5 group-hover/card:translate-x-0.5 transition-transform" />
									</div>
								</div>

								{/* Content */}
								<div className="mt-auto">
									<CardTitle className="text-xl font-bold text-foreground mb-3 group-hover/card:text-primary transition-colors">
										{agent.name}
									</CardTitle>

									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<div className="flex items-center gap-1.5 text-primary bg-primary/10 px-2.5 py-1 rounded-full font-medium text-xs">
											<Zap className="w-3.5 h-3.5" />
											<span>Ready to use</span>
										</div>
										<span className="text-xs opacity-60">Updated recently</span>
									</div>
								</div>
							</CardContent>

							{/* Gradient Overlay */}
							<div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
						</Card>
					</Link>

					{/* Delete Button */}
					{userId && (
						<div className="absolute top-4 right-4 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
							<DeleteAgentButton userId={userId} agentId={agent.id} />
						</div>
					)}
				</div>
			))}
		</div>
	);
};
