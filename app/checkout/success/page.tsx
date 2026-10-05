import Link from 'next/link';
import { CheckCircle, Home, Package } from 'lucide-react';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Order Placed! 🎉
        </h1>
        <p className="text-slate-500 mt-3 max-w-md mx-auto">
          Thank you for your purchase. We&apos;ve received your order and will send a confirmation email shortly.
        </p>

        {orderId && (
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mt-8">
            <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
              Order Reference
            </p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">
              #{orderId}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-700 to-purple-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition"
          >
            <Package className="w-4 h-4" /> Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-bold px-6 py-3 rounded-full transition"
          >
            <Home className="w-4 h-4" /> Back home
          </Link>
        </div>
      </div>
    </div>
  );
}