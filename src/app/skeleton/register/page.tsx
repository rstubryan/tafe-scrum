import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterSkeletonPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm px-4 sm:px-0">
        <Card className="rounded-xl py-6 shadow-sm">
          <CardHeader className="pb-0 px-6">
            <h2 className="text-center text-2xl font-medium">Register</h2>
          </CardHeader>
          <CardContent className="px-6">
            <div className="space-y-4">
              {/* Username field */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Skeleton className="h-9 w-full rounded-md" />
              </div>

              {/* Full Name field */}
              <div className="grid gap-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Skeleton className="h-9 w-full rounded-md" />
              </div>

              {/* Email field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Skeleton className="h-9 w-full rounded-md" />
              </div>

              {/* Password field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Skeleton className="h-9 w-full rounded-md" />
              </div>

              {/* Button */}
              <Button disabled className="w-full">
                Register
              </Button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary">
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
