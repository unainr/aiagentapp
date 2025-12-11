import { Props } from "@/types";
import { Handle, Position } from "@xyflow/react";
import { Merge } from "lucide-react";

export const IfElseNode = ({ data, id }:Props) => {
	return (
		<div onClick={() => data.onNodeClick?.(id, "IfElseNode", data)} className="bg-white dark:bg-[#1c1919] rounded-2xl p-2 border">
			<div className="flex gap-2 items-center justify-center">
				<Merge className="p-2 rounded-lg size-7 text-black bg-[#FFF3CD]" />
				<h2>If/Else</h2>
				<Handle type="target" position={Position.Left} />
				<Handle type="source" position={Position.Right} />
			</div>
		</div>
	);
};