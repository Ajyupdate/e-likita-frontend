"use client";
import { useConsultation } from "@/context/ConsultationContext";
import { useTranslation } from "@/context/LanguageContext";

export default function Step1Intro() {
  const { setStep } = useConsultation();
  const { t } = useTranslation();

  return (
    <div className="space-y-8 text-center max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="text-6xl mb-4">🏥</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('consultation.steps.intro.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {t('consultation.steps.intro.description')}
        </p>
      </div>

      <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">
          {t('common.important')}
        </h2>
        <p className="text-orange-800 dark:text-orange-200">
          {t('consultation.steps.intro.disclaimer')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">{t('consultation.steps.intro.whatToExpect.title')}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{t('consultation.steps.intro.whatToExpect.guidedProcess')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('consultation.steps.intro.whatToExpect.guidedProcessDesc')}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🩺</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{t('consultation.steps.intro.whatToExpect.symptomAssessment')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('consultation.steps.intro.whatToExpect.symptomAssessmentDesc')}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{t('consultation.steps.intro.whatToExpect.personalizedRecommendations')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('consultation.steps.intro.whatToExpect.personalizedRecommendationsDesc')}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{t('consultation.steps.intro.whatToExpect.printableSummary')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('consultation.steps.intro.whatToExpect.printableSummaryDesc')}
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
          {t('consultation.steps.intro.startButton')}
        </button>
      </div>
    </div>
  );
}
