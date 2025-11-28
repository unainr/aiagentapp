"use server";

import { db } from "@/drizzle/db";
import { workflows } from "@/drizzle/schema";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { eq } from "drizzle-orm";

interface WorkflowNode {
	id: string;
	type: string;
	data: {
		label: string;
		instruction?: string;
		apiEndpoint?: string;
		condition?: string;
		conditionName?: string;
	};
}
export const workFlowExecute = async (
	workflowId: string,
	userMessage: string
) => {
	try {
		const workflow = await db
			.select()
			.from(workflows)
			.where(eq(workflows.agentId, workflowId));
		// 2. Check if found
		if (!workflow || workflow.length === 0) {
			return { error: "Workflow not found" };
		}

		// 3. Extract saved workflow JSON
		const savedWorkflow = workflow[0].nodes as WorkflowNode[];

		if (!savedWorkflow || savedWorkflow.length === 0) {
			return { error: "Workflow JSON is empty or invalid" };
		}

		const prompt = `
You are an AI assistant that MUST follow the user's custom workflow.

WORKFLOW JSON (follow exactly):
${JSON.stringify(savedWorkflow, null, 2)}

USER MESSAGE:
${userMessage}

RULES:
1. Follow the workflow steps in order.
2. If a node contains "instruction", follow that instruction in your reply.
3. If a node contains "apiEndpoint", fetch that API and use the result in your answer.
4. When replying, act like a chat agent, not JSON.
5. Keep responses friendly and based only on the workflow.
`;

		// Call Gemini (Google) via Vercel AI SDK
		const { text } = await generateText({
			model: google("gemini-2.5-flash"),
			prompt,
		});
		return { response: text };
	} catch (error) {
		console.error("Workflow execution error:", error);
		return {
			error: `Failed to execute workflow: ${
				error instanceof Error ? error.message : "Unknown error"
			}`,
		};
	}
};
