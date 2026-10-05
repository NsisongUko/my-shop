import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { products, formatPrice } from '@/lib/products';

export default function CoursesTeaser() {
  const course = products.find((p) => p.slug === 'product-management-starter-course');

  if (!course) return null;

  const highlights = [
    'Product discovery',
    'User research',
    'Prioritization',
    'Roadmapping',
    'Writing PRDs',
    'Working with engineers',
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center border border-purple-100">
        <div>
          <span className="inline-block bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            🎓 Featured Course
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            {course.name}
          </h2>
          <p className="text-slate-600 mt-4">{course.longDescription}</p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-sm">{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mt-8">
            <Link
              href={`/product/${course.slug}`}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2"
            >
              Enroll Now <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-2xl font-extrabold text-slate-800">
              {formatPrice(course.price)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-8xl">{course.image}</div>
          <div className="flex items-center justify-center gap-1 mt-6">
            <span className="text-orange-500 text-lg">★</span>
            <span className="font-bold text-slate-700">{course.rating}</span>
            <span className="text-slate-400 text-sm">
              · {course.reviewCount} reviews
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            12 modules · 8 hours · Certificate included
          </p>
        </div>
      </div>
    </section>
  );
}