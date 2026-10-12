import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { Shield, BookOpen, GitCompare, Home, CheckSquare, MessageSquare, Heart, Globe } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
}) => {
  const t = translations[language];

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'library', label: t.navLibrary, icon: BookOpen },
    { id: 'compare', label: t.navCompare, icon: GitCompare },
    { id: 'mypets', label: t.navMyPets, icon: Heart },
    { id: 'guides', label: t.navGuides, icon: Shield },
    { id: 'checklist', label: t.navChecklist, icon: CheckSquare },
    { id: 'chat', label: t.navAiChat, icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090C12]/95 backdrop-blur-md border-b border-[#232D3F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentTab('home')}
          >
            <div className="relative w-10 h-10 rounded-full border-2 border-[#00E5FF] overflow-hidden bg-black shadow-[0_0_12px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_18px_rgba(0,229,255,0.6)] transition-all">
              <img
                src="/logo.jpg"
                alt="KAPETZ Scorpion Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-extrabold tracking-wider text-white text-lg">KAPETZ</span>
                <span className="font-extrabold text-[#00E5FF] text-lg">AI</span>
              </div>
              <p className="text-[10px] text-[#94A3B8] -mt-1 hidden sm:block tracking-wide">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#00E5FF] text-[#090C12] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                      : 'text-[#E2E8F0] hover:text-[#00E5FF] hover:bg-[#181F2E]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLanguage(language === 'EN' ? 'TL' : 'EN')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#00E5FF]/40 bg-[#101520] hover:border-[#00E5FF] text-[#00E5FF] text-xs font-bold transition-all shadow-sm"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'EN' ? 'EN' : 'TL'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar (Horizontal Scroll) */}
      <div className="md:hidden flex overflow-x-auto space-x-1 px-3 py-2 border-t border-[#232D3F]/80 bg-[#101520]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#00E5FF] text-[#090C12]'
                  : 'text-[#E2E8F0] bg-[#181F2E]/60'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
