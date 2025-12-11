import { Props } from "@/types";
import { Handle, Position } from "@xyflow/react";
import { Repeat } from "lucide-react";

export const WhileNode = ({ data, id }:Props) => {
	return (
		<div onClick={() => data.onNodeClick?.(id, "WhileNode", data)} className="bg-white dark:bg-[#1c1919] rounded-2xl p-2 border">
			<div className="flex gap-2 items-center justify-center">
				<Repeat className="p-2 rounded-lg size-7 text-black bg-[#E3F2FD]" />
				<h2>While</h2>
				<Handle type="target" position={Position.Left} />
				<Handle type="source" position={Position.Right} />
			</div>
		</div>
	);
};