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
import { useGetUserAuth } from "@/api/user/queries";
import { UserProps } from "@/api/user/type";

const sidebarNavData = {
  projects: [
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
      url: "/dashboard/projects",
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
  const { data } = useGetUserAuth();

  const extractUserData = (): UserProps => {
    if (!data) return {} as UserProps;

    if ("data" in data && data.data) {
      return data.data as UserProps;
    }

    return data as unknown as UserProps;
  };

  const userData = extractUserData();

  const userInfo = {
    name: userData.full_name_display || userData.username || "User",
    email: userData.email || "",
    avatar: userData.photo || "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher projects={sidebarNavData.projects} />
      </SidebarHeader>
      <SidebarContent>
        <NavProject project_list={sidebarNavData.project_list} />
        <NavMain items={sidebarNavData.navMain} />
        <NavDocumentation documentation={sidebarNavData.documentation} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
