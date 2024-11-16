import Header from "./header";
import AppSidebar from "./sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full ">
        <Header />
        <div className=" p-3">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
