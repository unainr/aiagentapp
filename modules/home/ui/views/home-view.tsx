'use client'
import { Button } from "@/components/ui/button"
import { addAgent } from "@/modules/workflow/server/workflow.action"
import { Editor } from "@/modules/workflow/ui/components/editor"
import { useState } from "react"

export const HomeView = () => {
  const [agentName, setagentName] = useState('')
  const handleSubmit = async() => { 
    const data = await addAgent({agentName})
   }
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen">

    <input className="bg-gray-50 border my-2" type="text" name="agentName" onChange={(e)=>setagentName(e.target.value)} value={agentName} />
    <Button type="button" onClick={handleSubmit}>
  Add Agent
</Button>
    </div>
{/* <Editor/> */}
    </>
  )
}
