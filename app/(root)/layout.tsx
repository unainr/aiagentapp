import MainHeader from "@/components/ui/layouts/header";

 interface LayoutProps {
	children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
	return <>
	<MainHeader/>
	{children}
	</>;
};

export default Layout;
