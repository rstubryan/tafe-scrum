import MainContent from "@/components/templates/content/main-content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function EpicDetailSkeletonPage() {
  return (
    <MainContent>
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <section className="flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Page Title</h1>
            <p className="text-muted-foreground">Page Description</p>
          </div>
        </section>

        {/* Epic Detail Card */}
        <div className="grid auto-rows-min">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <p className="leading-7 font-bold text-primary">#ID</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Epic Name</h2>
                    <div className="flex gap-1 text-xs text-muted-foreground">
                      <span className="text-amber-500">Status</span>
                      <span>•</span>
                      <span className="font-medium">State</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mt-2 text-xs">
                {/* Date information */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span>Created: Date</span>
                  <span>•</span>
                  <span>Modified: Date</span>
                  <span>•</span>
                  <span>Assigned to: User</span>
                </div>

                {/* Owner info */}
                <div className="mt-2 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <p className="text-xs tracking-tight text-primary">
                    by Username
                  </p>
                </div>

                {/* User Stories count */}
                <div className="mt-4">
                  <h3 className="text-sm font-semibold mb-1">User Stories</h3>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="font-medium">Total:</span>
                    <span>Count</span>
                    <span>•</span>
                    <span className="font-medium">Progress:</span>
                    <span>Percentage</span>
                  </div>
                </div>

                {/* Description */}
                <div className="my-4 p-3 border rounded-md">
                  <h3 className="text-sm font-semibold mb-1">Description</h3>
                  <div className="mt-1 space-y-2">
                    <p>No description available</p>
                  </div>
                </div>

                <Separator className="my-2" />

                {/* User Stories section */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Associated User Stories
                    </h3>
                    <Button>Associate User Story</Button>
                  </div>

                  {/* User Stories grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array(1)
                      .fill(0)
                      .map((_, index) => (
                        <Card
                          key={index}
                          className="flex flex-col h-full gap-6 py-6"
                        >
                          <CardHeader className="px-6 pb-0">
                            <div className="flex items-center gap-2">
                              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                                <p className="leading-7 font-bold text-primary">
                                  #ID
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold">
                                  User Story Name
                                </h4>
                                <div className="flex gap-1 text-xs text-muted-foreground">
                                  <span className="text-amber-500">Status</span>
                                  <span>•</span>
                                  <span className="font-medium">State</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="px-6 flex-1">
                            <div className="mt-2 text-xs">
                              {/* Date information */}
                              <div className="flex items-center gap-2">
                                <span>Created: Date</span>
                                <span>•</span>
                                <span>Modified: Date</span>
                              </div>

                              {/* Author with avatar */}
                              <div className="mt-2 flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <p className="text-xs tracking-tight text-primary">
                                  by Username
                                </p>
                              </div>

                              {/* Assigned to */}
                              <div className="mt-2 flex items-center gap-2">
                                <span className="font-medium">
                                  Assigned to:
                                </span>
                                <span>Username</span>
                              </div>
                            </div>
                          </CardContent>

                          {/* Footer with buttons */}
                          <div className="px-6 grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
                            <Link
                              href="#"
                              className="sm:col-span-2 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 py-2"
                            >
                              <span className="truncate">View Details</span>
                            </Link>
                            <Button variant="outline" className="h-10 w-full">
                              Remove
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainContent>
  );
}
