import MainContent from "@/components/templates/content/main-content";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TasksSkeletonPage() {
  return (
    <MainContent>
      <div className="flex flex-col gap-4">
        {/* Header Section with Filter Container */}
        <div className="lg:flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Page Title</h1>
            <p className="text-muted-foreground">Page Description</p>
          </div>
          <Button>Action Button</Button>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <p className="leading-7 font-bold text-primary">#ID</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Task Name</h3>
                      <div className="flex gap-1 text-xs text-muted-foreground">
                        <span className="text-amber-500">Status</span>
                        <span>•</span>
                        <span className="font-medium">State</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="mt-2 text-xs">
                    <div className="mb-2 grid grid-cols-1 gap-1 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Created:</span>
                        <span>Date</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Owner:</span>
                        <span>Username</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Assigned:</span>
                        <span>Username</span>
                      </div>
                      <div className="flex items-center gap-1 truncate">
                        <span className="font-medium">User Story:</span>
                        <span>Story Title</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="grid grid-cols-1 2xl:grid-cols-2 gap-2">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 py-2"
                  >
                    <span className="truncate">View Task Details</span>
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-3 py-2"
                  >
                    <span className="truncate">View Task in User Story</span>
                  </Link>
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
  );
}
