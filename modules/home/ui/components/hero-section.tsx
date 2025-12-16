"use client";
import Image from "next/image";
import Link from "next/link";
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
			className = "cursor-pointer",
			children,
			...props
		},
		ref
	) => {
		const baseStyles =
			"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

		const variants = {
			default:
				"bg-background text-foreground border border-border hover:bg-muted font-medium",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground text-foreground",
			gradient:
				"bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-md shadow-primary/25 border-0 font-bold",
		};

		const sizes = {
			default: "h-10 px-4 py-2 text-sm",
			sm: "h-10 px-5 text-sm",
			lg: "h-12 px-8 text-base",
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

// Icons
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

const Menu = ({
	className = "",
	size = 24,
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
		<line x1="4" x2="20" y1="12" y2="12" />
		<line x1="4" x2="20" y1="6" y2="6" />
		<line x1="4" x2="20" y1="18" y2="18" />
	</svg>
);

const X = ({
	className = "",
	size = 24,
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
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>
);

// Hero Component
const Hero = React.memo(() => {
	return (
		<section
			className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-24 bg-background transition-colors duration-300"
			style={{
				animation: "fadeIn 0.6s ease-out",
			}}>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        /* Button Shine Effect */
        .btn-shine {
          position: relative;
          overflow: hidden;
        }
        
        .btn-shine::before {
          content: '';
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

			{/* Background Gradients for Light Mode */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob" />
				<div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
			</div>

			<aside className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-border bg-background/50 backdrop-blur-sm max-w-full shadow-sm hover:shadow-md transition-all">
				<span className="text-xs text-center whitespace-nowrap text-muted-foreground font-medium">
					🚀 AI-Powered Workflow Automation is Here!
				</span>
				<a
					href="#features"
					className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-all active:scale-95 whitespace-nowrap font-semibold"
					aria-label="Learn more about NeuroX features">
					Learn more
					<ArrowRight size={12} />
				</a>
			</aside>

			<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl px-6 leading-tight mb-6 tracking-tight text-foreground">
				Build <span className="text-primary">AI Workflows</span> <br />
				with Drag & Drop Simplicity
			</h1>

			<p className="text-base md:text-lg text-center max-w-2xl px-6 mb-10 text-muted-foreground leading-relaxed">
				Create powerful AI-driven workflows with intuitive drag-and-drop nodes.{" "}
				<br className="hidden md:block" />
				Chat with intelligent agents and automate your processes effortlessly.
			</p>

			<div className="flex items-center gap-4 relative z-10 mb-20">
				<Link href="/sign-in">
					<Button
						type="button"
						variant="gradient"
						size="lg"
						className="rounded-xl flex items-center justify-center shadow-lg shadow-primary/20"
						aria-label="Start building workflows with NeuroX">
						Start Building
					</Button>
				</Link>
			</div>

			<div className="w-full max-w-6xl relative pb-20 px-4">
				{/* Glow Effect behind Image */}
				<div
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] pointer-events-none -z-10 opacity-50 dark:opacity-30"
					aria-hidden="true"
				/>

				<div className="relative z-10 group perspective">
					<div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card transition-transform duration-500 group-hover:scale-[1.01]">
						<div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent pointer-events-none z-20" />
						<Image
							width={1200}
							height={800}
							src="/hero3.jpeg"
							alt="NeuroX Dashboard Interface"
							className="w-full h-auto object-cover"
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
});

Hero.displayName = "Hero";

// Main Component
export default function HeroSection() {
	return (
		<main className="min-h-screen bg-background text-foreground overflow-x-hidden">
			<Hero />
		</main>
	);
}
