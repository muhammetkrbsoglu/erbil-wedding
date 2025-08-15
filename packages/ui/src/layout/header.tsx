"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
// ...existing code...

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

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2" legacyBehavior>
          <span className="font-bold font-serif">Erbil Wedding</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/#salonlar" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Salonlarımız
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/hakkimizda" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Hakkımızda
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/iletisim" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  İletişim
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link href="/salonlar/gul-bahcesi-balo-salonu/randevu-al" legacyBehavior>
            <Button>Randevu Talep Et</Button>
          </Link>
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
            <Link
              href="/#salonlar"
              className="block text-sm font-medium text-foreground hover:text-accent transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Salonlarımız
            </Link>
            <Link
              href="/hakkimizda"
              className="block text-sm font-medium text-foreground hover:text-accent transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Hakkımızda
            </Link>
            <Link
              href="/iletisim"
              className="block text-sm font-medium text-foreground hover:text-accent transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              İletişim
            </Link>
            <div className="pt-4 space-y-2">
              <Link href="/salonlar/gul-bahcesi-balo-salonu/randevu-al" legacyBehavior>
                <Button variant="default" size="default" className="w-full">
                  Randevu Talep Et
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
