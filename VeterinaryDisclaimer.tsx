import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { AlertTriangle, Stethoscope } from 'lucide-react';

interface VeterinaryDisclaimerProps {
  language: Language;
}

export const VeterinaryDisclaimer: React.FC<VeterinaryDisclaimerProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="rounded-xl border border-[#00E5FF]/30 bg-[#101520] p-4 text-xs shadow-md">
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] mt-0.5 shrink-0">
          <Stethoscope className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-sm">{t.vetNoticeTitle}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FF9100]/20 text-[#FF9100] border border-[#FF9100]/40">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Safety Priority
            </span>
          </div>
          <p className="mt-1 text-[#94A3B8] leading-relaxed">
            {t.vetNoticeBody}
          </p>
        </div>
      </div>
    </div>
  );
};
