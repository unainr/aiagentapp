"use client";
import React from "react";

// Feature Card Component
interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
	icon,
	title,
	description,
	gradient,
}) => {
	return (
		<div className="group relative p-6 rounded-2xl border border-border bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/5 overflow-hidden h-full">
			{/* Hover Gradient Overlay */}
			<div
				className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
				style={{ background: gradient }}
			/>

			{/* Content */}
			<div className="relative z-10 flex flex-col h-full">
				<div
					className="mb-6 p-3 rounded-lg w-fit transition-transform duration-300 group-hover:scale-110"
					style={{
						background: gradient.replace("0.4", "0.1"),
						color: "var(--primary)",
					}}>
					{icon}
				</div>
				<h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
					{title}
				</h3>
				<p className="text-muted-foreground leading-relaxed grow">
					{description}
				</p>
			</div>
		</div>
	);
};

// Icons with enhanced styling
const WorkflowIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<rect x="3" y="3" width="7" height="7" rx="1" />
		<rect x="14" y="3" width="7" height="7" rx="1" />
		<rect x="14" y="14" width="7" height="7" rx="1" />
		<rect x="3" y="14" width="7" height="7" rx="1" />
	</svg>
);

const AIIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M12 8V4H8" />
		<rect width="16" height="12" x="4" y="8" rx="2" />
		<path d="M2 14h2" />
		<path d="M20 14h2" />
		<path d="M15 13v2" />
		<path d="M9 13v2" />
	</svg>
);

const CollaborationIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
		<path d="M16 3.13a4 4 0 0 1 0 7.75" />
	</svg>
);

const CustomNodeIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
	</svg>
);

const TemplateIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<rect width="7" height="7" x="3" y="3" rx="1" />
		<rect width="7" height="7" x="14" y="3" rx="1" />
		<rect width="7" height="7" x="14" y="14" rx="1" />
		<rect width="7" height="7" x="3" y="14" rx="1" />
	</svg>
);

const AnalyticsIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M3 3v18h18" />
		<path d="m19 9-5 5-4-4-3 3" />
	</svg>
);

export default function FeaturesSection() {
	const features = [
		{
			icon: <WorkflowIcon />,
			title: "Drag & Drop Builder",
			description:
				"Intuitively create complex workflows by dragging and dropping nodes. No coding required to build powerful automations.",
			gradient:
				"linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.4))",
		},
		{
			icon: <AIIcon />,
			title: "AI Agent Integration",
			description:
				"Chat with intelligent AI agents directly within your workflows. Get smart assistance and automate decision-making.",
			gradient:
				"linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(168, 85, 247, 0.4))",
		},
		{
			icon: <CollaborationIcon />,
			title: "Real-time Collaboration",
			description:
				"Work together with your team in real-time. Share workflows, provide feedback, and build together seamlessly.",
			gradient:
				"linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(99, 102, 241, 0.4))",
		},
		{
			icon: <CustomNodeIcon />,
			title: "Custom Node Creation",
			description:
				"Build your own custom nodes to extend functionality. Create reusable components tailored to your specific needs.",
			gradient:
				"linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(217, 70, 239, 0.4))",
		},
		{
			icon: <TemplateIcon />,
			title: "Workflow Templates",
			description:
				"Start fast with pre-built templates for common use cases. Customize them to fit your exact requirements.",
			gradient:
				"linear-gradient(135deg, rgba(14, 165, 233, 0.4), rgba(59, 130, 246, 0.4))",
		},
		{
			icon: <AnalyticsIcon />,
			title: "Analytics & Monitoring",
			description:
				"Track workflow performance with detailed analytics. Monitor execution, identify bottlenecks, and optimize efficiency.",
			gradient:
				"linear-gradient(135deg, rgba(217, 70, 239, 0.4), rgba(236, 72, 153, 0.4))",
		},
	];

	return (
		<section
			id="features"
			className="relative py-24 px-6 overflow-hidden bg-background feature-section-clip">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 opacity-50 pointer-events-none" />
			<div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
			<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

			<div className="max-w-7xl mx-auto relative z-10">
				<div className="text-center mb-20">
					<div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm">
						<span className="text-sm font-semibold text-primary">
							✨ Features
						</span>
					</div>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground tracking-tight">
						Powerful Features for <br />
						<span className="text-primary">Modern Workflows</span>
					</h2>
					<p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
						Everything you need to build, deploy, and manage AI-powered
						workflows at scale
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							style={{
								animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
							}}>
							<FeatureCard
								icon={feature.icon}
								title={feature.title}
								description={feature.description}
								gradient={feature.gradient}
							/>
						</div>
					))}
				</div>
			</div>

			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</section>
	);
}
