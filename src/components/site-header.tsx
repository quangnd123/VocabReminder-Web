"use client"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const currentPath = usePathname();
  const pathAfterDashboard = currentPath.split('/dashboard/')[1];
  const page = pathAfterDashboard ? (pathAfterDashboard.charAt(0).toUpperCase() + pathAfterDashboard.slice(1)) : "Dashboard" 

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{page}</h1>
      </div>
    </header>
  )
}
