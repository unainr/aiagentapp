import { PricingTable } from "@clerk/nextjs";
import React from "react";

const Pricing = () => {
	return (
		<div className="flex items-center justify-center h-screen mx-10 ">
			<PricingTable />
		</div>
	);
};

export default Pricing;
