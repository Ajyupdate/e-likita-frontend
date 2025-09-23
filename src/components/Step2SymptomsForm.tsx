"use client";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { useConsultation } from "@/context/ConsultationContext";
import { useTranslation } from "@/context/LanguageContext";

type SymptomOption = { key: string; label: string };

export default function Step3SymptomsForm() {
  const { setStep, setSelectedSymptoms, setSymptomDetails } = useConsultation();
  const { t } = useTranslation();
  const [options, setOptions] = useState<SymptomOption[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [severity, setSeverity] = useState<number>(5);
  const [duration, setDuration] = useState<string>("1-3 days");
  const [details, setDetails] = useState<string>("");

  useEffect(() => {
    apiGet<SymptomOption[]>("/reference/symptoms").then(setOptions).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('consultation.steps.symptoms.title')}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t('consultation.steps.symptoms.description')}</p>
      </div>
      
      <div>
        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
          {t('consultation.steps.symptoms.selectSymptoms')} <span className="text-sm text-gray-500">{t('consultation.steps.symptoms.selectAllThatApply')}</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map(o => (
            <label key={o.key} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={selected.includes(o.key)}
                onChange={(e) => {
                  setSelected(prev => e.target.checked ? [...prev, o.key] : prev.filter(k => k !== o.key));
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium">{o.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">{t('consultation.steps.symptoms.duration')}</label>
          <select value={duration} onChange={(e)=>setDuration(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2">
            {['Less than 24 hours','1-3 days','4-7 days','1-2 weeks','More than 2 weeks'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">{t('consultation.steps.symptoms.severity')}: {severity}/10</label>
          <input type="range" min={1} max={10} value={severity} onChange={(e)=>setSeverity(parseInt(e.target.value))} className="mt-3 w-full" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">{t('consultation.steps.symptoms.details')}</label>
        <textarea value={details} onChange={(e)=>setDetails(e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
      </div>
      <div className="flex items-center justify-between">
        <button onClick={()=>setStep(2)} className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">← {t('consultation.steps.symptoms.buttons.back')}</button>
        <button onClick={()=>{ setSelectedSymptoms(selected); setSymptomDetails({ severity, duration, details }); setStep(4); }} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">{t('consultation.steps.symptoms.buttons.next')} →</button>
      </div>
    </div>
  );
}

