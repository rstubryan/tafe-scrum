"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/templates/sidebar/nav-main";
import { NavDocumentation } from "@/components/templates/sidebar/nav-documentation";
import { NavUser } from "@/components/templates/sidebar/nav-user";
import { ProjectSwitcher } from "@/components/templates/sidebar/project-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Scrum",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Backlogs",
          url: "/dashboard/backlogs",
        },
        {
          title: "Tasks",
          url: "/dashboard/tasks",
        },
        {
          title: "Epics",
          url: "/dashboard/epics",
        },
        {
          title: "Sprints",
          url: "/dashboard/sprints",
        },
        {
          title: "Issues",
          url: "/dashboard/issues",
        },
      ],
    },
  ],
  documentation: [
    {
      name: "Introduction",
      url: "/dashboard/documentation/[slug]",
      icon: Frame,
    },
    {
      name: "Get Started",
      url: "/dashboard/documentation/[slug]",
      icon: Map,
    },
    {
      name: "Tutorials",
      url: "/dashboard/documentation/[slug]",
      icon: Settings2,
    },
    {
      name: "Changelog",
      url: "/dashboard/documentation/[slug]",
      icon: GalleryVerticalEnd,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher projects={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocumentation documentation={data.documentation} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
