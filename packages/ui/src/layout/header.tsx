"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

// We'll need to import these from the web app since they have the shadcn/ui components
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

// Temporary button component - will be replaced with proper shadcn/ui imports
const Button: React.FC<ButtonProps> = ({ 
  variant = "default", 
  size = "default", 
  className = "", 
  children, 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 hover:shadow-lg",
    outline: "border border-primary bg-background hover:bg-primary hover:text-primary-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

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
          <h1 className="text-2xl font-serif font-bold text-foreground">
            <span className="font-playfair">Erbil Wedding</span>
          </h1>
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
        </nav>

        {/* Authentication & CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="default">
                Giriş Yap
              </Button>
            </SignInButton>
            <Button variant="default" size="default">
              Randevu Talep Et
            </Button>
          </SignedOut>
          <SignedIn>
            <a 
              href="/admin"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Admin Panel
            </a>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="default"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
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
            <SignedIn>
              <a
                href="/admin"
                className="block text-sm font-medium text-foreground hover:text-accent transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Admin Panel
              </a>
            </SignedIn>
            <div className="pt-4 space-y-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" size="default" className="w-full">
                    Giriş Yap
                  </Button>
                </SignInButton>
                <Button variant="default" size="default" className="w-full">
                  Randevu Talep Et
                </Button>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
