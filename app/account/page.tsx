'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut, Package, ArrowRight, User as UserIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/products';

type OrderItem = {
  id: number;
  product_name: string;
  product_price: number;
  quantity: number;
};

type Order = {
  id: number;
  total: number;
  subtotal: number;
  delivery_fee: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
};

export default function AccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace('/login');
        return;
      }

      setUserEmail(user.email ?? null);

      // Fetch this user's orders with their items
      const { data: orderRows, error } = await supabase
        .from('orders')
        .select('id, total, subtotal, delivery_fee, status, created_at, order_items(id, product_name, product_price, quantity)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && orderRows) {
        setOrders(orderRows as Order[]);
      } else if (error) {
        console.error('Failed to load orders:', error);
      }

      setLoading(false);
    };

    load();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-700" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-700 to-orange-500 text-white rounded-3xl p-8 md:p-10 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <UserIcon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-white/80 text-sm">Signed in as</p>
              <p className="text-xl font-extrabold">{userEmail}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold px-5 py-2.5 rounded-full transition flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </div>

      {/* Orders */}
      <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">My Orders</h1>
          <p className="text-slate-500 mt-1">
            {orders.length === 0
              ? 'No orders yet.'
              : `${orders.length} order${orders.length === 1 ? '' : 's'}`}
          </p>
        </div>
        <Link
          href="/shop"
          className="text-purple-700 hover:text-purple-800 font-semibold flex items-center gap-1 transition"
        >
          Continue shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
            <Package className="w-8 h-8 text-purple-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">No orders yet</h2>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            When you place your first order, it will show up here.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-6 bg-gradient-to-r from-purple-700 to-purple-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-100 rounded-2xl p-6"
            >
              {/* Order header */}
              <div className="flex items-start justify-between flex-wrap gap-3 pb-4 border-b border-slate-100">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Order
                  </p>
                  <p className="font-extrabold text-lg text-slate-800">
                    #{order.id}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('en-NG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                      order.status === 'pending'
                        ? 'bg-orange-100 text-orange-700'
                        : order.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                  <p className="text-xl font-extrabold text-purple-700 mt-2">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="pt-4 space-y-2">
                {order.order_items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-slate-700">
                      {item.product_name}{' '}
                      <span className="text-slate-400">×{item.quantity}</span>
                    </span>
                    <span className="font-semibold text-slate-800">
                      {formatPrice(item.product_price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}