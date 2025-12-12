import { Button } from "@/components/ui/button";
import { getPricingPlan } from "@/modules/workflow/server/pricing-plant";
import { AgentWorkFlowSkeleton } from "@/modules/workflow/ui/components/agent-workflow-skeleton";
import { WorkFlowView } from "@/modules/workflow/ui/view/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const WorkFlowPage = async () => {
	const { userId } = await auth();
	if (!userId) redirect("/sign-in");
	const { canCreate, count, limit } = await getPricingPlan();

	const isPro = limit === -1;

	return (
		<>
			<div className="min-h-screen p-8">
				<div className="mx-auto space-y-8">
					<Suspense fallback={<AgentWorkFlowSkeleton />}>
						<WorkFlowView
							userId={userId!}
							usage={{ canCreate, count, limit, isPro }}
						/>
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default WorkFlowPage;
