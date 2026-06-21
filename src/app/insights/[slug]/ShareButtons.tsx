"use client";

import React, { useState } from "react";
import { Share2, Check, Link2 } from "lucide-react";

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/insights/${slug}`;
    }
    return `https://jamiasiddiqiyyah.eu.cc/insights/${slug}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(getShareUrl());
  const shareTitle = encodeURIComponent(title);

  return (
    <div className="space-y-3">
      <h5 className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest">Share This Post</h5>
      <div className="flex flex-wrap gap-2.5">
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="px-4 py-2.5 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-xl text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-secondary" />
              Link Copied
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" />
              Copy Link
            </>
          )}
        </button>

        {/* WhatsApp Share */}
        <a
          href={`https://api.whatsapp.com/send?text=${shareTitle}%20-%20${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-green-50 hover:bg-green-100 border border-green-100 rounded-xl text-[10px] font-bold uppercase tracking-wider text-green-700 flex items-center gap-1.5 transition-colors animate-pulse hover:animate-none"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.908-6.993-1.879-1.879-4.36-2.91-7-2.912-5.437 0-9.862 4.42-9.866 9.864-.001 1.702.463 3.361 1.34 4.811L.88 21.12l4.183-1.096zM16.82 14.15c-.263-.133-1.557-.77-1.796-.857-.239-.087-.413-.13-.587.13-.174.26-.674.857-.826 1.03-.152.173-.304.195-.567.062-.263-.133-1.11-.41-2.116-1.307-.783-.7-1.31-1.564-1.464-1.826-.152-.263-.016-.405.116-.537.12-.12.263-.304.394-.455.132-.15.176-.26.263-.433.087-.173.044-.325-.022-.455-.065-.13-.587-1.413-.804-1.936-.211-.509-.443-.44-.59-.446h-.413c-.152 0-.401.057-.61.287-.206.23-.79.77-.79 1.88 0 1.11.808 2.185.92 2.336.114.152 1.593 2.433 3.86 3.415.54.234.96.373 1.288.477.543.172 1.037.147 1.428.09.436-.064 1.557-.638 1.777-1.256.22-.617.22-1.147.152-1.256-.065-.109-.239-.174-.502-.307z"/>
          </svg>
          WhatsApp
        </a>

        {/* Facebook Share */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </a>

        {/* X / Twitter Share */}
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-sky-50 hover:bg-sky-100 border border-sky-100 rounded-xl text-[10px] font-bold uppercase tracking-wider text-sky-600 flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X / Twitter
        </a>
      </div>
    </div>
  );
}
