"use server";

import { db } from "@/drizzle/db";
import { workflows } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

interface SaveWorkflowParams {
	agentId: string;
	nodes: any[];
	edges: any[];
}

export async function saveWorkflow({
	agentId,
	nodes,
	edges,
}: SaveWorkflowParams) {
	try {
		// Check if workflow exists
		const existingWorkflow = await db
			.select()
			.from(workflows)
			.where(eq(workflows.agentId, agentId))
			.limit(1);

		if (existingWorkflow.length > 0) {
			// Update existing workflow
			await db
				.update(workflows)
				.set({
					nodes,
					edges,
					updatedAt: new Date(),
				})
				.where(eq(workflows.agentId, agentId));
		} else {
			// Create new workflow
			await db.insert(workflows).values({
				agentId,
				nodes,
				edges,
			});
		}

		return { success: true };
	} catch (error) {
		console.error("Error saving workflow:", error);
		throw new Error("Failed to save workflow");
	}
}

export async function getWorkflow(agentId: string) {
	try {
		const workflow = await db
			.select()
			.from(workflows)
			.where(eq(workflows.agentId, agentId));

		return workflow[0];
	} catch (error) {
		console.error("Error fetching workflow:", error);
		return null;
	}
}
