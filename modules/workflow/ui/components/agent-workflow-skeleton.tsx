import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const AgentWorkFlowSkeleton = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{/* mimic the create card skeleton */}
			<div className="flex flex-col items-center justify-center p-8 h-full min-h-[280px] border-2 border-dashed border-border/50 rounded-3xl bg-muted/5">
				<Skeleton className="w-16 h-16 rounded-2xl mb-6" />
				<Skeleton className="h-6 w-32 mb-2" />
				<Skeleton className="h-4 w-48" />
			</div>

			{[1, 2, 3, 4, 5].map((i) => (
				<Card
					key={i}
					className="h-full min-h-[280px] relative border-border bg-card overflow-hidden">
					<CardContent className="p-8 flex flex-col h-full">
						{/* Header */}
						<div className="flex items-start justify-between mb-6">
							<Skeleton className="w-14 h-14 rounded-2xl" />
							<Skeleton className="w-9 h-9 rounded-full" />
						</div>

						{/* Content */}
						<div className="mt-auto space-y-3">
							<Skeleton className="h-7 w-3/4" />
							<div className="flex items-center gap-2">
								<Skeleton className="h-6 w-24 rounded-full" />
								<Skeleton className="h-4 w-20" />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
