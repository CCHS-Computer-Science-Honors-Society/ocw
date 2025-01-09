import Link from "next/link";
import { SearchDropdownComponent } from "./search";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Explore from "./explore-button";

function Navbar({ userNav }: { userNav: React.ReactNode }) {

  return (
    <nav className="border bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-1">
            <Link href="/" className="flex-shrink-0 pr-8">
              <span className="text-2xl font-bold text-primary">OCW</span>
            </Link>
            <Explore />
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/contributors" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Contributors
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <SearchDropdownComponent />
            </div>
            <div className="ml-4 flex items-center md:ml-6">{userNav}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
