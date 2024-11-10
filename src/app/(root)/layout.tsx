import Navbar from "@/components/navbar";
import { UserMenu } from "@/components/user-menu";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar userNav={<UserMenu />} />
      {children}
    </div>
  );
}
