import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { Shield, Download, Cloud, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];
  const isTagalog = language === 'TL';

  return (
    <footer className="mt-20 border-t border-[#232D3F] bg-[#090C12] text-xs text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Top 3-Column Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Safety Pledge */}
          <div className="bg-[#101520] p-5 rounded-2xl border border-[#00E676]/30 shadow-md">
            <h4 className="text-white font-extrabold text-sm flex items-center space-x-2 text-[#00E676] mb-3">
              <Shield className="w-4 h-4" />
              <span>{t.safetyPledge}</span>
            </h4>
            <p className="whitespace-pre-line leading-relaxed text-[#CBD5E1] text-[11px]">
              {t.safetyPledgeText}
            </p>
          </div>

          {/* Card 2: Free Static Hosting Guide */}
          <div className="bg-[#101520] p-5 rounded-2xl border border-[#00E5FF]/30 shadow-md">
            <h4 className="text-white font-extrabold text-sm flex items-center space-x-2 text-[#00E5FF] mb-3">
              <Cloud className="w-4 h-4" />
              <span>{t.freeTierTitle}</span>
            </h4>
            <p className="leading-relaxed text-[#CBD5E1] text-[11px] mb-3">
              {t.freeTierBody}
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[#00E5FF]">
              <span className="bg-[#181F2E] px-2 py-0.5 rounded border border-[#00E5FF]/20">Vercel</span>
              <span className="bg-[#181F2E] px-2 py-0.5 rounded border border-[#00E5FF]/20">Netlify</span>
              <span className="bg-[#181F2E] px-2 py-0.5 rounded border border-[#00E5FF]/20">Cloudflare</span>
              <span className="bg-[#181F2E] px-2 py-0.5 rounded border border-[#00E5FF]/20">GitHub Pages</span>
            </div>
          </div>

          {/* Card 3: Export & Source Files */}
          <div className="bg-[#101520] p-5 rounded-2xl border border-[#232D3F] shadow-md">
            <h4 className="text-white font-extrabold text-sm flex items-center space-x-2 text-white mb-3">
              <Download className="w-4 h-4 text-[#00E5FF]" />
              <span>{t.exportTitle}</span>
            </h4>
            <p className="leading-relaxed text-[#CBD5E1] text-[11px]">
              {t.exportBody}
            </p>
            <div className="mt-3 text-[11px] font-mono bg-[#181F2E] p-2 rounded text-[#00E5FF] border border-[#232D3F]">
              cd web &amp;&amp; npm install &amp;&amp; npm run dev
            </div>
          </div>
        </div>

        {/* Bottom copyright & Brand */}
        <div className="pt-6 border-t border-[#232D3F]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <img src="/logo.jpg" alt="Logo" className="w-6 h-6 rounded-full border border-[#00E5FF]" />
            <span className="font-bold text-white tracking-wider">KAPETZ AI</span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#94A3B8]">Exotic Pet Care Assistant</span>
          </div>

          <p className="text-[11px] text-[#94A3B8] text-center sm:text-right">
            {isTagalog
              ? 'Nakatuon sa makatao, ligtas, at siyentipikong pag-aalaga ng exotic animals.'
              : 'Dedicated to ethical, safe, and scientifically grounded exotic pet care.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
