import { prisma } from "@/lib/prisma";
import MessagesTable from "@/components/admin/MessagesTable";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-playfair text-[#C9A84C]">Messages</h1>
          <p className="text-sm text-[#F5F0E8]/50 mt-1">
            Customer enquiries from the contact form
          </p>
        </div>
        <span className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-medium px-4 py-1.5 rounded-full">
          {messages.length} total
        </span>
      </div>
      <MessagesTable messages={messages} />
    </div>
  );
}
