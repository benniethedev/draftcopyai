import { PortalHeader } from '@/components/portal';
import { mockClient } from '@/lib/mock-data';

export const metadata = {
  title: 'Client Portal | DraftCopyAI',
  description: 'Manage your content projects, submit briefs, and download completed content.',
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <PortalHeader client={mockClient} />
      <main className="pt-16">{children}</main>
    </div>
  );
}
