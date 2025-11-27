import { AgentWorkflowTools } from "@/constants";
import { DragEvent } from "react";

export const OtherNodes = () => {
	const onDragStart = (event: DragEvent, nodeType: string) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};
	return (
		<div className="flex flex-col gap-2 ">
			{AgentWorkflowTools.map((workflow, index) => (
				<div
					onDragStart={(event) => onDragStart(event, workflow.type)}
					draggable
					key={index}
					className="bg-white rounded-2xl p-2 border ">
					<div className="flex gap-2 items-center justify-center ">
						<workflow.icon
							className={`p-2  rounded-lg size-8 `}
							style={{ backgroundColor: workflow.bgColor }}
						/>
						<h2>{workflow.name}</h2>
						{/* <Handle type="target" position={Position.Left} />
                <Handle type="source" position={Position.Right} /> */}
					</div>
				</div>
			))}
		</div>
	);
};
