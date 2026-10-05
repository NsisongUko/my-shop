import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import {
  getProductBySlug,
  getProductsByCategory,
  categories,
  formatPrice,
} from '@/lib/products';
import AddToCartBox from '../../components/AddToCartBox';
import ProductCard from '../../components/ProductCard';
import Reviews from '../../components/Reviews';

// Optional: generate SEO title/description per product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: `${product.name} — ProductKit`,
    description: product.shortDescription,
  };
}

// Human-readable label for each product type
function typeLabel(type: string) {
  switch (type) {
    case 'book':
      return 'Ebook';
    case 'course':
      return 'Online Course';
    case 'template':
      return 'Template';
    case 'digital':
      return 'Digital Download';
    case 'physical':
      return 'Physical Product';
    default:
      return 'Product';
  }
}

// Fake feature list — we'll pull from the DB later
function getFeatures(type: string) {
  switch (type) {
    case 'course':
      return [
        '12 video modules (8+ hours)',
        'Downloadable resources',
        'Real-world case studies',
        'Certificate on completion',
        'Lifetime access',
        'Community access',
      ];
    case 'template':
      return [
        'Fully customizable template',
        'Works with popular tools',
        'Includes documentation',
        'Free lifetime updates',
        'Instant download',
      ];
    case 'book':
      return [
        '200+ pages of content',
        'Real-world examples',
        'Practical exercises',
        'PDF + ePub formats',
        'Instant download',
      ];
    case 'digital':
    default:
      return [
        'Instant download after purchase',
        'Comprehensive guide',
        'Templates and frameworks',
        'Free lifetime updates',
        'Sent to your email',
      ];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = categories.find((c) => c.slug === product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const features = getFeatures(product.type);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-purple-700 transition">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-purple-700 transition">Shop</Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/category/${category.slug}`}
              className="hover:text-purple-700 transition"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-800 font-medium line-clamp-1">
          {product.name}
        </span>
      </nav>

      {/* Back link */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-purple-700 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to shop
      </Link>

      {/* Main product block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
        {/* Image */}
        <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden">
          <span className="text-[12rem]">{product.image}</span>
          {product.badge && (
            <span className="absolute top-5 left-5 bg-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
              {product.badge}
            </span>
          )}
          <span className="absolute bottom-5 right-5 bg-white/90 backdrop-blur text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200">
            {typeLabel(product.type)}
          </span>
        </div>

        {/* Info */}
        <div>
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="inline-block text-sm font-semibold text-purple-700 hover:text-orange-500 transition mb-3"
            >
              {category.emoji} {category.name}
            </Link>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-0.5 text-orange-500">
              {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <span className="font-bold text-slate-800">{product.rating}</span>
            <span className="text-slate-500 text-sm">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="text-slate-600 mt-5 text-lg leading-relaxed">
            {product.longDescription}
          </p>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <AddToCartBox product={product} />
          </div>
        </div>
      </div>

      {/* What's inside */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6">
          What&apos;s inside
        </h2>
        <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                </span>
                <span className="text-slate-700">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <Reviews rating={product.rating} reviewCount={product.reviewCount} />

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
              You might also like
            </h2>
            <p className="text-slate-500 mt-1">
              More from {category?.name}.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}