'use client';

import Link from 'next/link';
import { Search, User, ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { itemCount } = useCart();

  // Auth state
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/categories', label: 'Categories' },
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="bg-purple-700 text-white text-xs sm:text-sm text-center py-1.5 px-4">
        🎉 Free delivery on orders above ₦50,000 · Use code <span className="font-bold">BUILD10</span> for 10% off
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl font-extrabold text-purple-700">
              Product<span className="text-orange-500">Kit</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-purple-700 font-medium transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full transition" aria-label="Search">
              <Search className="w-5 h-5 text-slate-700" />
            </button>

            {/* Account / user */}
            {userEmail ? (
  <div className="flex items-center gap-2">
    <Link
      href="/account"
      className="hidden sm:inline text-sm text-slate-600 hover:text-purple-700 max-w-[120px] truncate transition"
    >
      {userEmail}
    </Link>
    <button
      onClick={handleSignOut}
                  className="p-2 hover:bg-slate-100 rounded-full transition"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5 text-slate-700" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 hover:bg-slate-100 rounded-full transition"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-slate-700" />
              </Link>
            )}

            <Link
              href="/cart"
              className="p-2 hover:bg-slate-100 rounded-full transition relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-full transition"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-slate-200 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-slate-700 hover:text-purple-700 font-medium py-1"
              >
                {link.label}
              </Link>
            ))}
            {userEmail && (
              <button
                onClick={handleSignOut}
                className="text-left text-slate-700 hover:text-purple-700 font-medium py-1"
              >
                Sign out ({userEmail})
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}