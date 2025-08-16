"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type BookingFormData, EVENT_TYPES, DURATION_OPTIONS } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Users, CheckCircle, AlertCircle } from "lucide-react"
import { formField, staggerContainer, staggerItem } from "@/lib/animations"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { tr } from "date-fns/locale"

interface BookingFormProps {
  venueId: string | null
  onSubmit: (data: BookingFormData) => void
  isLoading?: boolean
}

type FormStep = "contact" | "event" | "details" | "review"

export function BookingForm({ venueId, onSubmit, isLoading }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>("contact")
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventDate: "",
    guestCount: 50,
    eventType: "",
    duration: "",
    specialRequirements: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string | undefined>>>({})
  const [touchedFields, setTouchedFields] = useState<Set<keyof BookingFormData>>(new Set())
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const steps: Array<{ key: FormStep; title: string; description: string }> = [
    { key: "contact", title: "İletişim", description: "Kişisel bilgileriniz" },
    { key: "event", title: "Etkinlik", description: "Etkinlik detayları" },
    { key: "details", title: "Detaylar", description: "Özel istekler" },
    { key: "review", title: "Özet", description: "Bilgileri kontrol edin" },
  ]

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const validateField = (field: keyof BookingFormData, value: string | number): string | undefined => {
    switch (field) {
      case "firstName":
        return !String(value).trim() ? "Ad gerekli" : undefined
      case "lastName":
        return !String(value).trim() ? "Soyad gerekli" : undefined
      case "email":
        if (!String(value).trim()) return "E-posta gerekli"
        if (!/\S+@\S+\.\S+/.test(String(value))) return "Geçerli e-posta adresi girin"
        return undefined
      case "phone":
        return !String(value).trim() ? "Telefon gerekli" : undefined
      case "eventDate":
        return !String(value) ? "Etkinlik tarihi gerekli" : undefined
      case "eventType":
        return !String(value) ? "Etkinlik türü seçin" : undefined
      case "duration":
        return !String(value) ? "Süre seçin" : undefined
      case "guestCount":
        return Number(value) < 1 ? "Geçerli misafir sayısı girin" : undefined
      default:
        return undefined
    }
  }

  const validateCurrentStep = (): boolean => {
    const fieldsToValidate: Array<keyof BookingFormData> = []

    switch (currentStep) {
      case "contact":
        fieldsToValidate.push("firstName", "lastName", "email", "phone")
        break
      case "event":
        fieldsToValidate.push("eventDate", "guestCount", "eventType", "duration")
        break
      case "details":
        // No required fields in details step
        break
      case "review":
        // All fields should already be validated
        break
    }

    const newErrors: Partial<Record<keyof BookingFormData, string | undefined>> = {}
    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!venueId) return

    if (currentStep !== "review") {
      if (validateCurrentStep()) {
        const nextStepIndex = Math.min(currentStepIndex + 1, steps.length - 1)
        const nextStep = steps[nextStepIndex]
        if (nextStep) setCurrentStep(nextStep.key)
      }
      return
    }

    setIsSubmitted(true)
    try {
      await onSubmit(formData)
      setSubmitStatus("success")
    } catch (error) {
      setSubmitStatus("error")
    }
  }

  const updateField = (field: keyof BookingFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTouchedFields((prev) => new Set(prev).add(field))

    // Real-time validation
    const error = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const goToStep = (step: FormStep) => {
    const stepIndex = steps.findIndex((s) => s.key === step)
    if (stepIndex <= currentStepIndex) {
      setCurrentStep(step)
    }
  }

  const goToPreviousStep = () => {
    const prevStepIndex = Math.max(currentStepIndex - 1, 0)
    const prevStep = steps[prevStepIndex]
    if (prevStep) setCurrentStep(prevStep.key)
  }

  if (!venueId) {
    return (
      <motion.div
        className="flex items-center justify-center h-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <motion.div
            className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CalendarIcon className="w-8 h-8 text-accent" />
          </motion.div>
          <motion.h3
            className="text-lg font-semibold text-text mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Salon Seçin
          </motion.h3>
          <motion.p
            className="text-neutral text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Randevu formu için önce bir salon seçmeniz gerekiyor
          </motion.p>
        </div>
      </motion.div>
    )
  }

  if (submitStatus === "success") {
    return (
      <motion.div
        className="flex items-center justify-center h-full text-center"
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
            Randevu Talebiniz Alındı!
          </motion.h3>
          <motion.p
            className="text-neutral"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            En kısa sürede size dönüş yapacağız.
          </motion.p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Progress Indicator */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <motion.button
              key={step.key}
              className={`flex-1 text-left ${index < steps.length - 1 ? "mr-4" : ""}`}
              onClick={() => goToStep(step.key)}
              disabled={index > currentStepIndex}
              whileHover={index <= currentStepIndex ? { scale: 1.02 } : {}}
              whileTap={index <= currentStepIndex ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    index <= currentStepIndex
                      ? "bg-accent text-text"
                      : "bg-muted text-muted-foreground border-2 border-muted"
                  }`}
                  animate={{
                    backgroundColor: index <= currentStepIndex ? "hsl(var(--accent))" : "hsl(var(--muted))",
                    color: index <= currentStepIndex ? "white" : "hsl(var(--muted-foreground))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {index < currentStepIndex ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                      <CheckCircle className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    index + 1
                  )}
                </motion.div>
                <div className="ml-3 hidden sm:block">
                  <div className="text-sm font-medium text-foreground">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="bg-accent h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* Form Content */}
      <motion.form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {currentStep === "contact" && (
            <motion.div
              key="contact"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-4"
            >
              <motion.h3 variants={staggerItem} className="text-xl font-semibold text-foreground mb-4">
                İletişim Bilgileri
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full">
                <motion.div variants={staggerItem} className="min-w-0">
                  <Label htmlFor="firstName">Ad *</Label>
                  <motion.div variants={formField} initial="rest" whileFocus="focus">
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className={`w-full focus-luxury ${errors.firstName ? "border-destructive" : ""}`}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-destructive text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={staggerItem} className="min-w-0">
                  <Label htmlFor="lastName">Soyad *</Label>
                  <motion.div variants={formField} initial="rest" whileFocus="focus">
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className={`w-full focus-luxury ${errors.lastName ? "border-destructive" : ""}`}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-destructive text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.lastName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <motion.div variants={staggerItem} className="w-full max-w-full">
                <Label htmlFor="email">E-posta *</Label>
                <motion.div variants={formField} initial="rest" whileFocus="focus">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={`w-full focus-luxury ${errors.email ? "border-destructive" : ""}`}
                  />
                </motion.div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-destructive text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={staggerItem} className="w-full max-w-full">
                <Label htmlFor="phone">Telefon *</Label>
                <motion.div variants={formField} initial="rest" whileFocus="focus">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={`w-full focus-luxury ${errors.phone ? "border-destructive" : ""}`}
                  />
                </motion.div>
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-destructive text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}

          {currentStep === "event" && (
            <motion.div
              key="event"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-4"
            >
              <motion.h3 variants={staggerItem} className="text-xl font-semibold text-foreground mb-4">
                Etkinlik Detayları
              </motion.h3>

              <motion.div variants={staggerItem}>
                <Label htmlFor="eventDate">Etkinlik Tarihi *</Label>
                <motion.div variants={formField} initial="rest" whileFocus="focus">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal focus-luxury",
                          !formData.eventDate && "text-muted-foreground",
                          errors.eventDate && "border-destructive",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.eventDate ? (
                          format(new Date(formData.eventDate), "dd MMMM yyyy", { locale: tr })
                        ) : (
                          <span>Tarih seçiniz</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-background/95 backdrop-blur-sm border-accent/20"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={formData.eventDate ? new Date(formData.eventDate) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            updateField("eventDate", format(date, "yyyy-MM-dd"))
                          }
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="luxury-calendar"
                      />
                    </PopoverContent>
                  </Popover>
                </motion.div>
                <AnimatePresence>
                  {errors.eventDate && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-destructive text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.eventDate}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Label htmlFor="guestCount">Misafir Sayısı *</Label>
                <motion.div variants={formField} initial="rest" whileFocus="focus" className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="guestCount"
                    type="number"
                    min="1"
                    value={formData.guestCount}
                    onChange={(e) => updateField("guestCount", Number.parseInt(e.target.value) || 0)}
                    className={`pl-10 focus-luxury ${errors.guestCount ? "border-destructive" : ""}`}
                  />
                </motion.div>
                <AnimatePresence>
                  {errors.guestCount && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-destructive text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.guestCount}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full">
                <motion.div variants={staggerItem} className="min-w-0">
                  <Label htmlFor="eventType">Etkinlik Türü *</Label>
                  <Select value={formData.eventType} onValueChange={(value) => updateField("eventType", value)}>
                    <SelectTrigger className={`w-full focus-luxury ${errors.eventType ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <AnimatePresence>
                    {errors.eventType && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-destructive text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.eventType}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={staggerItem} className="min-w-0">
                  <Label htmlFor="duration">Etkinlik Süresi *</Label>
                  <Select value={formData.duration} onValueChange={(value) => updateField("duration", value)}>
                    <SelectTrigger className={`w-full focus-luxury ${errors.duration ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATION_OPTIONS.map((duration) => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <AnimatePresence>
                    {errors.duration && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-destructive text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.duration}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentStep === "details" && (
            <motion.div
              key="details"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-4"
            >
              <motion.h3 variants={staggerItem} className="text-xl font-semibold text-foreground mb-4">
                Özel İstekler
              </motion.h3>

              <motion.div variants={staggerItem}>
                <Label htmlFor="specialRequirements">Özel İstekleriniz</Label>
                <motion.div variants={formField} initial="rest" whileFocus="focus">
                  <Textarea
                    id="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={(e) => updateField("specialRequirements", e.target.value)}
                    placeholder="Özel isteklerinizi, dekorasyon tercihleri veya diğer detayları belirtiniz..."
                    rows={4}
                    className="focus-luxury resize-none"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {currentStep === "review" && (
            <motion.div
              key="review"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              <motion.h3 variants={staggerItem} className="text-xl font-semibold text-foreground mb-4">
                Bilgileri Kontrol Edin
              </motion.h3>

              <motion.div variants={staggerItem} className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Ad Soyad:</span>
                    <p className="font-medium">
                      {formData.firstName} {formData.lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">E-posta:</span>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Telefon:</span>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Etkinlik Tarihi:</span>
                    <p className="font-medium">{formData.eventDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Misafir Sayısı:</span>
                    <p className="font-medium">{formData.guestCount} kişi</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Etkinlik Türü:</span>
                    <p className="font-medium">{formData.eventType}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Süre:</span>
                    <p className="font-medium">{formData.duration}</p>
                  </div>
                </div>
                {formData.specialRequirements && (
                  <div>
                    <span className="text-muted-foreground text-sm">Özel İstekler:</span>
                    <p className="font-medium text-sm mt-1">{formData.specialRequirements}</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Actions */}
        <motion.div
          className="flex justify-between pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {currentStepIndex > 0 && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="button" variant="outline" onClick={goToPreviousStep} className="btn-luxury bg-transparent">
                Geri
              </Button>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="ml-auto">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent/90 text-text btn-luxury min-w-[140px]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  Gönderiliyor...
                </div>
              ) : currentStep === "review" ? (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Gönder
                </div>
              ) : (
                "İleri"
              )}
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}
