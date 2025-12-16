"use server";

import { eq } from "drizzle-orm";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { workflows } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

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

export async function executeWorkflowChat(
	workflowId: string,
	userMessage: string
) {
	try {
		// 1. Get workflow from database
		const workflow = await db
			.select()
			.from(workflows)
			.where(eq(workflows.agentId, workflowId))
			.limit(1);

		if (!workflow[0]) {
			return { error: "Workflow not found" };
		}

		// 2. Parse nodes
		let nodes: WorkflowNode[];
		if (typeof workflow[0].nodes === "string") {
			nodes = JSON.parse(workflow[0].nodes);
		} else {
			nodes = workflow[0].nodes as WorkflowNode[];
		}

		// 3. Build simple workflow description for AI
		const workflowDescription = nodes
			.filter((n) => n.type !== "StartNode" && n.type !== "EndNode")
			.map((n, index) => {
				let desc = `Step ${index + 1}`;

				if (n.type === "AgentNode" && n.data.instruction) {
					desc += `: ${n.data.instruction}`;
				}

				if (n.type === "IfElseNode") {
					const condName = n.data.conditionName || "Check condition";
					const condLogic = n.data.condition || "No condition";
					desc += `: If ${condLogic}, then continue; otherwise take alternative path`;
				}

				if (n.type === "WhileNode" && n.data.condition) {
					desc += `: Repeat while ${n.data.condition}`;
				}

				if (n.type === "APINode" && n.data.apiEndpoint) {
					desc += `: Fetch data from external source`;
				}

				return desc;
			})
			.join("\n");

		// 4. Create prompt that hides technical details
		const fullPrompt = `You are a helpful AI assistant following a specific workflow to help the user.

YOUR WORKFLOW (internal - don't mention these steps to the user):
${workflowDescription}

USER'S MESSAGE:
${userMessage}

CRITICAL RULES:
1. Follow the workflow steps in order
2. Execute each instruction naturally without mentioning step numbers or technical terms
3. NEVER mention: "node", "workflow", "step", "agent", "condition", or any technical terminology
4. NEVER explain your internal process (like "I will assume", "The last node", "I need to evaluate")
5. Respond as if you're a natural human assistant
6. Keep responses conversational and helpful
7. Don't reveal that you're following a workflow

Act naturally and respond to the user now:`;

		// 5. Let AI handle everything in one call
		const { text } = await generateText({
			model: google("gemini-1.5-pro-latest"),
			prompt: fullPrompt,
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
}
