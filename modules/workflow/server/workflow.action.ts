"use server";

import { db } from "@/drizzle/db";
import { agents, workflows } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { updateTag } from "next/cache";

interface Props {
	agentName: string;
}
// TODO: Create Agent
export const addAgent = async ({ agentName }: Props) => {
	const { userId } = await auth();
	if (!userId) throw new Error("user id not find");
	try {
		const [data] = await db
			.insert(agents)
			.values({
				agent_name: agentName,
				userId,
			})
			.returning();
			updateTag('workflow-agent-create')
		return data;
	} catch (error: any) {
		console.log(error.message);
	}
};
// TODO: Exiting Work Flow Agent
export const exitingWorkFlowAgent = async (agentId: string) => {
	try {
		const exitingworkflow = await db
			.select()
			.from(workflows)
			.where(eq(workflows.id, agentId));
		if (!exitingworkflow || exitingworkflow.length === 0) {
			throw new Error("workflow not found");
		}
		return { success: true, data: exitingworkflow[0] };
	} catch (error) {
		return {
			success: false,
			error,
		};
	}
};

// TODO: Get Exiting Work Flow

export const getExitingWorkFlow = async () => { 
try {
    const result = await db.select({id:agents.id,name:agents.agent_name}).from(agents)
    return {success:true,data:result}
} catch (error) {
return {success:false,error}
}
} 

// TODO: Later on Un Comment it 
// export async function getUserAgents(userId: string) {
//   const userAgents = await db
//     .select()
//     .from(agents)
//     .where(eq(agents.userId,userId))
//     .orderBy(desc(agents.createdAt))

//   return userAgents
// }

export const deleteAgent = async (id: string) => {
  try {
    // Delete the agent, workflows will auto-delete due to cascade
    const result = await db.delete(agents).where(eq(agents.id, id));
	updateTag("workflow-agent-create");

    return {
      success: true,
      deletedCount: result.rowCount, // number of agents deleted
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : error,
    };
  }
};