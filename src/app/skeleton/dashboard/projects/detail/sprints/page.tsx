import MainContent from "@/components/templates/content/main-content";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function SprintsSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-36 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-10 w-40 rounded-md" />
        </section>

        <div className="flex flex-col gap-4 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <Card
                  key={index}
                  className="bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm flex flex-col h-full"
                >
                  <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pb-0">
                    <div className="xl:flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-md" />
                        <div>
                          <Skeleton className="h-5 w-48 mb-1" />
                          <div className="flex gap-1 items-center">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-2" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-6 flex-1">
                    <div className="mt-2 text-xs">
                      <div className="mb-2 grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-24" />
                        </div>

                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-40" />
                        </div>

                        <div className="mt-2">
                          <div className="bg-secondary p-2 rounded-md w-full">
                            <Skeleton className="h-6 w-full mb-1" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
                      <Skeleton className="h-10 sm:col-span-2 rounded-md" />
                      <div className="grid grid-cols-2 gap-2">
                        <Skeleton className="h-10 rounded-md" />
                        <Skeleton className="h-10 rounded-md" />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Skeleton className="h-9 w-56" />
          </div>
        </div>
      </MainContent>
    </div>
  );
}
