import React, { useState } from 'react';
import { Species, Language } from '../types';
import { speciesList } from '../data/speciesData';
import { GitCompare, ArrowRightLeft, ShieldAlert, Check, X } from 'lucide-react';

interface SpeciesCompareProps {
  language: Language;
}

export const SpeciesCompare: React.FC<SpeciesCompareProps> = ({ language }) => {
  const isTagalog = language === 'TL';
  const [species1Id, setSpecies1Id] = useState<string>(speciesList[0].id);
  const [species2Id, setSpecies2Id] = useState<string>(speciesList[3]?.id || speciesList[1].id);

  const sp1 = speciesList.find((s) => s.id === species1Id) || speciesList[0];
  const sp2 = speciesList.find((s) => s.id === species2Id) || speciesList[1];

  const venomLabels = {
    MILD: isTagalog ? 'Mababang Kamandag' : 'Mild Venom',
    MODERATE: isTagalog ? 'Masakit na Kagat' : 'Moderate / Painful',
    MEDICALLY_SIGNIFICANT: isTagalog ? 'Medically Significant' : 'Medically Significant',
    HAZARDOUS: isTagalog ? 'DELIKADO SA BUHAY' : 'HAZARDOUS / DEADLY',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
          <GitCompare className="w-6 h-6 text-[#00E5FF]" />
          <span>{isTagalog ? 'Paghambingin ang Dalawang Uri' : 'Side-by-Side Species Comparison'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          {isTagalog
            ? 'Suriin ang pagkakaiba sa microclimate, antas ng kamandag, laki, at kinakailangang kulungan.'
            : 'Evaluate microclimate parameters, venom risks, enclosure engineering, and temperaments.'}
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#101520] p-4 rounded-xl border border-[#232D3F]">
        <div>
          <label className="block text-xs font-semibold text-[#00E5FF] mb-1">
            {isTagalog ? 'Pumili ng Unang Uri:' : 'Select First Species:'}
          </label>
          <select
            value={species1Id}
            onChange={(e) => setSpecies1Id(e.target.value)}
            className="w-full bg-[#181F2E] text-white border border-[#232D3F] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#00E5FF]"
          >
            {speciesList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.commonName} ({s.scientificName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#00E5FF] mb-1">
            {isTagalog ? 'Pumili ng Pangalawang Uri:' : 'Select Second Species:'}
          </label>
          <select
            value={species2Id}
            onChange={(e) => setSpecies2Id(e.target.value)}
            className="w-full bg-[#181F2E] text-white border border-[#232D3F] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#00E5FF]"
          >
            {speciesList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.commonName} ({s.scientificName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-[#101520] border border-[#232D3F] rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-3 bg-[#090C12] border-b border-[#232D3F] p-4 text-xs font-bold text-white items-center">
          <div className="text-[#94A3B8]">{isTagalog ? 'Katangian' : 'Husbandry Parameter'}</div>
          <div className="text-[#00E5FF] font-extrabold truncate pr-2">
            {isTagalog ? sp1.commonNameTl : sp1.commonName}
          </div>
          <div className="text-[#00E5FF] font-extrabold truncate pr-2">
            {isTagalog ? sp2.commonNameTl : sp2.commonName}
          </div>
        </div>

        <div className="divide-y divide-[#232D3F] text-xs">
          {/* Scientific Name */}
          <div className="grid grid-cols-3 p-4 items-center hover:bg-[#141B2B]">
            <div className="font-semibold text-[#94A3B8]">Scientific Name</div>
            <div className="italic font-mono text-white">{sp1.scientificName}</div>
            <div className="italic font-mono text-white">{sp2.scientificName}</div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-3 p-4 items-center hover:bg-[#141B2B]">
            <div className="font-semibold text-[#94A3B8]">Category</div>
            <div className="font-semibold text-white">{sp1.category}</div>
            <div className="font-semibold text-white">{sp2.category}</div>
          </div>

          {/* Venom Significance */}
          <div className="grid grid-cols-3 p-4 items-center hover:bg-[#141B2B]">
            <div className="font-semibold text-[#94A3B8]">{isTagalog ? 'Kamandag' : 'Venom Level'}</div>
            <div>
              <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${
                sp1.venomLevel === 'MILD'
                  ? 'bg-[#00E676]/20 text-[#00E676]'
                  : 'bg-[#FF3366]/20 text-[#FF3366]'
              }`}>
                {venomLabels[sp1.venomLevel]}
              </span>
            </div>
            <div>
              <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${
                sp2.venomLevel === 'MILD'
                  ? 'bg-[#00E676]/20 text-[#00E676]'
                  : 'bg-[#FF3366]/20 text-[#FF3366]'
              }`}>
                {venomLabels[sp2.venomLevel]}
              </span>
            </div>
          </div>

          {/* Adult Size */}
          <div className="grid grid-cols-3 p-4 items-center hover:bg-[#141B2B]">
            <div className="font-semibold text-[#94A3B8]">{isTagalog ? 'Laki' : 'Adult Size'}</div>
            <div className="text-white font-medium">{sp1.adultSize}</div>
            <div className="text-white font-medium">{sp2.adultSize}</div>
          </div>

          {/* Temperature Range */}
          <div className="grid grid-cols-3 p-4 items-center hover:bg-[#141B2B]">
            <div className="font-semibold text-[#94A3B8]">{isTagalog ? 'Temperatura' : 'Temperature'}</div>
            <div className="text-[#00E5FF] font-semibold">{sp1.temperatureRange}</div>
            <div className="text-[#00E5FF] font-semibold">{sp2.temperatureRange}</div>
          </div>

          {/* Humidity Range */}
          <div className="grid grid-cols-3 p-4 items-center hover:bg-[#141B2B]">
            <div className="font-semibold text-[#94A3B8]">{isTagalog ? 'Halumigmig' : 'Humidity'}</div>
            <div className="text-white">{sp1.humidityRange}</div>
            <div className="text-white">{sp2.humidityRange}</div>
          </div>

          {/* Lifespan */}
          <div className="grid grid-cols-3 p-4 items-center hover:bg-[#141B2B]">
            <div className="font-semibold text-[#94A3B8]">{isTagalog ? 'Haba ng Buhay' : 'Lifespan'}</div>
            <div className="text-white">{isTagalog ? sp1.lifespanTl : sp1.lifespan}</div>
            <div className="text-white">{isTagalog ? sp2.lifespanTl : sp2.lifespan}</div>
          </div>

          {/* Handling Recommendation */}
          <div className="grid grid-cols-3 p-4 items-center hover:bg-[#141B2B]">
            <div className="font-semibold text-[#94A3B8]">{isTagalog ? 'Paghawak' : 'Handling'}</div>
            <div>
              {sp1.handlingRecommended ? (
                <span className="text-[#00E676] font-bold flex items-center">
                  <Check className="w-3.5 h-3.5 mr-1" />
                  {isTagalog ? 'Puwede (Banayad)' : 'Tolerates Handling'}
                </span>
              ) : (
                <span className="text-[#FF3366] font-bold flex items-center">
                  <X className="w-3.5 h-3.5 mr-1" />
                  {isTagalog ? 'Bawal (Display Only)' : 'DO NOT HANDLE'}
                </span>
              )}
            </div>
            <div>
              {sp2.handlingRecommended ? (
                <span className="text-[#00E676] font-bold flex items-center">
                  <Check className="w-3.5 h-3.5 mr-1" />
                  {isTagalog ? 'Puwede (Banayad)' : 'Tolerates Handling'}
                </span>
              ) : (
                <span className="text-[#FF3366] font-bold flex items-center">
                  <X className="w-3.5 h-3.5 mr-1" />
                  {isTagalog ? 'Bawal (Display Only)' : 'DO NOT HANDLE'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
