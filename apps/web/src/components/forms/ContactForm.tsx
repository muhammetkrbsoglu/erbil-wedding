'use client';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { sendContactForm } from '@/src/lib/actions';

interface FormState {
  message: string;
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
    >
      {pending ? 'Gönderiliyor...' : 'Gönder'}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState<FormState, FormData>(sendContactForm, {
    message: '',
    success: false,
  });

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Adınız
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-posta Adresiniz
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
        {state.errors?.message && (
          <p className="mt-1 text-sm text-red-600">{state.errors.message}</p>
        )}
      </div>

      <SubmitButton />

      {state.message && !state.errors && (
        <div className={`p-4 rounded-md ${state.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {state.message}
        </div>
      )}
    </form>
  );
}
