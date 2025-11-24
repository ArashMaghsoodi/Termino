'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CalendarDays, Menu } from 'lucide-react';
import { MainNav } from '../main-nav';
import { ThemeToggleButton } from '../theme-toggle-button';
import { UserNav } from '../user-nav';
import React from 'react';

export default function Header() {
  // A simple state to simulate authentication.
  // In a real app, you'd use a proper auth context.
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">باز کردن منو</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <CalendarDays className="h-6 w-6" />
                  <span className="font-headline">ترمینـو</span>
                </Link>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  داشبورد
                </Link>
                <Link href="/courses" className="text-muted-foreground hover:text-foreground">
                  دروس
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  راهنما
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="hidden items-center md:flex me-6">
          <CalendarDays className="h-6 w-6" />
          <span className="ms-2 font-bold font-headline">ترمینـو</span>
        </Link>
        
        <MainNav />

        <div className="flex flex-1 items-center justify-end space-x-2 space-x-reverse">
          <ThemeToggleButton />
          {isLoggedIn ? (
            <UserNav />
          ) : (
            <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">ورود</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">ثبت نام</Link>
                </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
