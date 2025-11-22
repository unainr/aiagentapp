"use server"

import { db } from "@/drizzle/db";
import { agents } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";

interface Props{
    agentName:string
} 
export const addAgent = async ({agentName}:Props) => { 
    const {userId} = await auth()
    if(!userId) throw new Error('user id not find')
    try {
        const [data] = await db.insert(agents).values({
            agent_name:agentName,
            userId,
        }).returning()
        return data
} catch (error:any) {
    console.log(error.message)
}
  }