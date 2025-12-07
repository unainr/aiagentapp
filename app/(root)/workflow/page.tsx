import { AgentWorkFlowSkeleton } from "@/modules/workflow/ui/components/agent-workflow-skeleton";
import { WorkFlowView } from "@/modules/workflow/ui/view/workflow";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

const WorkFlowPage = async () => {
	const {userId} = await auth()
	return (
		<>
			<div className="min-h-screen  p-8 ">
				<div className=" mx-auto">
					

					{/* Grid */}
					
						<Suspense fallback={<AgentWorkFlowSkeleton />}>
							<WorkFlowView userId={userId!} />
						</Suspense>
					
				</div>
			</div>
		</>
	);
};

export default WorkFlowPage;
