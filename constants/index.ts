import { Merge, MousePointer2, Repeat, Square, Webhook } from "lucide-react";

export const AgentWorkflowTools=[
    {
        name:'Agent',
        icon:MousePointer2,
        bgColor:'#ede9fe',
        id:'agent',
        type:'AgentNode'
    },
    {
        name:'End',
        icon:Square,
        bgColor:'#FFE3E3',
        id:'end',
        type:'EndNode'
    },
     {
        name:'If/Else',
        icon:Merge,
        bgColor:'#FFF3CD',
        id:'ifElse',
        type:'IfElseNode'
    },
     {
        name:'While',
        icon:Repeat,
        bgColor:'#E3F2FD',
        id:'while',
        type:'WhileNode'
    },
     {
        name:'API',
        icon:Webhook,
        bgColor:'#D1F0Ff',
        id:'api',
        type:'APINode'
    }
]

