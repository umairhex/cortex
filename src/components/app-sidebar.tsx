import { Link } from "react-router-dom";
import type * as React from "react";
import blackLogo from "@/assets/black-logo.svg";
import whiteLogo from "@/assets/white-logo.svg";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "@/components/use-theme";
import { navigationItems } from "@/config/navigation";

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user?: { name: string; email: string; avatar: string };
}) {
  const { resolvedTheme } = useTheme();
  const defaultUser = {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/default.jpg",
  };

  const userData = user || defaultUser;

  const logoSrc = resolvedTheme === "dark" ? whiteLogo : blackLogo;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/dashboard">
                <img
                  src={logoSrc}
                  alt="Cortex Logo"
                  className="h-8 w-auto animate-spin duration-1000"
                />
                <span className="font-semibold text-lg tracking-tight">
                  Cortex
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
