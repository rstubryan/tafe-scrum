import MainContent from "@/components/templates/content/main-content";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ProjectsSkeletonPage() {
  return (
    <MainContent>
      {/* Header Section Skeleton */}
      <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-36" />
      </section>

      {/* Tabs Skeleton */}
      <div className="w-full my-4">
        <Skeleton className="h-10 w-full mb-4" />

        {/* Project Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-3">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="flex h-full flex-col">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5 mb-2" />
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
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
  );
}
