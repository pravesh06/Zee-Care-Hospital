import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../supabaseClient";
import DynamicIcon from "./DynamicIcon";

interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  dob: string;
  department: string;
  doctor: string;
  appointment_date: string;
  time_slot: string;
  reason: string;
  insurance_provider?: string;
  created_at: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  // Check if admin is already registered in localStorage
  const getRegisteredAdmin = () => {
    try {
      const stored = localStorage.getItem("zee_care_admin_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const [registeredAdmin, setRegisteredAdmin] = useState<{ username: string } | null>(getRegisteredAdmin());
  const [isAdminCreated, setIsAdminCreated] = useState<boolean>(!!getRegisteredAdmin());

  // Navigation / Login States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<"login" | "register">("login");

  // Input states
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Error/Success displays
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Bookings list state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState<boolean>(false);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  // Detailed view of selected booking
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Sync is Registered Admin flag
  useEffect(() => {
    const admin = getRegisteredAdmin();
    setRegisteredAdmin(admin);
    setIsAdminCreated(!!admin);
    if (!admin) {
      setCurrentView("register");
    } else {
      setCurrentView("login");
    }
  }, [isOpen]);

  // Fetch bookings from Supabase
  const fetchBookings = async () => {
    setIsLoadingBookings(true);
    setBookingsError(null);
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        if (error.code === "PGRST116" || error.code === "42P01" || error.message?.toLowerCase().includes("relation")) {
          setBookingsError("appointments-table-not-found");
        } else {
          setBookingsError(error.message || "Failed to fetch bookings from your database.");
        }
      } else {
        setBookings(data || []);
      }
    } catch (err: any) {
      setBookingsError(err.message || "Network request failed to load bookings.");
    } finally {
      setIsLoadingBookings(false);
    }
  };

  // Perform fetch when logged in
  useEffect(() => {
    if (isLoggedIn && isOpen) {
      fetchBookings();
    }
  }, [isLoggedIn, isOpen]);

  // Handling registration (Only 1 slot allowed)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    // Guard if already created
    if (isAdminCreated || getRegisteredAdmin()) {
      setAuthError("Registration slot is fully taken. No further admin slots can be registered.");
      return;
    }

    if (!regUsername.trim() || !regPassword.trim()) {
      setAuthError("All credentials fields are strictly required.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    if (regPassword.length < 4) {
      setAuthError("Password must be at least 4 characters long.");
      return;
    }

    const adminData = { username: regUsername.trim(), password: regPassword };
    localStorage.setItem("zee_care_admin_user", JSON.stringify(adminData));
    setRegisteredAdmin({ username: regUsername.trim() });
    setIsAdminCreated(true);
    setAuthSuccess("Admin account created successfully! The single-user slot is now locked. Please log in.");
    
    // Clear registration fields
    setRegUsername("");
    setRegPassword("");
    setRegConfirmPassword("");
    setCurrentView("login");
  };

  // Handling login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    const user = loginUsername.trim();
    const pass = loginPassword;

    if (!user || !pass) {
      setAuthError("Both admin name and password are required.");
      return;
    }

    // Support BOTH registered custom account OR the explicit admin credentials provided:
    // admin name: Pravesh@123
    // Admin Password: 00000
    const storedAdmin = getRegisteredAdmin();
    const matchesStored = storedAdmin && user === storedAdmin.username && pass === storedAdmin.password;
    const matchesSpecified = user === "Pravesh@123" && pass === "00000";

    if (matchesStored || matchesSpecified) {
      // Auto-register to localstorage if it matches specified but not registered yet
      if (matchesSpecified && !storedAdmin) {
        const adminData = { username: "Pravesh@123", password: "00000" };
        localStorage.setItem("zee_care_admin_user", JSON.stringify(adminData));
        setRegisteredAdmin({ username: "Pravesh@123" });
        setIsAdminCreated(true);
      }
      setIsLoggedIn(true);
      setAuthSuccess("Login successful!");
      setLoginUsername("");
      setLoginPassword("");
    } else {
      setAuthError("Invalid administrator credentials. Please check your spelling and retry.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedBooking(null);
  };

  // Filter bookings list
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone?.includes(searchTerm) ||
      b.doctor?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === "all" || b.department === deptFilter;

    return matchesSearch && matchesDept;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, stroke: "none" }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col font-sans text-[#1E293B]"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white text-slate-900">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#1A73A7] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-sky-100">
                ZC
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#1E293B] tracking-tight">Zee Care Admin Portal</h2>
                <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider mt-0.5">Clinical Bookings Manager</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 active:bg-slate-200 text-[#64748B] hover:text-[#1E293B] rounded-xl transition-colors cursor-pointer"
              aria-label="Close Admin Panel"
            >
              <DynamicIcon name="X" size={22} />
            </button>
          </div>

          {/* Main Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
            {!isLoggedIn ? (
              /* Auth Screens */
              <div className="max-w-md mx-auto my-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-xl">
                {/* View Selector */}
                <div className="flex bg-slate-100 p-1.5 rounded-xl mb-6">
                  <button
                    onClick={() => {
                      setCurrentView("login");
                      setAuthError(null);
                      setAuthSuccess(null);
                    }}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                      currentView === "login"
                        ? "bg-white text-[#1A73A7] shadow-sm"
                        : "text-[#64748B] hover:text-[#1E293B]"
                    }`}
                  >
                    Admin Login
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView("register");
                      setAuthError(null);
                      setAuthSuccess(null);
                    }}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                      currentView === "register"
                        ? "bg-white text-[#1A73A7] shadow-sm"
                        : "text-[#64748B] hover:text-[#1E293B]"
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Alerts */}
                {authError && (
                  <div className="p-3.5 bg-red-50 text-red-700 text-xs font-medium rounded-xl border border-red-100 mb-5 leading-normal">
                    {authError}
                  </div>
                )}
                {authSuccess && (
                  <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-xl border border-emerald-100 mb-5 leading-normal">
                    {authSuccess}
                  </div>
                )}

                {/* LOGIN FORM */}
                {currentView === "login" && (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider ml-1">Admin User Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Pravesh@123"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        className="w-full mt-1.5 text-sm bg-[#F8FBFE] border border-slate-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#1A73A7] transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider ml-1">Admin Password</label>
                      <input
                        type="password"
                        placeholder="•••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full mt-1.5 text-sm bg-[#F8FBFE] border border-slate-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#1A73A7] transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#1A73A7] hover:bg-sky-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-100 mt-2 hover:shadow-sky-200 transition-all cursor-pointer text-sm"
                    >
                      Authenticate Access
                    </button>
                    
                    <div className="pt-2 text-center text-[11px] text-[#64748B] leading-normal font-normal">
                      <p>You can use the assigned supervisor login information provided:</p>
                      <p className="mt-1">
                        User: <strong className="font-semibold text-[#1A73A7]">Pravesh@123</strong> | Password: <strong className="font-semibold text-[#1A73A7]">00000</strong>
                      </p>
                    </div>
                  </form>
                )}

                {/* REGISTRATION FORM - SINGLE USER SLOT */}
                {currentView === "register" && (
                  <form onSubmit={handleRegister} className="space-y-4">
                    {isAdminCreated ? (
                      <div className="text-center py-6 space-y-3">
                        <span className="text-4xl">🔒</span>
                        <h4 className="font-bold text-[#1E293B]">Admin Slot is Occupied</h4>
                        <p className="text-xs text-[#64748B] leading-relaxed max-w-sm mx-auto">
                          Only a single administrator slot is permitted. An account is already registered. You cannot create any more admin accounts on this client.
                        </p>
                        <button
                          type="button"
                          onClick={() => setCurrentView("login")}
                          className="mt-2 text-sm text-[#1A73A7] font-bold hover:underline"
                        >
                          Proceed directly to log in &rarr;
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="bg-amber-50 text-amber-900 border border-amber-100 p-3 rounded-xl text-xs leading-normal font-medium flex items-start space-x-2.5">
                          <span className="mt-0.5">⚠️</span>
                          <span>
                            <strong>Single Admin Slot:</strong> Once you create this admin account, registration will be immediately locked to secure database records. 
                          </span>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider ml-1">Set Admin Username</label>
                          <input
                            type="text"
                            placeholder="e.g. Pravesh@123"
                            value={regUsername}
                            onChange={(e) => setRegUsername(e.target.value)}
                            className="w-full mt-1.5 text-sm bg-[#F8FBFE] border border-slate-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#1A73A7] transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider ml-1">Set Password</label>
                          <input
                            type="password"
                            placeholder="Password input"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="w-full mt-1.5 text-sm bg-[#F8FBFE] border border-slate-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#1A73A7] transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider ml-1">Confirm Password</label>
                          <input
                            type="password"
                            placeholder="Repeat password"
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            className="w-full mt-1.5 text-sm bg-[#F8FBFE] border border-slate-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#1A73A7] transition-all"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-[#0D9488] hover:bg-teal-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-100 mt-2 hover:shadow-teal-200 transition-all cursor-pointer text-sm"
                        >
                          Create Admin &amp; Lock Registration
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>
            ) : (
              /* DASHBOARD SCREEN - VIEW BOOKINGS */
              <div className="space-y-6">
                {/* Stats & Controls Bar */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-md">
                  <div className="flex items-center space-x-6">
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest leading-none">Total Bookings</p>
                      <p className="text-3xl font-extrabold text-[#1E293B] mt-1">{bookings.length}</p>
                    </div>
                    <div className="h-10 w-[1px] bg-slate-200" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest leading-none">Filtered Results</p>
                      <p className="text-3xl font-extrabold text-[#1A73A7] mt-1">{filteredBookings.length}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchBookings}
                      disabled={isLoadingBookings}
                      className="px-4 py-2.5 bg-[#E8F4FD] hover:bg-sky-100 active:bg-sky-200 text-[#1A73A7] font-bold rounded-xl text-sm transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <DynamicIcon name="Clock" className={`animate-pulse ${isLoadingBookings ? "animate-spin" : ""}`} size={16} />
                      <span>{isLoadingBookings ? "Refreshing..." : "Refresh Appts"}</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2.5 bg-red-50 hover:bg-red-150 active:bg-red-200 text-red-600 font-bold rounded-xl text-sm transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <DynamicIcon name="User" size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-8 relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                      <DynamicIcon name="Activity" size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search patient, doc, phone number or details..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] transition-all text-slate-800 shadow-sm"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <select
                      value={deptFilter}
                      onChange={(e) => setDeptFilter(e.target.value)}
                      className="w-full bg-white border border-slate-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A73A7] transition-all text-slate-800 shadow-sm font-semibold"
                    >
                      <option value="all">📁 All Departments</option>
                      <option value="Cardiology">❤️ Cardiology</option>
                      <option value="Neurology">🧠 Neurology</option>
                      <option value="Orthopedics">🦴 Orthopedics</option>
                      <option value="Pediatrics">👶 Pediatrics</option>
                      <option value="Oncology">🔬 Oncology</option>
                      <option value="Dermatology">✨ Dermatology</option>
                    </select>
                  </div>
                </div>

                {/* Main Data Table */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
                  {isLoadingBookings ? (
                    <div className="py-24 text-center text-slate-500 flex flex-col items-center justify-center space-y-3">
                      <svg className="animate-spin h-8 w-8 text-[#1A73A7]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <p className="text-sm font-medium">Fetching active digital bookings from cloud tables...</p>
                    </div>
                  ) : bookingsError ? (
                    <div className="py-16 px-6 text-center text-slate-500 max-w-lg mx-auto space-y-4">
                      {bookingsError === "appointments-table-not-found" ? (
                        <>
                          <span className="p-3 bg-amber-150 text-amber-800 rounded-full inline-block text-2xl font-bold">⚠️</span>
                          <h4 className="text-base font-extrabold text-slate-800">Database Table Setup Required!</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            No SQL <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold text-slate-900">appointments</code> relation table exists in your connected Supabase schema yet. Book an appointment first or run the setup code in your Supabase SQL editor.
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl text-red-500">❌</span>
                          <p className="text-sm text-red-600 font-bold">{bookingsError}</p>
                          <p className="text-xs leading-relaxed text-slate-450">Could not retrieve live SQL reservations. Verify your Supabase anon project permissions.</p>
                        </>
                      )}
                    </div>
                  ) : filteredBookings.length === 0 ? (
                    <div className="py-20 text-center text-slate-450">
                      <span className="text-3xl">📭</span>
                      <p className="text-sm font-semibold text-slate-700 mt-3">No bookings match your current criteria.</p>
                      <p className="text-xs text-slate-500 mt-1">Try resetting filters or checking spelling.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[#64748B] text-[10px] uppercase tracking-wider font-extrabold">
                            <th className="py-3 px-4">Patient Name</th>
                            <th className="py-3 px-4">clinical focus</th>
                            <th className="py-3 px-4">Assigned doctor</th>
                            <th className="py-3 px-4">Appointment Date</th>
                            <th className="py-3 px-4">Time Window</th>
                            <th className="py-3 px-4">Mobile</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                          {filteredBookings.map((b) => (
                            <tr key={b.id} className="hover:bg-slate-50/55 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-[#1E293B]">{b.full_name}</td>
                              <td className="py-3.5 px-4">
                                <span className="bg-[#E8F4FD] text-[#1A73A7] px-2.5 py-1 rounded-full text-xs font-semibold">
                                  {b.department}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 font-medium text-slate-700">{b.doctor}</td>
                              <td className="py-3.5 px-4 font-mono text-xs font-semibold text-[#1A73A7]">
                                {b.appointment_date}
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="bg-teal-50 text-[#0D9488] px-2 py-0.5 rounded-md text-xs font-medium">
                                  {b.time_slot}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">{b.phone}</td>
                              <td className="py-3.5 px-4 text-center">
                                <button
                                  onClick={() => setSelectedBooking(b)}
                                  className="text-xs text-[#1A73A7] hover:text-sky-800 font-extrabold focus:outline-none bg-sky-50 hover:bg-sky-100 hover:ring-1 hover:ring-[#1A73A7]/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Selected Booking Details Pop-up Overlaid in columns or drawers */}
                {selectedBooking && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border-2 border-sky-150 p-6 text-left shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-4 border-b border-slate-150 pb-3">
                      <div>
                        <h3 className="font-extrabold text-lg text-slate-900">
                          Case File: {selectedBooking.full_name}
                        </h3>
                        <p className="text-xs text-slate-500">Registered ID: {selectedBooking.id}</p>
                      </div>
                      <button
                        onClick={() => setSelectedBooking(null)}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-md"
                      >
                        CLOSE DETAIL
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                      <div className="space-y-2">
                        <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Patient Information</p>
                        <p><strong>Name:</strong> {selectedBooking.full_name}</p>
                        <p><strong>Date of Birth:</strong> {selectedBooking.dob}</p>
                        <p><strong>Contact phone:</strong> {selectedBooking.phone}</p>
                        <p><strong>Email:</strong> {selectedBooking.email}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Appointment Clinicals</p>
                        <p><strong>Department Unit:</strong> {selectedBooking.department}</p>
                        <p><strong>Assigned Doctor:</strong> {selectedBooking.doctor}</p>
                        <p><strong>Scheduled Date:</strong> {selectedBooking.appointment_date}</p>
                        <p><strong>Daily Slot:</strong> {selectedBooking.time_slot}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Financial & Symptoms</p>
                        <p><strong>Insurance Company:</strong> {selectedBooking.insurance_provider || "None (Self-Pay OPD)"}</p>
                        <p className="bg-slate-50 p-3 rounded-lg text-xs leading-relaxed text-slate-700 italic border border-slate-100">
                          <strong>Chief Complaints/Notes:</strong> &ldquo;{selectedBooking.reason}&rdquo;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Footer of modal */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#64748B]">
            <span>© 2026 Zee Care Hospital. Strictly restricted administrative portal.</span>
            <div className="flex gap-4 mt-2 sm:mt-0 font-semibold">
              <span className="text-[#0D9488]">● Secure SSL Transmission</span>
              <span>Project ID: ethixgnouplxttrllxfb</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
