import { auth } from "@/server/auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { SignOut, SignInButton } from "./sign-out";

export async function UserMenu({ onlySignOut }: { onlySignOut?: boolean }) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return <SignInButton />;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer rounded-full">
          {user?.image && (
            <Image
              src={user.image}
              alt={user.name ?? ""}
              width={32}
              height={32}
            />
          )}
          <AvatarFallback>
            <span className="text-xs">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" sideOffset={10} align="end">
        {!onlySignOut && (
          <>
            <DropdownMenuLabel>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="truncate">{user?.name}</span>
                  <span className="truncate text-xs font-normal text-[#606060]">
                    {user?.email}
                  </span>
                </div>
                <div className="rounded-full border px-3 py-0.5 text-[11px] font-normal">
                  Beta
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href="/account">
                <DropdownMenuItem>Account</DropdownMenuItem>
              </Link>

              <Link href="/docs">
                <DropdownMenuItem>Support</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
