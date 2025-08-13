
Meri Design House: Next.js & Front-End Mimarisi Geliştirme Kılavuzu

Bu belge, "Meri Design House" projesinin front-end geliştirme süreçleri için birincil referans kaynağıdır. Amaç, projenin performanslı, ölçeklenebilir, bakımı kolay ve en son Next.js pratiklerine uygun olarak geliştirilmesini sağlamaktır.

1. Temel Felsefe: Sunucu Varsayılan, İstemci İstisnadır

Next.js App Router'daki temel felsefe basittir: Varsayılan olarak Sunucu Bileşenleri (Server Components) kullanın. Bir bileşeni İstemci Bileşeni (Client Component) yapmak için bilinçli bir karar vermeniz gerekir.

Neden Sunucu Bileşenleri Varsayılandır?

Sunucu Bileşenleri, sunucuda çalışır ve istemciye (tarayıcıya) herhangi bir JavaScript göndermez. 1 Bu, projenin performans hedefleri için hayati önem taşır:
Daha Az JavaScript, Daha Hızlı Yükleme: Tarayıcıya gönderilen JavaScript paket boyutunu (bundle size) önemli ölçüde azaltır. Bu, sitenin interaktif hale gelme süresini (TTI) düşürür ve Google PageSpeed skorlarını iyileştirir. 1
Doğrudan Veri Erişimi: Veritabanı veya API'lere doğrudan ve güvenli bir şekilde erişebilirler. fetch veya Prisma istemcisi gibi araçlar async/await ile doğrudan bileşen içinde kullanılabilir.
Güvenlik: API anahtarları gibi hassas bilgiler istemciye asla sızdırılmaz, çünkü kod sunucuda kalır. 1

Ne Zaman "use client" Kullanılmalı?

Bir bileşeni yalnızca aşağıdaki durumlarda İstemci Bileşeni olarak işaretleyin: 1
İnteraktiflik ve Event Listener'lar: onClick(), onChange() gibi kullanıcı etkileşimleri gerekiyorsa.
State ve Lifecycle Hook'ları: useState(), useEffect(), useReducer() gibi React hook'larına ihtiyaç duyuluyorsa.
Tarayıcıya Özel API'ler: localStorage, window veya geolocation gibi tarayıcı API'leri kullanılıyorsa.
İstemci Taraflı Kütüphaneler: Yalnızca istemcide çalışan kütüphaneler (örneğin, birçoğu useState kullanan state management kütüphaneleri) kullanılıyorsa.
En Önemli Kural: İstemci bileşenlerini mümkün olduğunca küçük tutun ve bileşen ağacının yapraklarında (en alt seviyelerinde) konumlandırın. Bir sunucu bileşenini, bir istemci bileşenine children prop'u olarak geçirebilirsiniz. Bu, istemci JavaScript sınırını ağacın daha aşağılarına iterek performansı korur.

TypeScript


// app/dashboard/page.tsx (Sunucu Bileşeni)
import { InteractiveCard } from './_components/interactive-card';
import { ServerInfo } from './_components/server-info';

export default async function DashboardPage() {
  // Veri burada, sunucuda çekilir.
  const data = await getSomeData();

  return (
    <div>
      <h1>Dashboard</h1>
      {/* InteractiveCard bir istemci bileşenidir, ancak içine bir sunucu bileşeni alabilir. */}
      <InteractiveCard>
        {/* ServerInfo, sunucuda render edilir ve JS'i istemciye gönderilmez. */}
        <ServerInfo data={data} />
      </InteractiveCard>
    </div>
  );
}

// app/dashboard/_components/interactive-card.tsx (İstemci Bileşeni)
'use client';

import { useState } from 'react';

export function InteractiveCard({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      {/* Bu children, sunucudan gelen ServerInfo bileşenidir. */}
      {children}
      <button onClick={() => setCount(count + 1)}>
        Beğen ({count})
      </button>
    </div>
  );
}



2. Dizin Yapısı

Proje organizasyonu için aşağıdaki yapı önerilmektedir. Bu yapı, src dizini kullanımını benimser ve sorumlulukları net bir şekilde ayırır. 2



