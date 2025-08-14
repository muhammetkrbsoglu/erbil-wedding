import { SignIn } from '@clerk/nextjs';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Admin Paneli Girişi</h1>
      <SignIn path="/admin-giris" />
    </div>
  );
}
