import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">🛍️ My Shop</Link>
        <nav className="flex gap-4">
          <Link href="/" className="hover:text-yellow-200 transition">Home</Link>
          <Link href="/checkout" className="hover:text-yellow-200 transition">Checkout</Link>
          <Link href="/login" className="hover:text-yellow-200 transition">Sign In</Link>
        </nav>
      </div>
    </header>
  );
}