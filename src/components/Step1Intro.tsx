"use client";
import { useConsultation } from "@/context/ConsultationContext";

export default function Step1Intro() {
  const { setStep } = useConsultation();

  return (
    <div className="space-y-8 text-center max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="text-6xl mb-4">🏥</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to e-Likita Hospital Consultation Assistant
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          This guided consultation will help assess your symptoms and provide appropriate healthcare recommendations.
        </p>
      </div>

      <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">
          Important Notice
        </h2>
        <p className="text-orange-800 dark:text-orange-200">
          <strong>This tool is for guidance only and does not replace professional medical advice.</strong> 
          In case of emergency, call emergency services immediately.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">What to Expect:</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">5-step guided consultation process</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We'll walk you through each step to gather comprehensive information about your health.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🩺</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Symptom assessment and risk evaluation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Advanced assessment tools to understand your symptoms and potential risks.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Personalized healthcare recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Tailored advice based on your specific symptoms and medical history.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Printable summary for your records</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complete consultation summary you can save or share with your healthcare provider.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <button 
          onClick={() => setStep(2)}
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <span className="text-xl">🚀</span>
          Start Consultation
        </button>
      </div>
    </div>
  );
}
