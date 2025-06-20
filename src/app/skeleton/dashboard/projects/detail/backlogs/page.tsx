import MainContent from "@/components/templates/content/main-content";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BacklogSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        {/* Header Section */}
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Page Title</h1>
            <p className="text-muted-foreground">Page Description</p>
          </div>
          <Button>Action Button</Button>
        </section>

        {/* Backlog Content */}
        <div className="mt-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="flex h-full flex-col">
                  <CardHeader className="pb-0">
                    <div className="2xl:flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <p className="leading-7 font-bold text-primary">
                            #{index + 1}
                          </p>
                        </div>
                        <div>
                          <div className="leading-none font-semibold line-clamp-1">
                            Backlog Title
                          </div>
                          <div className="p-0">
                            <p className="flex gap-1 text-xs text-muted-foreground">
                              <span className="text-amber-500">Status</span>
                              <span>•</span>
                              <span className="font-medium">Open</span>
                            </p>
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
                  <CardContent className="flex-1">
                    <div className="mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>Created: Date</span>
                        <span>•</span>
                        <span>Modified: Date</span>
                        <span>•</span>
                        <span>Due: Date</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <p className="text-xs tracking-tight text-primary">
                          by Username
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <p className="text-xs tracking-tight text-primary">
                          Assigned to: Username
                        </p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1 items-center">
                        <p className="text-xs tracking-tight text-primary mr-1">
                          Tags:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">
                            Tag 1
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Tag 2
                          </Badge>
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
                          <span className="sr-only">Edit</span>
                          Edit
                        </Button>
                        <Button variant="outline" className="h-10 w-full">
                          <span className="sr-only">Delete</span>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
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
