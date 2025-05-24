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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useGetProjectBySlug } from "@/api/project/queries";
import { useGetEpicByRefIdAndProjectId } from "@/api/epic/queries";
import { useGetUserStoryByEpicId } from "@/api/backlog-us/queries";
import { useDeleteRelatedUserStory } from "@/api/epic/mutation";
import { UserStoryProps } from "@/api/backlog-us/type";
import { getInitials } from "@/utils/avatar-initials";
import { formatDate } from "@/utils";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import EpicDialog from "@/components/organisms/epic/epic-dialog";
import SlugEpicRelatedUsDialog from "@/components/organisms/slug-content/epic/slug-epic-related-us-dialog";

export default function SlugEpicContent() {
  const params = useParams();
  const slug = params.slug as string;
  const epicRef = params.id as string;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: project } = useGetProjectBySlug(slug);
  const { data: epic, isLoading: isLoadingEpic } =
    useGetEpicByRefIdAndProjectId(epicRef, project?.id?.toString() || "");
  const { data: userStories, isLoading: isLoadingUserStories } =
    useGetUserStoryByEpicId(epic?.id?.toString() || "");
  const { mutate: deleteRelatedUserStory } = useDeleteRelatedUserStory();

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

  const handleDeleteRelatedUserStory = (userStoryId: number | undefined) => {
    if (userStoryId && epic?.id) {
      deleteRelatedUserStory({
        epicId: epic.id.toString(),
        userStoryId: userStoryId.toString(),
      });
    }
  };

  if (isLoadingEpic) {
    return (
      <div className="flex items-center justify-center h-40">
        <Typography>Loading epic details...</Typography>
      </div>
    );
  }

  if (!epic) {
    return (
      <div className="flex items-center justify-center h-40">
        <Typography>Epic not found</Typography>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-min">
      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-md"
                style={{
                  backgroundColor: epic.status_extra_info?.color || "#70728F",
                }}
              >
                <Typography className="font-bold text-white">
                  #{epic.ref}
                </Typography>
              </div>
              <div>
                <CardTitle className="line-clamp-1">{epic.subject}</CardTitle>
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
            {/* Edit button */}
            <EpicDialog
              mode="edit"
              epic={epic}
              trigger={
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              }
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>
                Created:{" "}
                {epic.created_date ? formatDate(epic.created_date) : "N/A"}
              </span>
              <span>•</span>
              <span>
                Modified:{" "}
                {epic.modified_date ? formatDate(epic.modified_date) : "N/A"}
              </span>
              {epic.is_blocked && (
                <>
                  <span>•</span>
                  <span className="text-destructive font-medium">Blocked</span>
                </>
              )}
              <span>•</span>
              <span>
                Assigned to:{" "}
                {epic.assigned_to_extra_info
                  ? epic.assigned_to_extra_info.full_name_display
                  : "Unassigned"}
              </span>
            </div>

            {epic.owner_extra_info && (
              <div className="mt-2 flex items-center gap-2">
                <Avatar className="h-6 w-6 rounded-full">
                  <AvatarImage
                    src={epic.owner_extra_info.photo || undefined}
                    alt={epic.owner_extra_info.full_name_display}
                  />
                  <AvatarFallback>
                    {getInitials(epic.owner_extra_info.full_name_display)}
                  </AvatarFallback>
                </Avatar>
                <Typography size="xs" className="text-primary">
                  by {epic.owner_extra_info.full_name_display}
                </Typography>
              </div>
            )}

            <div className="mt-4">
              <Typography size="sm" className="font-medium">
                User Stories
              </Typography>
              <div className="mt-1 flex items-center gap-1">
                <span>Total:</span>
                <span className="font-medium">
                  {epic.user_stories_counts?.total || 0}
                </span>
                {typeof epic.user_stories_counts?.progress === "number" && (
                  <>
                    <span>•</span>
                    <span>Progress:</span>
                    <span className="font-medium">
                      {Math.round(epic.user_stories_counts.progress)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="prose mt-6 mb-6">
              {epic.description_html ? (
                <div
                  dangerouslySetInnerHTML={{ __html: epic.description_html }}
                />
              ) : (
                epic.description || "No description available"
              )}
            </div>

            {epic.is_blocked && epic.blocked_note && (
              <div className="my-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <Typography size="sm" className="text-destructive font-medium">
                  Blocked Note:
                </Typography>
                <div className="mt-1">
                  {epic.blocked_note_html ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: epic.blocked_note_html,
                      }}
                    />
                  ) : (
                    epic.blocked_note
                  )}
                </div>
              </div>
            )}

            <Separator className="my-2" />

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <Typography size="sm" className="font-medium">
                  Associated User Stories
                </Typography>
                <SlugEpicRelatedUsDialog
                  epic={epic}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add User Story
                    </Button>
                  }
                />
              </div>

              {isLoadingUserStories ? (
                <div className="mt-2 flex h-40 items-center justify-center">
                  <Typography>Loading user stories...</Typography>
                </div>
              ) : (
                <div className="mt-4">
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
                                        color:
                                          story.status_extra_info?.color ||
                                          "#70728F",
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
                              </div>

                              {story.owner_extra_info && (
                                <div className="mt-2 flex items-center gap-2">
                                  <Avatar className="h-6 w-6 rounded-full">
                                    <AvatarImage
                                      src={story.owner_extra_info.photo}
                                      alt={
                                        story.owner_extra_info.full_name_display
                                      }
                                    />
                                    <AvatarFallback>
                                      {getInitials(
                                        story.owner_extra_info
                                          .full_name_display,
                                      )}
                                    </AvatarFallback>
                                  </Avatar>
                                  <Typography
                                    size="xs"
                                    className="text-primary"
                                  >
                                    by{" "}
                                    {story.owner_extra_info.full_name_display}
                                  </Typography>
                                </div>
                              )}

                              <div className="mt-2 flex items-center gap-2">
                                <Typography size="xs" className="text-primary">
                                  Assigned to:{" "}
                                  {story.assigned_to_extra_info
                                    ? story.assigned_to_extra_info
                                        .full_name_display
                                    : "Unassigned"}
                                </Typography>
                              </div>

                              {story.tags && story.tags.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1 items-center">
                                  <Typography
                                    size="xs"
                                    className="text-primary mr-1"
                                  >
                                    Tags:
                                  </Typography>
                                  <div className="flex flex-wrap gap-1">
                                    {story.tags.map((tag, index) => (
                                      <Badge key={index} className="text-xs">
                                        {Array.isArray(tag)
                                          ? tag[0]
                                          : String(tag)}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
                              <Link
                                href={`/dashboard/projects/${slug}/backlogs/${story.ref}`}
                                className="sm:col-span-2 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 py-2"
                              >
                                <Eye className="size-4 shrink-0" />
                                <span className="truncate">View Details</span>
                              </Link>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-full"
                                  >
                                    <Typography className="sr-only">
                                      Remove
                                    </Typography>
                                    <Trash2 className="size-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Remove User Story
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove{" "}
                                      <span className="font-bold">
                                        &#34;{story.subject}
                                        &#34;
                                      </span>
                                      from this epic? This will only remove the
                                      association, not delete the user story.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        story.id &&
                                        handleDeleteRelatedUserStory(story.id)
                                      }
                                    >
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed">
                        <Typography>
                          No user stories associated with this epic
                        </Typography>
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
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
