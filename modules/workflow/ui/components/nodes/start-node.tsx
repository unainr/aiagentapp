import { Handle, Position } from '@xyflow/react'
import { PlayIcon } from 'lucide-react'

export const StartNode = () => {
  return (
    <div className='bg-white dark:bg-[#1c1919] rounded-2xl p-2 border '>
      <div className='flex gap-2 items-center justify-center '>
        <PlayIcon className='p-2  rounded-lg text-black size-7 bg-green-100'/>
        <h2>Start</h2>
        <Handle type='source' position={Position.Right} />
      </div>
    </div>
  )
}
