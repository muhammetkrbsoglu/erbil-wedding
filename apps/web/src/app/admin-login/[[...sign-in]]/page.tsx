import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="text-3xl font-serif mb-8">Admin Paneli Girişi</h1>
      <SignIn path="/admin-login" />
    </div>
  );
}
