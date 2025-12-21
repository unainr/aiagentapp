import MainHeader from "@/components/ui/layouts/header";
import Footer from "@/modules/home/ui/components/footer";

 interface LayoutProps {
	children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
	return <>
	<MainHeader/>
	{children}
	<Footer/>
	</>;
};

export default Layout;
