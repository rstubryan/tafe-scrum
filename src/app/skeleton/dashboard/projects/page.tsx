import MainContent from "@/components/templates/content/main-content";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectsSkeletonPage() {
  return (
    <MainContent>
      {/* Header Section */}
      <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Page Title</h1>
          <p className="text-muted-foreground">Page Description</p>
        </div>
        <Button>Action Button</Button>
      </section>

      {/* Tabs */}
      <div className="w-full my-4">
        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="w-full">
            <TabsTrigger value="all">Tab 1</TabsTrigger>
            <TabsTrigger value="private">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Project Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-3">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="flex h-full flex-col">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-2">
                    <div className="relative flex size-10 shrink-0 overflow-hidden h-10 w-10 rounded-md">
                      <span className="flex h-full w-full items-center justify-center rounded-md bg-primary/10 font-bold text-primary">
                        Icon
                      </span>
                    </div>
                    <div>
                      <div className="leading-none font-semibold line-clamp-1">
                        Project Title
                      </div>
                      <div className="text-muted-foreground text-sm flex gap-1">
                        <span className="text-amber-500">Status</span>
                        <span>•</span>
                        <span className="font-medium">Role</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                    Project Description
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-muted-foreground tracking-tight">
                        Created: Date
                      </p>
                    </div>
                    <p className="text-xs tracking-tight text-muted-foreground">
                      Tags
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-2">
                    <Link
                      href="#"
                      className="sm:col-span-2 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 py-2"
                    >
                      <span className="truncate">View Button</span>
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-full"
                      >
                        <span className="sr-only">Edit</span>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-full"
                      >
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
        <div className="flex justify-center mt-4">
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
