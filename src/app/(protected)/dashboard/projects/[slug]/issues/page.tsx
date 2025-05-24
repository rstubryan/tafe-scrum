import MainContent from "@/components/templates/content/main-content";
import HeadContent from "@/components/molecules/head-content/head-content";
import IssueContent from "@/components/organisms/issue/issue-content";
import IssueDialog from "@/components/organisms/issue/issue-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function IssuesPage() {
  return (
    <div className="flex flex-col gap-4">
      <MainContent>
        <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <HeadContent
            title={"Issues"}
            description={"Create and manage issues for your project."}
          />

          <IssueDialog
            mode="create"
            trigger={
              <Button className="sm:w-auto w-full">
                <Plus />
                Create Issue
              </Button>
            }
          />
        </section>
        <IssueContent />
      </MainContent>
    </div>
  );
}
