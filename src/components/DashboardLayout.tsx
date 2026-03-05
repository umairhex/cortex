import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import FontSelector from "@/components/FontSelector";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import {
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserData } from "../hooks/useUserData";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const userData = useUserData();

  return (
    <SidebarProvider>
      <AppSidebar user={userData} />
      <SidebarInset className="max-h-screen ">
        <SidebarHeader>
          <div className="flex w-full justify-between items-center ">
            <SidebarTrigger />
            <div className="flex gap-3 items-center">
              <FontSelector />
              <AnimatedThemeToggler />
            </div>
          </div>
        </SidebarHeader>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
