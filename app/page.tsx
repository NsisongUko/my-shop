import Link from 'next/link';

export default function Home() {
  const products = [
    { id: 1, name: "T-Shirt", price: 25.00, emoji: "👕" },
    { id: 2, name: "Mug", price: 15.00, emoji: "☕" },
    { id: 3, name: "Sticker Pack", price: 5.00, emoji: "✨" },
  ];

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        Welcome to My Shop
      </h1>
      <p className="text-slate-600 mb-8">Handpicked goodies, delivered with love.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center">
            <div className="text-6xl mb-4">{p.emoji}</div>
            <h2 className="text-lg font-bold text-slate-800">{p.name}</h2>
            <p className="text-2xl font-extrabold text-purple-600 mt-1">${p.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/checkout"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition"
        >
          Go to Checkout →
        </Link>
      </div>
    </main>
  );
}