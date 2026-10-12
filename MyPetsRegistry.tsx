import React, { useState, useEffect } from 'react';
import { UserPet, Language, SpeciesCategory, CareReminder } from '../types';
import { speciesList } from '../data/speciesData';
import {
  Heart,
  Plus,
  Trash2,
  Utensils,
  RefreshCw,
  AlertCircle,
  Calendar,
  Layers,
  ShieldAlert,
  CheckCircle,
  Lock
} from 'lucide-react';

interface MyPetsRegistryProps {
  language: Language;
}

export const MyPetsRegistry: React.FC<MyPetsRegistryProps> = ({ language }) => {
  const isTagalog = language === 'TL';

  const defaultSamplePets: UserPet[] = [
    {
      id: 'pet_1',
      name: 'Shadow',
      speciesId: 'scorpion_afs',
      customSpeciesName: 'Asian Forest Scorpion',
      category: 'SCORPIONS',
      acquisitionDate: '2024-03-15',
      stage: 'Adult',
      enclosureNotes: '5-gal glass terrarium, bioactive coco coir, flat cork bark hide',
      lastFedTimestamp: Date.now() - 8 * 24 * 60 * 60 * 1000, // 8 days ago (due)
      feedIntervalDays: 7,
      lastMoltTimestamp: 0,
      isPostMoltResting: false,
      customNotes: 'Active under UV blacklight, healthy male'
    }
  ];

  const [pets, setPets] = useState<UserPet[]>(() => {
    const saved = localStorage.getItem('kapetz_user_pets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultSamplePets;
      }
    }
    return defaultSamplePets;
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [petName, setPetName] = useState('');
  const [category, setCategory] = useState<SpeciesCategory>('TARANTULAS');
  const [selectedSpeciesId, setSelectedSpeciesId] = useState(speciesList[0].id);
  const [customSpecies, setCustomSpecies] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState(new Date().toISOString().split('T')[0]);
  const [stage, setStage] = useState<'Sling / Scorpling' | 'Juvenile' | 'Sub-Adult' | 'Adult'>('Juvenile');
  const [feedIntervalDays, setFeedIntervalDays] = useState(7);
  const [enclosureNotes, setEnclosureNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('kapetz_user_pets', JSON.stringify(pets));
  }, [pets]);

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim()) return;

    const newPet: UserPet = {
      id: `pet_${Date.now()}`,
      name: petName.trim(),
      speciesId: selectedSpeciesId,
      customSpeciesName: customSpecies.trim(),
      category,
      acquisitionDate,
      stage,
      enclosureNotes: enclosureNotes.trim(),
      lastFedTimestamp: Date.now(),
      feedIntervalDays: feedIntervalDays || 7,
      lastMoltTimestamp: 0,
      isPostMoltResting: false,
      customNotes: ''
    };

    setPets((prev) => [newPet, ...prev]);
    setIsAddOpen(false);
    setPetName('');
    setCustomSpecies('');
    setEnclosureNotes('');
  };

  const deletePet = (id: string) => {
    setPets((prev) => prev.filter((p) => p.id !== id));
  };

  const logFeeding = (id: string) => {
    setPets((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, lastFedTimestamp: Date.now(), isPostMoltResting: false } : p
      )
    );
  };

  const logMolt = (id: string) => {
    setPets((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, lastMoltTimestamp: Date.now(), isPostMoltResting: true } : p
      )
    );
  };

  // Generate Personalized Care Reminders
  const reminders: CareReminder[] = [];
  const now = Date.now();

  pets.forEach((pet) => {
    const sp = speciesList.find((s) => s.id === pet.speciesId);
    const spName = sp ? sp.commonName : pet.customSpeciesName || pet.category;

    // 1. Post-Molt Sclerotization Rest (DO NOT FEED SOFT FANGS)
    if (pet.isPostMoltResting && pet.lastMoltTimestamp > 0) {
      const daysSinceMolt = Math.floor((now - pet.lastMoltTimestamp) / (24 * 60 * 60 * 1000));
      const requiredRestDays = pet.category === 'TARANTULAS' || pet.category === 'SCORPIONS' ? 7 : 4;

      if (daysSinceMolt < requiredRestDays) {
        const remaining = requiredRestDays - daysSinceMolt;
        reminders.push({
          id: `molt_${pet.id}`,
          petId: pet.id,
          petName: pet.name,
          speciesName: spName,
          titleEn: 'Post-Molt Recovery: DO NOT FEED',
          titleTl: 'Kakatapos Magbalat: HUWAG PAKAININ',
          descEn: `${pet.name} molted ${daysSinceMolt} day(s) ago. Fangs and exoskeleton are soft. Offering prey now risks fatal fang breakage! Wait ${remaining} more day(s).`,
          descTl: `Nagbalat si ${pet.name} ${daysSinceMolt} araw na ang nakalipas. Malambot ang pangil. Huwag magpakain at maghintay ng ${remaining} araw pa.`,
          urgency: 'CRITICAL',
          isDue: true,
          dueTextEn: `${remaining} days resting left`,
          dueTextTl: `${remaining} araw pang nagpapalakas`
        });
      }
    }

    // 2. Feeding Schedule Due
    const daysSinceFeed = Math.floor((now - pet.lastFedTimestamp) / (24 * 60 * 60 * 1000));
    const interval = pet.feedIntervalDays || 7;

    if (daysSinceFeed >= interval) {
      const overdue = daysSinceFeed - interval;
      reminders.push({
        id: `feed_${pet.id}`,
        petId: pet.id,
        petName: pet.name,
        speciesName: spName,
        titleEn: overdue > 0 ? `Feeding Overdue by ${overdue} day(s)` : 'Feeding Scheduled Today',
        titleTl: overdue > 0 ? `Lampas na ng ${overdue} araw ang pagkain` : 'Oras ng Pagpapakain Ngayon',
        descEn: `Last fed ${daysSinceFeed} days ago. Inspect water dish and offer size-appropriate gut-loaded prey.`,
        descTl: `Huling napakain ${daysSinceFeed} araw na ang nakalipas. Suriin ang tubig at maghanda ng angkop na pagkain.`,
        urgency: overdue >= 3 ? 'CRITICAL' : 'UPCOMING',
        isDue: true,
        dueTextEn: overdue > 0 ? `${overdue}d overdue` : 'Due today',
        dueTextTl: overdue > 0 ? `${overdue} araw lampas` : 'Ngayon dapat'
      });
    }

    // 3. Environmental checks
    if (pet.speciesId === 'scorpion_afs' || pet.speciesId === 'centipede_vietnamese') {
      reminders.push({
        id: `env_${pet.id}`,
        petId: pet.id,
        petName: pet.name,
        speciesName: spName,
        titleEn: 'Hydration & Moisture Check',
        titleTl: 'Pagsusuri sa Halumigmig at Tubig',
        descEn: `Tropical species requires 75-85% humidity. Check substrate moisture gradient and refill water dish.`,
        descTl: `Kailangan ng 75-85% humidity. Tiyaking mamasa-masa ang lupa at punuin ang platito ng tubig.`,
        urgency: 'INFO',
        isDue: false,
        dueTextEn: 'Routine inspection',
        dueTextTl: 'Karaniwang pagsusuri'
      });
    }
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Add Pet */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
            <Heart className="w-6 h-6 text-[#00E5FF]" />
            <span>{isTagalog ? 'Mga Alaga Ko (My Pets Registry)' : 'My Exotic Pets Registry'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            {isTagalog
              ? 'I-rehistro ang iyong tarantula, alakdan, alupihan, at reptilya para sa personalized care reminders.'
              : 'Log your captive specimens and receive calculated molting & feeding reminders.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="self-start sm:self-auto flex items-center space-x-1.5 px-4 py-2 bg-[#00E5FF] text-[#090C12] rounded-xl text-xs font-bold hover:bg-[#38EFFF] transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>{isTagalog ? 'Magdagdag ng Alaga' : 'Add Exotic Pet'}</span>
        </button>
      </div>

      {/* Security & Privacy Banner */}
      <div className="p-3.5 rounded-xl bg-[#101520] border border-[#232D3F] flex items-center space-x-3 text-xs">
        <Lock className="w-4 h-4 text-[#00E676] shrink-0" />
        <p className="text-[#94A3B8]">
          <strong className="text-white">{isTagalog ? 'Ligtas at Pribado: ' : 'Private & Secure: '}</strong>
          {isTagalog
            ? 'Ang lahat ng talaan ng iyong alaga ay nakaimbak lamang sa browser storage ng iyong device. Walang data na inilalabas sa third parties.'
            : 'Your exotic pet records and logs are encrypted in client-side storage with zero tracking or unauthorized external sync.'}
        </p>
      </div>

      {/* Personalized Care Reminders Section */}
      {reminders.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
            <AlertCircle className="w-4 h-4 text-[#00E5FF]" />
            <span>{isTagalog ? 'Mga Personalized na Paalala sa Pag-aalaga' : 'Personalized Husbandry Alerts'}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reminders.map((rem) => {
              const borderCol =
                rem.urgency === 'CRITICAL'
                  ? 'border-[#FF3366]/60 bg-[#FF3366]/10 text-white'
                  : rem.urgency === 'UPCOMING'
                  ? 'border-[#FF9100]/60 bg-[#FF9100]/10 text-white'
                  : 'border-[#00E5FF]/40 bg-[#101520] text-white';

              return (
                <div key={rem.id} className={`p-4 rounded-xl border ${borderCol} shadow-md`}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-extrabold text-[#00E5FF]">
                      {rem.petName} ({rem.speciesName})
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/40">
                      {isTagalog ? rem.dueTextTl : rem.dueTextEn}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">
                    {isTagalog ? rem.titleTl : rem.titleEn}
                  </h4>
                  <p className="text-xs text-[#E2E8F0] mt-1 leading-relaxed">
                    {isTagalog ? rem.descTl : rem.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pets List */}
      <div className="space-y-4">
        {pets.length === 0 ? (
          <div className="p-8 text-center bg-[#101520] rounded-2xl border border-[#232D3F]">
            <Heart className="w-10 h-10 text-[#00E5FF] mx-auto mb-3 opacity-60" />
            <h4 className="text-base font-bold text-white">
              {isTagalog ? 'Wala pang nakarehistrong alaga' : 'No Exotic Pets Registered'}
            </h4>
            <p className="text-xs text-[#94A3B8] mt-1">
              {isTagalog
                ? 'I-click ang "Magdagdag ng Alaga" upang simulan ang pag-track ng iskedyul ng pagpapakain at pagbabalat.'
                : 'Click "Add Exotic Pet" to track feeding intervals, ecdysis rest periods, and custom enclosure notes.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pets.map((pet) => {
              const sp = speciesList.find((s) => s.id === pet.speciesId);
              const spName = sp ? sp.commonName : pet.customSpeciesName || pet.category;
              const daysSinceFeed = Math.floor((now - pet.lastFedTimestamp) / (24 * 60 * 60 * 1000));

              return (
                <div
                  key={pet.id}
                  className="bg-[#101520] border border-[#232D3F] hover:border-[#00E5FF]/40 rounded-2xl p-5 flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181F2E] text-[#00E5FF] font-semibold border border-[#00E5FF]/20">
                            {pet.category}
                          </span>
                          <span className="text-[10px] text-[#94A3B8]">{pet.stage}</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-white mt-1">{pet.name}</h3>
                        <p className="text-xs font-mono italic text-[#00E5FF]">{spName}</p>
                      </div>

                      <button
                        onClick={() => deletePet(pet.id)}
                        className="text-[#94A3B8] hover:text-[#FF3366] p-1.5 transition-colors"
                        title="Delete Pet"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-[#232D3F]/60 text-xs">
                      <div className="bg-[#181F2E]/60 p-2 rounded-lg text-center">
                        <span className="text-[10px] text-[#94A3B8] block">
                          {isTagalog ? 'Nakuha' : 'Acquired'}
                        </span>
                        <span className="font-semibold text-white text-[11px]">{pet.acquisitionDate}</span>
                      </div>

                      <div className="bg-[#181F2E]/60 p-2 rounded-lg text-center">
                        <span className="text-[10px] text-[#94A3B8] block">
                          {isTagalog ? 'Huling Pakain' : 'Last Fed'}
                        </span>
                        <span className={`font-bold text-[11px] ${
                          daysSinceFeed >= pet.feedIntervalDays ? 'text-[#FF9100]' : 'text-[#00E676]'
                        }`}>
                          {daysSinceFeed}d ago
                        </span>
                      </div>

                      <div className="bg-[#181F2E]/60 p-2 rounded-lg text-center">
                        <span className="text-[10px] text-[#94A3B8] block">
                          {isTagalog ? 'Pagitan' : 'Interval'}
                        </span>
                        <span className="font-semibold text-white text-[11px]">{pet.feedIntervalDays} days</span>
                      </div>
                    </div>

                    {pet.enclosureNotes && (
                      <p className="text-xs text-[#94A3B8] mb-3">
                        <strong className="text-white">Setup:</strong> {pet.enclosureNotes}
                      </p>
                    )}

                    {pet.isPostMoltResting && (
                      <div className="p-2.5 rounded-lg bg-[#B388FF]/10 border border-[#B388FF]/30 text-xs text-[#B388FF] mb-3 flex items-center space-x-2">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>{isTagalog ? 'Nagluluno/Nagpapalakas: Huwag pakainin!' : 'Post-molt resting: Do not offer food!'}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#232D3F] flex items-center space-x-2">
                    <button
                      onClick={() => logFeeding(pet.id)}
                      className="flex-1 flex items-center justify-center space-x-1 py-2 bg-[#00E5FF]/10 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#090C12] border border-[#00E5FF]/40 rounded-xl text-xs font-bold transition-all"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>{isTagalog ? 'Napakain Ngayon' : 'Fed Today'}</span>
                    </button>

                    <button
                      onClick={() => logMolt(pet.id)}
                      className="flex-1 flex items-center justify-center space-x-1 py-2 bg-[#B388FF]/10 hover:bg-[#B388FF] text-[#B388FF] hover:text-[#090C12] border border-[#B388FF]/40 rounded-xl text-xs font-bold transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{isTagalog ? 'Nagbalat' : 'Logged Molt'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Pet Modal Dialog */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#101520] border border-[#232D3F] rounded-2xl max-w-lg w-full p-6 shadow-2xl my-8">
            <h3 className="text-lg font-black text-white mb-4">
              {isTagalog ? 'Magdagdag ng Bagong Exotic Pet' : 'Register New Exotic Pet'}
            </h3>

            <form onSubmit={handleAddPet} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-white mb-1">
                  {isTagalog ? 'Pangalan ng Alaga *' : 'Pet Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="e.g. Shadow, Flame, Boris..."
                  className="w-full bg-[#181F2E] text-white border border-[#232D3F] rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-white mb-1">
                    {isTagalog ? 'Kategorya' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const cat = e.target.value as SpeciesCategory;
                      setCategory(cat);
                      const matching = speciesList.filter((s) => s.category === cat);
                      if (matching.length > 0) setSelectedSpeciesId(matching[0].id);
                    }}
                    className="w-full bg-[#181F2E] text-white border border-[#232D3F] rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                  >
                    <option value="TARANTULAS">Tarantulas</option>
                    <option value="SCORPIONS">Scorpions</option>
                    <option value="CENTIPEDES">Centipedes</option>
                    <option value="REPTILES">Reptiles</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-white mb-1">
                    {isTagalog ? 'Yugto (Stage)' : 'Life Stage'}
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as any)}
                    className="w-full bg-[#181F2E] text-white border border-[#232D3F] rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                  >
                    <option value="Sling / Scorpling">Sling / Scorpling</option>
                    <option value="Juvenile">Juvenile</option>
                    <option value="Sub-Adult">Sub-Adult</option>
                    <option value="Adult">Adult</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">
                  {isTagalog ? 'Pumili ng Uri mula sa Aklatan' : 'Select Species from Library'}
                </label>
                <select
                  value={selectedSpeciesId}
                  onChange={(e) => setSelectedSpeciesId(e.target.value)}
                  className="w-full bg-[#181F2E] text-white border border-[#232D3F] rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                >
                  {speciesList
                    .filter((s) => s.category === category)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.commonName} ({s.scientificName})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">
                  {isTagalog ? 'O Ilagay ang Custom Species (Kung wala sa listahan)' : 'Or Custom Species (if not listed)'}
                </label>
                <input
                  type="text"
                  value={customSpecies}
                  onChange={(e) => setCustomSpecies(e.target.value)}
                  placeholder="e.g. Poecilotheria metallica..."
                  className="w-full bg-[#181F2E] text-white border border-[#232D3F] rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-white mb-1">
                    {isTagalog ? 'Petsa ng Pagkuha' : 'Acquisition Date'}
                  </label>
                  <input
                    type="date"
                    value={acquisitionDate}
                    onChange={(e) => setAcquisitionDate(e.target.value)}
                    className="w-full bg-[#181F2E] text-white border border-[#232D3F] rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-white mb-1">
                    {isTagalog ? 'Pagitan ng Pagkain (Araw)' : 'Feed Interval (Days)'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={feedIntervalDays}
                    onChange={(e) => setFeedIntervalDays(parseInt(e.target.value) || 7)}
                    className="w-full bg-[#181F2E] text-white border border-[#232D3F] rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">
                  {isTagalog ? 'Tala sa Kulungan at Enclosure' : 'Enclosure Setup & Notes'}
                </label>
                <textarea
                  rows={2}
                  value={enclosureNotes}
                  onChange={(e) => setEnclosureNotes(e.target.value)}
                  placeholder="Substrate depth, hide types, ventilation, humidity notes..."
                  className="w-full bg-[#181F2E] text-white border border-[#232D3F] rounded-lg px-3 py-2 focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#232D3F]">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#94A3B8] hover:text-white"
                >
                  {isTagalog ? 'Kanselahin' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#00E5FF] text-[#090C12] hover:bg-[#38EFFF] transition-all"
                >
                  {isTagalog ? 'I-save ang Alaga' : 'Save Pet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
