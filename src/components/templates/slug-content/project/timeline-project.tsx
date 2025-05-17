"use client";

import { useParams } from "next/navigation";
import { useGetProjectBySlug } from "@/api/project/queries";
import { useGetTimelineByProjectId } from "@/api/timeline/queries";

export default function TimelineProject() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: project } = useGetProjectBySlug(slug);
  const { data: timelines, isLoading } = useGetTimelineByProjectId(
    project?.id?.toString() || "",
  );

  if (!project) {
    return <div>Loading project...</div>;
  }

  if (isLoading) {
    return <div>Loading project details...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {timelines && (
        <div>
          <pre className="bg-muted p-4 rounded-md">
            {JSON.stringify(timelines, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
