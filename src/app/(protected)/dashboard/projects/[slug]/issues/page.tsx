import MainContent from "@/components/templates/content/main-content";
import HeadContent from "@/components/molecules/head-content/head-content";
import IssueContent from "@/components/organisms/issue/issue-content";

export default function IssuesPage() {
  return (
    <MainContent>
      <div className="flex flex-col gap-4">
        <div className="lg:flex justify-between items-center">
          <HeadContent
            title={"Issues"}
            description={"Issues of the project."}
          />
        </div>
        <IssueContent />
      </div>
    </MainContent>
  );
}
