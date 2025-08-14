"use client"

import { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion'
import { getAdminFAQs, createFAQ, updateFAQ, deleteFAQ } from '@/src/lib/api/faq'
import { useToast } from "@/src/components/ui/use-toast"

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

export default function AdminFAQPage() {
  const { toast } = useToast()
  const [faqs, setFaqs] = useState<FAQ[]>([])

  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [category, setCategory] = useState('general')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadFAQs()
  }, [])

  const loadFAQs = async () => {
    try {
      const data = await getAdminFAQs()
      setFaqs(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "FAQları yüklerken bir hata oluştu.",
        variant: "destructive"
      })
    }
  }

  const addFAQ = async () => {
    if (newQuestion && newAnswer) {
      setLoading(true)
      try {
        const newFAQ = await createFAQ({
          question: newQuestion,
          answer: newAnswer,
          category,
          isActive: true,
          order: faqs.length
        })
        setFaqs([...faqs, newFAQ])
        setNewQuestion('')
        setNewAnswer('')
        toast({
          title: "Başarılı",
          description: "Yeni SSS başarıyla eklendi.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "SSS eklenirken bir hata oluştu.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateFAQ(id, { isActive: !currentStatus })
      setFaqs(faqs.map(faq => 
        faq.id === id ? { ...faq, isActive: !faq.isActive } : faq
      ))
      toast({
        title: "Başarılı",
        description: "SSS durumu güncellendi.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "SSS güncellenirken bir hata oluştu.",
        variant: "destructive"
      })
    }
  }

  const deleteFAQItem = async (id: string) => {
    try {
      await deleteFAQ(id)
      setFaqs(faqs.filter(faq => faq.id !== id))
      toast({
        title: "Başarılı",
        description: "SSS başarıyla silindi.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "SSS silinirken bir hata oluştu.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">SSS Yönetimi</h1>
      
      {/* Add new FAQ form */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Yeni Soru Ekle</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Kategori:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="general">Genel</option>
              <option value="reservation">Rezervasyon</option>
              <option value="payment">Ödeme</option>
              <option value="venue">Mekan</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Soru:</label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Soruyu girin..."
            />
          </div>
          <div>
            <label className="block mb-2">Cevap:</label>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Cevabı girin..."
            />
          </div>
          <button
            onClick={addFAQ}
            disabled={loading}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Ekleniyor...' : 'Soru Ekle'}
          </button>
        </div>
      </div>

      {/* FAQ list */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Mevcut Sorular</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">[{faq.category}]</span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(faq.id, faq.isActive)}
                    className={`px-3 py-1 rounded ${
                      faq.isActive 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}
                  >
                    {faq.isActive ? 'Aktif' : 'Pasif'}
                  </button>
                  <button
                    onClick={() => deleteFAQItem(faq.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Sil
                  </button>
                </div>
              </div>
              <AccordionContent>
                <p className="mt-2">{faq.answer}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Son güncelleme: {new Date(faq.updatedAt).toLocaleDateString('tr-TR')}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
