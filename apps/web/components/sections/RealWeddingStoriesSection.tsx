import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export const RealWeddingStoriesSection = () => {
  const testimonials = [
    {
      quote: "Hayalimizden de güzel bir düğün geçirdik. Erbil Wedding ekibi her detayı mükemmel şekilde organize etti.",
      author: "Ayşe & Mehmet",
      imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=512&auto=format&fit=crop",
    },
    {
      quote:
        "Profesyonel yaklaşımları ve samimi ilgileri sayesinde stressiz bir düğün süreci yaşadık. Herkese tavsiye ederiz.",
      author: "Zeynep & Can",
      imageUrl: "https://images.unsplash.com/photo-1520975922329-1916a3b3f023?q=80&w=512&auto=format&fit=crop",
    },
    {
      quote:
        "Bahçe terasında gerçekleştirdiğimiz düğünümüz tam istediğimiz gibiydi. Romantik ve unutulmaz bir gece oldu.",
      author: "Elif & Emre",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=512&auto=format&fit=crop",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center mb-16">
          Bizimle Mutluluğa Adım Atan Çiftlerimiz
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="border border-border rounded-lg p-8 flex flex-col items-center text-center">
              <CardContent>
                <Image
                  src={t.imageUrl || "/placeholder.svg"}
                  alt={`${t.author} - mutlu çift`}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover border-2 border-accent"
                />
                <p className="mt-6 italic text-foreground/80 font-inter leading-relaxed">“{t.quote}”</p>
                <footer className="mt-6 font-serif font-bold text-foreground">{t.author}</footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
