export async function getAdminFAQs() {
  const res = await fetch('/api/admin/faqs')
  if (!res.ok) throw new Error('Failed to fetch FAQs')
  return res.json()
}

export async function createFAQ(payload: { question: string; answer: string; category: string; isActive: boolean; order: number }) {
  const res = await fetch('/api/admin/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  if (!res.ok) throw new Error('Failed to create FAQ')
  return res.json()
}

export async function updateFAQ(id: string, update: Partial<{ question: string; answer: string; category: string; isActive: boolean; order: number }>) {
  const res = await fetch(`/api/admin/faqs/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(update) })
  if (!res.ok) throw new Error('Failed to update FAQ')
  return res.json()
}

export async function deleteFAQ(id: string) {
  const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete FAQ')
  return res.json()
}
