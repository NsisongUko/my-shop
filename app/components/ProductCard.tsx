import Link from 'next/link';
import { formatPrice, type Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition flex flex-col"
    >
      {/* Image area */}
      <div className="aspect-square bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center relative">
        <span className="text-7xl">{product.image}</span>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 group-hover:text-purple-700 transition line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        <div className="flex items-center gap-1 mt-3 text-sm">
          <span className="text-orange-500">★</span>
          <span className="font-semibold text-slate-700">{product.rating}</span>
          <span className="text-slate-400">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-extrabold text-purple-700">
            {formatPrice(product.price)}
          </span>
          <span className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}