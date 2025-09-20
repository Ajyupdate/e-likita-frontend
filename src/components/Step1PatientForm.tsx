"use client";
import { useConsultation } from "@/context/ConsultationContext";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  fullName: Yup.string().required("Required"),
  age: Yup.number().min(0).max(120).optional(),
  gender: Yup.string().optional(),
  phone: Yup.string().optional(),
  emergencyContactName: Yup.string().optional(),
  emergencyContactPhone: Yup.string().optional(),
});

export default function Step2PatientForm() {
  const { patient, setPatient, setStep } = useConsultation();
  const [mhOptions, setMhOptions] = useState<{ key: string; label: string }[]>([]);
  useEffect(() => {
    apiGet<{ key: string; label: string }[]>("/reference/medical-history").then(setMhOptions).catch(console.error);
  }, []);
  
  return (
    <Formik
      initialValues={{
        fullName: patient.fullName,
        age: patient.age,
        gender: patient.gender,
        phone: patient.phone,
        medicalHistory: patient.medicalHistory,
        allergies: patient.allergies,
        medications: patient.medications,
        emergencyContactName: patient.emergencyContactName,
        emergencyContactPhone: patient.emergencyContactPhone,
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        setPatient({
          ...values,
          medicalHistory: Array.isArray(values.medicalHistory) ? values.medicalHistory : [],
        } as any);
        setStep(3);
      }}
    >
      {() => (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Patient Information</h2>
            <p className="text-gray-600 dark:text-gray-300">Please provide your personal details and medical history</p>
          </div>
          
          <Form className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Field 
                name="fullName" 
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800" 
                placeholder="Enter your full name as it appears on your ID" 
              />
              <ErrorMessage name="fullName" component="div" className="text-sm text-red-600 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
              <Field 
                type="number" 
                name="age" 
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800" 
                placeholder="Your age" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
              <Field 
                as="select" 
                name="gender" 
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <Field 
                name="phone" 
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800" 
                placeholder="Your phone number"
              />
            </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Medical History</label>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {mhOptions.map((mh) => (
                <label key={mh.key} className="inline-flex items-center gap-2">
                  <Field type="checkbox" name="medicalHistory" value={mh.label} />
                  <span>{mh.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Known Allergies</label>
            <Field as="textarea" name="allergies" rows={2} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium">Current Medications</label>
            <Field as="textarea" name="medications" rows={2} className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Emergency Contact Name</label>
            <Field name="emergencyContactName" className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Emergency Contact Phone</label>
            <Field name="emergencyContactPhone" className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
          </div>
            <div className="sm:col-span-2 mt-6 flex items-center justify-between">
              <button 
                type="button"
                onClick={() => setStep(1)} 
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                ← Back
              </button>
              <button 
                type="submit" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Next →
              </button>
            </div>
        </Form>
        </div>
      )}
    </Formik>
  )
}

