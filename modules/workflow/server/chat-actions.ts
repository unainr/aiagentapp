"use server";

import { eq } from "drizzle-orm";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/drizzle/db";
import { chatSessions, workflows } from "@/drizzle/schema";

interface ExecuteWorkflowParams {
  agentId: string;
  userInput: string;
  conversationHistory: any[];
}

export async function executeWorkflow({
  agentId,
  userInput,
  conversationHistory,
}: ExecuteWorkflowParams) {
  try {
    // Get the workflow
    const workflow = await db
      .select()
      .from(workflows)
      .where(eq(workflows.agentId, agentId))
      .limit(1);

    if (!workflow[0]) {
      throw new Error("Workflow not found");
    }

    const { nodes, edges } = workflow[0];

    // Execute workflow logic
    const output = await processWorkflow(
      nodes as any[],
      edges as any[],
      userInput,
      conversationHistory
    );

    // Save chat session
    const newMessages = [
      ...conversationHistory,
      { role: "user", content: userInput },
      { role: "assistant", content: output },
    ];

    await db.insert(chatSessions).values({
      agentId,
      messages: newMessages,
    });

    return { output };
  } catch (error) {
    console.error("Error executing workflow:", error);
    throw new Error("Failed to execute workflow");
  }
}

async function processWorkflow(
  nodes: any[],
  edges: any[],
  userInput: string,
  conversationHistory: any[]
): Promise<string> {
  // Find start node
  const startNode = nodes.find((n) => n.type === "StartNode");
  if (!startNode) return "Error: No start node found";

  // Traverse the workflow
  let currentNodeId = startNode.id;
  let output = "";
  let context = ""; // Store context for passing between nodes

  while (currentNodeId) {
    const currentNode = nodes.find((n) => n.id === currentNodeId);
    if (!currentNode) break;

    // Process based on node type
    switch (currentNode.type) {
      case "AgentNode":
        // Execute agent logic with instruction
        output = await executeAgentNode(
          currentNode.data,
          userInput,
          conversationHistory,
          context
        );
        context = output; // Store output as context for next nodes
        break;

      case "IfElseNode":
        // Evaluate condition
        const conditionMet = await evaluateCondition(
          currentNode.data.condition,
          userInput,
          output,
          conversationHistory
        );
        
        // Find the correct edge based on condition
        const conditionalEdge = edges.find(
          (e) =>
            e.source === currentNodeId &&
            (conditionMet ? e.sourceHandle === "true" : e.sourceHandle === "false")
        );
        
        currentNodeId = conditionalEdge?.target || null;
        continue;

      case "WhileNode":
        // Loop logic - execute child nodes while condition is true
        let loopCount = 0;
        const maxLoops = 10; // Prevent infinite loops
        
        while (loopCount < maxLoops) {
          const shouldContinue = await evaluateCondition(
            currentNode.data.loopCondition,
            userInput,
            output,
            conversationHistory
          );
          
          if (!shouldContinue) break;
          
          // Find and execute loop body
          const loopEdge = edges.find((e) => e.source === currentNodeId);
          if (loopEdge) {
            const loopBodyNode = nodes.find((n) => n.id === loopEdge.target);
            if (loopBodyNode && loopBodyNode.type === "AgentNode") {
              output = await executeAgentNode(
                loopBodyNode.data,
                userInput,
                conversationHistory,
                output
              );
            }
          }
          
          loopCount++;
        }
        break;

      case "APINode":
        // Call external API
        output = await callAPI(currentNode.data, output);
        context = output;
        break;

      case "EndNode":
        // Return final message with context
        const finalMessage = currentNode.data.instruction || output;
        return finalMessage;
    }

    // Find next node (if not already handled by special logic)
    if (currentNode.type !== "IfElseNode") {
      const nextEdge = edges.find((e) => e.source === currentNodeId);
      currentNodeId = nextEdge?.target || null;
    }
  }

  return output || "";
}

async function executeAgentNode(
  data: any,
  userInput: string,
  conversationHistory: any[],
  context: string = ""
): Promise<string> {
  try {
    const instruction = data.instruction || "You are a helpful assistant.";
    const agentLabel = data.label || "Agent";

    // Build messages array for AI
    const messages: any[] = [];

    // Add system instruction
    messages.push({
      role: "system",
      content: `${instruction}\n\n${context ? `Previous context: ${context}` : ""}`,
    });

    // Add conversation history
    conversationHistory.forEach((msg) => {
      messages.push({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      });
    });

    // Add current user input
    messages.push({
      role: "user",
      content: userInput,
    });

    // Call Google AI using Vercel AI SDK
    const { text } = await generateText({
      model: google("gemini-2.0-flash"), // or "gemini-1.5-pro"
      messages: messages.map((msg) => ({
        role: msg.role === "system" ? "user" : msg.role, // Google doesn't support system role
        content: msg.role === "system" ? `System: ${msg.content}` : msg.content,
      })),
      temperature: 0.7,
    });

    return text;
  } catch (error) {
    console.error("Error in executeAgentNode:", error);
    return "I apologize, but I encountered an error processing your request.";
  }
}

async function evaluateCondition(
  condition: string,
  userInput: string,
  context: string,
  conversationHistory: any[]
): Promise<boolean> {
  if (!condition || condition.trim() === "") {
    return true; // Default to true if no condition
  }

  try {
    // Use AI to evaluate complex conditions
    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      messages: [
        {
          role: "user",
          content: `You are an assistant that evaluates user-provided conditions based on their context. Only focus on the details explicitly provided by the user. Do not make assumptions or introduce unrelated information.

Condition: ${condition}
User Input: ${userInput}
Context: ${context}

Task:
1. Carefully analyze the Condition in relation to the User Input and Context.
2. Ask the user for clarification or additional explanation only about the information they provided.
3. Do not discuss or infer anything not mentioned by the user.
4. Finally, evaluate whether the Condition is true or false based solely on the user-provided details.
`,
        },
      ],
      temperature: 0,
    });

    return text.toLowerCase().trim() === "true";
  } catch (error) {
    console.error("Error evaluating condition:", error);
    // Fallback to simple string matching
    return userInput.toLowerCase().includes(condition.toLowerCase());
  }
}

async function callAPI(data: any, context: string): Promise<string> {
  try {
    const endpoint = data.apiEndpoint;
    const config = data.instruction || "{}";

    // Parse configuration
    let requestConfig: any = {};
    try {
      requestConfig = JSON.parse(config);
    } catch {
      requestConfig = { data: config };
    }

    // Add context to request body
    requestConfig.context = context;

    const response = await fetch(endpoint, {
      method: requestConfig.method || "POST",
      headers: {
        "Content-Type": "application/json",
        ...requestConfig.headers,
      },
      body: JSON.stringify(requestConfig.data || requestConfig),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    console.log(JSON.stringify(result, null, 2))
    return JSON.stringify(result, null, 2);
  } catch (error) {
    console.error("API call error:", error);
    return `API call failed: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}