"use client";
import React from "react";

// Inline Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "secondary" | "ghost" | "gradient";
	size?: "default" | "sm" | "lg";
	children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "default",
			size = "default",
			className = "",
			children,
			...props
		},
		ref
	) => {
		const baseStyles =
			"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

		const variants = {
			default:
				"bg-background text-foreground border border-border hover:bg-muted font-medium",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground text-foreground",
			gradient:
				"bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20",
		};

		const sizes = {
			default: "h-10 px-4 py-2 text-sm",
			sm: "h-10 px-5 text-sm",
			lg: "h-14 px-10 text-lg",
		};

		return (
			<button
				ref={ref}
				className={`${baseStyles} ${variants[variant]} ${
					sizes[size]
				} ${className} ${
					variant === "gradient"
						? "relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group shadow-xl border-0"
						: ""
				}`}
				{...props}>
				{variant === "gradient" ? (
					<>
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
					</>
				) : (
					<span className="relative z-10 flex items-center gap-2">
						{children}
					</span>
				)}
			</button>
		);
	}
);

Button.displayName = "Button";

const ArrowRight = ({
	className = "",
	size = 16,
}: {
	className?: string;
	size?: number;
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}>
		<path d="M5 12h14" />
		<path d="m12 5 7 7-7 7" />
	</svg>
);

const SparkleIcon = ({ className = "" }: { className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}>
		<path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
	</svg>
);

export default function CTASection() {
	return (
		<section className="relative py-32 px-6 overflow-hidden bg-background">
			{/* Animated Background Gradients */}
			<div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 opacity-30 pointer-events-none" />

			{/* Floating Particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="absolute text-primary/30"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animation: `float ${
								5 + Math.random() * 10
							}s ease-in-out infinite ${Math.random() * 5}s`,
						}}>
						<SparkleIcon />
					</div>
				))}
			</div>

			<div className="max-w-5xl mx-auto relative z-10">
				<div className="relative p-12 md:p-20 rounded-[2.5rem] border border-border bg-card shadow-2xl overflow-hidden">
					{/* Animated Border Glow */}
					<div
						className="absolute inset-0 rounded-[2.5rem] opacity-30 pointer-events-none"
						style={{
							background:
								"linear-gradient(90deg, transparent, var(--primary), transparent)",
							animation: "borderGlow 3s linear infinite",
						}}
					/>

					{/* Decorative Gradient Orbs */}
					<div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
					<div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

					<div className="relative text-center">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm">
							<SparkleIcon className="text-primary" />
							<span className="text-sm font-medium text-primary">
								Start Your Journey Today
							</span>
						</div>

						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground tracking-tight">
							Ready to Transform <br />
							<span className="text-primary">Your Workflow?</span>
						</h2>
						<p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
							Join thousands of teams already using NeuroX to automate their
							processes with AI-powered workflows. Start building for free
							today.
						</p>

						<div className="flex flex-col sm:flex-row items-center justify-center gap-5">
							<Button
								type="button"
								variant="gradient"
								size="lg"
								className="rounded-xl shadow-lg"
								aria-label="Start building with NeuroX for free">
								Start Building Free
								<ArrowRight size={20} />
							</Button>
							<Button
								type="button"
								variant="secondary"
								size="lg"
								className="rounded-xl border border-border"
								aria-label="View NeuroX documentation">
								View Documentation
							</Button>
						</div>

						<div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5 text-primary"
									fill="currentColor"
									viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								<span>No credit card required</span>
							</div>
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5 text-primary"
									fill="currentColor"
									viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								<span>Free forever plan</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0) rotate(0deg);
						opacity: 0.2;
					}
					50% {
						transform: translateY(-20px) rotate(180deg);
						opacity: 0.5;
					}
				}
				@keyframes shimmer {
					0% {
						background-position: 200% 0;
					}
					100% {
						background-position: -200% 0;
					}
				}
				@keyframes borderGlow {
					0% {
						transform: translateX(-100%);
					}
					100% {
						transform: translateX(100%);
					}
				}
				@keyframes pulse {
					0%,
					100% {
						opacity: 0.3;
						transform: scale(1);
					}
					50% {
						opacity: 0.5;
						transform: scale(1.1);
					}
				}

				/* Button Shine Effect */
				.btn-shine {
					position: relative;
					overflow: hidden;
				}

				.btn-shine::before {
					content: "";
					position: absolute;
					top: 0;
					left: -100%;
					width: 200%;
					height: 100%;
					background: linear-gradient(
						120deg,
						transparent,
						rgba(255, 255, 255, 0.3),
						transparent
					);
					transition: all 0.6s ease-in-out;
				}

				.btn-shine:hover::before {
					left: 100%;
				}
			`}</style>
		</section>
	);
}
