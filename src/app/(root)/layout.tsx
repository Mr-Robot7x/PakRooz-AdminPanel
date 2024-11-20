import Navbar from "@/components/Navbar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
// import { SidebarProvider } from "@/components/SideBarTrigger";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProviderWrapper>
      <Navbar />
      <div className="dashboard-layout">{children}</div>
    </SessionProviderWrapper>
  );
}
