import MainContent from "@/components/templates/content/main-content";
import HeadContent from "@/components/molecules/head-content/head-content";
import BacklogContent from "@/components/organisms/backlog/backlog-content";

export default function BacklogsPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <HeadContent
            title={"User Stories"}
            description={"Create and manage user stories for your project."}
          />
        </section>
        <BacklogContent />
      </MainContent>
    </div>
  );
}
