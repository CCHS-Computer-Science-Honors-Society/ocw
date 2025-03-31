import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { AppSidebar } from "./_components/sidebar";
import { CourseSwitcher } from "./_components/switcher";
import {
  roleToPermissions,
  userIncludesPermission,
} from "@/server/auth/plugin/permission/service";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const hasPermission = await userIncludesPermission({
    courseId: id,
    action: [...roleToPermissions.editor],
  });

  if (!hasPermission) {
    redirect("/");
  }

  return (
    <div className="bg-muted/10">
      <SidebarProvider>
        <AppSidebar
          variant="inset"
          courseswitcher={
            <Suspense fallback="loading">
              <CourseSwitcher />
            </Suspense>
          }
        />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
