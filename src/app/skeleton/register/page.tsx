import { Skeleton } from "@/components/ui/skeleton";

export default function RegisterSkeletonPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm px-4 sm:px-0">
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
          <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
            <Skeleton className="h-8 w-32 mx-auto" />
          </div>
          <div className="px-6">
            <div className="space-y-4">
              {/* Username field */}
              <div className="grid gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>

              {/* Full Name field */}
              <div className="grid gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>

              {/* Email field */}
              <div className="grid gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>

              {/* Password field */}
              <div className="grid gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>

              {/* Button */}
              <Skeleton className="h-9 w-full rounded-md" />
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <Skeleton className="h-4 w-60 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
