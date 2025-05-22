"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/atoms/typography/typography";
import { PaginationLayout } from "@/components/templates/layout/pagination-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetProjectBySlug } from "@/api/project/queries";
import { useGetEpicByProjectId } from "@/api/epic/queries";
import { formatDate } from "@/utils";

export default function EpicContent() {
  const params = useParams();
  const slug = params.slug as string;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Get project data first to get the project ID
  const { data: project } = useGetProjectBySlug(slug);

  // Use the project ID to fetch epics
  const { data: epicsData, isLoading } = useGetEpicByProjectId(
    project?.id?.toString() || "",
  );

  const epics = Array.isArray(epicsData) ? epicsData : [];
  const totalPages = Math.ceil(epics.length / itemsPerPage);
  const paginatedEpics = epics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Typography>Loading epics...</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {epics.length === 0 ? (
        <div className="rounded-md bg-muted/50 p-6 text-center">
          <p className="text-primary leading-7 scroll-m-20">
            No epics found for this project
          </p>
          <p className="text-primary scroll-m-20 mt-1 muted text-sm">
            Click the &#34;Create Epic&#34; button to add your first epic
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedEpics.map((epic) => (
            <Card key={epic.id} className="flex flex-col h-full">
              <CardHeader className="pb-0">
                <div className="xl:flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-md"
                      style={{
                        backgroundColor:
                          epic.status_extra_info?.color || "#70728F",
                      }}
                    >
                      <Typography className="font-bold text-white">
                        #{epic.ref}
                      </Typography>
                    </div>
                    <div>
                      <CardTitle className="line-clamp-1">
                        {epic.subject}
                      </CardTitle>
                      <CardContent className="p-0">
                        <Typography className="flex gap-1 text-xs text-muted-foreground">
                          <span
                            style={{
                              color: epic.status_extra_info?.color || "#70728F",
                            }}
                          >
                            {epic.status_extra_info?.name || "New"}
                          </span>
                          <span>•</span>
                          <span className="font-medium">
                            {epic.is_closed ? "Closed" : "Open"}
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
                      {epic.created_date
                        ? formatDate(epic.created_date)
                        : "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold">Created by:</span>{" "}
                      {epic.owner_extra_info?.full_name_display || "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold">User Stories:</span>{" "}
                      {epic.user_stories_counts?.total || 0}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/dashboard/projects/${slug}/epics/${epic.ref}`}>
                  <Button variant="outline" className="w-full">
                    <EyeIcon />
                    View Epic Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4">
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
