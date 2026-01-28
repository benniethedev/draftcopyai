import { NextRequest, NextResponse } from 'next/server';
import { stripe, getPlanFromPriceId } from '@/lib/stripe';
import Stripe from 'stripe';

// Disable body parsing - we need raw body for signature verification
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('Missing stripe-signature header');
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }
      
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', {
    sessionId: session.id,
    customerId: session.customer,
    subscriptionId: session.subscription,
    customerEmail: session.customer_email,
    metadata: session.metadata,
  });

  // TODO: In production, create/update user in database
  // - Create user account if doesn't exist
  // - Link Stripe customer ID to user
  // - Set subscription status
  // - Send welcome email
  
  const plan = session.metadata?.plan || 'unknown';
  console.log(`New ${plan} subscription started for ${session.customer_email}`);
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const priceId = subscription.items.data[0]?.price.id;
  const plan = getPlanFromPriceId(priceId);

  // Get current period end from the first subscription item
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;

  console.log('Subscription updated:', {
    subscriptionId: subscription.id,
    customerId,
    status,
    plan,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd * 1000) : null,
  });

  // TODO: In production, update subscription in database
  // - Update subscription status
  // - Update plan if changed
  // - Handle downgrades/upgrades
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  console.log('Subscription canceled:', {
    subscriptionId: subscription.id,
    customerId,
    canceledAt: subscription.canceled_at 
      ? new Date(subscription.canceled_at * 1000) 
      : null,
  });

  // TODO: In production:
  // - Mark subscription as canceled in database
  // - Revoke access at period end
  // - Send cancellation confirmation email
  // - Trigger win-back campaign
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log('Invoice paid:', {
    invoiceId: invoice.id,
    customerId: invoice.customer,
    amountPaid: invoice.amount_paid / 100,
    currency: invoice.currency,
  });

  // TODO: In production:
  // - Log payment in database
  // - Send receipt email
  // - Update subscription period
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed:', {
    invoiceId: invoice.id,
    customerId: invoice.customer,
    amountDue: invoice.amount_due / 100,
    attemptCount: invoice.attempt_count,
  });

  // TODO: In production:
  // - Send payment failed notification to customer
  // - Log failed payment attempt
  // - If multiple failures, consider reaching out personally
}
