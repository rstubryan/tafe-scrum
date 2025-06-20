import MainContent from "@/components/templates/content/main-content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function EpicDetailSkeletonPage() {
  return (
    <MainContent>
      <div className="flex flex-col gap-4">
        {/* Header Section Skeleton */}
        <div className="lg:flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-72" />
          </div>
        </div>

        {/* Epic Detail Card Skeleton */}
        <div className="grid auto-rows-min">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div>
                    <Skeleton className="h-6 w-64 mb-1" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
                <Skeleton className="h-9 w-24" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="mt-2 text-xs">
                {/* Date information skeleton */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-2" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-2" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-2" />
                  <Skeleton className="h-4 w-48" />
                </div>

                {/* Owner info skeleton */}
                <div className="mt-2 flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>

                {/* User Stories count skeleton */}
                <div className="mt-4">
                  <Skeleton className="h-5 w-32 mb-1" />
                  <div className="mt-1 flex items-center gap-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-2" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>

                {/* Description skeleton */}
                <div className="prose mt-6 mb-6 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Blocked note skeleton - optional */}
                <div className="my-4 p-3 border rounded-md">
                  <Skeleton className="h-5 w-32 mb-1" />
                  <div className="mt-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>

                <Separator className="my-2" />

                {/* User Stories section skeleton */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-9 w-32" />
                  </div>

                  {/* User Stories grid skeleton */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <Card
                          key={index}
                          className="flex flex-col h-full gap-6 py-6"
                        >
                          <CardHeader className="px-6 pb-0">
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-10 w-10 rounded-md" />
                              <div>
                                <Skeleton className="h-5 w-48 mb-1" />
                                <div className="flex gap-1 items-center">
                                  <Skeleton className="h-4 w-16" />
                                  <Skeleton className="h-4 w-2" />
                                  <Skeleton className="h-4 w-16" />
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="px-6 flex-1">
                            <div className="mt-2 text-xs">
                              {/* Date information - two descriptions with bullet */}
                              <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-2" />
                                <Skeleton className="h-4 w-32" />
                              </div>

                              {/* Author with avatar */}
                              <div className="mt-2 flex items-center gap-2">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                              </div>

                              {/* Assigned to */}
                              <div className="mt-2 flex items-center gap-2">
                                <Skeleton className="h-4 w-36" />
                              </div>
                            </div>
                          </CardContent>

                          {/* Footer with asymmetric buttons */}
                          <div className="px-6 grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
                            <Skeleton className="h-10 sm:col-span-2 rounded-md" />{" "}
                            {/* View Details - wider */}
                            <Skeleton className="h-10 rounded-md" />{" "}
                            {/* Secondary action - narrower */}
                          </div>
                        </Card>
                      ))}
                  </div>

                  {/* Pagination skeleton */}
                  <div className="mt-4 flex justify-center">
                    <Skeleton className="h-9 w-56" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainContent>
  );
}
