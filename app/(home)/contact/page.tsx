"use client";
import React from "react";
import {
	Mail,
	MessageSquare,
	HelpCircle,
	Send,
	Plus,
	Minus,
} from "lucide-react";

// Reusing the premium button style
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
				<span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"></span>
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

// FAQ Item Component
const FAQItem = ({
	question,
	answer,
}: {
	question: string;
	answer: string;
}) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className="border hover:border-primary/50 border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all duration-300">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between p-6 text-left bg-card hover:bg-muted/50 transition-colors">
				<span className="font-semibold text-foreground text-lg">
					{question}
				</span>
				{isOpen ? (
					<Minus className="w-5 h-5 text-primary" />
				) : (
					<Plus className="w-5 h-5 text-muted-foreground" />
				)}
			</button>
			<div
				className={`bg-card px-6 overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen
						? "max-h-48 py-6 opacity-100 border-t border-border"
						: "max-h-0 py-0 opacity-0"
				}`}>
				<p className="text-muted-foreground leading-relaxed">{answer}</p>
			</div>
		</div>
	);
};

export default function ContactPage() {
	const contactOptions = [
		{
			icon: <MessageSquare className="w-6 h-6 text-primary" />,
			title: "Chat to Support",
			description: "We're here to help.",
			action: "Start Chat",
			href: "#",
		},
		{
			icon: <Mail className="w-6 h-6 text-primary" />,
			title: "Email Us",
			description: "We'll reply within 24h.",
			action: "hello@neurox.com",
			href: "mailto:hello@neurox.com",
		},
		{
			icon: <HelpCircle className="w-6 h-6 text-primary" />,
			title: "Help Center",
			description: "Browse our documentation.",
			action: "Visit Help Center",
			href: "#",
		},
	];

	const faqs = [
		{
			question: "Is NeuroX free to try?",
			answer:
				"Yes! We offer a generous free tier that lets you build and free deployments. No credit card required to start.",
		},
		{
			question: "Can I self-host NeuroX?",
			answer:
				"Absolutely. We offer an Enterprise plan that includes self-hosting capabilities for data privacy compliance.",
		},
		{
			question: "What AI models do you support?",
			answer:
				"We support all major LLMs including GPT-4, Claude 3, Llama 3, and Mistral. You can also bring your own custom models.",
		},
	];

	return (
		<main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-24 pb-20">
			{/* Header */}
			<section className="relative px-6 mb-20 text-center">
				<h1 className="text-4xl md:text-6xl font-bold mb-6">Get in touch</h1>
				<p className="text-lg text-muted-foreground max-w-xl mx-auto">
					We'd love to hear from you. Please fill out this form or shoot us an
					email.
				</p>
			</section>

			<div className="container mx-auto px-6 grid lg:grid-cols-3 gap-12 max-w-6xl">
				{/* Contact Form */}
				<div className="lg:col-span-2">
					<div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
						<form className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="firstName"
										className="block text-sm font-medium mb-2 text-foreground">
										First name
									</label>
									<input
										type="text"
										id="firstName"
										className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
										placeholder="Jane"
									/>
								</div>
								<div>
									<label
										htmlFor="lastName"
										className="block text-sm font-medium mb-2 text-foreground">
										Last name
									</label>
									<input
										type="text"
										id="lastName"
										className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
										placeholder="Doe"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium mb-2 text-foreground">
									Email
								</label>
								<input
									type="email"
									id="email"
									className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
									placeholder="jane@example.com"
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium mb-2 text-foreground">
									Message
								</label>
								<textarea
									id="message"
									rows={5}
									className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 font-sans"
									placeholder="Tell us what you need help with..."></textarea>
							</div>

							<div className="pt-2">
								<Button type="button" variant="primary" className="w-full">
									Send Message <Send className="w-4 h-4 ml-2" />
								</Button>
							</div>
						</form>
					</div>
				</div>

				{/* Contact info side */}
				<div className="space-y-6">
					{contactOptions.map((option, index) => (
						<div
							key={index}
							className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group">
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
									{option.icon}
								</div>
								<div>
									<h3 className="font-semibold text-lg mb-1">{option.title}</h3>
									<p className="text-sm text-muted-foreground mb-3">
										{option.description}
									</p>
									<a
										href={option.href}
										className="text-primary font-medium hover:underline text-sm inline-flex items-center gap-1">
										{option.action}
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* FAQ Section */}
			<section className="container mx-auto px-6 mt-32 max-w-3xl">
				<h2 className="text-3xl font-bold text-center mb-12">
					Frequently Asked Questions
				</h2>
				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<FAQItem key={index} question={faq.question} answer={faq.answer} />
					))}
				</div>
			</section>
		</main>
	);
}
