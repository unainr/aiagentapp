"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User as UserIcon,
} from "lucide-react"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { useUser, UserButton, SignOutButton, UserProfile } from "@clerk/nextjs"
import Link from "next/link"

export function NavUser() {
  const { user } = useUser()
  const { isMobile } = useSidebar()

  if (!user) return null

  return (
      <SidebarMenu>
      <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
>
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.imageUrl} alt={user.fullName!} />
            <AvatarFallback className="rounded-lg">
              {user.firstName?.[0] || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-sm">
            <span className="font-medium truncate">{user.fullName}</span>
            <span className="text-xs truncate">
              {user.primaryEmailAddress?.emailAddress}
            </span>
          </div>

          <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.imageUrl} alt={user.fullName!} />
              <AvatarFallback className="rounded-lg">
                {user.firstName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col text-sm leading-tight">
              <span className="font-medium truncate">{user.fullName}</span>
              <span className="text-xs truncate">
                {user.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild >
            <Link href={'/user-profile'}>
            <UserIcon className="mr-2 h-4 w-4" />
            Manage Account
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </DropdownMenuItem>

        
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <SignOutButton redirectUrl="/sign-in">
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
    </SidebarMenuItem>
    </SidebarMenu>
  )
}
