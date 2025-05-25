import MainContent from "@/components/templates/content/main-content";
import HeadContent from "@/components/molecules/head-content/head-content";
import SprintContent from "@/components/organisms/sprint/sprint-content";

export default function SprintsPage() {
  return (
    <MainContent>
      <div className="flex flex-col gap-4">
        <div className="lg:flex justify-between items-center">
          <HeadContent
            title={"Sprints"}
            description={"Sprints of the project."}
          />
        </div>
      </div>
      <SprintContent />
    </MainContent>
  );
}
