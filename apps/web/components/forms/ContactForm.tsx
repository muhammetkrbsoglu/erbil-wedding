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

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  phone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz" }),
  message: z.string().min(10, { message: "Mesaj en az 10 karakter olmalıdır" }),
})

type ContactFormSchema = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormSchema) {
    try {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Başarılı!",
        description: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
      })
      form.reset()
    } catch (error) {
      console.error("Form gönderme hatası:", error)
      toast({
        title: "Hata!",
        description: "Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
        className="w-full"
        style={{ backgroundColor: "#C08552", color: "white" }}
      >
        {isSubmitting ? "Gönderiliyor..." : "Gönder"}
      </Button>
    </form>
  )
}
