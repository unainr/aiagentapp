import { toast } from "sonner";
import { getExitingWorkFlow } from "../../server/workflow.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Agent } from "@/types";
interface Props{
  name:string
  
}
export const WorkFlowView = async () => {
		const data = await getExitingWorkFlow();
  // const result = data.data as Agent[]
		console.log(data.data);

	
	return (
		<>
			<Card className="flex flex-col items-center justify-center min-h-screen">
				<CardHeader>
					<CardTitle>{}</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Click to open workflow</p>
				</CardContent>
			</Card>
		</>
	);
};
