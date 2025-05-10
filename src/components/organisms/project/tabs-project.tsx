"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProjectDiscover } from "@/api/project/queries";
import { LoaderCircle } from "lucide-react";
import { ProjectResponseProps } from "@/api/project/type";

export default function TabsProject() {
  const { data: discoverProjects, isLoading: isLoadingDiscoverProjects } =
    useGetProjectDiscover();

  return (
    <Tabs defaultValue="my-project" className="w-full my-4">
      <TabsList className="w-full">
        <TabsTrigger value="my-project" className={"w-full"}>
          My Project
        </TabsTrigger>
        <TabsTrigger value="discover" className={"w-full"}>
          Discover
        </TabsTrigger>
      </TabsList>
      <TabsContent value="my-project">
        <div className="text-center py-8 text-muted-foreground">
          You don&#39;t have any projects yet.
        </div>
      </TabsContent>
      <TabsContent value="discover">
        {isLoadingDiscoverProjects ? (
          <div className="flex justify-center py-8">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : discoverProjects &&
          Array.isArray(discoverProjects) &&
          discoverProjects.length > 0 ? (
          <div className="space-y-4 my-4">
            {discoverProjects.map((project: ProjectResponseProps) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 bg-card shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{project.name}</h3>
                  {project.is_private && (
                    <span className="bg-muted px-2 py-1 text-xs rounded">
                      Private
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  {project.description || "No description"}
                </p>
                <div className="flex items-center mt-4 text-xs text-muted-foreground">
                  <span>
                    Owner:{" "}
                    {project.owner?.full_name_display ||
                      project.owner?.username}
                  </span>
                  <span className="mx-2">•</span>
                  <span>Members: {project.members?.length || 0}</span>
                  <span className="mx-2">•</span>
                  <span>Activity: {project.total_activity || 0}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No projects available to discover.
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
