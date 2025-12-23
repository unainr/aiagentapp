import HeroSection from "../components/hero-section";
import FeaturesSection from "../components/features-section";
import HowItWorksSection from "../components/how-it-works-section";
import CTASection from "../components/cta-section";
import { Suspense } from "react";
import Loader from "@/components/loading";

export const HomeView = () => {
	return (
		<div className="min-h-screen">
			<HeroSection />
			<FeaturesSection />
			<HowItWorksSection />
			<Suspense fallback={<Loader />}>
				<CTASection />
			</Suspense>
		</div>
	);
};
