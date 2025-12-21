"use client";
import React from "react";
import Image from "next/image";
import {
	ArrowRight,
	CheckCircle2,
	Users,
	Zap,
	Shield,
	Globe,
} from "lucide-react";

// Reusing the premium button style for consistency
const Button = ({
	children,
	variant = "primary",
	className = "",
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "outline";
}) => {
	if (variant === "primary") {
		return (
			<button
				className={`relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group shadow-xl border-0 ${className}`}
				{...props}>
				<span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
				<span className="absolute bottom-0 left-0 h-full -ml-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-auto h-full opacity-100 object-stretch"
						viewBox="0 0 487 487">
						<path
							fillOpacity=".1"
							fillRule="nonzero"
							fill="#FFF"
							d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"></path>
					</svg>
				</span>
				<span className="absolute top-0 right-0 w-12 h-full -mr-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="object-cover w-full h-full"
						viewBox="0 0 487 487">
						<path
							fillOpacity=".1"
							fillRule="nonzero"
							fill="#FFF"
							d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"></path>
					</svg>
				</span>
				<span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-gray-200"></span>
				<span className="relative z-10 flex items-center gap-2 font-semibold">
					{children}
				</span>
			</button>
		);
	}
	return (
		<button
			className={`inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-border bg-background text-foreground hover:bg-muted font-medium transition-colors ${className}`}
			{...props}>
			{children}
		</button>
	);
};

export default function AboutPage() {
	const stats = [
		{ label: "Active Users", value: "10k+" },
		{ label: "Workflows Created", value: "500k+" },
		{ label: "AI Agents", value: "50+" },
		{ label: "Countries", value: "120+" },
	];

	const values = [
		{
			icon: <Zap className="w-6 h-6 text-primary" />,
			title: "Innovation First",
			description:
				"We constantly push the boundaries of what's possible with AI automation.",
		},
		{
			icon: <Shield className="w-6 h-6 text-primary" />,
			title: "Security & Trust",
			description:
				"Your data privacy and security are at the core of our infrastructure.",
		},
		{
			icon: <Users className="w-6 h-6 text-primary" />,
			title: "Community Driven",
			description:
				"We build for and with our community of developers and creators.",
		},
		{
			icon: <Globe className="w-6 h-6 text-primary" />,
			title: "Global Impact",
			description:
				"Empowering teams worldwide to automate their most complex tasks.",
		},
	];

	return (
		<main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-24 pb-20">
			{/* Hero Section */}
			<section className="relative px-6 mb-24">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm">
						<span className="text-sm font-medium text-primary">
							Our Mission
						</span>
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
						Democratizing <span className="text-primary">AI Automation</span>{" "}
						for Everyone
					</h1>
					<p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
						We believe that the power of AI agents shouldn't be locked behind
						complex code. NeuroX is building the future where anyone can create
						powerful, intelligent workflows.
					</p>
				</div>

				{/* Background Gradients */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none -z-10">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl mix-blend-multiply opacity-50" />
					<div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl mix-blend-multiply opacity-50" />
				</div>
			</section>

			{/* Stats Section */}
			<section className="container mx-auto px-6 mb-32">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm">
							<div className="text-3xl md:text-4xl font-bold text-primary mb-2">
								{stat.value}
							</div>
							<div className="text-sm text-muted-foreground font-medium">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Story Section */}
			<section className="container mx-auto px-6 mb-32">
				<div className="grid md:grid-cols-2 gap-16 items-center">
					<div className="relative">
						<div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-2xl -z-10"></div>
						<div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
							<div className="absolute inset-0 bg-background/10 z-10"></div>
							{/* Placeholder for a real team/story image */}
							<div className="aspect-4/3 bg-muted flex items-center justify-center text-muted-foreground">
							<Image src={'/hero2.png'} width={900} height={900} alt="image" />
							</div>
						</div>
					</div>
					<div>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							Built by Developers, <br />
							For Developers
						</h2>
						<div className="space-y-6 text-muted-foreground leading-relaxed">
							<p>
								NeuroX started with a simple question: "Why is building AI
								agents so hard?" We customized clear workflows, but found
								ourselves getting bogged down in boilerplate code.
							</p>
							<p>
								We set out to create a visual interface that combines the power
								of raw code with the simplicity of a drag-and-drop builder.
								Today, NeuroX helps thousands of teams prototype, deploy, and
								scale their AI operations.
							</p>
							<div className="pt-4">
								<Button variant="primary">
									Join Our Journey <ArrowRight className="w-4 h-4 ml-2" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="container mx-auto px-6 mb-24">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Our Core Values
					</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						These principles guide every decision we make and every line of code
						we write.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{values.map((value, index) => (
						<div
							key={index}
							className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group">
							<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
								{value.icon}
							</div>
							<h3 className="text-xl font-bold mb-3">{value.title}</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{value.description}
							</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
