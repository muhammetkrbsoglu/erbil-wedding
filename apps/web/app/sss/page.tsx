"use client"

import { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type FAQItem = {
  question: string
  answer: string
}

type FAQ = {
  id: string
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const groupByCategory = (faqs: FAQ[]) => {
  return faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
    const category = faq.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});
}

const categoryLabels: Record<string, string> = {
  general: 'Genel Sorular',
  reservation: 'Rezervasyon',
  payment: 'Ödeme',
  venue: 'Mekan'
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const response = await fetch('/api/faq')
        if (!response.ok) {
          throw new Error('FAQları yüklerken bir hata oluştu')
        }
        const data = await response.json()
        setFaqs(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    loadFAQs()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4">
              <div className="h-12 bg-gray-200 rounded mb-2"></div>
              <div className="h-20 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h1 className="text-xl font-semibold text-red-700 mb-2">Hata</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  const groupedFaqs = groupByCategory(faqs)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sık Sorulan Sorular</h1>
      {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{categoryLabels[category] || category}</h2>
          <Accordion type="single" collapsible className="mb-6">
            {categoryFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
      {Object.keys(groupedFaqs).length === 0 && (
        <p className="text-gray-500 text-center py-8">
          Henüz soru eklenmemiş.
        </p>
      )}
    </div>
  )
}
