import { exitingWorkFlowAgent } from "@/modules/workflow/server/workflow.action"
import { Editor } from "@/modules/workflow/ui/components/editor"
import { redirect } from "next/navigation"

interface Props {
    params:Promise<{id:string}>
}

const page = async ({params}:Props) => {
    const {id} = await params
    const workflow = await exitingWorkFlowAgent(id)
    if (!workflow) redirect("/");
  return (
    <>
    <Editor/>
    </>
  )
}

export default page