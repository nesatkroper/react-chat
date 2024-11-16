import { Sidebar } from "@/components/ui/sidebar";
import MySidebarHeader from "./sidebar/sidebar-header";
import MySidebarFooter from "./sidebar/sidebar-footer";
import MySidebarContent from "./sidebar/sidebar-content";

// Menu items.

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <MySidebarHeader />
      <MySidebarContent />
      <MySidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
