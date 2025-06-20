import MainContent from "@/components/templates/content/main-content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DocumentationSkeletonPage() {
  return (
    <MainContent>
      <section>
        <div className="flex flex-col gap-4">
          <div className="space-y-10 w-full mx-auto py-4">
            {/* First post */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Article Title</h2>
                  <p className="text-sm text-muted-foreground">
                    Published Date
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 w-full bg-muted flex items-center justify-center">
                    Featured Image
                  </div>
                  <div className="space-y-2">
                    <p>
                      Article content paragraph 1. This is placeholder text for
                      the documentation page.
                    </p>
                    <p>
                      Article content paragraph 2. This shows how the content
                      would be structured.
                    </p>
                    <p>
                      Article content paragraph 3. Each card represents a
                      documentation article.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Second post */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Article Title</h2>
                  <p className="text-sm text-muted-foreground">
                    Published Date
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 w-full bg-muted flex items-center justify-center">
                    Featured Image
                  </div>
                  <div className="space-y-2">
                    <p>
                      Article content paragraph 1. This is placeholder text for
                      the documentation page.
                    </p>
                    <p>
                      Article content paragraph 2. This shows how the content
                      would be structured.
                    </p>
                    <p>
                      Article content paragraph 3. Each card represents a
                      documentation article.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third post */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Article Title</h2>
                  <p className="text-sm text-muted-foreground">
                    Published Date
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-32 w-full bg-muted flex items-center justify-center">
                    Featured Image
                  </div>
                  <div className="space-y-2">
                    <p>
                      Article content paragraph 1. This is placeholder text for
                      the documentation page.
                    </p>
                    <p>
                      Article content paragraph 2. This shows how the content
                      would be structured.
                    </p>
                    <p>
                      Article content paragraph 3. Each card represents a
                      documentation article.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
      </section>
    </MainContent>
  );
}
