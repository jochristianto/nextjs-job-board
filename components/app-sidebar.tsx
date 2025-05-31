"use client";

import { IconListDetails } from "@tabler/icons-react";
import * as React from "react";

import Logo from "@/components/logo";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
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
import { GithubIcon, HomeIcon, LinkedinIcon } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon
    },
    {
      title: "Jobs",
      url: "/protected",
      icon: IconListDetails
    }
  ],
  navSecondary: [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/jochristianto",
      icon: LinkedinIcon
    },
    {
      title: "GitHub Repo",
      url: "https://github.com/jochristianto/nextjs-job-board",
      icon: GithubIcon
    }
    // {
    //   title: "Get Help",
    //   url: "#",
    //   icon: IconHelp
    // },
    // {
    //   title: "Search",
    //   url: "#",
    //   icon: IconSearch
    // }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
