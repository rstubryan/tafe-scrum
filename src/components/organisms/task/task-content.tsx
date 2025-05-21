"use client";

import { useState, useEffect } from "react";
import { useGetTaskByProjectId } from "@/api/task/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/atoms/typography/typography";
import { formatDate } from "@/utils";
import { PaginationLayout } from "@/components/templates/layout/pagination-layout";
import { useGetProjectBySlug } from "@/api/project/queries";
import { useParams } from "next/navigation";

export default function TaskContent() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: project } = useGetProjectBySlug(slug);
  const { data: tasksResponse, isLoading } = useGetTaskByProjectId(
    project?.id?.toString() || "",
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const tasks = Array.isArray(tasksResponse) ? tasksResponse : [];
  const taskCount = tasks.length;

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(taskCount / itemsPerPage);

  useEffect(() => {
    if (tasksResponse) {
      setCurrentPage(1);
    }
  }, [tasksResponse]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Typography>Loading tasks...</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.length === 0 ? (
        <div className="rounded-md bg-muted/50 p-6 text-center">
          <p className="text-primary leading-7 scroll-m-20">
            No tasks found for this project
          </p>
          <p className="text-primary scroll-m-20 mt-1 muted text-sm">
            Click the &#34;Create Task&#34; button to add your first task
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedTasks.map((task) => (
            <Card key={task.id} className="flex flex-col h-full">
              <CardHeader className="pb-0">
                <div className="xl:flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-md"
                      style={{
                        backgroundColor:
                          task.status_extra_info?.color || "#70728F",
                      }}
                    >
                      <Typography className="font-bold text-white">
                        #{task.ref}
                      </Typography>
                    </div>
                    <div>
                      <CardTitle className="line-clamp-1">
                        {task.subject}
                      </CardTitle>
                      <CardContent className="p-0">
                        <Typography className="flex gap-1 text-xs text-muted-foreground">
                          <span
                            style={{
                              color: task.status_extra_info?.color || "#70728F",
                            }}
                          >
                            {task.status_extra_info?.name || "New"}
                          </span>
                          <span>•</span>
                          <span className="font-medium">
                            {task.is_closed ? "Closed" : "Open"}
                          </span>
                        </Typography>
                      </CardContent>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mt-2 text-xs text-muted-foreground">
                  <div className="mb-2 grid grid-cols-1 gap-1 text-sm">
                    <div>
                      <span className="font-semibold">Created:</span>{" "}
                      {task.created_date
                        ? formatDate(task.created_date)
                        : "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold">Owner:</span>{" "}
                      {task.owner_extra_info?.full_name_display || "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold">Assigned:</span>{" "}
                      {task.assigned_to_extra_info?.full_name_display ||
                        "Unassigned"}
                    </div>
                    <div className="truncate">
                      <span className="font-semibold">User Story:</span>{" "}
                      {task.user_story_extra_info?.subject || "N/A"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div>
          <PaginationLayout
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
