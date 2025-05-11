"use client";

import { useState, useEffect } from "react";
import { LoaderCircle, Trash2, Edit } from "lucide-react";
import { ProjectResponseProps } from "@/api/project/type";
import { PaginationLayout } from "@/components/templates/layout/pagination-layout";
import { useGetProjectsByUser } from "@/api/project/queries";
import { useDeleteProject } from "@/api/project/mutation";
import DialogProject from "@/components/organisms/project/dialog-project";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TabMyProject() {
  const [mounted, setMounted] = useState(false);
  const { currentUserId } = useCurrentUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    setMounted(true);
  }, []);

  const canFetchProjects = mounted && !!currentUserId;

  const { data: myProjects, isLoading: isLoadingMyProjects } =
    useGetProjectsByUser(currentUserId?.toString() || "", {
      enabled: canFetchProjects,
      retry: 3,
      retryDelay: 300,
    });

  const { mutate: deleteProject } = useDeleteProject();

  const totalProjects = Array.isArray(myProjects) ? myProjects.length : 0;
  const totalPages = Math.ceil(totalProjects / itemsPerPage);

  const getPaginatedProjects = () => {
    if (!Array.isArray(myProjects)) return [];

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return myProjects.slice(startIdx, endIdx);
  };

  const paginatedProjects = getPaginatedProjects();

  const handleDeleteProject = (projectId: number | string) => {
    if (projectId) {
      deleteProject({ id: projectId });
    }
  };

  if (!mounted) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (!currentUserId) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Please log in to view your projects.
      </div>
    );
  }

  if (isLoadingMyProjects) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (!Array.isArray(myProjects) || myProjects.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        You don&#39;t have any projects yet.
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

              <div className="flex gap-2 ml-4">
                <DialogProject
                  mode="edit"
                  project={project}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                  }
                />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Project</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-bold">
                          &#34;{project.name}
                          &#34;
                        </span>
                        ? This action cannot be undone and will permanently
                        remove the project and all its associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          project.id && handleDeleteProject(project.id)
                        }
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
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
