import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Card, CardContent } from "~/components/ui/card";
import { User2, Calendar, Heart, Users } from "lucide-react";

const stats = [
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    count: "1000+",
    label: "Mutlu Çift",
  },
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    count: "10+",
    label: "Yıllık Deneyim",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    count: "50000+",
    label: "Misafir Ağırladık",
  },
];

const team = [
  {
    name: "Ahmet Yılmaz",
    role: "Genel Müdür",
    image: "/team/placeholder.jpg",
    description: "20 yıllık düğün organizasyonu deneyimi",
  },
  {
    name: "Ayşe Kaya",
    role: "Organizasyon Şefi",
    image: "/team/placeholder.jpg",
    description: "Türkiye'nin önde gelen otellerinde deneyim",
  },
  {
    name: "Mehmet Demir",
    role: "Operasyon Müdürü",
    image: "/team/placeholder.jpg",
    description: "Kusursuz operasyon yönetimi uzmanı",
  },
];

const testimonials = [
  {
    name: "Zeynep & Murat",
    date: "Eylül 2024",
    comment: "Hayallerimizin çok ötesinde bir düğün organize ettiler. Her detay mükemmeldi!",
    image: "/testimonials/placeholder.jpg",
  },
  {
    name: "Elif & Can",
    date: "Ağustos 2024",
    comment: "Profesyonel ekip, muhteşem mekan ve kusursuz organizasyon. Teşekkürler Erbil Wedding!",
    image: "/testimonials/placeholder.jpg",
  },
];

export default function HakkimizdaPage() {
  return (
    <SectionWrapper>
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-serif mb-4">
              Hakkımızda
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Erbil Wedding Palace: Hayallerinizin Başladığı Yer
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-16 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg">
              <CardContent className="flex flex-col items-center p-6">
                {stat.icon}
                <p className="text-3xl font-bold mt-4 mb-2">{stat.count}</p>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vision & History */}
        <div className="space-y-16 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif text-gray-800 mb-4">
              Vizyonumuz
            </h2>
            <p className="text-gray-700 leading-relaxed">
              [Buraya işletmenizin vizyonunu, düğünlere ve özel günlere bakış açınızı, misafirlerinize unutulmaz bir deneyim sunma hedeflerinizi anlatan 1-2 paragraflık etkileyici bir metin gelecek.]
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif text-gray-800 mb-4">
              Tarihçemiz
            </h2>
            <p className="text-gray-700 leading-relaxed">
              [Buraya işletmenizin ne zaman ve kimler tarafından kurulduğunu, kuruluş hikayesini, önemli dönüm noktalarını ve bugüne kadarki gelişimini anlatan bir paragraf gelecek.]
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-serif text-center mb-12">
            Profesyonel Ekibimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-serif text-xl mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-4xl font-serif text-center mb-12">
            Mutlu Çiftlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.date}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
