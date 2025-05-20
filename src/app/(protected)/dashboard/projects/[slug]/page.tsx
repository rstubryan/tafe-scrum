import MainContent from "@/components/templates/content/main-content";
import TimelineProject from "@/components/organisms/slug-content/project/timeline-project";
import HeadContent from "@/components/molecules/head-content/head-content";

export default function TimelinePage() {
  return (
    <MainContent>
      <HeadContent
        title={"Timeline"}
        description={"Timeline of the project."}
      />
      <TimelineProject />
    </MainContent>
  );
}
