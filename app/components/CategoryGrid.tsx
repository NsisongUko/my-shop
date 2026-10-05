import Link from 'next/link';
import { categories } from '@/lib/products';

export default function CategoryGrid() {
  // Show only the four profession categories on the homepage
  const professionCategories = categories.filter((c) =>
    ['pm', 'design', 'dev', 'qa'].includes(c.slug)
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Shop by Profession
        </h2>
        <p className="text-slate-500 mt-2">
          Curated resources for every role in the product ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {professionCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition p-6 text-center"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition">
              {cat.emoji}
            </div>
            <h3 className="font-bold text-slate-800 group-hover:text-purple-700 transition">
              {cat.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {cat.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}