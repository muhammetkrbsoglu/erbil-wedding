import Link from "next/link"
import { Phone, Mail, MapPin, Heart } from "lucide-react"

const footerLinks = {
  company: [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Salonlarımız", href: "/salonlar" },
    { name: "İletişim", href: "/iletisim" },
    { name: "SSS", href: "/sss" },
  ],
  services: [
    { name: "Düğün Organizasyonu", href: "/hizmetler/dugun" },
    { name: "Nişan Töreni", href: "/hizmetler/nisan" },
    { name: "Kına Gecesi", href: "/hizmetler/kina" },
    { name: "Doğum Günü", href: "/hizmetler/dogum-gunu" },
  ],
  legal: [
    { name: "Gizlilik Politikası", href: "/gizlilik" },
    { name: "Kullanım Şartları", href: "/kullanim-sartlari" },
    { name: "Çerez Politikası", href: "/cerez-politikasi" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-secondary/10 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-playfair font-bold text-foreground">
              Erbil Wedding
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Hayallerinizdeki düğün için en özel mekanlar. Unutulmaz anılar yaratmak için buradayız.
            </p>
            <div className="flex items-center space-x-2 text-accent">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Aşkınızı kutluyoruz</span>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Şirket</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-accent transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+905551234567" className="text-muted-foreground hover:text-accent transition-colors">
                  +90 555 123 45 67
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                <a
                  href="mailto:info@erbilwedding.com"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  info@erbilwedding.com
                </a>
              </div>
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span className="text-muted-foreground">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Erbil Wedding. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
