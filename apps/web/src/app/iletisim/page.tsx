import React from "react";

export default function IletisimPage() {
  return (
    <main className="container py-12 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">İletişim</h1>
      <div className="mb-6">
        <p><strong>Adres:</strong> Lorem Mahallesi, Ipsum Sokak No: 123, Erbil</p>
        <p><strong>Telefon:</strong> +90 555 555 55 55</p>
        <p><strong>Email:</strong> info@erbilwedding.com</p>
      </div>
      <form className="space-y-4">
        <input type="text" placeholder="Adınız" className="w-full border p-2 rounded" disabled />
        <input type="email" placeholder="Email" className="w-full border p-2 rounded" disabled />
        <textarea placeholder="Mesajınız" className="w-full border p-2 rounded" rows={4} disabled />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled>Gönder</button>
      </form>
    </main>
  );
}
