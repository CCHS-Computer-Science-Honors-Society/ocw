import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import { AppSidebar } from "./_components/sidebar";
import { CourseSwitcher } from "./_components/switcher";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar
        courseswitcher={
          <Suspense fallback="loading">
            <CourseSwitcher />
          </Suspense>
        }
      />
      <SidebarInset>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
