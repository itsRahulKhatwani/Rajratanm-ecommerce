"use client";

import { useState } from "react";
import { Mail, Phone, Calendar, ChevronDown, ChevronUp, User } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: Date | string;
};

export default function MessagesTable({ messages }: { messages: Message[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-4">
          <Mail className="w-7 h-7 text-[#C9A84C]/60" />
        </div>
        <p className="text-[#F5F0E8]/50 text-sm">No messages yet.</p>
        <p className="text-[#F5F0E8]/30 text-xs mt-1">
          Customer enquiries will appear here once they fill the contact form.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => {
        const isOpen = expanded === msg.id;
        const date = new Date(msg.createdAt);
        const formattedDate = date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={msg.id}
            className="bg-[#0D2137] border border-[#C9A84C]/20 rounded-xl overflow-hidden transition-all duration-200 hover:border-[#C9A84C]/40"
          >
            {/* Header Row */}
            <button
              onClick={() => setExpanded(isOpen ? null : msg.id)}
              className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-[#C9A84C]" />
                </div>

                {/* Name + preview */}
                <div className="min-w-0 flex-1">
                  <p className="text-[#F5F0E8] font-medium text-sm">{msg.name}</p>
                  <p className="text-[#F5F0E8]/40 text-xs truncate mt-0.5">
                    {msg.message}
                  </p>
                </div>
              </div>

              {/* Meta + expand icon */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-[#C9A84C] text-xs font-medium">{formattedDate}</p>
                  <p className="text-[#F5F0E8]/30 text-xs">{formattedTime}</p>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#C9A84C]/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#F5F0E8]/30" />
                )}
              </div>
            </button>

            {/* Expanded Detail */}
            {isOpen && (
              <div className="px-6 pb-5 border-t border-[#C9A84C]/10">
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-[#C9A84C]/70 flex-shrink-0" />
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-[#F5F0E8]/80 hover:text-[#C9A84C] transition-colors truncate"
                    >
                      {msg.email}
                    </a>
                  </div>

                  {msg.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-[#C9A84C]/70 flex-shrink-0" />
                      <a
                        href={`tel:${msg.phone}`}
                        className="text-[#F5F0E8]/80 hover:text-[#C9A84C] transition-colors"
                      >
                        {msg.phone}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm sm:col-start-3 sm:justify-end">
                    <Calendar className="w-4 h-4 text-[#C9A84C]/70 flex-shrink-0" />
                    <span className="text-[#F5F0E8]/50">
                      {formattedDate} at {formattedTime}
                    </span>
                  </div>
                </div>

                {/* Message body */}
                <div className="bg-[#0D1B2A] border border-[#C9A84C]/10 rounded-lg p-4">
                  <p className="text-[#F5F0E8]/80 text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>

                {/* Quick Reply */}
                <div className="mt-3 flex gap-2">
                  <a
                    href={`mailto:${msg.email}?subject=Re: Your enquiry - Raj Ratnam`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] text-[#0D1B2A] text-sm font-medium rounded-lg hover:bg-[#B8962F] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Reply via Email
                  </a>
                  {msg.phone && (
                    <a
                      href={`tel:${msg.phone}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0D1B2A] border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-medium rounded-lg hover:bg-[#C9A84C]/10 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
