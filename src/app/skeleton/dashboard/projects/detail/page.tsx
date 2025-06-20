import MainContent from "@/components/templates/content/main-content";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

export default function ProjectDetailSkeleton() {
  return (
    <MainContent>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Project Title</h1>
          <p className="text-muted-foreground">
            Project description or status information
          </p>
        </div>
        <Button>Action Button</Button>
      </div>

      {/* Project Timeline Layout */}
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
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <p className="font-medium">User Name</p>
                        <p className="text-sm text-muted-foreground">
                          Activity description
                        </p>
                      </div>
                    </div>
                    <div className="order-1 w-full sm:order-2 sm:w-max">
                      <p className="text-sm text-muted-foreground">Date/Time</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Timeline content</p>
                </CardContent>
              </Card>
            ))}

          {/* Pagination */}
          <div className="mt-5 flex justify-center">
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
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Member Name</p>
                        <p className="text-xs text-muted-foreground">Role</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </section>
                </CardHeader>
              </Card>
            ))}
        </section>
      </div>
    </MainContent>
  );
}
