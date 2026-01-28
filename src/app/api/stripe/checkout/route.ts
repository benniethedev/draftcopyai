import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICE_IDS, PlanType } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email, clientId } = body as { 
      plan: PlanType; 
      email?: string; 
      clientId?: string;
    };

    // Validate plan
    if (!plan || !PRICE_IDS[plan]) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    const priceId = PRICE_IDS[plan];
    
    // Get base URL for redirects
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // Pre-fill email if provided
      ...(email && { customer_email: email }),
      // Store client info in metadata
      metadata: {
        clientId: clientId || '',
        plan,
      },
      // Allow promotion codes
      allow_promotion_codes: true,
      // Billing address collection
      billing_address_collection: 'required',
      // Success and cancel URLs
      success_url: `${origin}/portal?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?checkout=canceled`,
      // Subscription metadata
      subscription_data: {
        metadata: {
          clientId: clientId || '',
          plan,
        },
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
