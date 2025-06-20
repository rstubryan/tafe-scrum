import MainContent from "@/components/templates/content/main-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IssueDetailSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        {/* Header */}
        <div className="lg:flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-72" />
          </div>
          <div className="flex gap-2 items-center"></div>
        </div>

        {/* Issue Content */}
        <div className="flex flex-col gap-4 mt-5">
          {/* Issue Header */}
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div>
                <Skeleton className="h-8 w-64 mb-1" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-2" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>

            <div className="mt-4 lg:mt-0 flex items-center gap-2">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-[200px] rounded-md" />
            </div>
          </div>

          {/* Issue Details Card */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-5 w-28 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div>
                  <Skeleton className="h-5 w-28 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div>
                  <Skeleton className="h-5 w-28 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Skeleton className="h-5 w-28 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div>
                  <Skeleton className="h-5 w-28 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-24" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </MainContent>
    </div>
  );
}
