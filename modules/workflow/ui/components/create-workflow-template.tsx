"use client";
import React from "react";
import { Plus } from "lucide-react";
import { ReactFlow, Background, Node, Edge, MarkerType } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { CreateAgentDialog } from "./create-agent-dialog";

export const CreateWorkFlowTemplate = () => {
	const nodes: Node[] = [
		{
			id: "1",
			type: "input",
			data: { label: "Start" },
			position: { x: 250, y: 50 },
		},
		{
			id: "2",
			data: { label: "AI Agent" },
			position: { x: 235, y: 150 },
		},
		{
			id: "3",
			data: { label: "Action" },
			position: { x: 235, y: 250 },
		},
	];

	const edges: Edge[] = [
		{
			id: "e1-2",
			source: "1",
			target: "2",
			animated: true,
			markerEnd: { type: MarkerType.ArrowClosed },
		},
		{
			id: "e2-3",
			source: "2",
			target: "3",
			animated: true,
			markerEnd: { type: MarkerType.ArrowClosed },
		},
	];

	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="w-full">
				{/* Main Content Card */}
				<div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
					<div className="grid grid-cols-1 lg:grid-cols-5">
						{/* Left Side - Text Content */}
						<div className="lg:col-span-2 p-12 flex flex-col justify-center bg-card">
							<div className="space-y-6">
								<div>
									<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
										Create Your First Workflow
									</h1>
									<p className="text-lg text-muted-foreground mb-2">
										Build powerful AI agent automations
									</p>
									<p className="text-sm text-muted-foreground">
										Drag and drop nodes to design your workflow visually
									</p>
								</div>

								<CreateAgentDialog />

								<div className="pt-6 border-t border-border">
									<div className="grid grid-cols-1 gap-4">
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
											<div>
												<p className="font-semibold text-foreground text-sm">
													Visual Builder
												</p>
												<p className="text-xs text-muted-foreground">
													Drag and drop interface
												</p>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
											<div>
												<p className="font-semibold text-foreground text-sm">
													AI Powered
												</p>
												<p className="text-xs text-muted-foreground">
													Smart automation nodes
												</p>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
											<div>
												<p className="font-semibold text-foreground text-sm">
													Easy to Use
												</p>
												<p className="text-xs text-muted-foreground">
													No coding required
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Right Side - ReactFlow Canvas */}
						<div className="lg:col-span-3 relative bg-muted/30 min-h-[600px] h-[600px]">
							<div className="absolute inset-0 text-black">
								<ReactFlow
									nodes={nodes}
									edges={edges}
									fitView
									fitViewOptions={{ padding: 0.3 }}
									nodesDraggable={false}
									nodesConnectable={false}
									elementsSelectable={false}
									panOnDrag={false}
									zoomOnScroll={false}
									proOptions={{ hideAttribution: true }}>
									<Background color="var(--border)" gap={16} />
								</ReactFlow>
							</div>

							{/* Overlay Label */}
							<div className="absolute top-6 left-6 bg-background/80 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm border border-border z-10">
								<p className="text-xs font-medium text-foreground">
									Interactive Canvas Preview
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
