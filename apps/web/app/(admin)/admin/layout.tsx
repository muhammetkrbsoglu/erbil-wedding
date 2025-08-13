import React from 'react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              href="/admin/bookings"
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
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
