"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { ProjectResponseProps } from "@/api/project/type";
import { PaginationLayout } from "@/components/templates/layout/pagination-layout";
import { useGetProjectDiscover } from "@/api/project/queries";
import DialogProject from "@/components/organisms/project/dialog-project";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function TabDiscover() {
  const { data: discoverProjects, isLoading: isLoadingDiscoverProjects } =
    useGetProjectDiscover();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { currentUserId } = useCurrentUser();

  const totalProjects = Array.isArray(discoverProjects)
    ? discoverProjects.length
    : 0;
  const totalPages = Math.ceil(totalProjects / itemsPerPage);

  const getPaginatedProjects = () => {
    if (!Array.isArray(discoverProjects)) return [];

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return discoverProjects.slice(startIdx, endIdx);
  };

  const paginatedProjects = getPaginatedProjects();

  const canEditProject = (project: ProjectResponseProps) => {
    if (!currentUserId) return false;
    const isOwner =
      project.owner?.id === currentUserId || project.i_am_owner === true;
    const isAdmin = project.i_am_admin === true;

    return isOwner || isAdmin;
  };

  if (isLoadingDiscoverProjects) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (!Array.isArray(discoverProjects) || discoverProjects.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No projects available to discover.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 my-4">
        {paginatedProjects.map((project: ProjectResponseProps) => (
          <div
            key={project.id}
            className="border rounded-lg p-4 bg-card shadow-sm"
          >
            <div className="flex justify-between mb-3">
              <div className="flex justify-between items-start flex-1">
                <h3 className="text-lg font-medium">{project.name}</h3>
                {project.is_private && (
                  <span className="bg-muted px-2 py-1 text-xs rounded">
                    Private
                  </span>
                )}
              </div>

              {canEditProject(project) && (
                <div className="ml-4">
                  <DialogProject
                    mode="edit"
                    project={project}
                    trigger={
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    }
                  />
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-sm mt-2">
              {project.description || "No description"}
            </p>
            <div className="flex items-center mt-4 text-xs text-muted-foreground">
              <span>
                Owner:{" "}
                {project.owner?.full_name_display || project.owner?.username}
              </span>
              <span className="mx-2">•</span>
              <span>Members: {project.members?.length || 0}</span>
              <span className="mx-2">•</span>
              <span>Activity: {project.total_activity || 0}</span>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationLayout
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}
