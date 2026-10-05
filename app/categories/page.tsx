import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories, products } from '@/lib/products';

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          Shop by Category
        </h1>
        <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
          Find exactly what you need — organized for every role in the product ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.slug).length;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-orange-100 rounded-full blur-3xl opacity-60 -mr-8 -mt-8" />

              <div className="relative">
                <div className="text-6xl mb-5 group-hover:scale-110 transition">
                  {cat.emoji}
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 group-hover:text-purple-700 transition">
                  {cat.name}
                </h2>
                <p className="text-slate-500 mt-2">{cat.description}</p>

                <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
                  <span className="text-sm text-slate-500">
                    {count} {count === 1 ? 'product' : 'products'}
                  </span>
                  <span className="text-purple-700 group-hover:text-orange-500 font-semibold flex items-center gap-1 transition">
                    Browse <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}