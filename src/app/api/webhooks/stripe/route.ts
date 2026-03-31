import { NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-03-25.dahlia',
  });
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const orderDetails = {
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
      customerPhone: session.customer_details?.phone,
      shipping: (session as unknown as Record<string, unknown>).shipping_details ?? null,
      amountTotal: session.amount_total
        ? (session.amount_total / 100).toFixed(2)
        : 'N/A',
      customFields: session.custom_fields,
      paymentStatus: session.payment_status,
      sessionId: session.id,
    };

    // Log the order for now. Email notification can be added
    // via Resend/SendGrid when those are set up.
    console.log('New order received:', JSON.stringify(orderDetails, null, 2));
  }

  return NextResponse.json({ received: true });
}
