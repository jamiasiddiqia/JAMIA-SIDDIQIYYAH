"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Inbox, 
  CheckCircle, 
  Archive, 
  Trash2, 
  Search, 
  Loader2, 
  Reply 
} from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

export default function ContactInbox() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setMessages(data as Message[]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setActionId(id);
    try {
      const { error } = await supabase
        .from("contacts")
        .update({ status: newStatus })
        .eq("id", id);

      if (!error) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
      }
      setActionId(null);
    } catch (err) {
      setActionId(null);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    setActionId(id);
    try {
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", id);

      if (!error) {
        setMessages(prev => prev.filter(m => m.id !== id));
      }
      setActionId(null);
    } catch (err) {
      setActionId(null);
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          m.email.toLowerCase().includes(search.toLowerCase()) || 
                          m.message.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = activeFilter === "all" || m.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Search & Inboxes buttons row */}
      <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-on-surface-variant/40" />
          <input
            type="text"
            placeholder="Search through names, emails or message contents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-background-warm border border-primary/5 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary/20"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto shrink-0 overflow-x-auto pb-1 md:pb-0">
          {["all", "new", "resolved", "archived"].map((filt) => (
            <button
              key={filt}
              onClick={() => setActiveFilter(filt)}
              className={`px-4.5 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeFilter === filt
                  ? "bg-primary text-white shadow-sm"
                  : "bg-background-warm text-primary border border-primary/5 hover:bg-primary/5"
              }`}
            >
              {filt} inbox
            </button>
          ))}
        </div>
      </div>

      {/* Message Cards List */}
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white border border-primary/5 rounded-2xl py-20 text-center space-y-2 shadow-sm">
          <Inbox className="w-10 h-10 text-primary/10 mx-auto" />
          <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Your inbox is completely clear</p>
          <p className="text-[10px] text-on-surface-variant/40 font-semibold">No submissions match the current view parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredMessages.map((msg) => (
            <div 
              key={msg.id}
              className={`bg-white border rounded-2xl p-6 md:p-8 shadow-sm transition-all relative ${
                msg.status === "new" ? "border-primary/20 shadow-md bg-gradient-to-br from-white to-primary/[0.01]" : "border-primary/5 opacity-80"
              }`}
            >
              {msg.status === "new" && (
                <div className="absolute top-6 right-6 px-2.5 py-1 bg-secondary-fixed text-primary text-[8px] font-extrabold tracking-wider uppercase rounded">
                  new entry
                </div>
              )}

              {/* Message Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary/5 pb-4.5">
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-primary text-base italic">{msg.name}</h4>
                  <div className="flex flex-wrap gap-2 text-[10px] text-on-surface-variant/60 font-semibold uppercase tracking-wider">
                    <span>{msg.email}</span>
                    <span className="opacity-30">•</span>
                    <span>{msg.phone || "No Phone"}</span>
                  </div>
                </div>
                <span className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-wider">
                  Received: {new Date(msg.created_at).toLocaleDateString(undefined, { dateStyle: "long" })}
                </span>
              </div>

              {/* Message Content */}
              <div className="py-6 text-sm text-on-surface-variant leading-relaxed font-medium">
                {msg.message}
              </div>

              {/* Action Buttons Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4.5 border-t border-primary/5">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-widest rounded-md ${
                    msg.status === "new" ? "bg-orange-50 text-orange-700 border border-orange-100" :
                    msg.status === "resolved" ? "bg-green-50 text-green-700 border border-green-100" :
                    "bg-zinc-50 text-zinc-600 border border-zinc-200"
                  }`}>
                    status: {msg.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a 
                    href={`mailto:${msg.email}?subject=Jamia Siddiqiyyah Inquiry Response`}
                    className="p-3 bg-background-warm border border-primary/5 hover:bg-primary/5 text-primary rounded-xl transition-colors flex items-center justify-center"
                    title="Send Email Reply"
                  >
                    <Reply className="w-3.5 h-3.5" />
                  </a>

                  {msg.status !== "resolved" && (
                    <button
                      disabled={actionId === msg.id}
                      onClick={() => handleUpdateStatus(msg.id, "resolved")}
                      className="px-4 py-3.5 bg-primary/5 hover:bg-primary/10 border border-primary/10 text-primary rounded-xl text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Mark Resolved
                    </button>
                  )}

                  {msg.status !== "archived" && (
                    <button
                      disabled={actionId === msg.id}
                      onClick={() => handleUpdateStatus(msg.id, "archived")}
                      className="px-4 py-3.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-600 rounded-xl text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      Archive
                    </button>
                  )}

                  <button
                    disabled={actionId === msg.id}
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="p-3 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 rounded-xl transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
