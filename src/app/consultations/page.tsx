"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useThemeSync } from "@/hooks/useThemeSync";
import { apiGet } from "@/lib/api";
import { Calendar, Clock, AlertTriangle, CheckCircle, FileText } from "lucide-react";

interface Consultation {
  _id: string;
  consultationNumber: string;
  status: string;
  createdAt: string;
  completedAt?: string;
  steps: {
    riskAssessment?: {
      level: string;
      score: number;
    };
    patientInfo?: {
      fullName: string;
    };
    symptoms?: Array<{ name: string }>;
  };
}

export default function ConsultationsPage() {
  const { user, isLoading } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      fetchConsultations();
    } else if (!isLoading && !user) {
      setLoading(false);
    }
  }, [user, isLoading]);

  const fetchConsultations = async () => {
    try {
      const data = await apiGet<Consultation[]>(`/consultations/patient/${user?.userId}`);
      setConsultations(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch consultations");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Emergency': return 'text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-200';
      case 'High': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/50 dark:text-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-200';
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/50 dark:text-gray-200';
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Authentication Required
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please sign in to view your consultation history.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Consultation History
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage your previous medical consultations
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {consultations.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Consultations Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You haven&apos;t completed any consultations yet. Start your first consultation to see it here.
            </p>
            <button
              onClick={() => window.location.href = '/consultation'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start Consultation
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div
                key={consultation._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {consultation.consultationNumber}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Patient: {consultation.steps.patientInfo?.fullName || 'Unknown'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {consultation.steps.riskAssessment && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(consultation.steps.riskAssessment.level)}`}>
                        {consultation.steps.riskAssessment.level} Risk
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      consultation.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200'
                    }`}>
                      {consultation.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4" />
                    {new Date(consultation.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="h-4 w-4" />
                    {new Date(consultation.createdAt).toLocaleTimeString()}
                  </div>
                  {consultation.steps.riskAssessment && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <AlertTriangle className="h-4 w-4" />
                      Score: {consultation.steps.riskAssessment.score}/10
                    </div>
                  )}
                </div>

                {consultation.steps.symptoms && consultation.steps.symptoms.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Reported Symptoms:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {consultation.steps.symptoms.map((symptom, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs"
                        >
                          {symptom.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4" />
                    {consultation.completedAt ? `Completed ${new Date(consultation.completedAt).toLocaleDateString()}` : 'In Progress'}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
