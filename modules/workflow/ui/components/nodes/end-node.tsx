import { Props } from "@/types";
import { Handle, Position } from "@xyflow/react";
import { Square } from "lucide-react";

export const EndNode = ({ data, id }:Props) => {
	return (
		<div onClick={() => data.onNodeClick?.(id, "EndNode", data)} className="bg-white dark:bg-[#1c1919] rounded-2xl p-2 border">
			<div className="flex gap-2 items-center justify-center">
				<Square className="p-2 rounded-lg size-7 text-black bg-[#FFE3E3]" />
				<h2>End</h2>
				<Handle type="target" position={Position.Left} />
			</div>
		</div>
	);
};