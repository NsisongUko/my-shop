import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <section className="bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Featured Products
            </h2>
            <p className="text-slate-500 mt-2">
              Handpicked bestsellers and new releases.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-purple-700 hover:text-purple-800 font-semibold flex items-center gap-1 transition"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}