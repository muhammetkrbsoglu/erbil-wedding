"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

export const AuthenticatedHeader: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isSignedIn, user } = useUser();

  const navigationItems = [
    { label: "Salonlarımız", href: "/salons" },
    { label: "Hakkımızda", href: "/about" },
    { label: "İletişim", href: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-serif font-bold text-foreground">
            <span className="font-playfair">Erbil Wedding</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
          {isSignedIn && (
            <a
              href="/admin"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Admin
            </a>
          )}
        </nav>

        {/* Authentication & CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {isSignedIn ? (
            <>
              <span className="text-sm text-foreground/70">
                Welcome, {user?.firstName || 'User'}!
              </span>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" size="default">
                  Giriş Yap
                </Button>
              </SignInButton>
              <Button variant="default" size="default">
                Randevu Talep Et
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground hover:text-accent transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-sm font-medium text-foreground hover:text-accent transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {isSignedIn && (
              <a
                href="/admin"
                className="block text-sm font-medium text-foreground hover:text-accent transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </a>
            )}
            <div className="pt-4 space-y-2">
              {isSignedIn ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">
                    Welcome, {user?.firstName || 'User'}!
                  </span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button variant="outline" size="default" className="w-full">
                      Giriş Yap
                    </Button>
                  </SignInButton>
                  <Button variant="default" size="default" className="w-full">
                    Randevu Talep Et
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
