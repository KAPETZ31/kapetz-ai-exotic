import React, { useState, useEffect } from 'react';
import { Language, Species, SpeciesCategory } from './types';
import { translations } from './utils/translations';
import { speciesList } from './data/speciesData';
import { Navbar } from './components/Navbar';
import { VeterinaryDisclaimer } from './components/VeterinaryDisclaimer';
import { SpeciesCard } from './components/SpeciesCard';
import { SpeciesDetailModal } from './components/SpeciesDetailModal';
import { SpeciesCompare } from './components/SpeciesCompare';
import { EnclosureGuides } from './components/EnclosureGuides';
import { CareChecklist } from './components/CareChecklist';
import { AiChatAssistant } from './components/AiChatAssistant';
import { MyPetsRegistry } from './components/MyPetsRegistry';
import { Footer } from './components/Footer';
import {
  Search,
  Sparkles,
  BookOpen,
  Shield,
  CheckSquare,
  MessageSquare,
  ArrowRight,
  Flame,
  Bug,
  Compass,
  AlertTriangle
} from 'lucide-react';

export function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('kapetz_lang') as Language) || 'EN';
  });

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SpeciesCategory | 'ALL'>('ALL');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  useEffect(() => {
    localStorage.setItem('kapetz_lang', language);
  }, [language]);

  const t = translations[language];
  const isTagalog = language === 'TL';

  // Filtered species list
  const filteredSpecies = speciesList.filter((sp) => {
    const matchesCategory = selectedCategory === 'ALL' || sp.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      sp.commonName.toLowerCase().includes(q) ||
      sp.commonNameTl.toLowerCase().includes(q) ||
      sp.scientificName.toLowerCase().includes(q) ||
      sp.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090C12] text-[#E2E8F0] flex flex-col font-sans selection:bg-[#00E5FF] selection:text-[#090C12]">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* ================= HOME TAB ================= */}
        {currentTab === 'home' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden border border-[#232D3F] bg-[#101520] shadow-2xl">
              <div className="absolute inset-0 z-0">
                <img
                  src="/hero.jpg"
                  alt="KAPETZ Terrariums"
                  className="w-full h-full object-cover opacity-35"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#090C12] via-[#090C12]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-transparent" />
              </div>

              <div className="relative z-10 p-6 sm:p-12 max-w-2xl space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.heroTag}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {t.heroTitle}
                </h1>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {t.heroDesc}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentTab('chat')}
                    className="px-5 py-2.5 rounded-xl bg-[#00E5FF] hover:bg-[#38EFFF] text-[#090C12] font-black text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.askAiBtn}</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('library')}
                    className="px-5 py-2.5 rounded-xl bg-[#181F2E] hover:bg-[#232D3F] border border-[#232D3F] hover:border-[#00E5FF]/40 text-white font-bold text-xs sm:text-sm transition-all flex items-center space-x-2"
                  >
                    <BookOpen className="w-4 h-4 text-[#00E5FF]" />
                    <span>{t.exploreLibraryBtn}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Veterinary Advisory Banner */}
            <VeterinaryDisclaimer language={language} />

            {/* Quick Categories Bar */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-white">
                  {isTagalog ? 'Mga Kategorya ng Uri' : 'Exotic Taxa Categories'}
                </h3>
                <span className="text-xs text-[#00E5FF] font-semibold cursor-pointer" onClick={() => setCurrentTab('library')}>
                  {isTagalog ? 'Tingnan Lahat →' : 'View All →'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { cat: 'TARANTULAS' as SpeciesCategory, title: isTagalog ? 'Tarantulas' : 'Tarantulas', sub: 'Theraphosidae', icon: Bug },
                  { cat: 'SCORPIONS' as SpeciesCategory, title: isTagalog ? 'Alakdan' : 'Scorpions', sub: 'Scorpiones', icon: Shield },
                  { cat: 'CENTIPEDES' as SpeciesCategory, title: isTagalog ? 'Alupihan' : 'Centipedes', sub: 'Chilopoda', icon: Flame },
                  { cat: 'REPTILES' as SpeciesCategory, title: isTagalog ? 'Reptilya' : 'Reptiles', sub: 'Squamata', icon: Compass },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.cat}
                      onClick={() => {
                        setSelectedCategory(item.cat);
                        setCurrentTab('library');
                      }}
                      className="bg-[#101520] hover:bg-[#141B2B] border border-[#232D3F] hover:border-[#00E5FF]/50 p-4 rounded-2xl cursor-pointer transition-all flex items-center space-x-3 group shadow-md"
                    >
                      <div className="p-2.5 rounded-xl bg-[#181F2E] text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-[#090C12] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white text-xs sm:text-sm group-hover:text-[#00E5FF] transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-[#94A3B8] font-mono">{item.sub}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Species Preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-black text-white">
                    {isTagalog ? 'Tampok na mga Care Sheet' : 'Featured Verified Care Sheets'}
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    {isTagalog
                      ? 'Beripikadong datos sa enclosure, halumigmig, at pagpapakain.'
                      : 'Scientific parameters for terrarium setups, molting dynamics, and venom classifications.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {speciesList.slice(0, 3).map((sp) => (
                  <SpeciesCard
                    key={sp.id}
                    species={sp}
                    language={language}
                    onSelect={(s) => setSelectedSpecies(s)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= LIBRARY TAB ================= */}
        {currentTab === 'library' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-[#00E5FF]" />
                <span>{isTagalog ? 'Siyentipikong Aklatan ng mga Uri' : 'Species Husbandry Library'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                {isTagalog
                  ? 'Komprehensibong care sheets para sa Tarantula, Alakdan, Alupihan, at Reptilya.'
                  : 'Searchable scientific care sheets with precise microclimate data and venom safety.'}
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-[#101520] p-4 rounded-2xl border border-[#232D3F] space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#00E5FF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-[#181F2E] text-white pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-[#232D3F] focus:border-[#00E5FF] focus:outline-none transition-colors"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {(['ALL', 'TARANTULAS', 'SCORPIONS', 'CENTIPEDES', 'REPTILES'] as const).map((cat) => {
                  const isSel = selectedCategory === cat;
                  const label =
                    cat === 'ALL'
                      ? t.allCategories
                      : cat === 'TARANTULAS'
                      ? t.tarantulas
                      : cat === 'SCORPIONS'
                      ? t.scorpions
                      : cat === 'CENTIPEDES'
                      ? t.centipedes
                      : t.reptiles;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isSel
                          ? 'bg-[#00E5FF] text-[#090C12] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                          : 'bg-[#181F2E] text-[#E2E8F0] hover:text-[#00E5FF] border border-[#232D3F]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSpecies.map((sp) => (
                <SpeciesCard
                  key={sp.id}
                  species={sp}
                  language={language}
                  onSelect={(s) => setSelectedSpecies(s)}
                />
              ))}
            </div>

            {filteredSpecies.length === 0 && (
              <div className="p-12 text-center bg-[#101520] rounded-2xl border border-[#232D3F]">
                <Search className="w-10 h-10 text-[#00E5FF] mx-auto mb-3 opacity-60" />
                <h4 className="font-bold text-white text-base">
                  {isTagalog ? 'Walang natagpuang uri' : 'No Species Matching Criteria'}
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {isTagalog ? 'Pakisubukang baguhin ang iyong search query.' : 'Try adjusting your search terms or clearing category filters.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= COMPARE TAB ================= */}
        {currentTab === 'compare' && <SpeciesCompare language={language} />}

        {/* ================= MY PETS TAB ================= */}
        {currentTab === 'mypets' && <MyPetsRegistry language={language} />}

        {/* ================= SETUP GUIDES TAB ================= */}
        {currentTab === 'guides' && <EnclosureGuides language={language} />}

        {/* ================= HUSBANDRY TASKS TAB ================= */}
        {currentTab === 'checklist' && <CareChecklist language={language} />}

        {/* ================= AI CHAT TAB ================= */}
        {currentTab === 'chat' && <AiChatAssistant language={language} />}
      </main>

      {/* Full Care Sheet Detail Modal */}
      <SpeciesDetailModal
        species={selectedSpecies}
        language={language}
        onClose={() => setSelectedSpecies(null)}
        onAskAi={(q) => {
          setSelectedSpecies(null);
          setCurrentTab('chat');
        }}
      />

      {/* Global Footer */}
      <Footer language={language} />
    </div>
  );
}