src/
├── app/
│   ├── (main)/                      # Ana uygulama rotaları (kimlik doğrulaması gerektiren)
│   │   ├── dashboard/
│   │   │   ├── _components/         # Sadece dashboard'a özel bileşenler
│   │   │   ├── layout.tsx           # Dashboard için özel layout
│   │   │   └── page.tsx
│   │   └── products/
│   │       ├── [slug]/
│   │       │   └── page.tsx
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── (auth)/                      # Kimlik doğrulama rotaları (giriş, kayıt)
│   │   ├── sign-in/[[...sign-in]]/
│   │   │   └── page.tsx
│   │   └── sign-up/[[...sign-up]]/
│   │       └── page.tsx
│   ├── @modal/(.)sign-in/[[...sign-in]]/ # Giriş için Intercepted Route (Modal)
│   │   └── page.tsx
│   ├── api/                         # API Rota İşleyicileri (Route Handlers)
│   │   └──...
│   ├── layout.tsx                   # Kök Layout
│   ├── page.tsx                     # Ana Sayfa
│   ├── global.css
│   ├── loading.tsx                  # Global yüklenme arayüzü
│   └── error.tsx                    # Global hata arayüzü
├── components/
│   ├── ui/                          # Genel, yeniden kullanılabilir UI bileşenleri (Button, Card, Input)
│   └── features/                    # Belirli bir özelliğe bağlı bileşenler (ProductCard, OrderForm)
├── lib/
│   ├── actions.ts                   # Sunucu Eylemleri (Server Actions)
│   ├── prisma.ts                    # Prisma istemcisi örneği
│   └── utils.ts                     # Genel yardımcı fonksiyonlar
├── store/
│   └── use-product-customizer.ts    # Zustand store'ları
├── styles/
│   └──...
└── middleware.ts                    # Clerk kimlik doğrulama middleware'i


Route Groups (group): Parantez içindeki klasörler URL yolunu etkilemez. Rotaları organize etmek (örneğin, (main) ve (auth)), farklı bölümler için farklı layout'lar uygulamak için kullanılır. 3
Paralel Rotalar @modal: Aynı layout içinde birden fazla bağımsız sayfayı render etmek için kullanılır. Modal pencereler gibi UI desenleri için idealdir.
_components: Alt çizgi ile başlayan klasörler rota segmenti oluşturmaz. Bir rota segmentine özel, ancak o segmentin page.tsx veya layout.tsx dosyası dışındaki bileşenleri barındırmak için kullanılır (colocation).

3. Veri Çekme Desenleri


Sunucu Bileşenlerinde Veri Çekme

Veri, async/await kullanılarak doğrudan Sunucu Bileşenleri içinde çekilmelidir. Bu, en basit ve en performanslı yöntemdir. 4

TypeScript


// src/app/(main)/products/page.tsx
import { prisma } from '@/lib/prisma';
import { ProductList } from '@/components/features/ProductList';

// Bu bileşen bir Sunucu Bileşenidir.
export default async function ProductsPage() {
  // Veri doğrudan sunucuda, render edilmeden önce çekilir.
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1>Ürünlerimiz</h1>
      <ProductList products={products} />
    </div>
  );
}


Next.js, bu async bileşeni otomatik olarak bir React <Suspense> sınırı içine sarar. Eğer aynı dizin seviyesinde bir loading.tsx dosyası varsa, veri yüklenirken bu dosya otomatik olarak gösterilir. 3

İstemci Bileşenlerinde Veri Çekme

Kural: İstemci Bileşenleri doğrudan veri çekmemelidir. Veri, en yakın üst Sunucu Bileşeninde çekilmeli ve prop olarak aşağıya aktarılmalıdır.
Anti-Desen: useEffect içinde veri çekmekten kaçının. Bu, aşağıdaki sorunlara yol açar:
Performans Düşüşü: Sayfa önce verisiz render edilir, sonra istemci tarafında bir istek daha yapılır. Bu, kullanıcıların içeriği görmesini geciktirir ve Kümülatif Düzen Kayması (CLS) ile En Büyük İçerikli Boyama (LCP) gibi Core Web Vitals metriklerini olumsuz etkiler.
Gereksiz Karmaşıklık: Yükleme ve hata durumlarını istemci tarafında manuel olarak yönetmeniz gerekir.
Doğru Desen:

