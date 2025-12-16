import { getWorkflow } from "@/modules/workflow/server/workflow-create.action"
import { exitingWorkFlowAgent } from "@/modules/workflow/server/workflow.action"
import { Editor } from "@/modules/workflow/ui/components/editor"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


interface Props {
    params:Promise<{id:string}>
}

const page = async ({params}:Props) => {
  const { userId } = await auth();
    if (!userId) redirect("/sign-in");
    const {id} = await params
    const workflow = await getWorkflow(id)
   if (!workflow) {
    return <Editor agentId={id} />;
  }
  return (
    <>
    <Editor agentId={id}  initialWorkflow={{
        nodes: workflow.nodes as any[],
        edges: workflow.edges as any[],
      }} />
    </>
  )
}

export default page