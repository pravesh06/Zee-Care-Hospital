import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeading from "./SectionHeading";
import { AppointmentData, Doctor, Department } from "../types";
import DynamicIcon from "./DynamicIcon";
import { supabase } from "../supabaseClient";

interface AppointmentFormProps {
  selectedDoctor: Doctor | null;
  selectedDepartmentId: string | null;
  onClearSelections: () => void;
  departments: Department[];
  doctors: Doctor[];
}

export default function AppointmentForm({
  selectedDoctor,
  selectedDepartmentId,
  onClearSelections,
  departments,
  doctors
}: AppointmentFormProps) {
  // Form fields state
  const [formData, setFormData] = useState<AppointmentData>({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    department: "",
    doctor: "",
    appointmentDate: "",
    timeSlot: "",
    reason: "",
    insuranceProvider: ""
  });

  // Errors state
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentData, string>>>({});
  // Submitted successfully state
  const [submittedData, setSubmittedData] = useState<AppointmentData | null>(null);

  // Supabase Sync states
  const [isSaving, setIsSaving] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [dbSuccess, setDbSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const sqlSchema = `create table appointments (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  dob date not null,
  department text not null,
  doctor text not null,
  appointment_date date not null,
  time_slot text not null,
  reason text not null,
  insurance_provider text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Allow public inserts
alter table appointments enable row level security;
create policy "Allow anonymous inserts" on appointments for insert with check (true);
create policy "Allow anonymous select" on appointments for select using (true);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Available doctors filtered dry state
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);

  // Track triggers of autofill from external cards
  useEffect(() => {
    if (selectedDepartmentId) {
      setFormData((prev) => ({
        ...prev,
        department: selectedDepartmentId,
        doctor: selectedDoctor ? selectedDoctor.id : ""
      }));
    } else if (selectedDoctor) {
      setFormData((prev) => ({
        ...prev,
        department: selectedDoctor.departmentId,
        doctor: selectedDoctor.id
      }));
    }
  }, [selectedDoctor, selectedDepartmentId]);

  // Adjust filtered clinicians when department field updates
  useEffect(() => {
    if (formData.department) {
      const filtered = doctors.filter((doc) => doc.departmentId === formData.department);
      setAvailableDoctors(filtered);
      
      // If the currently selected doctor doesn't belong to the newly selected department, clear it.
      if (formData.doctor) {
        const found = filtered.find((d) => d.id === formData.doctor);
        if (!found) {
          setFormData((prev) => ({ ...prev, doctor: "" }));
        }
      }
    } else {
      setAvailableDoctors([]);
      setFormData((prev) => ({ ...prev, doctor: "" }));
    }
  }, [formData.department, doctors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error message when user starts typing/correcting
    if (errors[name as keyof AppointmentData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AppointmentData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please specify a valid email address";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneRegex = /^[+]?[0-9\s-]{8,20}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please state a valid contact number (min 8 digits)";
      }
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.department) {
      newErrors.department = "Please choose a clinical department";
    }

    if (!formData.doctor) {
      newErrors.doctor = "Please choose a specialist doctor";
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Preferred date is required";
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        newErrors.appointmentDate = "Appointment cannot be set in past calendar days";
      }
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = "Preferred time slot is required";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please enter brief details on reasons or symptoms";
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = "Reason must contain at least 10 description units";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    setDbError(null);
    setDbSuccess(false);

    try {
      const { error } = await supabase
        .from("appointments")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            dob: formData.dob,
            department: formData.department,
            doctor: formData.doctor,
            appointment_date: formData.appointmentDate,
            time_slot: formData.timeSlot,
            reason: formData.reason,
            insurance_provider: formData.insuranceProvider || null,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error("Supabase insert error details:", error);
        if (
          error.code === "PGRST116" ||
          error.code === "42P01" ||
          error.message?.toLowerCase().includes("relation") ||
          error.message?.toLowerCase().includes("not found")
        ) {
          setDbError("Table-Not-Found");
        } else {
          setDbError(error.message || "An unexpected error occurred during database transmission.");
        }
      } else {
        setDbSuccess(true);
      }
    } catch (err: any) {
      console.error("Connection failed:", err);
      setDbError(err.message || "Network request failed. Please check your Supabase connection.");
    } finally {
      setIsSaving(false);
      setSubmittedData(formData);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      department: "",
      doctor: "",
      appointmentDate: "",
      timeSlot: "",
      reason: "",
      insuranceProvider: ""
    });
    setErrors({});
    setSubmittedData(null);
    setDbError(null);
    setDbSuccess(false);
    setIsSaving(false);
    onClearSelections();
  };

  // Helper selectors for summary card
  const getSelectedDepartmentName = () => {
    const dept = departments.find((d) => d.id === submittedData?.department);
    return dept ? dept.name : "";
  };

  const getSelectedDoctorName = () => {
    const doc = doctors.find((d) => d.id === submittedData?.doctor);
    return doc ? doc.name : "";
  };

  return (
    <section id="appointments" className="py-20 md:py-28 bg-[#F8FBFE] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Book Your Appointment"
          subtitle="Submit our encrypted, real-time consultation intake formulary to book safe clinical interventions with matching consultants."
        />

        <AnimatePresence mode="wait">
          {!submittedData ? (
            /* ACTIVE BOOKING FORM */
            <motion.div
              key="booking-form-box"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-[#1A73A7]/10 shadow-[0_8px_32px_rgba(26,115,167,0.06)]"
            >
              {selectedDoctor && (
                <div className="mb-6 bg-[#E8F4FD] border border-[#1A73A7]/20 p-4 rounded-2xl flex items-center justify-between text-left">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-[#1A73A7]"><DynamicIcon name="User" size={20} /></span>
                    <span className="text-[#1E293B] font-medium">
                      Booking appointment with <strong className="font-bold text-[#1A73A7]">{selectedDoctor.name}</strong> ({getSelectedDepartmentName() || "Specialist"})
                    </span>
                  </div>
                  <button
                    onClick={onClearSelections}
                    className="text-xs font-bold text-[#1D4ED8] hover:text-[#1E293B] hover:underline"
                  >
                    Clear Filter
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="fullName" className="text-sm font-semibold text-[#1E293B] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`block w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] ${
                        errors.fullName ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-[#E8F4FD] bg-[#F8FBFE] text-[#1E293B]"
                      }`}
                      placeholder="Jane Doe"
                      aria-required="true"
                    />
                    {errors.fullName && (
                      <span className="text-red-600 text-xs mt-1.5 font-medium">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="email" className="text-sm font-semibold text-[#1E293B] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] ${
                        errors.email ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-[#E8F4FD] bg-[#F8FBFE] text-[#1E293B]"
                      }`}
                      placeholder="jane.doe@example.com"
                      aria-required="true"
                    />
                    {errors.email && (
                      <span className="text-red-600 text-xs mt-1.5 font-medium">{errors.email}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="phone" className="text-sm font-semibold text-[#1E293B] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`block w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] ${
                        errors.phone ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-[#E8F4FD] bg-[#F8FBFE] text-[#1E293B]"
                      }`}
                      placeholder="+1 (555) 012-3456"
                      aria-required="true"
                    />
                    {errors.phone && (
                      <span className="text-red-600 text-xs mt-1.5 font-medium">{errors.phone}</span>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="dob" className="text-sm font-semibold text-[#1E293B] mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className={`block w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] ${
                        errors.dob ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-[#E8F4FD] bg-[#F8FBFE] text-[#1E293B]"
                      }`}
                      aria-required="true"
                    />
                    {errors.dob && (
                      <span className="text-red-600 text-xs mt-1.5 font-medium">{errors.dob}</span>
                    )}
                  </div>

                  {/* Select Department */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="department" className="text-sm font-semibold text-[#1E293B] mb-2">
                      Select Department *
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={`block w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] ${
                        errors.department ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-[#E8F4FD] bg-[#F8FBFE] text-[#1E293B]"
                      }`}
                      aria-required="true"
                    >
                      <option value="">-- Choose Department --</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <span className="text-red-600 text-xs mt-1.5 font-medium">{errors.department}</span>
                    )}
                  </div>

                  {/* Select Doctor (Cascading dynamically) */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="doctor" className="text-sm font-semibold text-[#1E293B] mb-2">
                      Select Doctor *
                    </label>
                    <select
                      id="doctor"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleInputChange}
                      disabled={!formData.department}
                      className={`block w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] disabled:opacity-60 disabled:cursor-not-allowed ${
                        errors.doctor ? "border-red-500 bg-red-50/10" : "border-[#E8F4FD] bg-[#F8FBFE] text-[#1E293B]"
                      }`}
                      aria-required="true"
                    >
                      <option value="">
                        {!formData.department ? "Choose department first" : "-- Select Specialist --"}
                      </option>
                      {availableDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.qualification})
                        </option>
                      ))}
                    </select>
                    {errors.doctor && (
                      <span className="text-red-600 text-xs mt-1.5 font-medium">{errors.doctor}</span>
                    )}
                  </div>

                  {/* Preferred Appointment Date */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="appointmentDate" className="text-sm font-semibold text-[#1E293B] mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="appointmentDate"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      className={`block w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] ${
                        errors.appointmentDate ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-[#E8F4FD] bg-[#F8FBFE] text-[#1E293B]"
                      }`}
                      aria-required="true"
                    />
                    {errors.appointmentDate && (
                      <span className="text-red-600 text-xs mt-1.5 font-medium">{errors.appointmentDate}</span>
                    )}
                  </div>

                  {/* Preferred Time Slot */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="timeSlot" className="text-sm font-semibold text-[#1E293B] mb-2">
                      Preferred Time Slot *
                    </label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className={`block w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] ${
                        errors.timeSlot ? "border-red-500 bg-red-50/10" : "border-[#E8F4FD] bg-[#F8FBFE] text-[#1E293B]"
                      }`}
                      aria-required="true"
                    >
                      <option value="">-- Choose Slot --</option>
                      <option value="9AM - 12PM (Morning)">9AM - 12PM (Morning)</option>
                      <option value="12PM - 4PM (Afternoon)">12PM - 4PM (Afternoon)</option>
                      <option value="4PM - 7PM (Evening)">4PM - 7PM (Evening)</option>
                    </select>
                    {errors.timeSlot && (
                      <span className="text-red-600 text-xs mt-1.5 font-medium">{errors.timeSlot}</span>
                    )}
                  </div>
                </div>

                {/* Insurance Provider (optional) */}
                <div className="flex flex-col text-left">
                  <label htmlFor="insuranceProvider" className="text-sm font-semibold text-[#1E293B] mb-2">
                    Insurance Provider <span className="text-[#64748B] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="insuranceProvider"
                    name="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-[#E8F4FD] bg-[#F8FBFE] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] text-[#1E293B]"
                    placeholder="E.g. BlueCross, Cigna, Medicare"
                  />
                </div>

                {/* Reasons / Symptoms */}
                <div className="flex flex-col text-left">
                  <label htmlFor="reason" className="text-sm font-semibold text-[#1E293B] mb-2">
                    Reason for Visit / Symptoms *
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows={4}
                    value={formData.reason}
                    onChange={handleInputChange}
                    className={`block w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] ${
                      errors.reason ? "border-red-500 bg-red-50/10 focus:ring-red-500" : "border-[#E8F4FD] bg-[#F8FBFE] text-[#1E293B]"
                    }`}
                    placeholder="Briefly state symptoms, duration, or previous diagnoses..."
                    aria-required="true"
                  />
                  {errors.reason && (
                    <span className="text-red-600 text-xs mt-1.5 font-medium">{errors.reason}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="confirm-appt-submit"
                  disabled={isSaving}
                  className={`w-full text-white font-bold py-4 rounded-xl text-center text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-all flex items-center justify-center space-x-2 ${
                    isSaving 
                      ? "bg-[#0D9488]/70 hover:bg-[#0D9488]/70 cursor-not-allowed" 
                      : "bg-[#0D9488] hover:bg-[#0F766E] shadow-[0_4px_14px_rgba(13,148,136,0.3)] hover:shadow-[0_8px_24px_rgba(13,148,136,0.45)] cursor-pointer"
                  }`}
                  aria-label="Confirm and send this clinical appointment form"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white animate-infinite" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Processing Booking...</span>
                    </>
                  ) : (
                    <span>Confirm Appointment</span>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            /* IMMERSIVE SUCCESS CONFIRMATION SUMMARY CARD *//* IMMERSIVE SUCCESS CONFIRMATION SUMMARY CARD */
            <motion.div
              key="booking-success-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0D9488] shadow-2xl text-center flex flex-col items-center"
            >
              {/* Animated Checklist visual */}
              <div className="w-20 h-20 bg-[#E8F4FD] text-[#0D9488] rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

               <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-2 leading-tight">
                Appointment Confirmed!
              </h3>
              <p className="text-[#64748B] text-sm sm:text-base max-w-lg mb-6 font-normal leading-relaxed">
                Thank you for choosing Zee Care Hospital. Your consultation request has been checked and registered. 
                A calendar invite and SMS message containing dynamic entry barcodes are being sent to your inbox.
              </p>

              {/* Database Sync Status Callout */}
              <div className="w-full max-w-lg mb-8 border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all text-left">
                {isSaving && (
                  <div className="bg-sky-50/60 p-4 flex items-center space-x-3.5 text-sm">
                    <svg className="animate-spin h-5 w-5 text-[#1A73A7]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <div>
                      <p className="font-bold text-[#1E293B]">Syncing to Supabase...</p>
                      <p className="text-xs text-[#64748B] mt-0.5">Logging reservation securely under project ethixgnouplxttrllxfb.</p>
                    </div>
                  </div>
                )}

                {dbSuccess && (
                  <div className="bg-emerald-50/60 p-4 flex items-start space-x-3.5 text-sm">
                    <span className="p-1 bg-emerald-600 text-white rounded-full flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-bold text-emerald-950">Successfully Saved in Supabase!</p>
                      <p className="text-xs text-emerald-800 mt-0.5">The booking details have been successfully persisted in your remote SQL table.</p>
                    </div>
                  </div>
                )}

                {dbError === "Table-Not-Found" && (
                  <div className="bg-amber-50/50 p-5 text-sm">
                    <div className="flex items-start space-x-3">
                      <span className="px-1.5 py-0.5 bg-amber-600 text-white rounded font-mono text-[10px] font-bold leading-none mt-1">
                        SQL
                      </span>
                      <div>
                        <p className="font-bold text-amber-950">Supabase Table Setup Required!</p>
                        <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                          Your credentials connected, but the <code className="bg-amber-100/80 px-1 py-0.5 rounded text-amber-900 font-mono font-bold">appointments</code> table does not exist in your Supabase project yet.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Run this in your SQL Editor:</p>
                      <div className="relative">
                        <pre className="bg-slate-900 text-[#E2E8F0] p-3.5 rounded-xl text-left overflow-x-auto text-[10px] font-mono leading-relaxed select-text max-h-48 overflow-y-auto">
                          {sqlSchema}
                        </pre>
                        <button
                          onClick={copyToClipboard}
                          className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-md text-[10px] transition-colors flex items-center space-x-1 border border-slate-700 cursor-pointer"
                        >
                          <span>{copied ? "Copied!" : "Copy SQL"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {dbError && dbError !== "Table-Not-Found" && (
                  <div className="bg-red-50/60 p-4 flex items-start space-x-3.5 text-sm">
                    <span className="p-1 bg-red-600 text-white rounded-full flex-shrink-0 mt-0.5 font-bold text-xs w-5 h-5 flex items-center justify-center">!</span>
                    <div>
                      <p className="font-bold text-red-950">Supabase Connection Error</p>
                      <p className="text-xs text-red-800 mt-0.5 leading-relaxed">{dbError}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary Paper Container */}
              <div className="w-full max-w-lg bg-[#F8FBFE] border border-[#1A73A7]/10 rounded-2xl p-6.5 text-left space-y-4 mb-8">
                <div className="flex justify-between items-center pb-3 border-b border-[#E8F4FD]">
                  <span className="text-[11px] font-bold text-[#1A73A7] uppercase tracking-wider font-mono">
                    BARCODE: #ZCH-{(Math.floor(Math.random() * 90000) + 10000)}
                  </span>
                  <span className="text-[11px] font-bold text-white bg-[#0D9488] px-2.5 py-0.5 rounded-full uppercase">
                    Paid Code: Free OPD
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Patient Name</p>
                    <p className="text-sm font-bold text-[#1E293B] mt-0.5">{submittedData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Contact Email</p>
                    <p className="text-sm font-bold text-[#1E293B] mt-0.5">{submittedData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Department</p>
                    <p className="text-sm font-bold text-[#1A73A7] mt-0.5">{getSelectedDepartmentName()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Consulting Specialist</p>
                    <p className="text-sm font-bold text-[#1E293B] mt-0.5">{getSelectedDoctorName()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Preferred Date</p>
                    <p className="text-sm font-bold text-[#1E293B] mt-0.5">{submittedData.appointmentDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Time Slot</p>
                    <p className="text-sm font-bold text-[#1D4ED8] mt-0.5">{submittedData.timeSlot}</p>
                  </div>
                  {submittedData.insuranceProvider && (
                    <div className="sm:col-span-2 border-t border-[#E8F4FD]/60 pt-3">
                      <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Insurance Provider</p>
                      <p className="text-sm font-bold text-[#1E293B] mt-0.5">{submittedData.insuranceProvider}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reset to book again */}
              <button
                id="appt-success-book-another"
                onClick={handleResetForm}
                className="bg-[#1A73A7] hover:bg-[#125780] text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition-all text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#1A73A7]"
                aria-label="Book another appointment and reset this summary"
              >
                Book Another Appointment
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
