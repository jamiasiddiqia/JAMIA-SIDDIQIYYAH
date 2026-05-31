"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Download, Search, Filter, Loader2, ArrowUpRight, DollarSign } from "lucide-react";

interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  country: string;
  donation_type: string;
  amount: number;
  currency: string;
  payment_status: string;
  transaction_id: string;
  created_at: string;
}

export default function DonationsManager() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setDonations(data as Donation[]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleExportCSV = () => {
    if (donations.length === 0) return;
    
    const headers = ["Transaction ID", "Donor Name", "Email", "Phone", "Country", "Type", "Amount", "Currency", "Status", "Date"];
    const rows = donations.map(d => [
      d.transaction_id || d.id,
      d.donor_name,
      d.donor_email,
      d.donor_phone || "N/A",
      d.country || "N/A",
      d.donation_type,
      d.amount,
      d.currency,
      d.payment_status,
      new Date(d.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Donations_Report_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Local filtering
  const filteredDonations = donations.filter(d => {
    const matchesSearch = d.donor_name.toLowerCase().includes(search.toLowerCase()) || 
                          d.donor_email.toLowerCase().includes(search.toLowerCase()) ||
                          (d.transaction_id && d.transaction_id.toLowerCase().includes(search.toLowerCase()));
    
    const matchesType = filterType === "all" || d.donation_type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || d.payment_status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filters panel */}
      <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-on-surface-variant/40" />
            <input
              type="text"
              placeholder="Search donor name, email or transaction..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-background-warm border border-primary/5 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary/20"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 bg-background-warm border border-primary/5 rounded-xl text-xs font-bold text-primary uppercase tracking-wider focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="zakat">Zakat</option>
            <option value="sadaqah">Sadaqah</option>
            <option value="general">General</option>
            <option value="scholarship">Scholarship</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-background-warm border border-primary/5 rounded-xl text-xs font-bold text-primary uppercase tracking-wider focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-6 py-3.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-opacity-95 transition-all flex items-center gap-2.5 shrink-0 cursor-pointer shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export CSV Reports
        </button>
      </div>

      {/* Table grid */}
      <div className="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : filteredDonations.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">No matching donations found</p>
            <p className="text-[10px] text-on-surface-variant/40 font-semibold">Try updating your filters or search keywords above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 text-primary text-[10px] font-extrabold uppercase tracking-widest border-b border-primary/5">
                  <th className="py-4.5 px-6">Donor Details</th>
                  <th className="py-4.5 px-6">Amount</th>
                  <th className="py-4.5 px-6">Type</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6">Transaction / Reference</th>
                  <th className="py-4.5 px-6">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5 text-xs font-medium text-on-surface-variant">
                {filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-primary/[0.01] transition-colors">
                    <td className="py-4 px-6 space-y-0.5">
                      <p className="font-bold text-primary">{d.donor_name}</p>
                      <span className="block text-[10px] text-on-surface-variant/50">{d.donor_email}</span>
                      {d.donor_phone && <span className="block text-[9px] text-on-surface-variant/40">{d.donor_phone}</span>}
                    </td>
                    <td className="py-4 px-6 font-bold text-primary">
                      {d.currency} {Number(d.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-secondary-fixed text-primary font-bold text-[9px] uppercase tracking-wider rounded-md">
                        {d.donation_type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md ${
                        d.payment_status === "completed" ? "bg-green-50 text-green-700" :
                        d.payment_status === "pending" ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-700"
                      }`}>
                        {d.payment_status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[10px]">
                      {d.transaction_id || d.id.substring(0, 8)}
                    </td>
                    <td className="py-4 px-6 font-semibold">
                      {new Date(d.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
