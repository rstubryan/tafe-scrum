import MainContent from "@/components/templates/content/main-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TaskDetailSkeletonPage() {
  return (
    <MainContent>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <section className="flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Page Title</h1>
            <p className="text-muted-foreground">Page Description</p>
          </div>
        </section>

        {/* Task Header */}
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
              <p className="leading-7 font-bold text-primary">#ID</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Task Name</h2>
              <div className="flex gap-1 text-xs text-muted-foreground">
                <span className="text-amber-500">Status</span>
                <span>•</span>
                <span className="font-medium">State</span>
              </div>
            </div>
          </div>

          <div className="mt-4 lg:mt-0 flex items-center gap-2">
            <Button variant="outline">Edit</Button>
            <Button variant="outline" className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              Status
            </Button>
          </div>
        </div>

        {/* Task Details Card */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Created Date</h3>
                <p className="text-sm text-muted-foreground">Date</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Modified Date</h3>
                <p className="text-sm text-muted-foreground">Date</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Due Date</h3>
                <p className="text-sm text-muted-foreground">Not set</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Owner</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-muted-foreground">Username</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Assigned To</h3>
                <p className="text-sm text-muted-foreground">Username</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">User Story</h3>
                <p className="text-sm text-muted-foreground">Story Title</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description Card */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No description available
            </p>
          </CardContent>
        </Card>
      </div>
    </MainContent>
  );
}
