"use client";

import { Globe, Zap } from "lucide-react";
import { trackEmailClick, trackPhoneClick } from "@/lib/analytics";

/** Client component for Footer links that need onClick tracking. */
export function FooterTrackingLinks() {
  return (
    <>
      <li className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
          <Globe className="w-4 h-4" aria-hidden="true" />
        </div>
        <a
          href="mailto:hello@example.com"
          className="group-hover:text-slate-900 transition-colors"
          onClick={() => trackEmailClick("hello@example.com")}
        >
          hello@example.com
        </a>
      </li>
      <li className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-rotate-6">
          <Zap className="w-4 h-4" aria-hidden="true" />
        </div>
        <a
          href="tel:+420000000000"
          className="group-hover:text-slate-900 transition-colors"
          onClick={() => trackPhoneClick("+420000000000")}
        >
          +420 000 000 000
        </a>
      </li>
    </>
  );
}
