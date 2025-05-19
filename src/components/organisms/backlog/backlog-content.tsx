"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Typography } from "@/components/atoms/typography/typography";
import { PaginationLayout } from "@/components/templates/layout/pagination-layout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useGetProjectBySlug } from "@/api/project/queries";
import { useGetUserStoryByProjectId } from "@/api/backlog-us/queries";
import { UserStoryProps } from "@/api/backlog-us/type";
import { getInitials } from "@/utils/avatar-initials";
import { formatDate } from "@/utils";

export default function BacklogContent() {
  const params = useParams();
  const slug = params.slug as string;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: project } = useGetProjectBySlug(slug);
  const { data: userStories, isLoading } = useGetUserStoryByProjectId(
    project?.id?.toString() || "",
  );

  const userStoriesArray = Array.isArray(userStories) ? userStories : [];

  const paginatedStories = userStoriesArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalItems = userStoriesArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (userStories) {
      setCurrentPage(1);
    }
  }, [userStories]);

  if (isLoading) {
    return (
      <div className="mt-5 flex h-40 items-center justify-center">
        <Typography>Loading user stories...</Typography>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedStories.length > 0 ? (
          paginatedStories.map((story: UserStoryProps) => (
            <Card key={story.id} className="flex h-full flex-col">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-md"
                    style={{
                      backgroundColor:
                        story.status_extra_info?.color || "#70728F",
                    }}
                  >
                    <Typography className="font-bold text-white">
                      #{story.ref}
                    </Typography>
                  </div>
                  <div>
                    <CardTitle className="line-clamp-1">
                      {story.subject}
                    </CardTitle>
                    <CardContent className="p-0">
                      <Typography className="flex gap-1 text-xs text-muted-foreground">
                        <span
                          style={{
                            color: story.status_extra_info?.color || "#70728F",
                          }}
                        >
                          {story.status_extra_info?.name || "New"}
                        </span>
                        <span>•</span>
                        <span className="font-medium">
                          {story.is_closed ? "Closed" : "Open"}
                        </span>
                      </Typography>
                    </CardContent>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>
                      Created:{" "}
                      {story.created_date
                        ? formatDate(story.created_date)
                        : "N/A"}
                    </span>
                    <span>•</span>
                    <span>
                      Modified:{" "}
                      {story.modified_date
                        ? formatDate(story.modified_date)
                        : "N/A"}
                    </span>
                    <span>•</span>
                    <span>
                      Due:{" "}
                      {story.due_date
                        ? formatDate(story.due_date)
                        : "Not available"}
                    </span>
                  </div>

                  {story.owner_extra_info && (
                    <div className="mt-2 flex items-center gap-2">
                      <Avatar className="h-6 w-6 rounded-full">
                        <AvatarImage
                          src={story.owner_extra_info.photo}
                          alt={story.owner_extra_info.full_name_display}
                        />
                        <AvatarFallback>
                          {getInitials(
                            story.owner_extra_info.full_name_display,
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <Typography size="xs" className="text-primary">
                        by {story.owner_extra_info.full_name_display}
                      </Typography>
                    </div>
                  )}

                  <div className="mt-2 flex items-center gap-2">
                    <Typography size="xs" className="text-primary">
                      Assigned to:{" "}
                      {story.assigned_to_extra_info
                        ? story.assigned_to_extra_info.full_name_display
                        : "Unassigned"}
                    </Typography>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    <Typography size="xs" className="text-primary">
                      {story.tags && story.tags.length > 0
                        ? story.tags.map((tag) => tag[0]).join(", ")
                        : "No tags available"}
                    </Typography>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
                  <Link
                    href={`/dashboard/projects/${slug}/backlogs/${story.ref}`}
                    className={`sm:col-span-2 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 py-2`}
                  >
                    <Eye className="size-4 shrink-0" />
                    <span className="truncate">View Details</span>
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-full"
                    >
                      <Typography className="sr-only">Edit</Typography>
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-full"
                    >
                      <Typography className="sr-only">Delete</Typography>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardFooter>{" "}
            </Card>
          ))
        ) : (
          <div className="col-span-full mt-5 flex h-40 items-center justify-center rounded-lg border border-dashed">
            <Typography>No user stories found</Typography>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
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
