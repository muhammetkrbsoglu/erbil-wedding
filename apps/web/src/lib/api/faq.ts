type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getFAQs() {
  const response = await fetch('/api/faq');
  if (!response.ok) {
    throw new Error('Failed to fetch FAQs');
  }
  return response.json() as Promise<FAQ[]>;
}

export async function getAdminFAQs() {
  const response = await fetch('/api/faq/admin');
  if (!response.ok) {
    throw new Error('Failed to fetch admin FAQs');
  }
  return response.json() as Promise<FAQ[]>;
}

export async function createFAQ(data: {
  question: string;
  answer: string;
  category: string;
  order?: number;
  isActive?: boolean;
}) {
  const response = await fetch('/api/faq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create FAQ');
  }
  return response.json() as Promise<FAQ>;
}

export async function updateFAQ(id: string, data: Partial<FAQ>) {
  const response = await fetch(`/api/faq/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update FAQ');
  }
  return response.json() as Promise<FAQ>;
}

export async function deleteFAQ(id: string) {
  const response = await fetch(`/api/faq/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete FAQ');
  }
  return response.json();
}

export async function reorderFAQs(items: { id: string; order: number }[]) {
  const response = await fetch('/api/faq/reorder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(items),
  });
  if (!response.ok) {
    throw new Error('Failed to reorder FAQs');
  }
  return response.json();
}
