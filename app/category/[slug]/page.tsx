import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { categories, getProductsByCategory } from '@/lib/products';
import ProductCard from '../../components/ProductCard';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const items = getProductsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-purple-700 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All categories
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 to-orange-50 border border-purple-100 rounded-3xl p-8 md:p-10 mb-10">
        <div className="flex items-center gap-5">
          <div className="text-6xl">{category.emoji}</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              {category.name}
            </h1>
            <p className="text-slate-600 mt-1">{category.description}</p>
            <p className="text-sm text-slate-500 mt-2">
              {items.length} {items.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <p className="text-5xl mb-3">📦</p>
          <h3 className="text-lg font-bold text-slate-800">
            No products in this category yet
          </h3>
          <p className="text-slate-500 mt-1">Check back soon.</p>
          <Link
            href="/shop"
            className="inline-block mt-5 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}