"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import DarkModeTest from "./darkmode/page";
import { DarkModeDebug } from "@/components/DarkMode";
import { useTranslation } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useTranslation();
  
  return (
    // Change from bg-gray-50 dark:bg-gray-900 to explicit Tailwind classes
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
     
      
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-sm text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800">
            <span className="text-lg">🩺</span>
            {t('home.subtitle')}
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('home.description')}
          </p>
          
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              <strong>{t('common.important')}:</strong> {t('home.disclaimer')}
            </p>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-6">
            <a href="/consultation" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <span className="text-xl">🏥</span>
              {t('common.startConsultation')}
            </a>
            <a href="#features" className="inline-flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-lg font-medium rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
              {t('common.learnMore')}
            </a>
          </div>
          
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            {t('home.features.privacy')} • {t('home.features.secure')} • {t('home.features.trusted')}
          </div>
        </div>
      </section>
      
      <section id="features" className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">{t('home.whatToExpect')}</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">{t('home.stepProcess')}</p>
          
          <div className="grid sm:grid-cols-5 gap-6">
            {[
              { step: t('home.steps.intro.title'), icon: '👋', desc: t('home.steps.intro.description') },
              { step: t('home.steps.patientInfo.title'), icon: '📋', desc: t('home.steps.patientInfo.description') },
              { step: t('home.steps.symptoms.title'), icon: '🩺', desc: t('home.steps.symptoms.description') },
              { step: t('home.steps.followups.title'), icon: '❓', desc: t('home.steps.followups.description') },
              { step: t('home.steps.summary.title'), icon: '📄', desc: t('home.steps.summary.description') }
            ].map((item, i) => (
              <div key={item.step} className="relative group">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl mb-4">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{item.step}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('home.privacySection.title')}</h2>
          <p className="text-blue-100 dark:text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            {t('home.privacySection.description')}
          </p>
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {[
              { icon: '🔐', title: t('home.privacySection.features.encryption.title'), desc: t('home.privacySection.features.encryption.description') },
              { icon: '👨‍⚕️', title: t('home.privacySection.features.professionals.title'), desc: t('home.privacySection.features.professionals.description') },
              { icon: '📱', title: t('home.privacySection.features.hipaa.title'), desc: t('home.privacySection.features.hipaa.description') }
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-blue-100 dark:text-blue-200 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
