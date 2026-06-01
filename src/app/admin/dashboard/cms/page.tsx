"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  FileText, 
  Save, 
  Loader2, 
  CheckCircle,
  HelpCircle,
  Image as ImageIcon
} from "lucide-react";

interface CMSConfig {
  key: string;
  content: any;
}

export default function CMSManager() {
  const [loading, setLoading] = useState(true);
  const [configs, setConfigs] = useState<CMSConfig[]>([]);
  const [activeTab, setActiveTab] = useState("hero");
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const defaultCMSConfigs: CMSConfig[] = [
    {
      key: "homepage.hero",
      content: {
        badge: "Unbroken Chains of Tradition",
        heading: "Preserving Sacred Legacy, Igniting Spiritual Light",
        subheading: "A world-renowned sanctuary for classical Islamic sciences, spiritual Tazkiyah, and traditional Arabic calligraphy.",
        cta_donation: "Support Seekers of Knowledge",
        cta_academy: "Explore Online Academy"
      }
    },
    {
      key: "homepage.stats",
      content: {
        students: "1,450",
        scholars: "42",
        scholarships: "85%"
      }
    }
  ];

  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("cms_configs")
        .select("*");

      if (!error && data && data.length > 0) {
        setConfigs(data as CMSConfig[]);
      } else {
        // Seed database locally with defaults if empty
        for (const item of defaultCMSConfigs) {
          await supabase.from("cms_configs").insert(item);
        }
        setConfigs(defaultCMSConfigs);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleUpdateConfig = async (key: string, content: any) => {
    setUpdatingKey(key);
    setMessage("");
    try {
      const { error } = await supabase
        .from("cms_configs")
        .upsert({ key, content, updated_at: new Date().toISOString() });

      if (!error) {
        setMessage("Configuration blocks saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
      setUpdatingKey(null);
    } catch (err) {
      setUpdatingKey(null);
    }
  };

  const currentConfig = configs.find(c => c.key === `homepage.${activeTab}`);

  return (
    <div className="space-y-8">
      {/* Configuration Hub header */}
      <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-display font-bold text-primary text-base italic">Dynamic CMS Block Configuration</h4>
          <p className="text-[9px] text-on-surface-variant/40 font-bold uppercase tracking-widest">
            Modify text strings, CTA button tags, and statistics values instantly on the homepage.
          </p>
        </div>

        <div className="flex gap-2">
          {["hero", "stats"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4.5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-primary text-white shadow-sm"
                  : "bg-background-warm text-primary border border-primary/5 hover:bg-primary/5"
              }`}
            >
              {tab} section
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {message}
        </div>
      )}

      {/* Editor Content box */}
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : !currentConfig ? (
        <div className="py-20 text-center text-xs font-bold text-on-surface-variant/50">
          Error: Configuration blocks could not be mapped.
        </div>
      ) : (
        <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="border-b border-primary/5 pb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h4 className="font-display font-bold text-primary italic text-base capitalize">
              Editing Homepage {activeTab} Fields
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {Object.keys(currentConfig.content).map((fieldKey) => (
              <div key={fieldKey} className="space-y-1.5">
                <label className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block">
                  {fieldKey.replace("_", " ")}
                </label>
                {fieldKey.includes("subheading") || fieldKey.includes("description") ? (
                  <textarea
                    rows={4}
                    value={currentConfig.content[fieldKey]}
                    onChange={(e) => {
                      const updatedContent = { ...currentConfig.content, [fieldKey]: e.target.value };
                      setConfigs(prev => prev.map(c => c.key === currentConfig.key ? { ...c, content: updatedContent } : c));
                    }}
                    className="w-full p-4 bg-background-warm border border-primary/5 focus:border-primary/20 rounded-xl text-xs font-semibold focus:outline-none leading-relaxed"
                  />
                ) : (
                  <input
                    type="text"
                    value={currentConfig.content[fieldKey]}
                    onChange={(e) => {
                      const updatedContent = { ...currentConfig.content, [fieldKey]: e.target.value };
                      setConfigs(prev => prev.map(c => c.key === currentConfig.key ? { ...c, content: updatedContent } : c));
                    }}
                    className="w-full px-4 py-3.5 bg-background-warm border border-primary/5 focus:border-primary/20 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              disabled={updatingKey === currentConfig.key}
              onClick={() => handleUpdateConfig(currentConfig.key, currentConfig.content)}
              className="px-6 py-4 bg-primary hover:bg-opacity-95 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-40"
            >
              {updatingKey === currentConfig.key ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Dynamic Fields
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
