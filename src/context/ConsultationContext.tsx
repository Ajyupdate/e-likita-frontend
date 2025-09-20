"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type PatientInfo = {
  fullName: string;
  age?: number;
  gender?: string;
  phone?: string;
  medicalHistory: string[];
  allergies?: string;
  medications?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

type ConsultationState = {
  step: number;
  setStep: (s: number) => void;
  patient: PatientInfo;
  setPatient: (p: PatientInfo) => void;
  selectedSymptoms: string[];
  setSelectedSymptoms: (s: string[]) => void;
  symptomDetails: { severity?: number; duration?: string; details?: string };
  setSymptomDetails: (d: { severity?: number; duration?: string; details?: string }) => void;
  followupAnswers: Record<string, string>;
  setFollowupAnswers: (a: Record<string, string>) => void;
  riskResult?: { level: string; factors: string[] } | null;
  setRiskResult: (r: { level: string; factors: string[] } | null) => void;
  consultationResponse?: {
    consultationId: string;
    riskAssessment: { level: string; factors: string[]; score: number };
    recommendations: string[];
    nextSteps: string[];
    urgency: { requiresImmediateAttention: boolean; timeframe?: string; instructions?: string };
  } | null;
  setConsultationResponse: (r: any) => void;
};

const Ctx = createContext<ConsultationState | undefined>(undefined);

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [patient, setPatient] = useState<PatientInfo>({ fullName: "", medicalHistory: [] });
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomDetails, setSymptomDetails] = useState<{ severity?: number; duration?: string; details?: string }>({});
  const [followupAnswers, setFollowupAnswers] = useState<Record<string, string>>({});
  const [riskResult, setRiskResult] = useState<{ level: string; factors: string[] } | null>(null);
  const [consultationResponse, setConsultationResponse] = useState<any>(null);

  // Load/save progress
  useEffect(() => {
    try {
      const raw = localStorage.getItem("consultation-progress");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.step) setStep(parsed.step);
        if (parsed.patient) setPatient(parsed.patient);
        if (parsed.selectedSymptoms) setSelectedSymptoms(parsed.selectedSymptoms);
        if (parsed.symptomDetails) setSymptomDetails(parsed.symptomDetails);
        if (parsed.followupAnswers) setFollowupAnswers(parsed.followupAnswers);
        if (parsed.riskResult) setRiskResult(parsed.riskResult);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const snapshot = { step, patient, selectedSymptoms, symptomDetails, followupAnswers, riskResult };
    try { localStorage.setItem("consultation-progress", JSON.stringify(snapshot)); } catch {}
  }, [step, patient, selectedSymptoms, symptomDetails, followupAnswers, riskResult]);
  const value = useMemo(
    () => ({
      step,
      setStep,
      patient,
      setPatient,
      selectedSymptoms,
      setSelectedSymptoms,
      symptomDetails,
      setSymptomDetails,
      followupAnswers,
      setFollowupAnswers,
      riskResult,
      setRiskResult,
      consultationResponse,
      setConsultationResponse,
    }),
    [step, patient, selectedSymptoms, symptomDetails, followupAnswers, riskResult]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useConsultation() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConsultation must be used within ConsultationProvider");
  return ctx;
}

