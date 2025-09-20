"use client";
import { useState } from "react";
import { apiPost } from "@/lib/api";
import { useConsultation } from "@/context/ConsultationContext";

export default function Step5Risk() {
  const { setStep, setRiskResult } = useConsultation();
  const [severity, setSeverity] = useState(5);
  const [durationHours, setDurationHours] = useState(48);
  const [redFlags, setRedFlags] = useState(false);
  const [result, setResult] = useState<{ level: string; factors: string[] } | null>(null);

  async function assess() {
    const r = await apiPost<{ level: string; factors: string[] }>("/risk-assessment", { severity, durationHours, redFlags });
    setResult(r);
    setRiskResult(r);
  }

  return (
    <div className="grid gap-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Severity: {severity}/10</label>
          <input type="range" min={1} max={10} value={severity} onChange={(e)=>setSeverity(parseInt(e.target.value))} className="mt-3 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Duration (hours)</label>
          <input type="number" value={durationHours} onChange={(e)=>setDurationHours(parseInt(e.target.value))} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
        </div>
        <label className="inline-flex items-center gap-2 self-end">
          <input type="checkbox" checked={redFlags} onChange={(e)=>setRedFlags(e.target.checked)} />
          <span className="text-sm">Red flags present</span>
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={assess} className="btn btn-primary px-5 py-2">Calculate Risk</button>
        {result && <span className="text-sm">Urgency: <span className="font-semibold">{result.level}</span></span>}
      </div>
      {result && result.factors.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
          {result.factors.map((f,i)=>(<li key={i}>{f}</li>))}
        </ul>
      )}
      <div className="flex items-center justify-between mt-2">
        <button onClick={()=>setStep(4)} className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">← Back</button>
        <button onClick={()=>setStep(5)} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">View Summary →</button>
      </div>
    </div>
  );
}

