import MainContent from "@/components/templates/content/main-content";
import HeadContent from "@/components/molecules/head-content/head-content";
import TaskContent from "@/components/organisms/task/task-content";

export default function TasksPage() {
  return (
    <MainContent>
      <div className="flex justify-between items-center mb-4">
        <HeadContent title={"Tasks"} description={"Tasks of the project."} />
      </div>
      <TaskContent />
    </MainContent>
  );
}
