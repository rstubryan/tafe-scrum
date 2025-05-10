import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProjectForm from "@/components/organisms/project/create-project";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DialogProject() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="sm:w-max w-full">
          <Plus />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a project.
          </DialogDescription>
          <CreateProjectForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
