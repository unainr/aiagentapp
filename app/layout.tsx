import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "AI Agent Platform",
	description: "Build, deploy, and manage intelligent AI workflows.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ClerkProvider
				appearance={{
					theme: dark,
				}}>
				<html lang="en" suppressHydrationWarning>
					<body
						className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
						<ThemeProvider
							attribute="class"
							defaultTheme="dark"
							disableTransitionOnChange>
							{children}
						</ThemeProvider>
						<Toaster />
					</body>
				</html>
			</ClerkProvider>
		</Suspense>
	);
}
