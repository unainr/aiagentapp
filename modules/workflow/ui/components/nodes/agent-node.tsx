import { Props } from "@/types";
import { Handle, Position } from "@xyflow/react";
import { MousePointer2 } from "lucide-react";

export const AgentNode = ({ data, id }:Props) => {
	return (
		<div onClick={() => data.onNodeClick?.(id, "AgentNode", data)} className="bg-white dark:bg-[#1c1919] rounded-2xl p-2 border ">
			<div className="flex gap-2 items-center justify-center ">
				<MousePointer2 className="p-2 text-black rounded-lg size-7 bg-violet-100" />
				<h2>Agent</h2>
				<Handle type="target" position={Position.Left} />
				<Handle type="source" position={Position.Right} />
			</div>
		</div>
	);
};
