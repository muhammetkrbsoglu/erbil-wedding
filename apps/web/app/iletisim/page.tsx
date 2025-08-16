import type { Metadata } from "next"
import { ContactForm } from "@/components/forms/ContactForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AccessibleAnimation } from "@/components/ui/accessible-animation"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Calendar,
  Shield,
  CheckCircle,
} from "lucide-react"
import { GoogleMap } from "@/components/map/GoogleMap"

export const metadata: Metadata = {
  title: "İletişim | Erbil Wedding - Lüks Düğün Mekanları",
  description:
    "Hayalinizdeki düğün için bizimle iletişime geçin. Profesyonel ekibimiz size en uygun düğün mekanını bulmanızda yardımcı olacak.",
  keywords: "iletişim, düğün mekanı, Erbil, düğün organizasyonu, rezervasyon",
}

export default function IletisimPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEFCFA" }}>
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5EBE0] to-[#FEFCFA] opacity-50" />
        <div className="relative max-w-4xl mx-auto text-center">
          <AccessibleAnimation>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6" style={{ color: "#312B27" }}>
              Bize Ulaşın
            </h1>
            <p className="text-xl md:text-2xl mb-8" style={{ color: "#8B7355" }}>
              Hayalinizdeki düğün için bugün bizimle iletişime geçin
            </p>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8B7355" }}>
              Uzman ekibimiz, size özel düğün mekanınızı bulmanızda ve unutulmaz bir gün yaşamanızda size yardımcı olmak
              için burada. Ücretsiz danışmanlık için hemen iletişime geçin.
            </p>
          </AccessibleAnimation>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Contact Form Section */}
        <section>
          <AccessibleAnimation>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="font-playfair text-3xl font-bold mb-6" style={{ color: "#312B27" }}>
                  İletişim Formu
                </h2>
                <p className="text-lg mb-8" style={{ color: "#8B7355" }}>
                  Aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz. 24 saat içinde size geri dönüş yapacağız.
                </p>
                <Card className="border-2" style={{ borderColor: "#D5B4A1", backgroundColor: "#FEFCFA" }}>
                  <CardContent className="p-6">
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <h3 className="font-playfair text-2xl font-semibold mb-4" style={{ color: "#312B27" }}>
                  Neden Erbil Wedding?
                </h3>
                <div className="space-y-4">
                  {[
                    "15+ yıllık deneyim",
                    "50+ lüks düğün mekanı",
                    "Ücretsiz danışmanlık hizmeti",
                    "7/24 müşteri desteği",
                    "Kişiye özel organizasyon",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" style={{ color: "#C88A55" }} />
                      <span style={{ color: "#8B7355" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccessibleAnimation>
        </section>

        {/* Direct Contact Information */}
        <section>
          <AccessibleAnimation>
            <h2 className="font-playfair text-3xl font-bold mb-8 text-center" style={{ color: "#312B27" }}>
              İletişim Bilgileri
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                className="text-center p-6 border-2 hover:shadow-lg transition-shadow"
                style={{ borderColor: "#D5B4A1", backgroundColor: "#FEFCFA" }}
              >
                <Phone className="w-8 h-8 mx-auto mb-4" style={{ color: "#C88A55" }} />
                <h3 className="font-semibold mb-2" style={{ color: "#312B27" }}>
                  Telefon
                </h3>
                <p style={{ color: "#8B7355" }}>+90 (312) 555 0123</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Ara
                </Button>
              </Card>

              <Card
                className="text-center p-6 border-2 hover:shadow-lg transition-shadow"
                style={{ borderColor: "#D5B4A1", backgroundColor: "#FEFCFA" }}
              >
                <Mail className="w-8 h-8 mx-auto mb-4" style={{ color: "#C88A55" }} />
                <h3 className="font-semibold mb-2" style={{ color: "#312B27" }}>
                  E-posta
                </h3>
                <p style={{ color: "#8B7355" }}>info@erbilwedding.com</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Mail Gönder
                </Button>
              </Card>

              <Card
                className="text-center p-6 border-2 hover:shadow-lg transition-shadow"
                style={{ borderColor: "#D5B4A1", backgroundColor: "#FEFCFA" }}
              >
                <MessageCircle className="w-8 h-8 mx-auto mb-4" style={{ color: "#C88A55" }} />
                <h3 className="font-semibold mb-2" style={{ color: "#312B27" }}>
                  WhatsApp
                </h3>
                <p style={{ color: "#8B7355" }}>+90 (312) 555 0123</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Mesaj Gönder
                </Button>
              </Card>

              <Card
                className="text-center p-6 border-2 hover:shadow-lg transition-shadow"
                style={{ borderColor: "#D5B4A1", backgroundColor: "#FEFCFA" }}
              >
                <MapPin className="w-8 h-8 mx-auto mb-4" style={{ color: "#C88A55" }} />
                <h3 className="font-semibold mb-2" style={{ color: "#312B27" }}>
                  Adres
                </h3>
                <p style={{ color: "#8B7355" }}>Yeşildere, 550. Sk. No:8, 55200 Atakum/Samsun</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Yol Tarifi
                </Button>
              </Card>
            </div>
          </AccessibleAnimation>
        </section>

        {/* Business Hours */}
        <section>
          <AccessibleAnimation>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-playfair text-3xl font-bold mb-6" style={{ color: "#312B27" }}>
                  Çalışma Saatleri
                </h2>
                <Card className="border-2" style={{ borderColor: "#D5B4A1", backgroundColor: "#FEFCFA" }}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        { day: "Pazartesi - Cuma", hours: "09:00 - 18:00" },
                        { day: "Cumartesi", hours: "10:00 - 16:00" },
                        { day: "Pazar", hours: "Sadece Randevu ile" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-[#D5B4A1] last:border-b-0"
                        >
                          <span className="font-medium" style={{ color: "#312B27" }}>
                            {item.day}
                          </span>
                          <span style={{ color: "#8B7355" }}>{item.hours}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: "#F5EBE0" }}>
                      <p className="text-sm" style={{ color: "#8B7355" }}>
                        <Clock className="w-4 h-4 inline mr-2" />
                        Akşam danışmanlık randevuları için önceden iletişime geçiniz.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-playfair text-2xl font-semibold mb-6" style={{ color: "#312B27" }}>
                  Hızlı İletişim
                </h3>
                <div className="space-y-4">
                  <Button className="w-full justify-start text-left h-auto p-4 bg-transparent" variant="outline">
                    <Phone className="w-5 h-5 mr-3" />
                    <div>
                      <div className="font-semibold">Hemen Ara</div>
                      <div className="text-sm opacity-70">Anında destek alın</div>
                    </div>
                  </Button>

                  <Button className="w-full justify-start text-left h-auto p-4 bg-transparent" variant="outline">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    <div>
                      <div className="font-semibold">WhatsApp</div>
                      <div className="text-sm opacity-70">Hızlı mesajlaşma</div>
                    </div>
                  </Button>

                  <Button className="w-full justify-start text-left h-auto p-4 bg-transparent" variant="outline">
                    <Calendar className="w-5 h-5 mr-3" />
                    <div>
                      <div className="font-semibold">Randevu Al</div>
                      <div className="text-sm opacity-70">Mekan ziyareti planlayın</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </AccessibleAnimation>
        </section>

        {/* Location & Map */}
        <section>
          <AccessibleAnimation>
            <h2 className="font-playfair text-3xl font-bold mb-8 text-center" style={{ color: "#312B27" }}>
              Konum
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <GoogleMap />
              </div>
              <div className="space-y-6">
                <Card className="border-2" style={{ borderColor: "#D5B4A1", backgroundColor: "#FEFCFA" }}>
                  <CardHeader>
                    <CardTitle style={{ color: "#312B27" }}>Ulaşım Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2" style={{ color: "#312B27" }}>
                        Toplu Taşıma
                      </h4>
                      <p className="text-sm" style={{ color: "#8B7355" }}>
                        Dolmuş: Atakum-Merkez hattı
                        <br />
                        Otobüs: 1, 2, 15 numaralı hatlar
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2" style={{ color: "#312B27" }}>
                        Otopark
                      </h4>
                      <p className="text-sm" style={{ color: "#8B7355" }}>
                        Ücretsiz otopark mevcuttur
                        <br />
                        Vale hizmeti sunulmaktadır
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full" style={{ backgroundColor: "#C88A55", color: "#312B27" }}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Yol Tarifi Al
                </Button>
              </div>
            </div>
          </AccessibleAnimation>
        </section>

        {/* Social Media */}
        <section>
          <AccessibleAnimation>
            <h2 className="font-playfair text-3xl font-bold mb-8 text-center" style={{ color: "#312B27" }}>
              Sosyal Medya
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Instagram, name: "Instagram", desc: "Düğün fotoğrafları ve mekanlar", followers: "25K+" },
                { icon: Facebook, name: "Facebook", desc: "Etkinlikler ve güncellemeler", followers: "15K+" },
                { icon: Youtube, name: "YouTube", desc: "Mekan tanıtım videoları", followers: "8K+" },
                { icon: Linkedin, name: "LinkedIn", desc: "Profesyonel ağ", followers: "3K+" },
              ].map((social, index) => (
                <Card
                  key={index}
                  className="text-center p-6 border-2 hover:shadow-lg transition-all hover:scale-105"
                  style={{ borderColor: "#D5B4A1", backgroundColor: "#FEFCFA" }}
                >
                  <social.icon className="w-8 h-8 mx-auto mb-4" style={{ color: "#C88A55" }} />
                  <h3 className="font-semibold mb-2" style={{ color: "#312B27" }}>
                    {social.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: "#8B7355" }}>
                    {social.desc}
                  </p>
                  <p className="text-xs font-semibold mb-3" style={{ color: "#C88A55" }}>
                    {social.followers} takipçi
                  </p>
                  <Button variant="outline" size="sm">
                    Takip Et
                  </Button>
                </Card>
              ))}
            </div>
          </AccessibleAnimation>
        </section>

        {/* Emergency Contact */}
        <section>
          <AccessibleAnimation>
            <Card className="border-2 bg-gradient-to-r from-[#F5EBE0] to-[#FEFCFA]" style={{ borderColor: "#C88A55" }}>
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: "#C88A55" }} />
                <h2 className="font-playfair text-2xl font-bold mb-4" style={{ color: "#312B27" }}>
                  Acil Durum İletişim
                </h2>
                <p className="mb-6" style={{ color: "#8B7355" }}>
                  Düğün gününüzde herhangi bir sorun yaşarsanız, 7/24 acil destek hattımızdan bize ulaşabilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Acil Durum: +90 (312) 555 0199
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Destek
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AccessibleAnimation>
        </section>

        {/* FAQ Section */}
        <section>
          <AccessibleAnimation>
            <h2 className="font-playfair text-3xl font-bold mb-8 text-center" style={{ color: "#312B27" }}>
              Sık Sorulan Sorular
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "Ne kadar önceden rezervasyon yapmalıyız?",
                  a: "Popüler tarihler için en az 6-12 ay önceden rezervasyon yapmanızı öneriyoruz.",
                },
                {
                  q: "Paket fiyatlarına neler dahil?",
                  a: "Mekan kirası, temel dekorasyon, ses sistemi ve temel aydınlatma dahildir. Detaylar için iletişime geçin.",
                },
                {
                  q: "Mekanları önceden ziyaret edebilir miyiz?",
                  a: "Elbette! Randevu alarak tüm mekanlarımızı gezebilir ve detaylı bilgi alabilirsiniz.",
                },
                {
                  q: "Ödeme koşulları nelerdir?",
                  a: "Rezervasyon için %30 kapora, kalan tutar düğün tarihinden 1 ay önce ödenir.",
                },
                {
                  q: "Catering seçenekleri var mı?",
                  a: "Evet, partner catering firmalarımız var. Ayrıca kendi catering firmanızı da getirebilirsiniz.",
                },
                {
                  q: "İptal politikanız nedir?",
                  a: "İptal koşulları rezervasyon tarihine göre değişir. Detaylı bilgi için sözleşmeyi inceleyiniz.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-2" style={{ borderColor: "#D5B4A1", backgroundColor: "#FEFCFA" }}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3" style={{ color: "#312B27" }}>
                      {faq.q}
                    </h3>
                    <p style={{ color: "#8B7355" }}>{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccessibleAnimation>
        </section>
      </div>
    </div>
  )
}
