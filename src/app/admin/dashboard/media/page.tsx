"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  FolderClosed, 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  Loader2, 
  Link2 
} from "lucide-react";

interface MediaItem {
  name: string;
  id: string;
  updated_at: string;
  metadata: {
    size: number;
    mimetype: string;
  };
}

export default function MediaLibrary() {
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const bucketName = "media-library";

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from(bucketName).list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

      if (!error && data) {
        setMedia(data as unknown as MediaItem[]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial verification of bucket existence - create if missing using api failsafe
    const checkBucket = async () => {
      await supabase.storage.createBucket(bucketName, { public: true });
      fetchMedia();
    };
    checkBucket();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    setMessage("");

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (error) {
        setMessage(`Upload error: ${error.message}`);
      } else {
        setMessage("File uploaded successfully to Supabase Storage!");
        fetchMedia();
      }
      setUploading(false);
    } catch (err: any) {
      setMessage(`Upload error: ${err.message}`);
      setUploading(false);
    }
  };

  const handleDelete = async (name: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this media file?")) return;
    try {
      const { error } = await supabase.storage.from(bucketName).remove([name]);
      if (!error) {
        setMedia(prev => prev.filter(item => item.name !== name));
      }
    } catch (err) {}
  };

  const getPublicUrl = (name: string) => {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(name);
    return data.publicUrl;
  };

  const handleCopyLink = (name: string) => {
    const publicUrl = getPublicUrl(name);
    navigator.clipboard.writeText(publicUrl);
    setCopiedId(name);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* File Upload panel header */}
      <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-display font-bold text-primary text-base italic">Enterprise Media Library Hub</h4>
          <p className="text-[9px] text-on-surface-variant/40 font-bold uppercase tracking-widest">
            Upload asset files, copy public URLs, and organize PDFs or certificates inside Supabase Storage.
          </p>
        </div>

        <div className="relative">
          <input
            type="file"
            id="file-upload"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="px-6 py-3.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-opacity-95 transition-all flex items-center gap-2.5 shrink-0 cursor-pointer shadow-sm disabled:opacity-40"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Upload New Asset
          </label>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-primary/5 text-primary border border-primary/10 rounded-xl text-xs font-bold">
          {message}
        </div>
      )}

      {/* Grid Browser layout */}
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : media.length === 0 ? (
        <div className="bg-white border border-primary/5 rounded-2xl py-20 text-center space-y-2 shadow-sm">
          <FolderClosed className="w-10 h-10 text-primary/10 mx-auto" />
          <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">No files uploaded yet</p>
          <p className="text-[10px] text-on-surface-variant/40 font-semibold">Get started by uploading your first PDF, image, or document above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {media.map((item) => {
            const isImage = item.metadata?.mimetype?.startsWith("image/");
            const fileUrl = getPublicUrl(item.name);

            return (
              <div 
                key={item.id} 
                className="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* File Thumbnail Preview */}
                <div className="aspect-video bg-background-warm flex items-center justify-center overflow-hidden border-b border-primary/5 relative group">
                  {isImage ? (
                    <img
                      src={fileUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <FolderClosed className="w-12 h-12 text-primary/30" />
                  )}
                </div>

                {/* Details Footer */}
                <div className="p-5 space-y-4">
                  <div className="space-y-1">
                    <p className="font-bold text-primary text-xs truncate" title={item.name}>
                      {item.name}
                    </p>
                    <div className="flex justify-between text-[9px] text-on-surface-variant/50 font-bold uppercase tracking-wider">
                      <span>{(item.metadata?.size / 1024 / 1024).toFixed(2)} MB</span>
                      <span>{item.metadata?.mimetype?.split("/")[1] || "File"}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyLink(item.name)}
                      className="flex-1 py-2.5 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-lg text-[9px] font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {copiedId === item.name ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Link2 className="w-3.5 h-3.5" />
                          Get Link
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleDelete(item.name)}
                      className="p-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