TypeScript


// Üst Sunucu Bileşeni (örneğin, app/dashboard/page.tsx)
import { UserProfileClient } from './_components/UserProfileClient';
import { getUserData } from '@/lib/user-actions';

export default async function DashboardPage() {
  const userData = await getUserData(); // Veri sunucuda çekilir

  return (
    <div>
      {/* Veri, istemci bileşenine prop olarak aktarılır */}
      <UserProfileClient user={userData} />
    </div>
  );
}

// app/dashboard/_components/UserProfileClient.tsx
'use client';

import { useState } from 'react';

// Veri prop olarak alınır, useEffect ile çekilmez.
export function UserProfileClient({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <h2>Hoş Geldin, {user.name}</h2>
      {/*... interaktif UI... */}
    </div>
  );
}



4. Durum Yönetimi (State Management)


URL ile Durum Yönetimi

Filtreleme, sıralama ve sayfalama gibi durumlar için birincil kaynak her zaman URL olmalıdır. Bu, durumun paylaşılabilir, yer imlerine eklenebilir ve tarayıcı geçmişiyle uyumlu olmasını sağlar. 5
Aşağıda, URL sorgu parametrelerini yönetmek için yeniden kullanılabilir bir hook bulunmaktadır:

TypeScript


// src/lib/hooks/useQueryString.ts
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (paramsToUpdate: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(paramsToUpdate)) {
        if (value === undefined |

| value === null |
| String(value).length === 0) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }
      return params.toString();
    },
    [searchParams]
  );

  const setQueryString = (paramsToUpdate: Record<string, string | number | undefined>) => {
    const queryString = createQueryString(paramsToUpdate);
    router.push(`${pathname}?${queryString}`);
  };

  return { setQueryString, searchParams };
};



Zustand ile İstemci Durumu Yönetimi

"Ürün kişiselleştirme formu" gibi karmaşık, yalnızca istemci tarafında var olan ve URL'de saklanması mantıklı olmayan durumlar için Zustand kullanılacaktır. 6

TypeScript


// src/store/use-product-customizer-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomizerState {
  text: string;
  color: string;
  uploadedImage: File | null;
  setText: (text: string) => void;
  setColor: (color: string) => void;
  setUploadedImage: (image: File | null) => void;
  reset: () => void;
}

export const useProductCustomizerStore = create<CustomizerState>()(
  // İsteğe bağlı: Durumu localStorage'da saklamak için persist middleware'i kullanılabilir.
  persist(
    (set) => ({
      text: '',
      color: '#FFFFFF',
      uploadedImage: null,
      setText: (text) => set({ text }),
      setColor: (color) => set({ color }),
      setUploadedImage: (image) => set({ uploadedImage: image }),
      reset: () => set({ text: '', color: '#FFFFFF', uploadedImage: null }),
    }),
    {
      name: 'product-customizer-storage', // localStorage'daki anahtar
    }
  )
);


Kullanım Örneği:

TypeScript


// src/components/features/ProductCustomizer.tsx
'use client';

import { useProductCustomizerStore } from '@/store/use-product-customizer-store';

export function ProductCustomizer() {
  const { text, setText, color, setColor } = useProductCustomizerStore();

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Metin Girin"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
}



5. Form Yönetimi: react-hook-form, zod ve Sunucu Eylemleri

Formlar, react-hook-form ile istemci tarafı yönetimi, zod ile şema doğrulama ve Server Actions ile güvenli sunucu tarafı işleme kombinasyonu kullanılarak oluşturulacaktır. 7
Adım 1: Zod Şeması Oluşturma

TypeScript


// src/lib/schemas/contact-schema.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçersiz e-posta adresi." }),
  message: z.string().min(10, { message: "Mesaj en az 10 karakter olmalıdır." }),
});

export type ContactFormSchema = z.infer<typeof contactSchema>;


Adım 2: Sunucu Eylemi (Server Action) Oluşturma

TypeScript


// src/lib/actions.ts
'use server';

