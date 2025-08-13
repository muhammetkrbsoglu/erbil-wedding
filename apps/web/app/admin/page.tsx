import { auth } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You must be logged in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Welcome to the admin area!</p>
      <p className="text-sm text-gray-600">User ID: {userId}</p>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Protected Content</h2>
        <p>This page is only accessible to authenticated users.</p>
      </div>
    </div>
  );
}
