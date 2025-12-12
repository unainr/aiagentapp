"use server";

import { db } from "@/drizzle/db";
import { agents, workflows } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

export const getPricingPlan = async () => {
	const { userId, has } = await auth();
	let limit = 0;
	let isPro = false;

	try {
		if (has({ plan: "pro" })) {
			isPro = true;
		} else if (has({ feature: "2_workflows" })) {
			limit = 2;
		} else if (has({ feature: "10_workflows" })) {
			limit = 10;
		}
		if (!userId) throw new Error("User ID not found");
		const [{ count: totalCount }] = await db
			.select({ count: sql<number>`COUNT(*)` })
			.from(agents)
			.where(eq(agents.userId, userId));

		if (isPro) {
			return { canCreate: true, count: totalCount, limit: -1, isPro: true };
		}

		if (totalCount >= limit) {
			return { canCreate: false, count: totalCount, limit, isPro: false };
		} else {
			return { canCreate: true, count: totalCount, limit, isPro: false };
		}
	} catch (error: any) {
		console.log(error);
		throw new Error(error.messages || "Failed to check creation permission ");
	}
};
