"use client";
import { useState, useCallback, useRef, DragEvent } from "react";
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
import { EndNode } from "./nodes/end-node";
import { IfElseNode } from "./nodes/if-else-node";
import { WhileNode } from "./nodes/while-node";
import { APINode } from "./nodes/api-node";
import { AgentWorkflowPanel } from "./agent-workflow-panel";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
// import { saveWorkflow } from "@/actions/workflow-actions";
import { toast } from "sonner";
import { NodeData, NodeDialog } from "./nodes/nodes-dialog";
import { saveWorkflow } from "../../server/workflow-create.action";

const initialNodes: Node[] = [
	{ 
		id: "start-node", 
		position: { x: 250, y: 50 }, 
		data: { label: "Start" }, 
		type: 'StartNode' 
	},
];

const initialEdges: Edge[] = [];

const nodesTypes = {
	StartNode: StartNode,
	AgentNode: AgentNode,
	EndNode: EndNode,
	IfElseNode: IfElseNode,
	WhileNode: WhileNode,
	APINode: APINode,
};

let id = 1;

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
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
	
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

	const onDragOver = useCallback((event: DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	// Handle node click to open dialog
	const handleNodeClick = useCallback((nodeId: string, nodeType: string, nodeData: NodeData) => {
		if (nodeType === "StartNode") return; // Don't open dialog for start node
		
		setSelectedNode({
			id: nodeId,
			type: nodeType,
			data: nodeData,
		});
		setDialogOpen(true);
	}, []);

	// Add onNodeClick callback to all nodes
	const nodesWithCallback = nodes.map(node => ({
		...node,
		data: {
			...node.data,
			onNodeClick: handleNodeClick,
		},
	}));

	const onDrop = useCallback(
		(event: DragEvent) => {
			event.preventDefault();

			const type = event.dataTransfer.getData('application/reactflow');
			
			if (typeof type === 'undefined' || !type || !reactFlowInstance) {
				return;
			}

			const position = reactFlowInstance.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});

			const newNode: Node = {
				id: `node_${id++}`,
				type,
				position,
				data: { 
					label: `${type.replace("Node", "")}`,
					onNodeClick: handleNodeClick,
				},
			};

			setNodes((nds) => nds.concat(newNode));
		},
		[reactFlowInstance, handleNodeClick]
	);

	// Save node data from dialog
	const handleSaveNodeData = useCallback((data: NodeData) => {
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
						} 
					}
					: node
			)
		);
	}, [selectedNode, handleNodeClick]);

	// Save workflow to database
	const handleSaveWorkflow = async () => {
		setIsSaving(true);
		try {
			// Remove onNodeClick from data before saving
			const cleanNodes = nodes.map(node => ({
				...node,
				data: {
					label: node.data.label,
					instruction: node.data.instruction,
					apiEndpoint: node.data.apiEndpoint,
					condition: node.data.condition,
					loopCondition: node.data.loopCondition,
				}
			}));
			if(agentId){

				await saveWorkflow({
					agentId,
					nodes: cleanNodes,
					edges,
				});
			}
			
			toast.success("Workflow saved successfully!");
		} catch (error) {
			console.error("Error saving workflow:", error);
			toast.error("Failed to save workflow");
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
					}}
				>
					<Panel position="center-left">
						<AgentWorkflowPanel />
					</Panel>
					<Panel position="center-right">
						<Button 
							onClick={handleSaveWorkflow}
							disabled={isSaving}
							className="gap-2"
						>
							<Save className="size-4" />
							{isSaving ? "Saving..." : "Save Workflow"}
						</Button>
						{/* <AgentChat agentId={agentId!} agentName='' /> */}
					</Panel>
					<Background gap={12} size={1} />
					<Controls />
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