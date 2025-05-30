import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // return (
  //   <main className="min-h-screen flex flex-col items-center">
  //     <div className="flex-1 w-full flex flex-col gap-20 items-center">
  //       <Header />

  //       <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">{children}</div>

  //       <Footer />
  //     </div>
  //   </main>
  // );

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
