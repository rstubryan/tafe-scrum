import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainContent from "@/components/templates/content/main-content";

export default function DashboardSkeleton() {
  return (
    <MainContent className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="flex flex-col gap-8 max-w-4xl w-full">
        {/* Welcome Header */}
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold">Heading</h1>
          <p className="text-muted-foreground">Subheading</p>
        </div>

        {/* Get Started / Create Project Card */}
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Section Title</h2>
                <p className="text-muted-foreground">Description</p>
              </div>
              <Button disabled className="h-12 w-full md:w-48">
                Button Text
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainContent>
  );
}
