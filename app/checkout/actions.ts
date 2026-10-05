'use server';

import { supabase } from '@/lib/supabase';
import { sendConfirmationEmail } from '@/lib/email';

export type CheckoutItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type CheckoutPayload = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  items: CheckoutItem[];
};

export async function placeOrder(payload: CheckoutPayload) {
const {
  data: { user },
} = await supabase.auth.getUser();
  // 1. Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: payload.customerName,
      customer_email: payload.customerEmail,
      customer_phone: payload.customerPhone,
      address: payload.address,
      city: payload.city,
      state: payload.state,
      subtotal: payload.subtotal,
      delivery_fee: payload.deliveryFee,
      total: payload.total,
      status: 'pending',
      user_id: user?.id ?? null,
    })
    .select('id')
    .single();

 if (orderError || !order) {
  console.error('Order insert error:', orderError);
  return {
    success: false,
    error: `Failed: ${orderError?.message || 'no message'} | code: ${orderError?.code || 'none'} | details: ${orderError?.details || 'none'} | hint: ${orderError?.hint || 'none'}`,
  };
}

  // 2. Insert line items
  const { error: itemsError } = await supabase.from('order_items').insert(
    payload.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.name,
      product_price: item.price,
      quantity: item.quantity,
    }))
  );

  if (itemsError) {
    console.error('Items insert error:', itemsError);
    return { success: false, error: 'Failed to save order items' };
  }

  // 3. Send confirmation email (Phase 8 wires this up fully)
  try {
    await sendConfirmationEmail(payload.customerEmail, order.id);
  } catch (e) {
    console.error('Email failed (order still saved):', e);
  }

  return { success: true, orderId: order.id };
}