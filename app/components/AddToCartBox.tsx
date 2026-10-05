'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import { formatPrice, type Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';

export default function AddToCartBox({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-extrabold text-purple-700">
          {formatPrice(product.price)}
        </span>
        {product.badge && (
          <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Quantity
        </label>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className={`flex-1 font-bold py-3.5 rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" /> Added to cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </>
          )}
        </button>

        <button
          onClick={() => setWishlisted((w) => !w)}
          className={`p-3.5 rounded-full border-2 transition ${
            wishlisted
              ? 'border-orange-500 bg-orange-50 text-orange-500'
              : 'border-slate-200 text-slate-500 hover:border-orange-500 hover:text-orange-500'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <Link
        href="/cart"
        className="block text-center border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-bold py-3 rounded-full transition"
      >
        Buy Now
      </Link>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
        <div>
          <p className="text-2xl mb-1">⚡</p>
          <p className="text-xs text-slate-500">Instant access</p>
        </div>
        <div>
          <p className="text-2xl mb-1">🔒</p>
          <p className="text-xs text-slate-500">Secure checkout</p>
        </div>
        <div>
          <p className="text-2xl mb-1">♾️</p>
          <p className="text-xs text-slate-500">Lifetime access</p>
        </div>
      </div>
    </div>
  );
}