import { z } from 'zod';
import { contactSchema } from './schemas/contact-schema';
import { revalidatePath } from 'next/cache';

type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string;
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: "Form verileri geçersiz.",
      issues,
    };
  }

  try {
    // Burada veritabanına kaydetme veya e-posta gönderme işlemi yapılır.
    console.log('Form verisi:', validatedFields.data);
    
    // Başarılı olursa yolu yeniden doğrula (isteğe bağlı)
    revalidatePath('/');

    return { message: "Mesajınız başarıyla gönderildi!" };
  } catch (e) {
    return { message: "Bir hata oluştu, lütfen tekrar deneyin." };
  }
}


Adım 3: Form Bileşeni Oluşturma

TypeScript


// src/components/features/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { contactSchema, type ContactFormSchema } from '@/lib/schemas/contact-schema';
import { submitContactForm } from '@/lib/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending? 'Gönderiliyor...' : 'Gönder'}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, {
    message: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">İsim</label>
        <input id="name" {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">E-posta</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="message">Mesaj</label>
        <textarea id="message" {...register('message')} />
        {errors.message && <p style={{ color: 'red' }}>{errors.message.message}</p>}
      </div>
      
      <SubmitButton />

      {state.message && <p>{state.message}</p>}
      {state.issues && (
        <ul>
          {state.issues.map((issue) => (
            <li key={issue} style={{ color: 'red' }}>{issue}</li>
          ))}
        </ul>
      )}
    </form>
  );
}



6. Kimlik Doğrulama: Clerk

Projede kimlik doğrulama işlemleri için Clerk kullanılacaktır.

middleware.ts ile Rotaları Koruma

middleware.ts dosyası, uygulamanın kök dizininde (veya src içinde) yer alır ve gelen istekleri kontrol eder. createRouteMatcher ile hangi rotaların korunacağını belirleriz. 10

TypeScript


// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Korunacak rotaları tanımla
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', // /dashboard ve altındaki tüm rotalar
  '/siparislerim(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Eğer rota korunacak bir rota ise, kimlik doğrulamasını zorunlu kıl
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Next.js'in iç dosyalarını ve statik dosyaları atla
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico)).*)',
    // API rotalarını dahil et
    '/(api|trpc)(.*)',
  ],
};



Sunucu ve İstemci Bileşenlerinde Clerk Kullanımı

Sunucu Bileşeninde Kullanıcı Bilgisi Alma:
auth() yardımcısı, Sunucu Bileşenleri içinde mevcut kullanıcının kimlik bilgilerini almak için kullanılır. 11

TypeScript


// src/app/(main)/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    // Bu durum middleware tarafından zaten ele alınır, ancak ek bir güvenlik katmanıdır.
    return <div>Erişim yetkiniz yok.</div>;
  }

  // userId kullanılarak kullanıcıya özel veriler çekilebilir.
  const userOrders = await db.orders.findMany({ where: { userId } });

  return (
    <div>
      <h1>Hoş Geldin, Kullanıcı {userId}</h1>
      {/*... */}
    </div>
  );
}


İstemci Bileşeninde <UserButton /> ve Diğerleri:
Header gibi istemci tarafı bileşenlerde, kullanıcının oturum durumuna göre farklı UI'lar göstermek için Clerk'in hazır bileşenleri kullanılır. 13

TypeScript


// src/components/layout/Header.tsx
'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
      <Link href="/">
        Meri Design House
      </Link>
      <nav>
        {/* Kullanıcı giriş yapmışsa gösterilir */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        {/* Kullanıcı giriş yapmamışsa gösterilir */}
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </nav>
    </header>
  );
}



7. Performans ve Optimizasyon

next/image: Bu bileşen, resimleri otomatik olarak optimize eder, modern formatlara (WebP gibi) dönüştürür, doğru boyutlandırır ve "lazy loading" uygular. Bu, LCP skorunu iyileştirmek için zorunludur. 15
TypeScript
import Image from 'next/image';

<Image
  src="/images/product.jpg"
  alt="Ürün Fotoğrafı"
  width={500}
  height={500}
  priority // Sayfanın üst kısmındaki resimler için
/>


