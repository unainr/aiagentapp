"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Rocket, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export default function MainHeader() {
	const [isScrolled, setIsScrolled] = React.useState(false);
	const pathname = usePathname();
	const isActive = (path: string) => pathname === path;
	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-200 ${
				isScrolled ? "bg-background/60 backdrop-blur-md" : ""
			}`}>
			<div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				<Logo />

				<nav className="hidden  md:flex items-center gap-4 lg:gap-6">
					<Link
						href="/"
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							isActive("/") &&
								"text-primary font-bold underline underline-offset-4"
						)}>
						Home
					</Link>

					<Link
						href="/workflow"
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							isActive("/workflow") &&
								"text-primary font-bold underline underline-offset-4"
						)}>
						Workflows
					</Link>

					{/* <Link
						href="/about"
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							isActive("/about") &&
								"text-primary font-bold underline underline-offset-4"
						)}>
						About
					</Link>

					<Link
						href="/contact"
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							isActive("/contact") &&
								"text-primary font-bold underline underline-offset-4"
						)}>
						Contact
					</Link> */}

					<Link
						href="/pricing"
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							isActive("/pricing") &&
								"text-primary font-bold underline underline-offset-4"
						)}>
						Pricing
					</Link>
				</nav>

				<div className="hidden md:flex items-center gap-2">
					<SignedIn>
						<UserButton />
					</SignedIn>
					<SignedOut>
						<Button
							size={"sm"}
							asChild
							className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 group">
							<Link href="/sign-in">
								Start Free
								<Rocket className="h-4 w-4" />
							</Link>
						</Button>
					</SignedOut>
					<ModeToggle />
				</div>

				{/* Mobile Menu Trigger */}
				<div className="md:hidden flex items-center">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Menu className="h-6 w-6" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[250px] sm:w-[300px]">
							<nav className="flex flex-col gap-4 mt-8 items-center">
								<Link
									href="/"
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										isActive("/") &&
											"text-primary font-bold underline underline-offset-4"
									)}>
									Home
								</Link>
								<Link
									href="/workflow"
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										isActive("/workflow") &&
											"text-primary font-bold underline underline-offset-4"
									)}>
									Workflows
								</Link>
								{/* <Link
									href="/about"
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										isActive("/about") &&
											"text-primary font-bold underline underline-offset-4"
									)}>
									About
								</Link>
								<Link
									href="/contact"
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										isActive("/contact") &&
											"text-primary font-bold underline underline-offset-4"
									)}>
									Contact
								</Link> */}
								<Link
									href="/pricing"
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary",
										isActive("/pricing") &&
											"text-primary font-bold underline underline-offset-4"
									)}>
									Pricing
								</Link>
								<SignedIn>
									<UserButton />
								</SignedIn>
								<SignedOut>
									<Button
										size={"sm"}
										asChild
										className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 group">
										<Link href="/sign-in">
											Start Free
											<Rocket className="h-4 w-4" />
										</Link>
									</Button>
								</SignedOut>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
