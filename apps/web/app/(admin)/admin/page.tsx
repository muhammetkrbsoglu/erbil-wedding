import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const { userId, sessionClaims } = await auth();
  console.log("[ADMIN] sessionClaims (full):", JSON.stringify(sessionClaims, null, 2));
  if (!userId) {
    redirect("/sign-in");
  }
  const role =
    (sessionClaims?.metadata as any)?.role ||
    (sessionClaims?.publicMetadata as any)?.role;
  console.log("[ADMIN] role:", role);
  if (role !== "admin") {
    redirect("/");
  }
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-foreground mb-2">
            Admin Paneline Hoş Geldiniz
          </h1>
          <p className="text-muted-foreground">
            Buradan salonları, randevuları ve site ayarlarını yönetebilirsiniz.
          </p>
        </div>
        
        {/* User Button */}
        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Cards Placeholder */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Salonlar</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Salon bilgilerini yönetin
          </p>
          <div className="text-2xl font-bold text-primary">3</div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Randevular</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Randevu taleplerini görüntüleyin
          </p>
          <div className="text-2xl font-bold text-primary">12</div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Bekleyen Talepler</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Onay bekleyen talepler
          </p>
          <div className="text-2xl font-bold text-orange-600">5</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Yeni Salon Ekle
          </button>
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors">
            Randevuları Görüntüle
          </button>
          <button className="bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-colors">
            Ayarlar
          </button>
          <button className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/90 transition-colors">
            Raporlar
          </button>
        </div>
      </div>
    </div>
  );
}
