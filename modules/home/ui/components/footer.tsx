"use client";
import Link from "next/link";
import React from "react";

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
			{/* Subtle background effect */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
			
			<div className="relative max-w-7xl mx-auto px-6 py-16">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
					{/* Logo and Description - Takes more space */}
					<div className="md:col-span-5 flex flex-col">
						<div className="mb-5">
							<img 
								src="/logo.png" 
								alt="NeuroX Logo" 
								className="w-40 h-20 object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
							/>
						</div>
						<p className="text-gray-400 text-base leading-relaxed max-w-md">
							Build powerful AI-driven workflows with intuitive drag-and-drop simplicity. Automate smarter, work faster.
						</p>
						
						{/* Social icons placeholder */}
						<div className="flex gap-4 mt-6">
							<a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
								<span className="text-sm">𝕏</span>
							</a>
							<a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
								<span className="text-sm">in</span>
							</a>
							
						</div>
					</div>

					{/* Useful Links */}
					<div className="md:col-span-3 flex flex-col">
						<h3 className="text-white font-bold mb-6 text-xl tracking-tight">
							Useful Links
						</h3>
						<ul className="space-y-4">
							{footerLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-gray-400 hover:text-blue-400 text-base transition-all duration-300 inline-flex items-center group relative">
										<span className="absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all duration-300 text-blue-400">→</span>
										<span className="group-hover:translate-x-2 transition-transform duration-300">
											{link.name}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="md:col-span-4 flex flex-col">
						<h3 className="text-white font-bold mb-6 text-xl tracking-tight">
							Get in Touch
						</h3>
						<div className="space-y-4 text-base">
							<div className="flex items-start gap-3 group">
								<span className="text-blue-500 mt-1">✉</span>
								<div>
									<p className="text-gray-500 text-sm mb-1">Email</p>
									<a href="mailto:info@neurox.com" className="text-gray-300 hover:text-blue-400 transition-colors">
										info@neurox.com
									</a>
								</div>
							</div>
							<div className="flex items-start gap-3 group">
								<span className="text-blue-500 mt-1">🎧</span>
								<div>
									<p className="text-gray-500 text-sm mb-1">Support</p>
									<a href="mailto:support@neurox.com" className="text-gray-300 hover:text-blue-400 transition-colors">
										support@neurox.com
									</a>
								</div>
							</div>
							<div className="pt-4 border-t border-gray-800">
								<p className="text-gray-500 text-sm leading-relaxed">
									Follow us for updates and news about the latest features
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-16 pt-8 border-t border-gray-800">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-gray-500 text-sm">
							© 2025 <span className="text-gray-400 font-medium">NeuroX</span>. All rights reserved.
						</p>
						<div className="flex items-center gap-2">
							<p className="text-gray-500 text-sm">
								Crafted with 
							</p>
							<span className="text-red-500 animate-pulse">♥</span>
							<p className="text-gray-500 text-sm">
								by <span className=" font-bold">UNAIN</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;