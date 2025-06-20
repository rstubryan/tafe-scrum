import MainContent from "@/components/templates/content/main-content";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function TasksSkeletonPage() {
  return (
    <MainContent>
      <div className="flex flex-col gap-4">
        {/* Header Section with Filter Container */}
        <div className="lg:flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-36 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="lg:mt-0 mt-3 lg:w-[150px] w-full h-9 rounded-md" />
        </div>

        {/* Task Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-md" />{" "}
                    {/* Task ref # */}
                    <div>
                      <Skeleton className="h-5 w-48 mb-1" /> {/* Task title */}
                      <div className="flex gap-1 items-center">
                        <Skeleton className="h-4 w-16" /> {/* Status */}
                        <Skeleton className="h-4 w-2" /> {/* Bullet */}
                        <Skeleton className="h-4 w-16" /> {/* Open/Closed */}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="mt-2 text-xs">
                    <div className="mb-2 grid grid-cols-1 gap-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-20" /> {/* Created label */}
                        <Skeleton className="h-4 w-24" /> {/* Date */}
                      </div>
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-16" /> {/* Owner label */}
                        <Skeleton className="h-4 w-20" /> {/* Owner name */}
                      </div>
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-20" /> {/* Assigned label */}
                        <Skeleton className="h-4 w-24" /> {/* Assignee name */}
                      </div>
                      <div className="flex items-center gap-1 truncate">
                        <Skeleton className="h-4 w-24" />{" "}
                        {/* User Story label */}
                        <Skeleton className="h-4 w-32" />{" "}
                        {/* User Story text */}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="grid grid-cols-1 2xl:grid-cols-2 gap-2">
                  <Skeleton className="h-10 w-full rounded-md" />{" "}
                  {/* View Task Details */}
                  <Skeleton className="h-10 w-full rounded-md" />{" "}
                  {/* View Task in User Story */}
                </CardFooter>
              </Card>
            ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-4 flex justify-center">
          <Skeleton className="h-9 w-56" />
        </div>
      </div>
    </MainContent>
  );
}
