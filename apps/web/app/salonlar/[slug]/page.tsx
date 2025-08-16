import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSalonBySlug, getSalons } from "@/lib/api"
import SalonDetailClient from "./SalonDetailClient"


export async function generateStaticParams() {
  const salons = await getSalons()
  return salons.map((salon) => ({
    slug: salon.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const salon = await getSalonBySlug(resolvedParams.slug)

  if (!salon) {
    return {
      title: "Salon Bulunamadı",
    }
  }

  return {
    title: `${salon.name} | Lüks Düğün Salonu`,
    description:
      salon.description ||
      `${salon.name} - ${salon.capacity} kişilik lüks düğün salonu. Hayalinizdeki düğün için mükemmel mekan.`,
    keywords: ["düğün salonu", salon.name, "düğün mekanı", "balo salonu"],
  }
}

export default async function SalonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const salon = await getSalonBySlug(resolvedParams.slug)
  if (!salon) {
    notFound()
  }

  return <SalonDetailClient salon={salon} />
}
