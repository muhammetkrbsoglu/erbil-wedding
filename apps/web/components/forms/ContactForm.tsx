"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  phone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz" }),
  message: z.string().min(10, { message: "Mesaj en az 10 karakter olmalıdır" }),
})

type ContactFormSchema = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormSchema) {
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitStatus("success")
      form.reset()
    } catch (error) {
      console.error("Form gönderme hatası:", error)
      setSubmitStatus("error")
      toast({
        title: "Hata!",
        description: "Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <motion.div
        className="flex items-center justify-center h-full text-center py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div>
          <motion.div
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          <motion.h3
            className="text-xl font-semibold text-text mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Talebiniz Başarıyla Alındı!
          </motion.h3>
          <motion.p
            className="text-neutral"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            En kısa sürede size dönüş yapacağız.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Button onClick={() => setSubmitStatus("idle")} variant="outline" className="btn-luxury">
              Yeni Mesaj Gönder
            </Button>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">İsim Soyisim</Label>
        <Input
          id="name"
          {...form.register("name")}
          placeholder="İsminizi girin"
          style={{ backgroundColor: "#F5EBE0", borderColor: "#D5B4A1" }}
        />
        {form.formState.errors.name && (
          <p className="text-sm" style={{ color: "#C08552" }}>
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-posta</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          placeholder="E-posta adresinizi girin"
          style={{ backgroundColor: "#F5EBE0", borderColor: "#D5B4A1" }}
        />
        {form.formState.errors.email && (
          <p className="text-sm" style={{ color: "#C08552" }}>
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          type="tel"
          {...form.register("phone")}
          placeholder="Telefon numaranızı girin"
          style={{ backgroundColor: "#F5EBE0", borderColor: "#D5B4A1" }}
        />
        {form.formState.errors.phone && (
          <p className="text-sm" style={{ color: "#C08552" }}>
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mesajınız</Label>
        <Textarea
          id="message"
          {...form.register("message")}
          placeholder="Mesajınızı girin"
          className="min-h-[120px]"
          style={{ backgroundColor: "#F5EBE0", borderColor: "#D5B4A1" }}
        />
        {form.formState.errors.message && (
          <p className="text-sm" style={{ color: "#C08552" }}>
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-text"
  style={{ backgroundColor: "#C08552", color: "#312B27" }}
      >
        {isSubmitting ? "Gönderiliyor..." : "Gönder"}
      </Button>
    </form>
  )
}
