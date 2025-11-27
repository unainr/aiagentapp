import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const AgentWorkFlowSkeleton = () => {
  return (
   <Card className="relative border-gray-200 overflow-hidden">
      <CardContent className="p-6">
        {/* Icon Skeleton */}
        <Skeleton className="w-12 h-12 rounded-lg mb-4" />

        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2" />

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="w-5 h-5 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}
