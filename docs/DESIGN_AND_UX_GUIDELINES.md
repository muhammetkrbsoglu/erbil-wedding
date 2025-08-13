# Erbil Wedding - Tasarım ve UI/UX Kılavuzu

## 1. Yönetici Özeti ve Felsefe

Bu doküman, "Erbil Wedding" markası için geliştirilecek olan premium web sitesinin görsel kimliğini, kullanıcı deneyimi (UX) stratejisini ve arayüz (UI) tasarım prensiplerini tanımlar. Temel felsefemiz; modern, minimalist ve zarif bir estetikle kullanıcıda duygusal bir bağ kurmak, markanın lüks algısını pekiştirmek ve sonuç olarak yüksek kalitede randevu talepleri oluşturmaktır. Bu kılavuz, projedeki tüm tasarım ve geliştirme kararları için temel referans kaynağıdır.

## 2. Genel Estetik ve Duygu

* **Modern & Minimalist:** Gereksiz görsel karmaşadan kaçınılacaktır. Arayüz, içeriğin nefes almasına olanak tanıyan bolca beyaz alana sahip olacaktır.
* **Zarif & Lüks:** Kullanılan her bir font, renk ve animasyon, projenin premium kimliğini desteklemelidir.
* **Sinematik & Sürükleyici:** Özellikle anasayfa ve salon detay sayfalarında kullanılacak büyük, tam ekran görseller ve videolar ile kullanıcıyı mekanın atmosferine dahil etmek hedeflenir.
* **Duygusal & İnsan Odaklı:** Tasarım, sadece mekanları değil, o mekanlarda yaşanan mutlu anları ve hikayeleri ön plana çıkararak kullanıcıyla duygusal bir bağ kurmayı amaçlar.

## 3. Görsel Kimlik (Visual Identity)

### 3.1. Renk Paleti: "Pudra ve Şampanya" (Zümrüt Vurgulu)

Bu palet, sofistike, sıcak ve davetkar bir atmosfer yaratır. İmza vurgu rengi olan zümrüt yeşili, markaya özgün ve unutulmaz bir karakter katmak için stratejik olarak kullanılacaktır.

| Rol | Renk Adı | HEX Kodu | CSS Değişkeni (Tailwind) |
| :--- | :--- | :--- | :--- |
| Arka Plan | Kırık Beyaz | `#F8F6F4` | `--background` |
| Metin | Antrasit | `#36454F` | `--foreground` |
| **İmza Vurgu** | **Zümrüt Yeşili** | **`#2E5339`** | **`--accent`** |
| Birincil Vurgu| Şampanya Altını | `#D4AF37` | `--primary` |
| Nötr | Bej | `#D3C5BC` | `--secondary` |

### 3.2. Tipografi

Tipografi, markanın zarif ve okunaklı ses tonunu yansıtmalıdır. Tüm fontlar Google Fonts üzerinden temin edilecektir.

* **Başlıklar (Headings):**
    * **Font:** `Playfair Display`
    * **Stil:** Serif (Tırnaklı), Zarif, Klasik
    * **Kullanım Alanları:** Ana sayfa başlıkları, bölüm başlıkları, önemli vurgu metinleri.
* **Gövde Metinleri (Body):**
    * **Font:** `Inter`
    * **Stil:** Sans-serif (Tırnaksız), Modern, Yüksek Okunabilirlik
    * **Kullanım Alanları:** Paragraflar, buton metinleri, form etiketleri, navigasyon linkleri.

### 3.3. İkonografi

* **Kütüphane:** `lucide-react`
* **Stil:** Minimalist, ince çizgili (outline). Tutarlılık için `stroke-width` değeri `1.5px` olarak hedeflenmelidir.

## 4. Kullanıcı Deneyimi (UX) ve Arayüz (UI) Desenleri

### 4.1. Anasayfa Mimarisi

Anasayfa, kullanıcıyı bir hikaye anlatımı akışıyla içeri çekmelidir:

1.  **Hero Bölümü:** Tam ekran, sessiz, otomatik oynatılan sinematik bir salon videosu ile anında etki yaratılacak.
2.  **Marka Hikayesi:** Videonun altında, markanın vizyonunu anlatan kısa ve samimi bir bölüm.
3.  **Salonların Önizlemesi:** Her salona yönlendiren, büyük ve profesyonel fotoğraflarla donatılmış kartlar.
4.  **Gerçek Düğün Hikayeleri:** Mutlu çiftlerden 1-2 estetik fotoğraf ve samimi bir alıntı içeren, güven ve duygusal bağ oluşturan bir bölüm.
5.  **CTA (Harekete Geçirici Mesaj) Bölümü:** Kullanıcıyı bir sonraki adıma (randevu talep etme veya salonları keşfetme) yönlendiren net bir bölüm.

### 4.2. Bileşen Tasarımı ve Etkileşimler

* **Butonlar:**
    * **Ana Buton (Primary CTA):** Dolgulu, **İmza Vurgu Rengi (`#2E5339`)** arka planına sahip olacak. Üzerine gelindiğinde (`hover`) hafifçe büyüyecek (`scale: 1.05`) ve yumuşak bir gölge belirecektir.
    * **İkincil Buton (Secondary):** Şeffaf arka planlı, **Birincil Vurgu Rengi (`#D4AF37`)** ile çerçevelenmiş olacak. Üzerine gelindiğinde arka planı bu renkle dolacaktır.
* **Animasyonlar:**
    * **Scroll Reveal:** Sayfa aşağı kaydırıldıkça, içerik blokları (seksiyonlar) aşağıdan yukarıya doğru yumuşak bir şekilde kayarak ve belirginleşerek (`fade-in & slide-up`) ekrana gelecek. Bu, akıcı ve dinamik bir deneyim sunacaktır.

### 4.3. Randevu Sistemi Akışı

Kullanıcıyı yormadan ve süreci basitleştirerek talep toplamak esastır.

1.  **Başlangıç Noktası:** Kullanıcı, ilgili salonun detay sayfasındaki "Randevu Talep Et" butonuna tıklar.
2.  **Form Yapısı:** Talep formu, iki adımlı (multi-step) bir yapıda olacaktır:
    * **Adım 1: Etkinlik Detayları:**
        * Etkinlik Türü (Düğün, Nişan, Kına vb. - Seçenekler)
        * Tahmini Davetli Sayısı
        * İstenilen Dönem/Tarih Aralığı (Örn: "Yıl: 2026", "Ay: Eylül" şeklinde iki ayrı açılır menü)
    * **Adım 2: İletişim Bilgileriniz:**
        * Ad Soyad
        * E-posta
        * Telefon Numarası
        * Ek Notlar (Opsiyonel metin alanı)
3.  **Onay:** Form gönderildikten sonra kullanıcı, talebinin başarıyla alındığını ve en kısa sürede kendisiyle iletişime geçileceğini belirten net bir onay sayfasına yönlendirilir.