import { ThemeProvider } from "@/components/theme-provider";

export default function EmbedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<div className="w-full h-screen bg-background text-foreground">
				{children}
			</div>
		</ThemeProvider>
	);
}
