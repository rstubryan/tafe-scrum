import MainContent from "@/components/templates/content/main-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";

export default function ProjectDetailSkeleton() {
  return (
    <MainContent>
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      {/* TimelineProject Skeleton */}
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Timeline Feed Section */}
        <section className="grow">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="mt-5">
                <CardHeader>
                  <div className="flex flex-col items-center justify-between sm:flex-row">
                    <div className="order-2 flex items-center gap-2 sm:order-1">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-64" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                    <div className="order-1 w-full sm:order-2 sm:w-max">
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}

          {/* Pagination Skeleton */}
          <div className="mt-5 flex justify-center">
            <Skeleton className="h-10 w-64" />
          </div>
        </section>

        {/* Members Section */}
        <section className="w-full lg:w-96">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="mt-5">
                <CardHeader>
                  <section className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-1" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-9 w-9" />
                  </section>
                </CardHeader>
              </Card>
            ))}
        </section>
      </div>
    </MainContent>
  );
}
