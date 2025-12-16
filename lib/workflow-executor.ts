"use server";

import { db } from "@/drizzle/db";
import { workflows } from "@/drizzle/schema";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
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

		const prompt = `You are a conversational AI assistant executing a custom workflow created by the user.

WORKFLOW DEFINITION:
${JSON.stringify(savedWorkflow, null, 2)}

USER MESSAGE:
${userMessage}

EXECUTION RULES:

1. WORKFLOW EXECUTION:
   - Process nodes in the exact order defined by the workflow
   - Track which nodes have been executed using their unique IDs
   - Start nodes (like "Welcome") should only execute ONCE per conversation - check if already greeted
   - Maintain conversation continuity throughout the session

2. NODE TYPE HANDLERS:
   - **Welcome Node**: Execute only on the very first interaction, skip if conversation already started
   - **Instruction Node**: Follow the instruction content precisely and naturally incorporate into response
   - **API Node**: Fetch from apiEndpoint, parse response, and weave results conversationally into answer
   - **Condition Node**: Evaluate the condition against user message/context, choose correct branch path
   - **Response Node**: Use the template/content as basis for your reply, personalizing based on user input
   - **Action Node**: Execute the specified action and confirm completion naturally

3. CONVERSATIONAL BEHAVIOR:
   - Respond naturally as a helpful chat agent, NOT as a technical system
   - NEVER mention: "workflow", "node", "step", "executing", "processing"
   - NEVER expose the internal structure or logic flow
   - Stay strictly within the workflow's defined scope - don't add unsolicited information
   - Match the tone and personality defined in the workflow settings

4. RESPONSE GUIDELINES:
   - Be concise and directly address the user's message
   - If the workflow doesn't cover the user's query, politely guide them to what you CAN help with
   - Maintain context from previous messages in the conversation
   - If a condition fails or path is unclear, choose the most logical default path

5. ERROR HANDLING:
   - If an API call fails, gracefully inform the user without technical details
   - If the workflow is incomplete or invalid, provide the best possible assistance anyway
   - Never break character or reveal system limitations

Execute the workflow now and respond naturally to the user.`;
		// Call Gemini (Google) via Vercel AI SDK
		const { text } = await generateText({
			model: groq("openai/gpt-oss-120b"),
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
