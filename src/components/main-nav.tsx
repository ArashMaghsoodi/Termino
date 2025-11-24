"use client";

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    { href: '/dashboard', label: 'داشبورد', active: pathname === '/dashboard' },
    { href: '/courses', label: 'دروس', active: pathname === '/courses' },
    { href: '#', label: 'راهنما', active: pathname === '/help' },
  ];

  return (
    <nav
      className={cn("hidden md:flex items-center space-x-4 lg:space-x-6 space-x-reverse", className)}
      {...props}
    >
      {routes.map((route) => (
         <Link
            key={route.href}
            href={route.href}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground"
            )}
        >
            {route.label}
        </Link>
      ))}
    </nav>
  )
}
