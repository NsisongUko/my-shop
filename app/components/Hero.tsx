import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="inline-block bg-white/15 backdrop-blur text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🚀 Trusted by 10,000+ product professionals
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Everything you need to build{' '}
            <span className="text-orange-200">better products</span> &{' '}
            <span className="text-orange-200">careers</span>.
          </h1>

          <p className="text-lg md:text-xl text-white/90 mt-6 max-w-2xl">
            Books, templates, courses, and career resources designed for
            Product Managers, Designers, Developers, and Testers.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/shop"
              className="bg-white text-purple-700 font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center gap-2"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/courses"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition"
            >
              Explore Courses
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 mt-10 text-sm">
            {['Instant downloads', 'Secure checkout', 'Lifetime access'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-orange-200" />
                <span className="text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}