import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import MainContent from "@/components/templates/content/main-content";

export default function DashboardSkeleton() {
  return (
    <MainContent className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="flex flex-col gap-8 max-w-4xl w-full">
        {/* Welcome Header Skeleton */}
        <div className="flex flex-col gap-2 text-center">
          <Skeleton className="h-12 w-80 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Get Started / Create Project Skeleton */}
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-5 w-full max-w-md" />
                <Skeleton className="h-5 w-3/4 max-w-md" />
              </div>
              <Skeleton className="h-12 w-full md:w-48" />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainContent>
  );
}
