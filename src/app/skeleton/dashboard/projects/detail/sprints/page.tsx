import MainContent from "@/components/templates/content/main-content";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SprintsSkeletonPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        {/* Header with title and create button */}
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Page Title</h1>
            <p className="text-muted-foreground">Page Description</p>
          </div>
          <Button>Action Button</Button>
        </section>

        <div className="flex flex-col gap-4 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <Card
                  key={index}
                  className="bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm flex flex-col h-full"
                >
                  <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pb-0">
                    <div className="xl:flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <p className="leading-7 font-bold text-primary">
                            #ID
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Sprint Name</h3>
                          <div className="flex gap-1 text-xs text-muted-foreground">
                            <span>Sprint US</span>
                            <span>•</span>
                            <span className="font-medium text-amber-500">
                              Status
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-6 flex-1">
                    <div className="mt-2 text-xs">
                      <div className="mb-2 grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Created:</span>
                          <span>Date</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-medium">Duration:</span>
                          <span>Start Date - End Date</span>
                        </div>

                        <div className="mt-2">
                          <div className="bg-secondary p-2 rounded-md w-full text-center">
                            <p className="font-medium mb-1">Count</p>
                            <p>User Stories</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center px-6">
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
      </MainContent>
    </div>
  );
}
