"use client";

import { useParams } from "next/navigation";
import { useGetProjectBySlug } from "@/api/project/queries";

export default function TimelineProject() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: project, isLoading } = useGetProjectBySlug(slug);

  if (isLoading) {
    return <div>Loading project details...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {project && (
        <div>
          <pre className="bg-muted p-4 rounded-md">
            {JSON.stringify(project, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
