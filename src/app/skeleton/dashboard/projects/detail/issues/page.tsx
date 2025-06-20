import MainContent from "@/components/templates/content/main-content";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function IssuesSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        {/* Header with title and create button */}
        <div className="lg:flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-36 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="lg:mt-0 mt-3 lg:w-[180px] w-full h-9 rounded-md" />
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>
        </div>

        {/* Issues grid */}
        <div className="flex flex-col gap-4 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader className="pb-0">
                    <div className="xl:flex items-center justify-between w-full">
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
                      <Skeleton className="mt-4 xl:mt-0 xl:w-[150px] w-full h-9 rounded-md" />
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="mt-2 text-xs">
                      <div className="mb-2 grid grid-cols-1 gap-2">
                        {/* Owner avatar and name */}
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-6 w-6 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                        </div>

                        {/* Assigned to */}
                        <div className="flex items-center gap-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-32" />
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-2 text-xs">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-2" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
                      <Skeleton className="sm:col-span-2 h-10 rounded-md" />
                      <div className="grid grid-cols-2 gap-2">
                        <Skeleton className="h-10 rounded-md" />
                        <Skeleton className="h-10 rounded-md" />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Skeleton className="h-9 w-56" />
          </div>
        </div>
      </MainContent>
    </div>
  );
}
