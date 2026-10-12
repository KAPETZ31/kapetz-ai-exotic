import React from 'react';
import { Language } from '../types';
import { guidesList } from '../data/guidesData';
import { Shield, Wrench, AlertTriangle, CheckCircle } from 'lucide-react';

interface EnclosureGuidesProps {
  language: Language;
}

export const EnclosureGuides: React.FC<EnclosureGuidesProps> = ({ language }) => {
  const isTagalog = language === 'TL';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
          <Shield className="w-6 h-6 text-[#00E5FF]" />
          <span>{isTagalog ? 'Mga Gabay sa Kulungan at Kagamitan' : 'Equipment & Enclosure Setup Guides'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          {isTagalog
            ? 'Siyentipikong pamantayan sa escape-prevention, tamang lalim ng lupa, at bentilasyon.'
            : 'Engineering escape-proof habitats, subterranean moisture gradients, and proper cross-ventilation.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {guidesList.map((guide) => (
          <div
            key={guide.id}
            className="bg-[#101520] border border-[#232D3F] hover:border-[#00E5FF]/40 rounded-2xl p-5 flex flex-col justify-between shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-[#00E5FF] px-2 py-0.5 rounded bg-[#181F2E] border border-[#00E5FF]/20">
                  {isTagalog ? guide.categoryTl : guide.categoryEn}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                {isTagalog ? guide.titleTl : guide.titleEn}
              </h3>
              <p className="text-xs text-[#94A3B8] mb-4 leading-relaxed">
                {isTagalog ? guide.summaryTl : guide.summaryEn}
              </p>

              {/* Required Equipment */}
              <div className="bg-[#181F2E]/60 p-3 rounded-xl border border-[#232D3F]/60 mb-4">
                <h4 className="text-xs font-bold text-[#00E5FF] mb-2 flex items-center">
                  <Wrench className="w-3.5 h-3.5 mr-1" />
                  {isTagalog ? 'Kailangang Kagamitan:' : 'Required Equipment:'}
                </h4>
                <ul className="space-y-1 text-xs text-[#E2E8F0]">
                  {(isTagalog ? guide.equipmentRequiredTl : guide.equipmentRequiredEn).map((eq, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by step */}
              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {isTagalog ? 'Mga Hakbang sa Pagbuo:' : 'Assembly Instructions:'}
                </h4>
                {(isTagalog ? guide.stepsTl : guide.stepsEn).map((st, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-[#94A3B8]">
                    <span className="font-bold text-[#00E5FF]">{i + 1}.</span>
                    <span className="leading-relaxed">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="pt-3 border-t border-[#232D3F]">
              <div className="p-3 rounded-lg bg-[#FF9100]/10 border border-[#FF9100]/30 text-xs text-[#FF9100]">
                <div className="font-bold flex items-center mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                  {isTagalog ? 'Mahalagang Babala sa Kaligtasan:' : 'Crucial Safety Alert:'}
                </div>
                {(isTagalog ? guide.safetyTipsTl : guide.safetyTipsEn).map((t, i) => (
                  <p key={i} className="text-[11px] text-[#E2E8F0] mt-0.5">• {t}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
