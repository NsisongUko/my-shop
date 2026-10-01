import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="max-w-md mx-auto p-8 text-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 border-t-4 border-green-500">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-extrabold text-green-600 mb-2">Order Placed!</h1>
        <p className="text-slate-600 mb-6">Check your email for confirmation.</p>
        <Link href="/" className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-6 py-2 rounded-full shadow hover:shadow-lg transition">
          Back to Shop
        </Link>
      </div>
    </main>
  );
}