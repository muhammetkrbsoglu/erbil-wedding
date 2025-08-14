
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { sessionClaims } = await auth();

  // If the user does not have the admin role, redirect them to the homepage
  const metadata = sessionClaims?.metadata as Record<string, any> | undefined;
  const publicMetadata = sessionClaims?.publicMetadata as Record<string, any> | undefined;
  const role = metadata?.role || publicMetadata?.role;
  if (role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-muted/40 border-r">
        <div className="p-6">
          <h2 className="text-lg font-semibold font-playfair text-foreground mb-6">
            Admin Panel
          </h2>
          <nav className="space-y-2">
            <a
              href="/admin"
              className="flex items-center px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/admin/salonlar"
              className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              Salonlar
            </a>
            <a
              href="/admin/randevular"
              className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              Randevular
            </a>
            <a
              href="/admin/settings"
              className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              Ayarlar
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
