import MainContent from "@/components/templates/content/main-content";
import DialogProject from "@/components/organisms/project/dialog-project";
import { Typography } from "@/components/atoms/typography/typography";
import TabsProject from "@/components/organisms/project/tabs-project";

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
      <TabsProject />
    </MainContent>
  );
}
