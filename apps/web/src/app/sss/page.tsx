import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import { prisma } from "@/src/lib/db";

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

type GroupedFAQs = Record<string, FAQ[]>;

async function getFAQs() {
  return prisma.fAQ.findMany({
    where: {
      isActive: true
    },
    orderBy: [
      { category: 'asc' },
      { order: 'asc' }
    ]
  });
}

export default async function FAQPage() {
  const faqs = await getFAQs();

  // Kategorilere göre grupla
  const groupedFAQs = faqs.reduce((acc: GroupedFAQs, faq: FAQ) => {
    const category = faq.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as GroupedFAQs);

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">
          Sıkça Sorulan Sorular
        </h1>

        <div className="max-w-3xl mx-auto space-y-8">
          {(Object.entries(groupedFAQs) as [string, FAQ[]][]).map(([category, categoryFAQs]) => (
            <div key={category}>
              <h2 className="text-2xl font-serif mb-4">{category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {categoryFAQs.map((faq: FAQ) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
