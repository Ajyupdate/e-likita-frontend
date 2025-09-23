"use client";
import { useConsultation } from "@/context/ConsultationContext";
import { useTranslation } from "@/context/LanguageContext";
import jsPDF from "jspdf";

export default function Step5Summary() {
  const { patient, selectedSymptoms, symptomDetails, riskResult, setStep, consultationResponse } = useConsultation();
  const { t } = useTranslation();

  function downloadPdf() {
    const doc = new jsPDF();
    let yPosition = 20;
    
    // Header with blue color
    doc.setTextColor(0, 102, 204); // Blue color
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("e-Likita Medical Consultation Report", 14, yPosition);
    yPosition += 15;

    doc.setTextColor(128, 128, 128); // Gray color
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, yPosition);
    yPosition += 20;
    
    // Patient Information Section
    doc.setTextColor(0, 102, 204); // Blue color for section headers
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Information", 14, yPosition);
    yPosition += 10;
    
    doc.setTextColor(0, 0, 0); // Black color for content
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${patient.fullName || 'Not provided'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Age: ${patient.age || 'Not specified'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Gender: ${patient.gender || 'Not specified'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Phone: ${patient.phone || 'Not specified'}`, 20, yPosition);
    yPosition += 7;
    
    if (patient.medicalHistory && patient.medicalHistory.length > 0) {
      doc.text(`Medical History: ${patient.medicalHistory.join(', ')}`, 20, yPosition);
      yPosition += 7;
    }
    
    if (patient.medications) {
      doc.text(`Current Medications: ${patient.medications}`, 20, yPosition);
      yPosition += 7;
    }
    yPosition += 10;
    
    // Symptoms Section
    doc.setTextColor(0, 102, 204); // Blue color for section headers
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Symptoms Reported", 14, yPosition);
    yPosition += 10;
    
    doc.setTextColor(0, 0, 0); // Black color for content
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    if (selectedSymptoms.length > 0) {
      doc.text(`Primary Symptoms: ${selectedSymptoms.join(', ')}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Severity Level: ${symptomDetails.severity || 'Not specified'}/10`, 20, yPosition);
      yPosition += 7;
      doc.text(`Duration: ${symptomDetails.duration || 'Not specified'}`, 20, yPosition);
      yPosition += 7;
      
      if (symptomDetails.details) {
        doc.text(`Additional Details: ${symptomDetails.details}`, 20, yPosition);
        yPosition += 7;
      }
    } else {
      doc.text("No symptoms reported", 20, yPosition);
      yPosition += 7;
    }
    yPosition += 10;
    
    // Risk Assessment Section
    if (consultationResponse?.riskAssessment) {
      doc.setTextColor(220, 38, 127); // Pink/Red color for risk assessment
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Risk Assessment", 14, yPosition);
      yPosition += 10;
      
      doc.setTextColor(0, 0, 0); // Black color for content
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Risk Level: ${consultationResponse.riskAssessment.level}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Risk Score: ${consultationResponse.riskAssessment.score}/10`, 20, yPosition);
      yPosition += 7;
      
      if (consultationResponse.riskAssessment.factors.length > 0) {
        doc.text("Risk Factors:", 20, yPosition);
        yPosition += 7;
        consultationResponse.riskAssessment.factors.forEach((factor, index) => {
          doc.text(`• ${factor}`, 25, yPosition);
          yPosition += 7;
        });
      }
      yPosition += 10;
    }
    
    // Recommendations Section
    if (consultationResponse?.recommendations && consultationResponse.recommendations.length > 0) {
      doc.setTextColor(16, 185, 129); // Green color for recommendations
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Personalized Recommendations", 14, yPosition);
      yPosition += 10;
      
      doc.setTextColor(0, 0, 0); // Black color for content
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      consultationResponse.recommendations.forEach((recommendation, index) => {
        const lines = doc.splitTextToSize(`• ${recommendation}`, 170);
        lines.forEach((line: string) => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, 20, yPosition);
          yPosition += 7;
        });
      });
      yPosition += 10;
    }
    
    // Urgency Assessment Section
    if (consultationResponse?.urgency) {
      doc.setTextColor(245, 158, 11); // Orange color for urgency
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Urgency Assessment", 14, yPosition);
      yPosition += 10;
      
      doc.setTextColor(0, 0, 0); // Black color for content
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Timeframe: ${consultationResponse.urgency.timeframe}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Immediate Attention Required: ${consultationResponse.urgency.requiresImmediateAttention ? 'Yes' : 'No'}`, 20, yPosition);
      yPosition += 7;
      
      if (consultationResponse.urgency.instructions) {
        doc.text("Instructions:", 20, yPosition);
        yPosition += 7;
        const instructionLines = doc.splitTextToSize(consultationResponse.urgency.instructions, 170);
        instructionLines.forEach((line: string) => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, 20, yPosition);
          yPosition += 7;
        });
      }
      yPosition += 10;
    }
    
    // Next Steps Section
    if (consultationResponse?.nextSteps && consultationResponse.nextSteps.length > 0) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setTextColor(99, 102, 241); // Indigo color for next steps
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Recommended Next Steps", 14, yPosition);
      yPosition += 10;
      
      doc.setTextColor(0, 0, 0); // Black color for content
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      consultationResponse.nextSteps.forEach((step, index) => {
        const lines = doc.splitTextToSize(`${index + 1}. ${step}`, 170);
        lines.forEach((line: string) => {
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, 20, yPosition);
          yPosition += 7;
        });
      });
      yPosition += 10;
    }
    
    // Footer disclaimer
    if (yPosition > 260) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setTextColor(75, 85, 99); // Gray color for disclaimer
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Important Notice", 14, yPosition);
    yPosition += 10;
    
    doc.setTextColor(107, 114, 128); // Lighter gray for disclaimer text
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const disclaimer = "This consultation is for guidance only and does not replace professional medical advice. Please consult with a qualified healthcare provider for proper diagnosis and treatment.";
    const disclaimerLines = doc.splitTextToSize(disclaimer, 180);
    disclaimerLines.forEach((line: string) => {
      doc.text(line, 14, yPosition);
      yPosition += 5;
    });
    
    // Consultation ID if available
    if (consultationResponse?.consultationId) {
      yPosition += 5;
      doc.setTextColor(128, 128, 128); // Gray color for consultation ID
      doc.text(`Consultation ID: ${consultationResponse.consultationId}`, 14, yPosition);
    }
    
    doc.save(`e-likita-consultation-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  const currentTime = new Date().toLocaleString();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('consultation.steps.summary.title')}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t('consultation.steps.summary.description')}</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">👤</span>
            {t('consultation.steps.summary.patientInfo')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">{t('consultation.steps.summary.name')}:</span> {patient.fullName}</div>
            <div><span className="font-medium">{t('consultation.steps.summary.gender')}:</span> {patient.gender || t('consultation.steps.summary.notSpecified')}</div>
            <div><span className="font-medium">{t('consultation.steps.summary.age')}:</span> {patient.age || t('consultation.steps.summary.notSpecified')}</div>
            <div><span className="font-medium">{t('consultation.steps.summary.phone')}:</span> {patient.phone || t('consultation.steps.summary.notSpecified')}</div>
          </div>
          {patient.medicalHistory.length > 0 && (
            <div className="mt-4">
              <span className="font-medium text-sm">{t('consultation.steps.summary.medicalHistory')}:</span>
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
            {t('consultation.steps.summary.symptomsReported')}
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
                <div><span className="font-medium">{t('consultation.steps.summary.severity')}:</span> {symptomDetails.severity || t('consultation.steps.summary.notSpecified')}/10</div>
                <div><span className="font-medium">{t('consultation.steps.summary.duration')}:</span> {symptomDetails.duration || t('consultation.steps.summary.notSpecified')}</div>
              </div>
              {symptomDetails.details && (
                <div className="text-sm">
                  <span className="font-medium">{t('consultation.steps.summary.additionalDetails')}:</span>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{symptomDetails.details}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">{t('consultation.steps.summary.noSymptomsReported')}</p>
          )}
        </div>

        {consultationResponse?.riskAssessment && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              {t('consultation.steps.summary.riskAssessment')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-medium">{t('consultation.steps.summary.riskLevel')}:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  consultationResponse.riskAssessment.level === 'Emergency' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
                  consultationResponse.riskAssessment.level === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200' :
                  consultationResponse.riskAssessment.level === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                }`}>
                  {consultationResponse.riskAssessment.level}
                </span>
                <span className="text-sm text-gray-500">{t('consultation.steps.summary.riskScore')}: {consultationResponse.riskAssessment.score}/10</span>
              </div>
              {consultationResponse.riskAssessment.factors.length > 0 && (
                <div>
                  <span className="font-medium">{t('consultation.steps.summary.riskFactors')}:</span>
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
              {t('consultation.steps.summary.personalizedRecommendations')}
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
              {t('consultation.steps.summary.urgencyAssessment')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-medium">{t('consultation.steps.summary.timeframe')}:</span>
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
                  <span className="font-medium">{t('consultation.steps.summary.instructions')}:</span>
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
            {t('consultation.steps.summary.nextActions')}
          </h3>
          <div className="space-y-3 text-sm">
            <p className="text-orange-800 dark:text-orange-200 bg-orange-50 dark:bg-orange-950/30 p-3 rounded-lg">
              <strong>{t('consultation.steps.summary.importantNotice')}:</strong> {t('consultation.steps.summary.importantNoticeText')}
            </p>
            
            {consultationResponse?.nextSteps && consultationResponse.nextSteps.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">{t('consultation.steps.summary.recommendedNextSteps')}:</h4>
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
                <strong>{t('consultation.steps.summary.urgentMedicalAttention')}</strong> {t('consultation.steps.summary.urgentMedicalText')}
              </p>
            )}
            <div className="text-gray-600 dark:text-gray-300">
              <p><strong>{t('consultation.steps.summary.consultationTime')}:</strong> {currentTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Button container - responsive layout */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-6 border-t border-gray-200 dark:border-gray-700">
        {/* Back button */}
        <button 
          onClick={() => setStep(4)} 
          className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors order-3 sm:order-1"
        >
          ← {t('consultation.steps.summary.buttons.back')}
        </button>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
          <button 
            onClick={downloadPdf} 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors min-h-[48px] sm:min-h-0"
          >
            <span className="text-lg sm:hidden">📄</span>
            <span className="hidden sm:inline">📄 {t('consultation.steps.summary.buttons.download')}</span>
            <span className="sm:hidden">{t('consultation.steps.summary.buttons.download')}</span>
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem('consultation-progress');
              window.location.href = '/consultation';
            }}
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors min-h-[48px] sm:min-h-0"
          >
            <span className="text-lg sm:hidden">🔄</span>
            <span className="hidden sm:inline">🔄 {t('consultation.steps.summary.buttons.newConsultation')}</span>
            <span className="sm:hidden">{t('consultation.steps.summary.buttons.newConsultation')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

