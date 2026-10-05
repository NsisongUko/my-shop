import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="bg-gradient-to-r from-purple-700 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Learn. Build. Grow.</h3>
            <p className="text-sm text-white/90 mt-1">
              Get career tips, new resources, and course drops in your inbox.
            </p>
          </div>
          <form className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="px-4 py-2 rounded-lg text-slate-900 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl font-extrabold text-white">
              Product<span className="text-orange-500">Kit</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400">
            Resources, tools, and courses for people who build digital products.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-orange-400 transition">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-orange-400 transition">Categories</Link></li>
            <li><Link href="/courses" className="hover:text-orange-400 transition">Courses</Link></li>
            <li><Link href="/shop?type=digital" className="hover:text-orange-400 transition">Digital Downloads</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">For You</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/category/pm" className="hover:text-orange-400 transition">Product Managers</Link></li>
            <li><Link href="/category/design" className="hover:text-orange-400 transition">Designers</Link></li>
            <li><Link href="/category/dev" className="hover:text-orange-400 transition">Developers</Link></li>
            <li><Link href="/category/qa" className="hover:text-orange-400 transition">Testers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-orange-400 transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400 transition">Contact</Link></li>
            <li><Link href="/account" className="hover:text-orange-400 transition">My Account</Link></li>
            <li><Link href="/help" className="hover:text-orange-400 transition">Help</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ProductKit. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-orange-400 transition">Terms</Link>
            <Link href="/privacy" className="hover:text-orange-400 transition">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}