"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HomeIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"

// This is sample data.
const data = {
  
  teams: [
    {
      name: "Home",
      logo: HomeIcon,
      plan: "Enterprise",
    },
    
  ],
  navMain: [
    {
      title: "General",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "WorkFlow",
          url: "/workflow",
        },
        {
          title: "About",
          url: "/about",
        },
        {
          title: "Contact",
          url: "/contact",
        },
      ],
    },
   
   
   
  ],
 
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <div className="flex items-start justify-start mx-3">

        <ModeToggle/>
        </div>
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
