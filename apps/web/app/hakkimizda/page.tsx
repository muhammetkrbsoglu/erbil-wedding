import type { Metadata } from "next"
import { AccessibleAnimation } from "@/components/ui/accessible-animation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Star,
  Users,
  Award,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  Crown,
  Gift,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Hakkımızda | Erbil Wedding - Lüks Düğün Mekanları",
  description:
    "Erbil Wedding olarak, hayalinizdeki düğünü gerçekleştirmek için buradayız. Lüks mekanlar, profesyonel hizmet ve unutulmaz anılar.",
  keywords: "hakkımızda, erbil wedding, düğün organizasyonu, lüks mekanlar, düğün planlama",
}

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ebe0] via-white to-[#f5ebe0]">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5ebe0]/90 to-[#d5b4a1]/20" />
        <div className="container mx-auto px-4 relative z-10">
          <AccessibleAnimation>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-[#c88a55] to-[#d5b4a1] rounded-full shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-[#312b27] mb-6">Hakkımızda</h1>
              <p className="text-xl lg:text-2xl text-[#312b27]/80 mb-8 leading-relaxed">
                Hayalinizdeki düğünü gerçekleştirmek için buradayız. Her detayda mükemmellik, her anıda büyü
                yaratıyoruz.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-[#c88a55]/20 text-[#312b27]">
                  <Star className="w-4 h-4 mr-2" />
                  15+ Yıl Deneyim
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-[#c88a55]/20 text-[#312b27]">
                  <Users className="w-4 h-4 mr-2" />
                  1000+ Mutlu Çift
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm bg-[#c88a55]/20 text-[#312b27]">
                  <Award className="w-4 h-4 mr-2" />
                  Ödüllü Hizmet
                </Badge>
              </div>
            </div>
          </AccessibleAnimation>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AccessibleAnimation>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#312b27] mb-6">Hikayemiz</h2>
                  <div className="space-y-6 text-[#312b27]/80 leading-relaxed">
                    <p className="text-lg">
                      2008 yılında, aşkın en güzel halini kutlamak için yola çıktık. Erbil Wedding olarak, her çiftin
                      benzersiz hikayesini en özel şekilde anlatmalarına yardımcı oluyoruz.
                    </p>
                    <p className="text-lg">
                      Yıllar içinde binlerce çiftin hayallerini gerçekleştirdik. Her düğün bizim için yeni bir
                      başlangıç, her çift bizim için yeni bir hikaye demek.
                    </p>
                    <p className="text-lg">
                      Geleneksel değerlerle modern anlayışı harmanlayarak, unutulmaz anılar yaratmaya devam ediyoruz.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#f5ebe0] to-[#d5b4a1] rounded-2xl shadow-2xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Erbil Wedding hikayesi"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 p-4 bg-white rounded-xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#c88a55]" />
                      <span className="font-semibold text-[#312b27]">15+ Yıl</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccessibleAnimation>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gradient-to-br from-[#f5ebe0]/50 to-white">
        <div className="container mx-auto px-4">
          <AccessibleAnimation>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#312b27] mb-6">
                  Misyonumuz ve Değerlerimiz
                </h2>
                <p className="text-xl text-[#312b27]/80 max-w-3xl mx-auto">
                  Her çiftin özel gününü mükemmel kılmak için tutkuyla çalışıyoruz
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Heart,
                    title: "Aşk ve Tutku",
                    description: "Her projemize aşkla yaklaşır, çiftlerin mutluluğunu önceliğimiz yaparız.",
                  },
                  {
                    icon: Star,
                    title: "Mükemmellik",
                    description: "En küçük detaydan en büyük organizasyona kadar her şeyde mükemmelliği hedefleriz.",
                  },
                  {
                    icon: Users,
                    title: "Güven",
                    description: "Çiftlerimizle kurduğumuz güven ilişkisi, başarımızın temel taşıdır.",
                  },
                  {
                    icon: Sparkles,
                    title: "Yaratıcılık",
                    description: "Her düğünü benzersiz kılmak için yaratıcı çözümler üretiriz.",
                  },
                  {
                    icon: Crown,
                    title: "Lüks Hizmet",
                    description: "Kraliyet ailesine layık hizmet anlayışıyla çalışırız.",
                  },
                  {
                    icon: Gift,
                    title: "Özel Deneyim",
                    description: "Her çift için özelleştirilmiş, unutulmaz deneyimler yaratırız.",
                  },
                ].map((value, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-gradient-to-r from-[#c88a55] to-[#d5b4a1] rounded-full group-hover:scale-110 transition-transform duration-300">
                          <value.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-playfair font-semibold text-[#312b27] mb-4">{value.title}</h3>
                      <p className="text-[#312b27]/70 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AccessibleAnimation>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AccessibleAnimation>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#312b27] mb-6">Hizmetlerimiz</h2>
                <p className="text-xl text-[#312b27]/80 max-w-3xl mx-auto">
                  A'dan Z'ye düğün organizasyonunuzun her detayını özenle planlıyoruz
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Düğün Mekanı Seçimi",
                    description: "Hayalinizdeki düğün için mükemmel mekanı bulmanızda size yardımcı oluyoruz.",
                    features: ["Lüks salon seçenekleri", "Kapasite planlaması", "Lokasyon danışmanlığı"],
                  },
                  {
                    title: "Dekorasyon ve Tasarım",
                    description: "Özel tasarım ekibimizle mekanınızı rüya gibi bir atmosfere dönüştürüyoruz.",
                    features: ["Özel tema tasarımı", "Çiçek düzenlemeleri", "Işık ve ses sistemleri"],
                  },
                  {
                    title: "Catering Hizmetleri",
                    description: "Gurme menülerden geleneksel lezzetlere kadar her damak zevkine uygun seçenekler.",
                    features: ["Özel menü tasarımı", "Profesyonel şefler", "Özel diyet seçenekleri"],
                  },
                  {
                    title: "Fotoğraf ve Video",
                    description: "Profesyonel ekibimizle özel gününüzün her anını ölümsüzleştiriyoruz.",
                    features: ["Düğün fotoğrafçılığı", "Sinematik videolar", "Drone çekimleri"],
                  },
                ].map((service, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-[#f5ebe0]/30"
                  >
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-playfair font-semibold text-[#312b27] mb-4">{service.title}</h3>
                      <p className="text-[#312b27]/70 mb-6 leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-[#c88a55] flex-shrink-0" />
                            <span className="text-[#312b27]/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AccessibleAnimation>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-[#f5ebe0] to-[#d5b4a1]/20">
        <div className="container mx-auto px-4">
          <AccessibleAnimation>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#312b27] mb-6">
                  Neden Erbil Wedding?
                </h2>
                <p className="text-xl text-[#312b27]/80 max-w-3xl mx-auto">
                  Bizi tercih eden çiftlerin mutluluğu, başarımızın en büyük göstergesi
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    number: "1000+",
                    label: "Mutlu Çift",
                    description: "Hayallerini gerçekleştirdiğimiz çiftler",
                  },
                  {
                    number: "15+",
                    label: "Yıl Deneyim",
                    description: "Sektördeki köklü tecrübemiz",
                  },
                  {
                    number: "50+",
                    label: "Lüks Mekan",
                    description: "Seçkin mekan portföyümüz",
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl lg:text-5xl font-playfair font-bold text-[#c88a55] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-xl font-semibold text-[#312b27] mb-2">{stat.label}</div>
                    <div className="text-[#312b27]/70">{stat.description}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  "Kişiselleştirilmiş hizmet anlayışı",
                  "7/24 müşteri desteği",
                  "Şeffaf fiyatlandırma",
                  "Profesyonel ekip",
                  "Zamanında teslimat garantisi",
                  "Sınırsız revizyon hakkı",
                ].map((advantage, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                    <CheckCircle className="w-6 h-6 text-[#c88a55] flex-shrink-0" />
                    <span className="text-[#312b27] font-medium">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </AccessibleAnimation>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AccessibleAnimation>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#312b27] mb-6">Ekibimiz</h2>
                <p className="text-xl text-[#312b27]/80 max-w-3xl mx-auto">
                  Alanında uzman, deneyimli ve tutkulu ekibimizle hizmetinizdeyiz
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Ayşe Demir",
                    role: "Genel Müdür & Kurucu",
                    experience: "15+ yıl deneyim",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                  {
                    name: "Mehmet Kaya",
                    role: "Kreatif Direktör",
                    experience: "12+ yıl deneyim",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                  {
                    name: "Zeynep Özkan",
                    role: "Etkinlik Koordinatörü",
                    experience: "8+ yıl deneyim",
                    image: "/placeholder.svg?height=300&width=300",
                  },
                ].map((member, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
                  >
                    <div className="aspect-square bg-gradient-to-br from-[#f5ebe0] to-[#d5b4a1] overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-playfair font-semibold text-[#312b27] mb-2">{member.name}</h3>
                      <p className="text-[#c88a55] font-medium mb-2">{member.role}</p>
                      <p className="text-[#312b27]/70 text-sm">{member.experience}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AccessibleAnimation>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-br from-[#f5ebe0]/50 to-white">
        <div className="container mx-auto px-4">
          <AccessibleAnimation>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-[#312b27] mb-6">
                  Ödüller ve Başarılar
                </h2>
                <p className="text-xl text-[#312b27]/80 max-w-3xl mx-auto">
                  Sektördeki başarılarımız ve aldığımız ödüller
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    year: "2023",
                    award: "Yılın En İyi Düğün Organizatörü",
                    organization: "Wedding Awards Turkey",
                  },
                  {
                    year: "2022",
                    award: "Müşteri Memnuniyeti Ödülü",
                    organization: "Event Industry Awards",
                  },
                  {
                    year: "2021",
                    award: "İnovasyon Ödülü",
                    organization: "Turkish Wedding Association",
                  },
                  {
                    year: "2020",
                    award: "Kalite Mükemmellik Ödülü",
                    organization: "Quality Excellence Awards",
                  },
                ].map((award, index) => (
                  <Card
                    key={index}
                    className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-gradient-to-r from-[#c88a55] to-[#d5b4a1] rounded-full">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-playfair font-bold text-[#c88a55] mb-2">{award.year}</div>
                    <h3 className="font-semibold text-[#312b27] mb-2 text-sm">{award.award}</h3>
                    <p className="text-[#312b27]/70 text-xs">{award.organization}</p>
                  </Card>
                ))}
              </div>
            </div>
          </AccessibleAnimation>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#c88a55] to-[#d5b4a1] text-white">
        <div className="container mx-auto px-4">
          <AccessibleAnimation>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6">
                Hayalinizdeki Düğünü Birlikte Planlayalım
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Uzman ekibimizle tanışın ve özel gününüzü mükemmel kılmak için ilk adımı atın. Ücretsiz konsültasyon
                için hemen iletişime geçin.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#c88a55] hover:bg-white/90 font-semibold px-8 py-4 text-lg"
                >
                  <Link href="/randevu-talep-et">
                    <Calendar className="w-5 h-5 mr-2" />
                    Randevu Talep Et
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#c88a55] font-semibold px-8 py-4 text-lg bg-transparent"
                >
                  <Link href="/iletisim">
                    <Phone className="w-5 h-5 mr-2" />
                    İletişime Geç
                  </Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <Phone className="w-8 h-8 mb-3 opacity-90" />
                  <div className="font-semibold mb-1">Telefon</div>
                  <div className="opacity-90">+90 (212) 555 0123</div>
                </div>
                <div className="flex flex-col items-center">
                  <Mail className="w-8 h-8 mb-3 opacity-90" />
                  <div className="font-semibold mb-1">E-posta</div>
                  <div className="opacity-90">info@erbilwedding.com</div>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 mb-3 opacity-90" />
                  <div className="font-semibold mb-1">Adres</div>
                  <div className="opacity-90">İstanbul, Türkiye</div>
                </div>
              </div>
            </div>
          </AccessibleAnimation>
        </div>
      </section>
    </div>
  )
}
