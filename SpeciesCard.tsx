import React from 'react';
import { Species, Language } from '../types';
import { Thermometer, Droplets, Ruler, ShieldCheck, AlertCircle, Eye } from 'lucide-react';

interface SpeciesCardProps {
  species: Species;
  language: Language;
  onSelect: (species: Species) => void;
}

export const SpeciesCard: React.FC<SpeciesCardProps> = ({ species, language, onSelect }) => {
  const isTagalog = language === 'TL';

  const venomConfig = {
    MILD: { color: 'text-[#00E676] bg-[#00E676]/10 border-[#00E676]/30', label: isTagalog ? 'Mababang Kamandag' : 'Mild Venom' },
    MODERATE: { color: 'text-[#FF9100] bg-[#FF9100]/10 border-[#FF9100]/30', label: isTagalog ? 'Masakit na Kagat' : 'Moderate / Painful' },
    MEDICALLY_SIGNIFICANT: { color: 'text-[#FF3366] bg-[#FF3366]/10 border-[#FF3366]/30', label: isTagalog ? 'Medically Significant' : 'Medically Significant' },
    HAZARDOUS: { color: 'text-red-500 bg-red-950/40 border-red-500/50', label: isTagalog ? 'LUBHANG MAPANGANIB' : 'HAZARDOUS VENOM' },
  };

  const vInfo = venomConfig[species.venomLevel];

  return (
    <div
      onClick={() => onSelect(species)}
      className="group relative bg-[#101520] hover:bg-[#141B2B] border border-[#232D3F] hover:border-[#00E5FF]/60 rounded-xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-md hover:shadow-[0_4px_20px_rgba(0,229,255,0.15)]"
    >
      <div>
        {/* Top badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono tracking-wider px-2 py-0.5 rounded bg-[#181F2E] text-[#00E5FF] font-semibold border border-[#00E5FF]/20">
            {species.category}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${vInfo.color}`}>
            {vInfo.label}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
          {isTagalog ? species.commonNameTl : species.commonName}
        </h3>
        <p className="text-xs italic text-[#00E5FF] font-mono mt-0.5">
          {species.scientificName}
        </p>

        {/* Quick parameters grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#232D3F]/60 text-[11px]">
          <div className="bg-[#181F2E]/60 p-2 rounded-lg border border-[#232D3F]/40 flex flex-col items-center text-center">
            <Thermometer className="w-3.5 h-3.5 text-[#00E5FF] mb-1" />
            <span className="text-[10px] text-[#94A3B8]">Temp</span>
            <span className="font-semibold text-white mt-0.5 text-[10px]">{species.temperatureRange.split('(')[0]}</span>
          </div>

          <div className="bg-[#181F2E]/60 p-2 rounded-lg border border-[#232D3F]/40 flex flex-col items-center text-center">
            <Droplets className="w-3.5 h-3.5 text-[#00E5FF] mb-1" />
            <span className="text-[10px] text-[#94A3B8]">Humidity</span>
            <span className="font-semibold text-white mt-0.5 text-[10px]">{species.humidityRange.split('(')[0]}</span>
          </div>

          <div className="bg-[#181F2E]/60 p-2 rounded-lg border border-[#232D3F]/40 flex flex-col items-center text-center">
            <Ruler className="w-3.5 h-3.5 text-[#00E5FF] mb-1" />
            <span className="text-[10px] text-[#94A3B8]">Size</span>
            <span className="font-semibold text-white mt-0.5 text-[10px]">{species.adultSize.split('(')[0]}</span>
          </div>
        </div>

        {/* Enclosure summary */}
        <p className="text-xs text-[#94A3B8] mt-3 line-clamp-2 leading-relaxed">
          {isTagalog ? species.enclosureTl : species.enclosure}
        </p>
      </div>

      {/* Footer verification & CTA */}
      <div className="mt-4 pt-3 border-t border-[#232D3F]/60 flex items-center justify-between">
        <span className="inline-flex items-center text-[10px] text-[#00E676] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 mr-1" />
          Verified
        </span>
        <span className="inline-flex items-center text-xs text-[#00E5FF] font-bold group-hover:translate-x-0.5 transition-transform">
          <Eye className="w-3.5 h-3.5 mr-1" />
          {isTagalog ? 'Suriin' : 'Care Sheet'}
        </span>
      </div>
    </div>
  );
};
