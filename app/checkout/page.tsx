'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Lock } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/products';
import { placeOrder } from './actions';

const DELIVERY_FEE = 2000;
const FREE_DELIVERY_THRESHOLD = 50000;

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo',
  'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);

    const payload = {
      customerName: String(fd.get('fullName') || ''),
      customerEmail: String(fd.get('email') || ''),
      customerPhone: String(fd.get('phone') || ''),
      address: String(fd.get('address') || ''),
      city: String(fd.get('city') || ''),
      state: String(fd.get('state') || ''),
      subtotal,
      deliveryFee,
      total,
      items: items.map((i) => ({
        productId: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
    };

    const result = await placeOrder(payload);

    if (!result.success) {
      setError(result.error || 'Something went wrong');
      setSubmitting(false);
      return;
    }

    clearCart();
    router.push(`/checkout/success?orderId=${result.orderId}`);
  }

  // Empty cart guard
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-3">
          Your cart is empty
        </h1>
        <p className="text-slate-500 mb-8">
          Add some products before checking out.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-gradient-to-r from-purple-700 to-purple-600 text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/cart"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-purple-700 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to cart
      </Link>

      <h1 className="text-4xl font-extrabold text-slate-800 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer info */}
          <section className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-extrabold text-slate-800 mb-5">
              Customer Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  name="fullName"
                  required
                  className="w-full border-2 border-slate-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full border-2 border-slate-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Phone *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full border-2 border-slate-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition"
                />
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-extrabold text-slate-800 mb-5">
              Delivery Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Street Address *
                </label>
                <input
                  name="address"
                  required
                  className="w-full border-2 border-slate-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  City *
                </label>
                <input
                  name="city"
                  required
                  className="w-full border-2 border-slate-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  State *
                </label>
                <select
                  name="state"
                  required
                  defaultValue=""
                  className="w-full border-2 border-slate-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition bg-white"
                >
                  <option value="" disabled>Select a state</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Payment placeholder */}
          <section className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-extrabold text-slate-800 mb-2">
              Payment
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Payment integration (Paystack) arrives in a later phase. For now, orders are saved as <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">pending</span>.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 flex items-center gap-3">
              <Lock className="w-5 h-5 text-purple-700 shrink-0" />
              <span>Your order will be recorded. You&apos;ll be contacted to complete payment.</span>
            </div>
          </section>
        </div>

        {/* Right: summary */}
        <aside>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-extrabold text-slate-800 mb-5">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3 pb-5 border-b border-slate-100 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center text-sm">
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center">
                    <span className="text-2xl">{item.image}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-slate-800 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 py-5 border-b border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-800">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Delivery</span>
                <span className="font-semibold text-slate-800">
                  {deliveryFee === 0 ? <span className="text-green-600">Free</span> : formatPrice(deliveryFee)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-5 pb-6">
              <span className="font-bold text-slate-800 text-lg">Total</span>
              <span className="font-extrabold text-2xl text-purple-700">{formatPrice(total)}</span>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Placing order...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}