"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import DarkModeTest from "./darkmode/page";
import { DarkModeDebug } from "@/components/DarkMode";

export default function Home() {
  return (
    // Change from bg-gray-50 dark:bg-gray-900 to explicit Tailwind classes
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-200">
      <DarkModeDebug/>
      
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-sm text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800">
            <span className="text-lg">🩺</span>
            Healthcare Assistant Guided Triage
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
            e-Likita Hospital Consultation Assistant
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            This guided consultation will help assess your symptoms and provide appropriate healthcare recommendations.
          </p>
          
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              <strong>Important:</strong> This tool is for guidance only and does not replace professional medical advice. In case of emergency, call emergency services immediately.
            </p>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-6">
            <a href="/consultation" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <span className="text-xl">🏥</span>
              Start Consultation
            </a>
            <a href="#features" className="inline-flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-lg font-medium rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
              Learn More
            </a>
          </div>
          
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            🔒 HIPAA-inspired privacy • 🛡️ Secure • ✅ Trusted by healthcare professionals
          </div>
        </div>
      </section>
      
      <section id="features" className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">What to Expect:</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">5-step guided consultation process</p>
          
          <div className="grid sm:grid-cols-5 gap-6">
            {[
              { step: 'Intro', icon: '👋', desc: 'Welcome and overview' },
              { step: 'Patient Info', icon: '📋', desc: 'Personal details and medical history' },
              { step: 'Symptoms', icon: '🩺', desc: 'Symptom assessment and severity' },
              { step: 'Follow-ups', icon: '❓', desc: 'Dynamic questions based on symptoms' },
              { step: 'Summary', icon: '📄', desc: 'Consultation summary and recommendations' }
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
          <h2 className="text-3xl font-bold mb-4">Your Privacy Matters</h2>
          <p className="text-blue-100 dark:text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Data is encrypted in transit and at rest. Only authorized healthcare professionals can access your medical records.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {[
              { icon: '🔐', title: 'End-to-End Encryption', desc: 'Your data is protected with military-grade encryption' },
              { icon: '👨‍⚕️', title: 'Licensed Professionals', desc: 'Reviewed by certified healthcare providers' },
              { icon: '📱', title: 'HIPAA Compliant', desc: 'Meets healthcare privacy and security standards' }
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
