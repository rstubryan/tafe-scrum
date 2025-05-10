import MainContent from "@/components/templates/content/main-content";
import DialogProject from "@/components/organisms/project/dialog-project";
import { Typography } from "@/components/atoms/typography/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectsPage() {
  return (
    <MainContent>
      <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <Typography size={"h2"}>Projects</Typography>
          <Typography size={"sm"} className="text-muted-foreground">
            Create and manage your projects.
          </Typography>
        </div>
        <DialogProject />
      </section>
      <Tabs defaultValue="my-project" className="w-full my-4">
        <TabsList className="w-full">
          <TabsTrigger value="my-project" className={"w-full"}>
            My Project
          </TabsTrigger>
          <TabsTrigger value="discover" className={"w-full"}>
            Discover
          </TabsTrigger>
        </TabsList>
        <TabsContent value="my-project">
          My projects will be listed here.
        </TabsContent>
        <TabsContent value="discover">
          Discover projects will be listed here.
        </TabsContent>
      </Tabs>
    </MainContent>
  );
}
