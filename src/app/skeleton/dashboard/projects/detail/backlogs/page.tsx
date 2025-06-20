import MainContent from "@/components/templates/content/main-content";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BacklogSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        {/* Header Section Skeleton */}
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <div className="flex items-center gap-2 sm:w-auto w-full">
            <Skeleton className="h-10 w-full min-w-[160px] rounded-md" />
          </div>
        </section>

        {/* Backlog Content Skeleton */}
        <div className="mt-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="flex h-full flex-col">
                  <CardHeader className="pb-0">
                    <div className="2xl:flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-md" />
                        <div>
                          <Skeleton className="h-5 w-40" />
                          <div className="p-0">
                            <Skeleton className="h-4 w-24 mt-1" />
                          </div>
                        </div>
                      </div>

                      <Skeleton className="mt-4 2xl:mt-0 h-9 2xl:w-[150px] w-full" />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mt-2 text-xs">
                      <Skeleton className="h-4 w-full mb-2" />

                      <div className="mt-2 flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <Skeleton className="h-4 w-40" />
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1 items-center">
                        <Skeleton className="h-4 w-12 mr-1" />
                        <div className="flex flex-wrap gap-1">
                          {Array(3)
                            .fill(0)
                            .map((_, tagIndex) => (
                              <Skeleton
                                key={tagIndex}
                                className="h-5 w-16 rounded-full"
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
                      <Skeleton className="h-10 sm:col-span-2" />
                      <div className="grid grid-cols-2 gap-2">
                        <Skeleton className="h-10" />
                        <Skeleton className="h-10" />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-6 flex justify-center">
            <Skeleton className="h-10 w-64" />
          </div>
        </div>
      </MainContent>
    </div>
  );
}
