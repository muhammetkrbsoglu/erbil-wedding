import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Calendar } from "~/components/ui/calendar";
import { DataTable } from "~/components/ui/data-table";
import { prisma } from "~/lib/db";
import { format } from "date-fns";

interface MonthlyStats {
  status: 'confirmed' | 'pending';
  _count: number;
}

interface PopularSalon {
  name: string;
  _count: {
    reservations: number;
  };
}

interface Reservation {
  eventDate: string;
  customerName: string;
  status: 'confirmed' | 'pending';
  salon: {
    name: string;
  };
}
import { tr } from "date-fns/locale";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";

async function getAnalytics() {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Monthly stats
  const monthlyStats = await prisma.reservation.groupBy({
    by: ['status'],
    _count: true,
    where: {
      eventDate: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    }
  });

  // Popular salons
  const popularSalons = await prisma.salon.findMany({
    select: {
      name: true,
      _count: {
        select: { reservations: true }
      }
    },
    orderBy: {
      reservations: {
        _count: 'desc'
      }
    },
    take: 5
  });

  // Upcoming reservations
  const upcomingReservations = await prisma.reservation.findMany({
    where: {
      eventDate: {
        gte: today
      }
    },
    include: {
      salon: true
    },
    orderBy: {
      eventDate: 'asc'
    },
    take: 5
  });

  // Monthly revenue trend (assuming each reservation averages 10000 TL)
  const revenueTrend = await prisma.reservation.groupBy({
    by: ['status'],
    _count: true,
    where: {
      status: 'confirmed',
      eventDate: {
        gte: new Date(today.getFullYear(), today.getMonth() - 5, 1),
        lte: endOfMonth
      }
    }
  });

  return {
    monthlyStats,
    popularSalons,
    upcomingReservations,
    revenueTrend
  };
}

export default async function AdminDashboardPage() {
  const { monthlyStats, popularSalons, upcomingReservations, revenueTrend }: {
    monthlyStats: MonthlyStats[];
    popularSalons: PopularSalon[];
    upcomingReservations: Reservation[];
    revenueTrend: any;
  } = await getAnalytics();

  const upcomingColumns = [
    {
      accessorKey: "eventDate",
      header: "Tarih",
      cell: ({ row }: { row: { original: { eventDate: string } } }) => 
        format(new Date(row.original.eventDate), 'dd MMMM yyyy', { locale: tr })
    },
    {
      accessorKey: "customerName",
      header: "Müşteri"
    },
    {
      accessorKey: "salon.name",
      header: "Salon"
    },
    {
      accessorKey: "status",
      header: "Durum",
      cell: ({ row }: { row: { original: { status: 'confirmed' | 'pending' } } }) => (
        <Badge variant={row.original.status === 'confirmed' ? 'success' : 'warning'}>
          {row.original.status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
        </Badge>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aylık Randevular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyStats.reduce((acc: number, curr: MonthlyStats) => acc + curr._count, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Onaylanan Randevular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {monthlyStats.find((s: MonthlyStats) => s.status === 'confirmed')?._count || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen Randevular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {monthlyStats.find((s: MonthlyStats) => s.status === 'pending')?._count || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Calendar */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Popüler Salonlar</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={popularSalons}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="_count.reservations" fill="#2E5339" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bu Ayki Randevular</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="multiple"
              selected={upcomingReservations.map((r: Reservation) => new Date(r.eventDate))}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Reservations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Yaklaşan Randevular</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={upcomingColumns}
            data={upcomingReservations}
          />
        </CardContent>
      </Card>
    </div>
  );
}
