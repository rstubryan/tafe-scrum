import MainContent from "@/components/templates/content/main-content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BacklogDetailSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        {/* Header Section */}
        <section className="flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Page Title</h1>
            <p className="text-muted-foreground">Page Description</p>
          </div>
        </section>

        {/* Main User Story Card */}
        <div className="grid auto-rows-min">
          <Card className="my-6">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <p className="leading-7 font-bold text-primary">#1</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Backlog Title</h2>
                    <div className="flex gap-1 text-xs text-muted-foreground">
                      <span className="text-amber-500">Status</span>
                      <span>•</span>
                      <span className="font-medium">Type</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline">Status</Button>
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
                  <span>Due: Date</span>
                  <span>•</span>
                  <span>Assigned to: Username</span>
                </div>

                {/* Owner info */}
                <div className="mt-2 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <p className="text-xs tracking-tight text-primary">
                    by Username
                  </p>
                </div>

                {/* Description */}
                <div className="prose mt-6 mb-6 space-y-2">
                  <p>
                    Backlog description paragraph 1. This is placeholder text
                    that represents the content of the backlog detail.
                  </p>
                  <p>
                    Backlog description paragraph 2. The description provides
                    details about the requirements, acceptance criteria, and
                    other relevant information.
                  </p>
                  <p>
                    Backlog description paragraph 3. This section helps team
                    members understand what needs to be done.
                  </p>
                </div>

                <Separator className="my-2" />

                {/* Tasks section */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Tasks</h3>
                    <Button>Add Task</Button>
                  </div>

                  {/* Task list - Grid with 3 columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <Card
                          key={index}
                          className="py-6 flex flex-col h-full gap-6"
                        >
                          <CardHeader className="px-6 pb-0">
                            <div className="2xl:flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                                  <p className="leading-7 font-bold text-primary">
                                    T{index + 1}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Task Title</h4>
                                  <div className="flex gap-1 text-xs text-muted-foreground">
                                    <span className="text-amber-500">
                                      Status
                                    </span>
                                    <span>•</span>
                                    <span className="font-medium">
                                      Priority
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                className="mt-4 2xl:mt-0 2xl:w-[150px] w-full"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                  Status
                                </div>
                              </Button>
                            </div>
                          </CardHeader>

                          <CardContent className="px-6 flex-1">
                            <div className="mt-2 mb-2 grid grid-cols-1 gap-1 text-sm">
                              <div className="flex items-center gap-1">
                                <span className="font-medium">Created:</span>
                                <span className="text-muted-foreground">
                                  Date
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-medium">Due:</span>
                                <span className="text-muted-foreground">
                                  Date
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-medium">Assigned:</span>
                                <span className="text-muted-foreground">
                                  Username
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-medium">Estimated:</span>
                                <span className="text-muted-foreground">
                                  2 hours
                                </span>
                              </div>
                            </div>
                          </CardContent>

                          <div className="px-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Button variant="outline">Edit</Button>
                            <Button variant="outline">Delete</Button>
                          </div>
                        </Card>
                      ))}
                  </div>

                  {/* Pagination */}
                  <div className="mt-4 flex justify-center">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline">1</Button>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainContent>
    </div>
  );
}
