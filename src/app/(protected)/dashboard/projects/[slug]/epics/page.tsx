import MainContent from "@/components/templates/content/main-content";
import HeadContent from "@/components/molecules/head-content/head-content";
import EpicContent from "@/components/organisms/epic/epic-content";

export default function EpicsPage() {
  return (
    <MainContent>
      <div className="flex flex-col gap-4">
        <div className="lg:flex justify-between items-center">
          <HeadContent title={"Epics"} description={"Epics of the project."} />
        </div>
        <EpicContent />
      </div>
    </MainContent>
  );
}
