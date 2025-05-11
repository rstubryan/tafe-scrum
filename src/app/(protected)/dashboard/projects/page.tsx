import MainContent from "@/components/templates/content/main-content";
import DialogProject from "@/components/organisms/project/dialog-project";
import TabsProject from "@/components/organisms/project/tabs-project";
import HeadContent from "@/components/molecules/head-content/head-content";

export default function ProjectsPage() {
  return (
    <MainContent>
      <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <HeadContent
          title={"Projects"}
          description={"Create and manage your projects."}
        />
        <DialogProject mode={"create"} />
      </section>
      <TabsProject />
    </MainContent>
  );
}
