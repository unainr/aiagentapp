"use client";
import { useState, useCallback, useRef, DragEvent, useEffect } from "react";
import {
	ReactFlow,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	type Node,
	type Edge,
	type NodeChange,
	type EdgeChange,
	type Connection,
	Background,
	Controls,
	MiniMap,
	Panel,
	ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { StartNode } from "./nodes/start-node";
import { AgentNode } from "./nodes/agent-node";
import { AgentWorkflowPanel } from "./agent-workflow-panel";
import { EndNode } from "./nodes/end-node";
import { WhileNode } from "./nodes/while-node";
import { IfElseNode } from "./nodes/if-else-node";
import { APINode } from "./nodes/api-node";
import { NodeData, NodeDialog } from "./nodes/nodes-dialog";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveWorkflow } from "../../server/workflow-create.action";
import { Spinner } from "@/components/ui/spinner";
import { WorkflowChat } from "@/components/ui/chat-ui";

const initialNodes: Node[] = [
	{
		id: "start-node",
		position: { x: 0, y: 0 },
		data: { label: "Start" },
		type: "StartNode",
	},
];
const initialEdges: Edge[] = [];
// TODO: Custom Nodes Type
const nodesTypes = {
	StartNode: StartNode,
	AgentNode: AgentNode,
	EndNode: EndNode,
	IfElseNode: IfElseNode,
	WhileNode: WhileNode,
	APINode: APINode,
};
interface EditorProps {
	agentId?: string;
	initialWorkflow?: {
		nodes: Node[];
		edges: Edge[];
	};
}
export const Editor = ({ agentId, initialWorkflow }: EditorProps) => {
	const [nodes, setNodes] = useState<Node[]>(
		initialWorkflow?.nodes || initialNodes
	);
	const [edges, setEdges] = useState<Edge[]>(
		initialWorkflow?.edges || initialEdges
	);
	const reactFlowWrapper = useRef<HTMLDivElement>(null);
	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);
	// Dialog state
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedNode, setSelectedNode] = useState<{
		id: string;
		type: string;
		data: NodeData;
	} | null>(null);

	const [isSaving, setIsSaving] = useState(false);

	const onNodesChange = useCallback(
		(changes: NodeChange[]) =>
			setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[]
	);
	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) =>
			setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[]
	);
	const onConnect = useCallback(
		(params: Connection) =>
			setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[]
	);

	// Handle drag over event
	const onDragOver = useCallback((event: DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	// Handle node click to open dialog
	const handleNodeClick = useCallback(
		(nodeId: string, nodeType: string, nodeData: NodeData) => {
			if (nodeType === "StartNode") return; // Don't open dialog for start node

			setSelectedNode({
				id: nodeId,
				type: nodeType,
				data: nodeData,
			});
			setDialogOpen(true);
		},
		[]
	);

	// Add onNodeClick callback to all nodes
	const nodesWithCallback = nodes.map((node) => ({
		...node,
		data: {
			...node.data,
			onNodeClick: handleNodeClick,
		},
	}));

	// Handle drop event
	const onDrop = useCallback(
		(event: DragEvent) => {
			event.preventDefault();

			const type = event.dataTransfer.getData("application/reactflow");

			if (typeof type === "undefined" || !type || !reactFlowInstance) {
				return;
			}

			const position = reactFlowInstance.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});

			const newNode: Node = {
				id: crypto.randomUUID(),
				type,
				position,
				data: { label: `${type}` },
			};

			setNodes((nds) => nds.concat(newNode));
		},
		[reactFlowInstance]
	);

	// Save node data from dialog
	const handleSaveNodeData = useCallback(
		(data: NodeData) => {
			if (!selectedNode) return;

			setNodes((nds) =>
				nds.map((node) =>
					node.id === selectedNode.id
						? {
								...node,
								data: {
									...node.data,
									...data,
									onNodeClick: handleNodeClick,
								},
						  }
						: node
				)
			);
		},
		[selectedNode, handleNodeClick]
	);

	// Update nodes when initialWorkflow changes
	useEffect(() => {
		if (initialWorkflow?.nodes) {
			setNodes(
				initialWorkflow.nodes.map((node) => ({
					...node,
					data: {
						...node.data,
						onNodeClick: handleNodeClick,
					},
				}))
			);
		}
		if (initialWorkflow?.edges) {
			setEdges(initialWorkflow.edges);
		}
	}, [initialWorkflow, handleNodeClick]);

	// Save workflow to database
	const handleSaveWorkflow = async () => {
		if (!agentId) {
			// ADD THIS CHECK
			toast.error("Agent ID is required");
			return;
		}
		try {
			setIsSaving(true);
			const cleanNodes = nodes.map((node) => ({
				...node,
				data: {
					label: node.data.label,
					instruction: node.data.instruction,
					apiEndpoint: node.data.apiEndpoint,
					apiMethod: node.data.apiMethod, // ADD THIS
					apiHeaders: node.data.apiHeaders, // ADD THIS
					apiBody: node.data.apiBody, // ADD THIS
					condition: node.data.condition,
					loopCondition: node.data.loopCondition,
				},
			}));
			if (agentId) {
				await saveWorkflow({
					agentId,
					nodes: cleanNodes,
					edges,
				});
			}
			toast.success("Workflow saved successfully");
		} catch (error) {
			toast.error("Error saving workflow:");
			console.log("Failed to save workflow");
		} finally {
			setIsSaving(false);
		}
	};
	return (
		<>
			<div style={{ width: "100vw", height: "100vh" }} ref={reactFlowWrapper}>
				<ReactFlow
					nodes={nodesWithCallback}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onInit={setReactFlowInstance}
					onDrop={onDrop}
					onDragOver={onDragOver}
					fitView
					nodeTypes={nodesTypes}
					proOptions={{
						hideAttribution: true,
					}}>
					<Panel position="center-left">
						<AgentWorkflowPanel />
					</Panel>
					<Panel position="bottom-center">
						<Button
							onClick={handleSaveWorkflow}
							disabled={isSaving}
							className="gap-2">
							<Save className="size-4" />
							{isSaving ? (
								<>
									Saving...
									<Spinner />
								</>
							) : (
								"Save"
							)}
						</Button>
					</Panel>
					<Panel position="bottom-right">
						<WorkflowChat workflowId={agentId!} />

					</Panel>
					<Background gap={12} size={1} />
					<Controls className="text-black" />
					{/* <MiniMap /> */}
				</ReactFlow>
			</div>

			{selectedNode && (
				<NodeDialog
					open={dialogOpen}
					onClose={() => setDialogOpen(false)}
					onSave={handleSaveNodeData}
					nodeType={selectedNode.type}
					initialData={selectedNode.data}
				/>
			)}
		</>
	);
};
