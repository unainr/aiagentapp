"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {


	const footerLinks = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "about" },
		{ name: "Workflows", href: "workflow" },
		{ name: "Pricing", href: "pricing" },
		{ name: "Contact", href: "contact" },
	];

	return (
		<footer className="relative border-t border-gray-800 bg-linear-to-b from-black via-gray-950 to-black text-white overflow-hidden">
		{/* Background glow */}
		<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
	
		<div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
			<div className="grid grid-cols-1 md:grid-cols-12 gap-12">
				
				{/* Logo + Description */}
				<div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
					<Image
						width={800}
						height={900}
						src="/logo.png"
						alt="NeuroX Logo"
						className="w-32 sm:w-40 h-auto mb-5 object-contain opacity-95 hover:opacity-100 transition"
					/>
	
					<p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
						Build powerful AI-driven workflows with intuitive drag-and-drop simplicity. Automate smarter, work faster.
					</p>
	
					{/* Socials */}
					<div className="flex gap-4 mt-6 justify-center md:justify-start">
						<a className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition hover:scale-110">
							𝕏
						</a>
						<a className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition hover:scale-110">
							in
						</a>
					</div>
				</div>
	
				{/* Useful Links */}
				<div className="md:col-span-3 text-center md:text-left">
					<h3 className="font-bold mb-6 text-lg sm:text-xl">Useful Links</h3>
					<ul className="space-y-4">
						{footerLinks.map(link => (
							<li key={link.name}>
								<Link
									href={link.href}
									className="text-gray-400 hover:text-blue-400 transition inline-flex items-center group"
								>
									<span className="opacity-0 group-hover:opacity-100 mr-2 text-blue-400 transition">
										→
									</span>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
	
				{/* Contact */}
				<div className="md:col-span-4 text-center md:text-left">
					<h3 className="font-bold mb-6 text-lg sm:text-xl">Get in Touch</h3>
	
					<div className="space-y-5 text-sm sm:text-base">
						<div className="flex items-start justify-center md:justify-start gap-3">
							<span className="text-blue-500">✉</span>
							<div>
								<p className="text-gray-500 text-xs">Email</p>
								<a href="mailto:info@neurox.com" className="hover:text-blue-400">
									info@neurox.com
								</a>
							</div>
						</div>
	
						<div className="flex items-start justify-center md:justify-start gap-3">
							<span className="text-blue-500">🎧</span>
							<div>
								<p className="text-gray-500 text-xs">Support</p>
								<a href="mailto:support@neurox.com" className="hover:text-blue-400">
									support@neurox.com
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
	
			{/* Bottom Bar */}
			<div className="mt-14 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
				<p>
					© 2025 <span className="text-gray-400 font-medium">NeuroX</span>. All rights reserved.
				</p>
	
				<div className="flex items-center gap-2">
					<span>Crafted with</span>
					<span className="text-cyan-500 animate-pulse">♥</span>
					<span>by <strong>UNAIN</strong></span>
				</div>
			</div>
		</div>
	</footer>
	
	);
};

export default Footer;