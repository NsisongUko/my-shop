import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products, formatPrice } from '@/lib/products';

export default function CareerBoosters() {
  const careerProducts = products.filter((p) => p.category === 'career').slice(0, 3);

  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              🚀 Level up
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Career Boosters
            </h2>
            <p className="text-slate-400 mt-2">
              CV templates, interview kits, and guides to accelerate your career.
            </p>
          </div>
          <Link
            href="/category/career"
            className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 transition"
          >
            Explore all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careerProducts.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="group bg-slate-800 hover:bg-slate-750 rounded-2xl p-6 border border-slate-700 hover:border-orange-500 transition"
            >
              <div className="text-4xl mb-4">{p.image}</div>
              <h3 className="font-bold text-lg group-hover:text-orange-400 transition">
                {p.name}
              </h3>
              <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                {p.shortDescription}
              </p>
              <div className="flex items-center justify-between mt-5">
                <span className="text-xl font-extrabold text-orange-400">
                  {formatPrice(p.price)}
                </span>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}