import React from 'react';
import { Species, Language } from '../types';
import {
  X,
  Thermometer,
  Droplets,
  Ruler,
  Clock,
  Home,
  Layers,
  Wind,
  Coffee,
  Utensils,
  RefreshCw,
  Heart,
  AlertTriangle,
  BookOpen,
  ShieldAlert,
  Stethoscope,
  Info
} from 'lucide-react';

interface SpeciesDetailModalProps {
  species: Species | null;
  language: Language;
  onClose: () => void;
  onAskAi: (query: string) => void;
}

export const SpeciesDetailModal: React.FC<SpeciesDetailModalProps> = ({
  species,
  language,
  onClose,
  onAskAi
}) => {
  if (!species) return null;
  const isTagalog = language === 'TL';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#101520] border border-[#232D3F] rounded-2xl shadow-2xl my-8 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 bg-[#090C12]/95 border-b border-[#232D3F]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-[#00E5FF] px-2 py-0.5 rounded bg-[#181F2E] border border-[#00E5FF]/30">
                {species.category}
              </span>
              <span className="text-[11px] font-semibold text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/30">
                Husbandry Verified
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {isTagalog ? species.commonNameTl : species.commonName}
            </h2>
            <p className="text-xs sm:text-sm italic font-mono text-[#00E5FF]">
              {species.scientificName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#94A3B8] hover:text-white hover:bg-[#181F2E] rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-[#E2E8F0]">
          {/* Handling & Venom Warning Banner */}
          <div className={`p-4 rounded-xl border flex items-start space-x-3 ${
            species.handlingRecommended
              ? 'bg-[#181F2E] border-[#232D3F]'
              : 'bg-[#FF3366]/10 border-[#FF3366]/40 text-[#FF3366]'
          }`}>
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-xs uppercase tracking-wider block">
                {isTagalog ? 'Alituntunin sa Paghawak at Kaligtasan' : 'Safety & Handling Directive'}
              </span>
              <p className="text-xs mt-1 text-[#E2E8F0]">
                {species.handlingRecommended
                  ? (isTagalog ? 'Maaaring hawakan nang banayad at may pag-iingat.' : 'Tolerates calm, low-stress handling under supervision.')
                  : (isTagalog ? 'BAWAL HAWAKAN SA KAMAY (Display Only): Ang paghawak ay nagdudulot ng matinding stress, pagkahulog, at panganib sa kagat/kamandag.' : 'STRICTLY DISPLAY ANIMAL: Physical handling is strongly discouraged. Poses significant stress, fall hazard, and envenomation risk.')}
              </p>
              {species.warningNotes && (
                <p className="text-xs mt-2 font-semibold text-[#FF9100]">
                  ⚠️ {isTagalog ? species.warningNotesTl : species.warningNotes}
                </p>
              )}
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#181F2E] p-3 rounded-xl border border-[#232D3F]">
              <div className="flex items-center text-[#94A3B8] text-xs mb-1">
                <Ruler className="w-3.5 h-3.5 mr-1 text-[#00E5FF]" />
                {isTagalog ? 'Laki' : 'Adult Size'}
              </div>
              <p className="font-bold text-white text-xs sm:text-sm">{species.adultSize}</p>
            </div>

            <div className="bg-[#181F2E] p-3 rounded-xl border border-[#232D3F]">
              <div className="flex items-center text-[#94A3B8] text-xs mb-1">
                <Clock className="w-3.5 h-3.5 mr-1 text-[#00E5FF]" />
                {isTagalog ? 'Haba ng Buhay' : 'Lifespan'}
              </div>
              <p className="font-bold text-white text-xs sm:text-sm">
                {isTagalog ? species.lifespanTl : species.lifespan}
              </p>
            </div>

            <div className="bg-[#181F2E] p-3 rounded-xl border border-[#232D3F]">
              <div className="flex items-center text-[#94A3B8] text-xs mb-1">
                <Thermometer className="w-3.5 h-3.5 mr-1 text-[#00E5FF]" />
                {isTagalog ? 'Temperatura' : 'Temperature'}
              </div>
              <p className="font-bold text-[#00E5FF] text-xs sm:text-sm">{species.temperatureRange}</p>
            </div>

            <div className="bg-[#181F2E] p-3 rounded-xl border border-[#232D3F]">
              <div className="flex items-center text-[#94A3B8] text-xs mb-1">
                <Droplets className="w-3.5 h-3.5 mr-1 text-[#00E5FF]" />
                {isTagalog ? 'Halumigmig' : 'Humidity'}
              </div>
              <p className="font-bold text-white text-xs sm:text-sm">{species.humidityRange}</p>
            </div>
          </div>

          {/* Habitat */}
          <div className="bg-[#141B2B] p-4 rounded-xl border border-[#232D3F]">
            <h4 className="font-bold text-[#00E5FF] text-xs uppercase tracking-wider mb-2 flex items-center">
              <Info className="w-4 h-4 mr-1.5" />
              {isTagalog ? 'Natural na Tirahan at Pinagmulan' : 'Natural Habitat & Distribution'}
            </h4>
            <p className="text-xs text-[#E2E8F0] leading-relaxed">
              {isTagalog ? species.naturalHabitatTl : species.naturalHabitat}
            </p>
          </div>

          {/* Enclosure, Substrate & Ventilation */}
          <div className="bg-[#141B2B] p-4 rounded-xl border border-[#232D3F] space-y-3">
            <h4 className="font-bold text-[#00E5FF] text-xs uppercase tracking-wider flex items-center">
              <Home className="w-4 h-4 mr-1.5" />
              {isTagalog ? 'Kulungan, Lupa at Bentilasyon' : 'Enclosure, Substrate & Ventilation'}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-white min-w-[90px]">{isTagalog ? 'Kulungan:' : 'Enclosure:'}</span>
                <span className="text-[#94A3B8]">{isTagalog ? species.enclosureTl : species.enclosure}</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-white min-w-[90px]">{isTagalog ? 'Lupa (Substrate):' : 'Substrate:'}</span>
                <span className="text-[#94A3B8]">{isTagalog ? species.substrateTl : species.substrate}</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-white min-w-[90px]">{isTagalog ? 'Bentilasyon:' : 'Ventilation:'}</span>
                <span className="text-[#94A3B8]">{isTagalog ? species.ventilationTl : species.ventilation}</span>
              </div>
            </div>
          </div>

          {/* Hydration & Diet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#141B2B] p-4 rounded-xl border border-[#232D3F]">
              <h4 className="font-bold text-[#00E5FF] text-xs uppercase tracking-wider mb-2 flex items-center">
                <Coffee className="w-4 h-4 mr-1.5" />
                {isTagalog ? 'Tubig at Hydration' : 'Hydration & Water Supply'}
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {isTagalog ? species.hydrationTl : species.hydration}
              </p>
            </div>

            <div className="bg-[#141B2B] p-4 rounded-xl border border-[#232D3F]">
              <h4 className="font-bold text-[#00E5FF] text-xs uppercase tracking-wider mb-2 flex items-center">
                <Utensils className="w-4 h-4 mr-1.5" />
                {isTagalog ? 'Pagkain at Iskedyul' : 'Diet & Feeding Schedule'}
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                <strong className="text-white">{isTagalog ? 'Diyeta: ' : 'Diet: '}</strong>
                {isTagalog ? species.dietTl : species.diet}
              </p>
              <p className="text-xs text-[#94A3B8] leading-relaxed mt-1">
                <strong className="text-white">{isTagalog ? 'Iskedyul: ' : 'Schedule: '}</strong>
                {isTagalog ? species.feedingScheduleTl : species.feedingSchedule}
              </p>
            </div>
          </div>

          {/* Behavior & Molting */}
          <div className="bg-[#141B2B] p-4 rounded-xl border border-[#232D3F] space-y-3">
            <h4 className="font-bold text-[#00E5FF] text-xs uppercase tracking-wider flex items-center">
              <RefreshCw className="w-4 h-4 mr-1.5" />
              {isTagalog ? 'Ugali, Pagbabalat at Pagluluno (Molting)' : 'Behavior & Molting Dynamics'}
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              <strong className="text-white">{isTagalog ? 'Ugali: ' : 'Behavior: '}</strong>
              {isTagalog ? species.behaviorTl : species.behavior}
            </p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              <strong className="text-white">{isTagalog ? 'Pagbabalat: ' : 'Molting Protocol: '}</strong>
              {isTagalog ? species.moltingInfoTl : species.moltingInfo}
            </p>
          </div>

          {/* Breeding */}
          <div className="bg-[#141B2B] p-4 rounded-xl border border-[#232D3F]">
            <h4 className="font-bold text-[#00E5FF] text-xs uppercase tracking-wider mb-2 flex items-center">
              <Heart className="w-4 h-4 mr-1.5" />
              {isTagalog ? 'Pangangasiwa sa Pagpaparami (Breeding)' : 'Breeding & Reproduction Notes'}
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {isTagalog ? species.breedingNotesTl : species.breedingNotes}
            </p>
          </div>

          {/* Common Mistakes */}
          <div className="bg-[#141B2B] p-4 rounded-xl border border-[#FF9100]/30">
            <h4 className="font-bold text-[#FF9100] text-xs uppercase tracking-wider mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1.5" />
              {isTagalog ? 'Mga Karaniwang Pagkakamali sa Husbandry' : 'Common Husbandry Mistakes to Avoid'}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#E2E8F0]">
              {(isTagalog ? species.commonMistakesTl : species.commonMistakes).map((m, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#FF9100] font-bold">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scientific Sources & References */}
          <div className="bg-[#090C12] p-4 rounded-xl border border-[#232D3F]">
            <h4 className="font-bold text-[#00E676] text-xs uppercase tracking-wider mb-2 flex items-center">
              <BookOpen className="w-4 h-4 mr-1.5" />
              {isTagalog ? 'Mga Siyentipikong Sanggunian at Batayan' : 'Scientific Sources & Peer-Reviewed References'}
            </h4>
            <ul className="space-y-1 text-xs text-[#94A3B8]">
              {species.sources.map((src, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                  <span>{src}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Veterinary Notice Reminder */}
          <div className="p-3 rounded-lg bg-[#181F2E] border border-[#232D3F] flex items-center space-x-2 text-xs text-[#94A3B8]">
            <Stethoscope className="w-4 h-4 text-[#00E5FF] shrink-0" />
            <span>
              {isTagalog
                ? 'Paalala: Para sa emergency o sakit, kumonsulta sa lisensyadong exotic animal veterinarian.'
                : 'Medical disclaimer: Consult a qualified exotic animal veterinarian for diagnosis or medical emergencies.'}
            </span>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 bg-[#090C12] border-t border-[#232D3F] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onAskAi(`Give me specific advice about caring for my ${species.commonName} (${species.scientificName})`);
            }}
            className="px-4 py-2 bg-[#00E5FF] text-[#090C12] font-bold text-xs rounded-lg hover:bg-[#38EFFF] transition-all flex items-center space-x-1.5"
          >
            <span>{isTagalog ? 'Magtanong sa KAPETZ AI tungkol dito' : 'Ask KAPETZ AI About This Species'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#232D3F] text-[#94A3B8] hover:text-white rounded-lg text-xs font-semibold"
          >
            {isTagalog ? 'Isara' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
