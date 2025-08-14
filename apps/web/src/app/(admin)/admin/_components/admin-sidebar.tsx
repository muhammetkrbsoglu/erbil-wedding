'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin" },
  { name: "Salonlar", href: "/admin/salonlar" },
  { name: "Randevular", href: "/admin/randevular" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Erbil Wedding</h2>
      </div>
      <nav className="mt-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm transition-colors hover:bg-gray-800",
                isActive && "bg-gray-800"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
