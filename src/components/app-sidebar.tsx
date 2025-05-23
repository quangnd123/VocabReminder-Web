"use client"

import * as React from "react"
import {
  HelpCircleIcon,
  LayoutDashboardIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import SlothLogo from "@/components/sloth-logo"
import { useSession } from "next-auth/react"

const data = {
  navMain: [
    {
      title: "Vocabulary",
      url: "/dashboard/vocabulary",
      icon: LayoutDashboardIcon,
    },
  ],
  navSecondary: [
    {
      title: "Get Help",
      url: "/contact",
      icon: HelpCircleIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const user = session?.user
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <SlothLogo href="/dashboard"/>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser userName={user?.name? user.name : ""} userEmail={user?.email? user.email : ""} />
      </SidebarFooter>
    </Sidebar>
  )
}
