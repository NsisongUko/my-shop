import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from '@/lib/cart-context';
import './globals.css';

export const metadata = {
  title: 'ProductKit — Resources for people who build products',
  description:
    'Books, templates, courses, and career resources for product managers, designers, developers, and testers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}