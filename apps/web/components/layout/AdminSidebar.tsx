import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <UserButton afterSignOutUrl="/" />
      </div>
      
      <nav className="space-y-4">
        <Link 
          href="/admin" 
          className="block hover:bg-gray-700 px-4 py-2 rounded"
        >
          Dashboard
        </Link>
        <Link 
          href="/admin/salons" 
          className="block hover:bg-gray-700 px-4 py-2 rounded"
        >
          Salonlar
        </Link>
        <Link 
          href="/admin/bookings" 
          className="block hover:bg-gray-700 px-4 py-2 rounded"
        >
          Randevular
        </Link>
      </nav>
    </div>
  );
}
