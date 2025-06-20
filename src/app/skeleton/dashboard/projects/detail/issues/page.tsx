import MainContent from "@/components/templates/content/main-content";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function IssuesSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        {/* Header with title and create button */}
        <div className="lg:flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Page Title</h1>
            <p className="text-muted-foreground">Page Description</p>
          </div>
          <div className="flex gap-2 items-center">
            <Button variant="outline" className="lg:mt-0 mt-3">
              Filter Button
            </Button>
            <Button>Action Button</Button>
          </div>
        </div>

        {/* Issues grid */}
        <div className="flex flex-col gap-4 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader className="pb-0">
                    <div className="xl:flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <p className="leading-7 font-bold text-primary">
                            #ID
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Issue Title</h3>
                          <div className="flex gap-1 text-xs text-muted-foreground">
                            <span className="text-amber-500">Status</span>
                            <span>•</span>
                            <span className="font-medium">State</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-4 xl:mt-0 xl:w-[150px] w-full"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          Status
                        </div>
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="mt-2 text-xs">
                      <div className="mb-2 grid grid-cols-1 gap-2">
                        {/* Owner avatar and name */}
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <p className="text-xs tracking-tight text-primary">
                            by Username
                          </p>
                        </div>

                        {/* Assigned to */}
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Assigned to:</span>
                          <span className="text-muted-foreground">
                            Username
                          </span>
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-2 text-xs">
                          <span>Created: Date</span>
                          <span>•</span>
                          <span>Modified: Date</span>
                          <span>•</span>
                          <span>Due: Date</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
                      <Link
                        href="#"
                        className="sm:col-span-2 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 py-2"
                      >
                        <span className="truncate">View Details</span>
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="h-10 w-full">
                          Edit
                        </Button>
                        <Button variant="outline" className="h-10 w-full">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
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
      </MainContent>
    </div>
  );
}