next/font: Google Fonts gibi harici fontları kullanırken, bu modül fontları derleme zamanında indirir ve projenizle birlikte sunar. Bu, harici ağ isteklerini ortadan kaldırır ve fontların neden olduğu düzen kaymalarını (CLS) önler. 15
TypeScript
// src/app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}


next/dynamic: Yalnızca istemci tarafında ihtiyaç duyulan ve büyük JavaScript paket boyutuna sahip bileşenleri (örneğin, karmaşık bir grafik kütüphanesi veya zengin metin editörü) dinamik olarak yüklemek için kullanılır. Bu, ilk sayfa yükleme performansını artırır.
TypeScript
import dynamic from 'next/dynamic';

// Bu bileşen, yalnızca kullanıcı butona tıkladığında yüklenecek.
const HeavyChartComponent = dynamic(() => import('@/components/features/HeavyChart'), {
  ssr: false, // Sunucu tarafında render edilmesin
  loading: () => <p>Grafik Yükleniyor...</p>
});

function MyPage() {
  const = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Grafiği Göster</button>
      {showChart && <HeavyChartComponent />}
    </div>
  );
}


Alıntılanan çalışmalar
Modern Full Stack Application Architecture Using Next.js 15+ - SoftwareMill, erişim tarihi Ağustos 8, 2025, https://softwaremill.com/modern-full-stack-application-architecture-using-next-js-15/
The Ultimate Guide to Organizing Your Next.js 15 Project Structure ..., erişim tarihi Ağustos 8, 2025, https://www.wisp.blog/blog/the-ultimate-guide-to-organizing-your-nextjs-15-project-structure
Getting Started: Project Structure | Next.js, erişim tarihi Ağustos 8, 2025, https://nextjs.org/docs/app/getting-started/project-structure
Mastering State in Next.js App Router with URL Query Parameters: A Practical Guide, erişim tarihi Ağustos 8, 2025, https://medium.com/@roman_j/mastering-state-in-next-js-app-router-with-url-query-parameters-a-practical-guide-03939921d09c
App Router: Adding Search and Pagination - Next.js, erişim tarihi Ağustos 8, 2025, https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
Mastering State Management with Zustand in Next.js and React ..., erişim tarihi Ağustos 8, 2025, https://dev.to/mrsupercraft/mastering-state-management-with-zustand-in-nextjs-and-react-1g26
Handling Forms in Next.js with React Hook Form, Zod, and Server ..., erişim tarihi Ağustos 8, 2025, https://medium.com/@techwithtwin/handling-forms-in-next-js-with-react-hook-form-zod-and-server-actions-e148d4dc6dc1
How to create forms with Server Actions - Next.js, erişim tarihi Ağustos 8, 2025, https://nextjs.org/docs/app/guides/forms
How to Use React Hook Form + Zod with Next.js Server Actions | by Monique McIntyre, erişim tarihi Ağustos 8, 2025, https://medium.com/@ctrlaltmonique/how-to-use-react-hook-form-zod-with-next-js-server-actions-437aaca3d72d
Next.js: clerkMiddleware() | Next.js, erişim tarihi Ağustos 8, 2025, https://clerk.com/docs/references/nextjs/clerk-middleware
Next.js: auth() - Clerk, erişim tarihi Ağustos 8, 2025, https://clerk.com/docs/references/nextjs/auth
Next.js — Day 5— Authentication using Clerk | by ksshravan - Medium, erişim tarihi Ağustos 8, 2025, https://medium.com/@ksshravan667/next-js-day-4-authentication-using-clerk-75bf88b3c2ea
Add Effortless Authentication to React/Next.js with Clerk | by Juvita Saini - Medium, erişim tarihi Ağustos 8, 2025, https://medium.com/@juvitasaini/add-effortless-authentication-to-react-next-js-with-clerk-68a676fdda73


Next.js on Vercel, erişim tarihi Ağustos 8, 2025, https://vercel.com/docs/frameworks/full-stack/nextjs
Comprehensive Next.js Full Stack App Architecture Guide | Arno, erişim tarihi Ağustos 8, 2025, https://arno.surfacew.com/posts/nextjs-architecture
