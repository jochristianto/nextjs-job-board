"use client";

import {
  IconDashboard,
  IconListDetails
} from "@tabler/icons-react";
import * as React from "react";

import Logo from "@/components/logo";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { useUser } from "@/components/user-provider";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/protected",
      icon: IconDashboard
    },
    {
      title: "Jobs",
      url: "/protected/jobs",
      icon: IconListDetails
    }
  ]
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: IconSettings
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch
  //   }
  // ]
};

export  function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
