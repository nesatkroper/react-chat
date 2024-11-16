import { ChevronsUpDown, CircleUser, LogOut, ReceiptText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { getUser } from "@/app/reducer/userSlice";
import profileImage from "@/assets/images/profile.jpg";
import axiosInstance from "@/providers/axiosInstance";
import { useAuth } from "@/providers/auth-provider";
import { useNavigate } from "react-router-dom";

const MySidebarFooter = () => {
  // const dispatch = useDispatch();
  // const users = useSelector((state) => state?.user);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const profile = profileImage;

  const handleLogout = async () => {
    await axiosInstance
      .post("/logout", {
        id: localStorage.getItem("id"),
      })
      .catch((err) => {
        console.log(err);
      });

    setToken();
    navigate("/auth", { replace: true });
  };

  useEffect(() => {
    // dispatch(getUser());
  });
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Avatar>
                    <AvatarImage src={profile} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold">Nun</span>
                  <span className="">Male</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <CircleUser />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ReceiptText />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="text-red-700" />
                <span className="text-red-700">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default MySidebarFooter;
