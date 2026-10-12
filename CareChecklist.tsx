import React, { useState, useEffect } from 'react';
import { ChecklistItem, Language } from '../types';
import { defaultChecklist } from '../data/guidesData';
import { CheckSquare, RotateCcw, CheckCircle2 } from 'lucide-react';

interface CareChecklistProps {
  language: Language;
}

export const CareChecklist: React.FC<CareChecklistProps> = ({ language }) => {
  const isTagalog = language === 'TL';

  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('kapetz_checklist_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultChecklist;
      }
    }
    return defaultChecklist;
  });

  useEffect(() => {
    localStorage.setItem('kapetz_checklist_state', JSON.stringify(items));
  }, [items]);

  const toggleTask = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
    );
  };

  const resetAll = () => {
    setItems(defaultChecklist.map((item) => ({ ...item, isCompleted: false })));
  };

  const completedCount = items.filter((i) => i.isCompleted).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
            <CheckSquare className="w-6 h-6 text-[#00E5FF]" />
            <span>{isTagalog ? 'Talaan ng Pagpapakain at Pag-aalaga' : 'Husbandry & Care Maintenance Checklist'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            {isTagalog
              ? 'Araw-araw at lingguhang pagsusuri para sa kalusugan at kaligtasan ng mga alaga.'
              : 'Daily hydration, escape inspections, feeding cycles, and molting preparedness tasks.'}
          </p>
        </div>

        <button
          onClick={resetAll}
          className="self-start sm:self-auto flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-[#232D3F] hover:border-[#00E5FF] text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isTagalog ? 'I-reset ang Talaan' : 'Reset Checklist'}</span>
        </button>
      </div>

      {/* Progress Card */}
      <div className="bg-[#101520] p-5 rounded-2xl border border-[#232D3F] shadow-md">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-[#94A3B8]">{isTagalog ? 'Natapos na mga Gawain' : 'Husbandry Tasks Completed'}</span>
          <span className="text-[#00E5FF]">{completedCount} / {items.length} ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 bg-[#181F2E] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#005866] to-[#00E5FF] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleTask(item.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              item.isCompleted
                ? 'bg-[#181F2E]/40 border-[#00E5FF]/40 text-[#94A3B8]'
                : 'bg-[#101520] border-[#232D3F] hover:border-[#00E5FF]/40 text-white'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div
                className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                  item.isCompleted
                    ? 'bg-[#00E5FF] border-[#00E5FF] text-[#090C12]'
                    : 'border-[#232D3F] bg-[#181F2E]'
                }`}
              >
                {item.isCompleted && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
              </div>

              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181F2E] text-[#00E5FF] font-semibold mr-2 border border-[#00E5FF]/20">
                  {item.category}
                </span>
                <span className={`text-xs sm:text-sm font-medium ${item.isCompleted ? 'line-through' : ''}`}>
                  {isTagalog ? item.taskTl : item.taskEn}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
