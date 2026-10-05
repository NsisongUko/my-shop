'use client';

import Link from 'next/link';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/products';

const DELIVERY_FEE = 2000;
const FREE_DELIVERY_THRESHOLD = 50000;

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  // Empty state
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 mb-6">
          <ShoppingBag className="w-12 h-12 text-purple-700" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800">Your cart is empty</h1>
        <p className="text-slate-500 mt-3 max-w-md mx-auto">
          Add some resources to your cart and they&apos;ll show up here.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition"
        >
          Browse products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800">My Cart</h1>
          <p className="text-slate-500 mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-slate-500 hover:text-red-600 transition font-medium"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-5 items-start"
            >
              {/* Image */}
              <Link
                href={`/product/${item.slug}`}
                className="w-24 h-24 shrink-0 rounded-xl bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center"
              >
                <span className="text-4xl">{item.image}</span>
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="font-bold text-slate-800 hover:text-purple-700 transition line-clamp-2"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-slate-500 mt-1">
                  {formatPrice(item.price)} each
                </p>

                <div className="flex items-center gap-4 mt-4 flex-wrap">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(q) => updateQuantity(item.id, q)}
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-600 transition p-2"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Line total */}
              <div className="text-right shrink-0">
                <p className="font-extrabold text-lg text-slate-800">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-extrabold text-slate-800 mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 pb-5 border-b border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-800">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Delivery</span>
                <span className="font-semibold text-slate-800">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline py-5">
              <span className="font-bold text-slate-800 text-lg">Total</span>
              <span className="font-extrabold text-2xl text-purple-700">
                {formatPrice(total)}
              </span>
            </div>

            {subtotal < FREE_DELIVERY_THRESHOLD && (
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-xs text-orange-800 mb-4">
                💡 Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more to unlock free delivery.
              </div>
            )}

            <Link
              href="/checkout"
              className="block w-full text-center bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 text-white font-bold py-3.5 rounded-full shadow-lg hover:shadow-xl transition"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/shop"
              className="block text-center text-sm text-slate-500 hover:text-purple-700 transition mt-4"
            >
              ← Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}