import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
interface LayoutProps {
	children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
	return (
		<SidebarProvider>
			<div className="flex h-screen w-screen overflow-hidden">
				<AppSidebar />

				<SidebarInset className="flex flex-col flex-1 min-w-0 overflow-hidden">
					{/* HEADER */}
					<header
						className="flex h-16 shrink-0 items-center gap-2 px-4 
                   border-b bg-background 
                   min-w-0 overflow-hidden">
						<SidebarTrigger className="-ml-1" />
					</header>

					{/* MAIN CONTENT */}
					<main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
						{children}
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
};

export default Layout;
