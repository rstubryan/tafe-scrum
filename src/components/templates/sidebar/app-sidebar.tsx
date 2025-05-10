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
import { NavProject } from "@/components/templates/sidebar/nav-project";
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
  project_list: [
    {
      name: "Projects",
      url: "/dashboard/projects/[slug]",
      icon: GalleryVerticalEnd,
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
          url: "/dashboard/projects/[slug]/backlogs",
        },
        {
          title: "Tasks",
          url: "/dashboard/projects/[slug]/tasks",
        },
        {
          title: "Epics",
          url: "/dashboard/projects/[slug]/epics",
        },
        {
          title: "Sprints",
          url: "/dashboard/projects/[slug]/sprints",
        },
        {
          title: "Issues",
          url: "/dashboard/projects/[slug]/issues",
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
        <NavProject project_list={data.project_list} />
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
