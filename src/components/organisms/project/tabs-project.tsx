"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabDiscover from "./tabs/tab-discover";
import TabMyProject from "./tabs/tab-my-project";

export default function TabsProject() {
  return (
    <Tabs defaultValue="my-project" className="w-full my-4">
      <TabsList className="w-full">
        <TabsTrigger value="my-project" className={"w-full"}>
          My Project
        </TabsTrigger>
        <TabsTrigger value="discover" className={"w-full"}>
          Discover
        </TabsTrigger>
      </TabsList>
      <TabsContent value="my-project">
        <TabMyProject />
      </TabsContent>
      <TabsContent value="discover">
        <TabDiscover />
      </TabsContent>
    </Tabs>
  );
}
