import { Props } from "@/types";
import { Handle, Position } from "@xyflow/react";
import { Webhook } from "lucide-react";

export const APINode = ({ data, id }:Props) => {
	return (
		<div onClick={() => data.onNodeClick?.(id, "APINodes", data)} className="bg-white rounded-2xl p-2 border">
			<div className="flex gap-2 items-center justify-center">
				<Webhook className="p-2 rounded-lg size-7 bg-[#D1F0FF]" />
				<h2>API</h2>
				<Handle type="target" position={Position.Left} />
				<Handle type="source" position={Position.Right} />
			</div>
		</div>
	);
};