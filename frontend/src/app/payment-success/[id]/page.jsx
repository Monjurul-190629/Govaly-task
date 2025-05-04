// app/payment/[id]/page.jsx
import getUserById from '@/lib/getUserById';
import PaymentPageClient from './PaymentPageClient';

export default async function PaymentPage({ params }) {
  const user = await getUserById(params.id);

  return <PaymentPageClient user={user} />;
}
