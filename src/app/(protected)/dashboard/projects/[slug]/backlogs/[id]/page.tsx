import MainContent from "@/components/templates/content/main-content";
import HeadContent from "@/components/molecules/head-content/head-content";

export default function BacklogsDetailPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <HeadContent
            title={"User Stories Detail"}
            description={"View and manage the details of a user story."}
          />
        </section>
      </MainContent>
    </div>
  );
}
