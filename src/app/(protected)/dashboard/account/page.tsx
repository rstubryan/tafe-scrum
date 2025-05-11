import MainContent from "@/components/templates/content/main-content";
import HeadContent from "@/components/molecules/head-content/head-content";

export default function AccountPage() {
  return (
    <MainContent>
      <HeadContent
        title={"Account"}
        description={"Manage your account settings and preferences."}
      />
    </MainContent>
  );
}
