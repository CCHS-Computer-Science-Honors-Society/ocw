import { getServerAuthSession } from "@/server/auth"
import { MobileSidebar } from "./mobile-sidebar"
import { NavbarRoutes } from "./navbar-routes"

export const Navbar = async () => {
  const session = await getServerAuthSession()

  return (
    <div className="p-4 border-b w-full h-[54px] flex items-center bg-background shadow-sm">
      <NavbarRoutes session={session} />
    </div>
  )
}
