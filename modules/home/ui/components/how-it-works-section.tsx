"use client";
import React from "react";

interface StepCardProps {
	number: string;
	title: string;
	description: string;
	isLast?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({
	number,
	title,
	description,
	isLast,
}) => {
	return (
		<div className="relative group pt-6">
			{/* Connecting Line */}
			{!isLast && (
				<div className="hidden lg:block absolute top-12 left-full w-full h-1 z-0">
					<div className="relative w-full h-full">
						<div className="absolute inset-0 bg-primary/20 rounded-full" />
						<div
							className="absolute inset-0 bg-primary rounded-full opacity-50"
							style={{
								animation: "shimmer 3s ease-in-out infinite",
								backgroundSize: "200% 100%",
							}}
						/>
					</div>
				</div>
			)}

			<div className="relative transition-all duration-500 group-hover:scale-105">
				{/* Number Badge - Outside overflow hidden */}
				<div
					className="absolute -top-6 left-8 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xl z-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-primary text-primary-foreground border-4 border-background"
					style={{
						boxShadow: "0 8px 32px rgba(var(--primary), 0.3)",
					}}>
					<span className="relative z-10">{number}</span>
				</div>

				{/* Card Content with Overflow Hidden */}
				<div className="relative p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-xl dark:hover:shadow-primary/10 overflow-hidden h-full">
					{/* Animated Background Gradient */}
					<div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-primary/10" />

					{/* Content */}
					<div className="relative z-10 mt-6">
						<h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
							{title}
						</h3>
						<p className="text-muted-foreground leading-relaxed">
							{description}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function HowItWorksSection() {
	const steps = [
		{
			number: "1",
			title: "Create Your Workflow",
			description:
				"Start with a blank canvas or choose from our template library. Drag and drop nodes to build your automation pipeline visually.",
		},
		{
			number: "2",
			title: "Connect AI Agents",
			description:
				"Integrate intelligent AI agents into your workflow. Configure them to handle complex tasks, make decisions, and interact naturally.",
		},
		{
			number: "3",
			title: "Deploy & Monitor",
			description:
				"Launch your workflow with a single click. Track performance in real-time, analyze results, and continuously optimize for better outcomes.",
		},
	];

	return (
		<section className="relative py-24 px-6 overflow-hidden bg-background">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 opacity-50 pointer-events-none" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse" />

			<div className="max-w-7xl mx-auto relative z-10">
				<div className="text-center mb-24">
					<div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm">
						<span className="text-sm font-semibold text-primary">
							🚀 Simple Process
						</span>
					</div>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground tracking-tight">
						How It <span className="text-primary">Works</span>
					</h2>
					<p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
						Get started with NeuroX in three simple steps
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
					{steps.map((step, index) => (
						<div
							key={index}
							style={{
								animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
							}}>
							<StepCard
								number={step.number}
								title={step.title}
								description={step.description}
								isLast={index === steps.length - 1}
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
				@keyframes shimmer {
					0% {
						background-position: -200% 0;
					}
					100% {
						background-position: 200% 0;
					}
				}
			`}</style>
		</section>
	);
}
