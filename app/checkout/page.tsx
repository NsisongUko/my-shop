import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export default function CheckoutPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const total = Number(formData.get('total'));

    const { data, error } = await supabase
      .from('orders')
      .insert({ user_email: email, total })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to save order');
    }

    console.log('Order saved with id:', data.id);
    redirect('/checkout/success');
  }

  return (
    <main className="max-w-md mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-500">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Checkout 🛒</h1>
        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input name="email" type="email" required
              className="w-full border-2 border-slate-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Total ($)</label>
            <input name="total" type="number" step="0.01" required
              className="w-full border-2 border-slate-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none" />
          </div>
          <button type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition">
            Place Order
          </button>
        </form>
      </div>
    </main>
  );
}