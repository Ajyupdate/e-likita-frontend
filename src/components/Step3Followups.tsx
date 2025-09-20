"use client";
import { useEffect, useState } from "react";
import { apiPost } from "@/lib/api";
import { useConsultation } from "@/context/ConsultationContext";

type Followup = { symptomKey: string; question: string };

export default function Step4Followups() {
  const { setStep, selectedSymptoms, setFollowupAnswers, patient, symptomDetails, setConsultationResponse } = useConsultation();
  const [followups, setFollowups] = useState<Followup[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiPost<Followup[]>("/reference/followups", { symptomKeys: selectedSymptoms })
      .then(setFollowups)
      .catch(console.error);
  }, [selectedSymptoms]);

  const handleSubmitConsultation = async () => {
    setIsSubmitting(true);
    setFollowupAnswers(answers);
    
    try {
      const consultationData = {
        patientInfo: patient,
        selectedSymptoms,
        symptomDetails,
        followupAnswers: answers,
      };

      const response = await apiPost("/consultations/submit", consultationData);
      setConsultationResponse(response);
      setStep(5);
    } catch (error) {
      console.error("Failed to submit consultation:", error);
      alert("Failed to submit consultation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Follow-up Questions</h2>
        <p className="text-gray-600 dark:text-gray-300">Please answer these questions based on your reported symptoms</p>
      </div>
      
      {followups.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">❓</div>
          <p className="text-gray-500 dark:text-gray-400">No follow-up questions available for your selected symptoms.</p>
        </div>
      ) : (
        followups.map((f, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{f.question}</h3>
            <div className="flex items-center gap-6">
              {['Yes','No'].map(v => (
                <label key={v} className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name={`q_${idx}`} 
                    value={v}
                    onChange={() => setAnswers(a => ({ ...a, [f.question]: v }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm font-medium">{v}</span>
                </label>
              ))}
            </div>
          </div>
        ))
      )}
      <div className="flex items-center justify-between">
        <button onClick={()=>setStep(3)} className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">← Back</button>
        <button 
          onClick={handleSubmitConsultation}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>Complete Assessment →</>
          )}
        </button>
      </div>
    </div>
  );
}

