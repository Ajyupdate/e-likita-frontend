"use client";
import { useConsultation } from "@/context/ConsultationContext";
import jsPDF from "jspdf";

export default function Step5Summary() {
  const { patient, selectedSymptoms, symptomDetails, riskResult, setStep, consultationResponse } = useConsultation();

  function downloadPdf() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("e-Likita Consultation Summary", 14, 20);
    
    doc.setFontSize(12);
    doc.text("Patient Information", 14, 35);
    doc.setFontSize(10);
    doc.text(`Name: ${patient.fullName}`, 20, 45);
    doc.text(`Gender: ${patient.gender || 'Not specified'}`, 20, 52);
    doc.text(`Age: ${patient.age || 'Not specified'}`, 20, 59);
    doc.text(`Phone: ${patient.phone || 'Not specified'}`, 20, 66);
    
    doc.setFontSize(12);
    doc.text("Symptoms Reported", 14, 80);
    doc.setFontSize(10);
    if (selectedSymptoms.length > 0) {
      doc.text(`Symptoms: ${selectedSymptoms.join(', ')}`, 20, 90);
      doc.text(`Severity: ${symptomDetails.severity || 'Not specified'}/10`, 20, 97);
      doc.text(`Duration: ${symptomDetails.duration || 'Not specified'}`, 20, 104);
    } else {
      doc.text("No symptoms reported", 20, 90);
    }
    
    if (riskResult) {
      doc.setFontSize(12);
      doc.text("Risk Assessment", 14, 120);
      doc.setFontSize(10);
      doc.text(`Risk Level: ${riskResult.level}`, 20, 130);
      if (riskResult.factors.length > 0) {
        doc.text(`Risk Factors: ${riskResult.factors.join(', ')}`, 20, 137);
      }
    }
    
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 270);
    doc.save("e-likita-consultation-summary.pdf");
  }

  const currentTime = new Date().toLocaleString();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Consultation Summary</h2>
        <p className="text-gray-600 dark:text-gray-300">Review your consultation details below</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">👤</span>
            Patient Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Name:</span> {patient.fullName}</div>
            <div><span className="font-medium">Gender:</span> {patient.gender || 'Not specified'}</div>
            <div><span className="font-medium">Age:</span> {patient.age || 'Not specified'}</div>
            <div><span className="font-medium">Phone:</span> {patient.phone || 'Not specified'}</div>
          </div>
          {patient.medicalHistory.length > 0 && (
            <div className="mt-4">
              <span className="font-medium text-sm">Medical History:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {patient.medicalHistory.map((item, idx) => (
                  <span key={idx} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">🩺</span>
            Symptoms Reported
          </h3>
          {selectedSymptoms.length > 0 ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptom, idx) => (
                  <span key={idx} className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm">
                    {symptom}
                  </span>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Severity:</span> {symptomDetails.severity || 'Not specified'}/10</div>
                <div><span className="font-medium">Duration:</span> {symptomDetails.duration || 'Not specified'}</div>
              </div>
              {symptomDetails.details && (
                <div className="text-sm">
                  <span className="font-medium">Additional Details:</span>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{symptomDetails.details}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No symptoms reported</p>
          )}
        </div>

        {consultationResponse?.riskAssessment && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              Risk Assessment
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-medium">Risk Level:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  consultationResponse.riskAssessment.level === 'Emergency' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
                  consultationResponse.riskAssessment.level === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200' :
                  consultationResponse.riskAssessment.level === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                }`}>
                  {consultationResponse.riskAssessment.level}
                </span>
                <span className="text-sm text-gray-500">Score: {consultationResponse.riskAssessment.score}/10</span>
              </div>
              {consultationResponse.riskAssessment.factors.length > 0 && (
                <div>
                  <span className="font-medium">Risk Factors:</span>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                    {consultationResponse.riskAssessment.factors.map((factor, idx) => (
                      <li key={idx}>{factor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {consultationResponse?.recommendations && consultationResponse.recommendations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">💡</span>
              Personalized Recommendations
            </h3>
            <ul className="space-y-2 text-sm">
              {consultationResponse.recommendations.map((recommendation, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {consultationResponse?.urgency && (
          <div className={`rounded-xl border p-6 ${
            consultationResponse.urgency.requiresImmediateAttention 
              ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30' 
              : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30'
          }`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">⏰</span>
              Urgency Assessment
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-medium">Timeframe:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  consultationResponse.urgency.requiresImmediateAttention 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                }`}>
                  {consultationResponse.urgency.timeframe}
                </span>
              </div>
              {consultationResponse.urgency.instructions && (
                <div>
                  <span className="font-medium">Instructions:</span>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    {consultationResponse.urgency.instructions}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">📋</span>
            Next Actions
          </h3>
          <div className="space-y-3 text-sm">
            <p className="text-orange-800 dark:text-orange-200 bg-orange-50 dark:bg-orange-950/30 p-3 rounded-lg">
              <strong>Important:</strong> This consultation is for guidance only and does not replace professional medical advice.
            </p>
            
            {consultationResponse?.nextSteps && consultationResponse.nextSteps.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Recommended Next Steps:</h4>
                <ul className="space-y-1 text-sm">
                  {consultationResponse.nextSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {consultationResponse?.riskAssessment?.level === 'Emergency' && (
              <p className="text-red-800 dark:text-red-200 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                <strong>⚠️ Urgent Medical Attention Required:</strong> Based on your symptoms, you should seek immediate medical attention. Please visit the emergency department or call emergency services.
              </p>
            )}
            <div className="text-gray-600 dark:text-gray-300">
              <p><strong>Consultation Time:</strong> {currentTime}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setStep(5)} 
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          ← Back
        </button>
        <div className="flex gap-3">
          <button 
            onClick={downloadPdf} 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            📄 Print/Save Summary
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem('consultation-progress');
              window.location.href = '/consultation';
            }}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            🔄 Start New Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

