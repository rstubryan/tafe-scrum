import MainContent from "@/components/templates/content/main-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SprintsDetailSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-72" />
          </div>
        </section>

        <div className="grid gap-6 my-6">
          {/* Sprint Header Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div>
                    <Skeleton className="h-6 w-64 mb-1" />
                    <div className="flex gap-1 items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-2" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
          </Card>

          {/* Three Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Duration Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-6 w-36" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <Skeleton className="h-9 w-36 mb-2" />
                  <Skeleton className="h-5 w-24 mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Stories Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-6 w-36" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-9 w-16" />
              </CardContent>
            </Card>

            {/* Sprint Details Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-6 w-36" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-2" />

          {/* User Stories Associated Content */}
          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-md" />
                        <div className="w-full">
                          <Skeleton className="h-5 w-full mb-1" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="pt-2">
                          <Skeleton className="h-8 w-full rounded-md" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-4 flex justify-center">
              <Skeleton className="h-9 w-56" />
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
