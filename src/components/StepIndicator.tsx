"use client";
import { useConsultation } from "@/context/ConsultationContext";

const steps = [
  { label: "Intro", icon: "👋" },
  { label: "Patient Info", icon: "📋" },
  { label: "Symptoms", icon: "🩺" },
  { label: "Follow-ups", icon: "❓" },
  { label: "Summary", icon: "📄" }
];

export default function StepIndicator() {
  const { step } = useConsultation();
  return (
    <nav className="mb-8">
      <ol className="grid gap-3 sm:grid-cols-5">
        {steps.map((stepItem, idx) => {
          const isActive = step === idx + 1;
          const isCompleted = step > idx + 1;
          return (
            <li key={stepItem.label} className={`relative rounded-xl border-2 p-4 text-sm transition-all ${
              isActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50 shadow-md' 
                : isCompleted
                ? 'border-green-300 bg-green-50 dark:bg-green-950/30'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : isCompleted
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{stepItem.icon}</span>
                    <div className={`font-medium ${isActive ? 'text-blue-800 dark:text-blue-200' : ''}`}>
                      {stepItem.label}
                    </div>
                  </div>
                </div>
              </div>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-blue-500"></div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

