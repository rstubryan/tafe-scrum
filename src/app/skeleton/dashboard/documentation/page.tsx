import MainContent from "@/components/templates/content/main-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DocumentationSkeletonPage() {
  return (
    <MainContent>
      <section>
        <div className="flex flex-col gap-4">
          <div className="space-y-10 w-full mx-auto py-4">
            {/* First skeleton post */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Second skeleton post */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third skeleton post */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-4/5" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pagination skeleton */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>
      </section>
    </MainContent>
  );
}
