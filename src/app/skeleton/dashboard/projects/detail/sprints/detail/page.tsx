import MainContent from "@/components/templates/content/main-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Info } from "lucide-react";
import Link from "next/link";

export default function SprintsDetailSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        <section className="flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Page Title</h1>
            <p className="text-muted-foreground">Page Description</p>
          </div>
        </section>

        <div className="grid gap-6 my-6">
          {/* Sprint Header Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <p className="leading-7 font-bold text-primary">#ID</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Sprint Name</h2>
                    <div className="flex gap-1 text-xs text-muted-foreground">
                      <span>Sprint Owner</span>
                      <span>•</span>
                      <span className="font-medium text-amber-500">Status</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2 text-xs">
                <span>Created: Date</span>
                <span>•</span>
                <span>Modified: Date</span>
              </div>
            </CardContent>
          </Card>

          {/* Three Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Duration Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  <CardTitle className="text-base">Sprint Duration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <p className="text-2xl font-bold">Days Count</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    (Weeks Count)
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Start:</span> Start Date
                    </p>
                    <p>
                      <span className="font-medium">End:</span> End Date
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Stories Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <CardTitle className="text-base">User Stories</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Count</p>
              </CardContent>
            </Card>

            {/* Sprint Details Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  <CardTitle className="text-base">Sprint Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span>Status</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sprint #:</span>
                    <span>Number</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-2" />

          {/* User Stories Associated Content */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">User Stories</h3>
              <Button>Associate User Stories</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <p className="leading-7 font-bold text-primary">
                            #ID
                          </p>
                        </div>
                        <div className="w-full">
                          <h4 className="font-semibold">User Story Title</h4>
                          <div className="flex gap-1 text-xs text-muted-foreground">
                            <span className="text-amber-500">Status</span>
                            <span>•</span>
                            <span className="font-medium">State</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Unlink
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-xs">
                        <div className="flex gap-1">
                          <span>Created: Date</span>
                          <span>•</span>
                          <span>Modified: Date</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Assigned to:</span>
                          <span>Username</span>
                        </div>
                        <div>
                          <p className="font-medium mb-1">Tags:</p>
                          <p className="text-muted-foreground">
                            No tags available
                          </p>
                        </div>
                        <div className="pt-2">
                          <Link
                            href="#"
                            className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 py-2"
                          >
                            <span className="truncate">View Details</span>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  &lt;
                </Button>
                <Button variant="outline">1</Button>
                <Button variant="outline" size="icon">
                  &gt;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  );
}
