"use client";
import Link from "next/link";
import { ConsultationProvider } from "@/context/ConsultationContext";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import Step1Intro from "@/components/Step1Intro";
import Step2PatientForm from "@/components/Step1PatientForm";
import Step3SymptomsForm from "@/components/Step2SymptomsForm";
import Step4Followups from "@/components/Step3Followups";
import Step5Summary from "@/components/Step5Summary";
import { useConsultation } from "@/context/ConsultationContext";
import { AnimatePresence, motion } from "framer-motion";
import DarkModeTest from "../darkmode/page";

export default function Consultation() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ConsultationProvider>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Debug info */}
    
      
        <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Consultation</h1>
          <Link href="/" className="text-sm text-blue-600 hover:underline">Back to Home</Link>
        </div>
        <div className="mt-6">
          <StepIndicator />
        </div>
        <div className="mt-8 rounded-lg border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-800">
          <WizardBody />
        </div>
        </div>
      </main>
    </ConsultationProvider>
  );
}

function WizardBody() {
  const { step } = useConsultation();
  const Step = step === 1 ? Step1Intro : step === 2 ? Step2PatientForm : step === 3 ? Step3SymptomsForm : step === 4 ? Step4Followups : Step5Summary;
  return (
    <AnimatePresence mode="wait">
      <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
        <Step />
      </motion.div>
    </AnimatePresence>
  );
}

