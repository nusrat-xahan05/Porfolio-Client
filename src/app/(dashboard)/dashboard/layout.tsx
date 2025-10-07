import DashboardSidebar from "@/components/shared/DashboardSidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex bg-[rgba(255,207,204,0.5)]">
      <DashboardSidebar></DashboardSidebar>
      {children}
    </main>
  );
}