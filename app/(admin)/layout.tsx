import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Secondary auth check — middleware is the primary layer
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#0D1B2A]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 md:p-10">{children}</main>
    </div>
  );
}
