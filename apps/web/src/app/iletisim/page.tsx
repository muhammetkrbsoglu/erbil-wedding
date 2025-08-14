import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ContactForm } from "~/components/forms/ContactForm";
import { Clock, Mail, Phone, MapPin } from "lucide-react";

const workingHours = [
  { days: "Pazartesi - Cuma", hours: "09:00 - 18:00" },
  { days: "Cumartesi", hours: "10:00 - 16:00" },
  { days: "Pazar", hours: "Kapalı" },
];

const socialLinks = [
  { name: "Instagram", url: "https://instagram.com/erbilwedding" },
  { name: "Facebook", url: "https://facebook.com/erbilwedding" },
  { name: "Youtube", url: "https://youtube.com/erbilwedding" },
];

export default function IletisimPage() {
  return (
    <SectionWrapper>
      {/* Hero Section with Background */}
      <div className="relative h-[40vh] bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-serif mb-4">
              İletişim
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Hayalinizdeki organizasyon için bize ulaşın
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Column */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-serif text-gray-800 mb-6">
                İletişim Bilgilerimiz
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <p className="text-gray-700">
                    [Buraya işletmenizin tam adresi gelecek]
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                  <p className="text-gray-700">
                    [Buraya telefon numaranız gelecek]
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  <p className="text-gray-700">
                    [Buraya e-posta adresiniz gelecek]
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-gray-800 mb-6">
                Çalışma Saatlerimiz
              </h2>
              <div className="space-y-4">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Clock className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">{schedule.days}</p>
                      <p className="text-gray-600">{schedule.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-gray-800 mb-6">
                Sosyal Medya
              </h2>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form & Map Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif text-gray-800 mb-6">
                Bize Ulaşın
              </h2>
              <ContactForm />
            </div>

            {/* Google Maps */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif text-gray-800 mb-6">
                Konumumuz
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.7611335925255!2d28.94862531572252!3d40.99268232855187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9f11c6a2c31%3A0x4c76cf3dcc8e1cc8!2sGalata%20Tower!5e0!3m2!1sen!2str!4v1628610762272!5m2!1sen!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
