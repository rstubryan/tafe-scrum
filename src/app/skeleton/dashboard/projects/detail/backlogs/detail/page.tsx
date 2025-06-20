import MainContent from "@/components/templates/content/main-content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function BacklogDetailSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        {/* Header Section Skeleton */}
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-72" />
          </div>
        </section>

        {/* Main User Story Card Skeleton */}
        <div className="grid auto-rows-min">
          <Card className="my-6">
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

                {/* Description skeleton */}
                <div className="prose mt-6 mb-6 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                <Separator className="my-2" />

                {/* Tasks section skeleton */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-9 w-32" />
                  </div>

                  {/* Task list skeleton - Grid with 3 columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <Card
                          key={index}
                          className="py-6 flex flex-col h-full gap-6"
                        >
                          <CardHeader className="px-6 pb-0">
                            <div className="2xl:flex items-center justify-between w-full">
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
                              <Skeleton className="h-9 w-full 2xl:w-[150px] mt-4 2xl:mt-0 rounded-md" />
                            </div>
                          </CardHeader>

                          <CardContent className="px-6 flex-1">
                            <div className="mt-2 mb-2 grid grid-cols-1 gap-1 text-sm">
                              <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-24" />
                              </div>
                              <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20" />
                              </div>
                              <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-24" />
                              </div>
                              <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                              </div>
                            </div>
                          </CardContent>

                          <div className="px-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Skeleton className="h-8 w-full rounded-md" />
                            <Skeleton className="h-8 w-full rounded-md" />
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
      </MainContent>
    </div>
  );
}
