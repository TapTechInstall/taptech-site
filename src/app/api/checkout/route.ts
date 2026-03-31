import { NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-03-25.dahlia',
  });
}

function getPriceMap(): Record<string, string> {
  return {
    '1': process.env.STRIPE_PRICE_1_CARD!,
    '5': process.env.STRIPE_PRICE_5_PACK!,
    '10': process.env.STRIPE_PRICE_10_PACK!,
  };
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quantity } = body;

    const priceMap = getPriceMap();
    const validQuantities = ['1', '5', '10'];

    if (!quantity || !validQuantities.includes(quantity)) {
      return NextResponse.json(
        { error: 'Invalid quantity. Choose 1, 5, or 10.' },
        { status: 400 }
      );
    }

    const priceId = priceMap[quantity];
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: quantity === '1' ? 500 : 0,
              currency: 'usd',
            },
            display_name:
              quantity === '1' ? 'Standard Shipping' : 'Free Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
      custom_fields: [
        {
          key: 'business_name',
          label: { type: 'custom', custom: 'Business name for the card' },
          type: 'text',
        },
        {
          key: 'card_name',
          label: { type: 'custom', custom: 'Name to engrave on card' },
          type: 'text',
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${getBaseUrl()}/shop-success.html`,
      cancel_url: `${getBaseUrl()}/shop.html#order`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://taptechconnect.com';
}
