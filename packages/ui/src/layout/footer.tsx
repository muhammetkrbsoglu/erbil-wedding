"use client";

import React from "react";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/erbilwedding", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/erbilwedding", label: "Facebook" }
  ];

  const navigationLinks = [
    { label: "Salonlarımız", href: "/salons" },
    { label: "Hakkımızda", href: "/about" },
    { label: "İletişim", href: "/contact" },
    { label: "Gizlilik Politikası", href: "/privacy" }
  ];

  const contactInfo = [
    { icon: Phone, text: "+90 212 XXX XX XX", href: "tel:+902125551234" },
    { icon: Mail, text: "info@erbilwedding.com", href: "mailto:info@erbilwedding.com" },
    { icon: MapPin, text: "İstanbul, Türkiye", href: "#" }
  ];

  return (
    <footer className="bg-secondary/20 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
              <span className="font-playfair">Erbil Wedding</span>
            </h3>
            <p className="text-foreground/80 mb-6 max-w-md">
              İstanbul'un en prestijli düğün salonlarında unutulmaz anlar yaşayın. 
              Her detayı özenle planlanmış, hayalinizdeki düğünü gerçekleştirin.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Menü</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">İletişim</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    className="flex items-center space-x-3 text-foreground/80 hover:text-accent transition-colors"
                  >
                    <contact.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{contact.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            © 2025 Erbil Wedding. Tüm hakları saklıdır.
          </p>
          <p className="text-foreground/60 text-sm mt-2 md:mt-0">
            Profesyonel düğün organizasyonu hizmetleri
          </p>
        </div>
      </div>
    </footer>
  );
};
