export interface Department {
  id: string;
  name: string;
  iconName: string;
  shortDescription: string;
}

export interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  age: number;
  departmentVisited: string;
  rating: number; // e.g. 5
  quoteText: string;
  date: string;
}

export interface HighlightFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  authorName: string;
}

export interface AppointmentData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  department: string;
  doctor: string;
  appointmentDate: string;
  timeSlot: string;
  reason: string;
  insuranceProvider?: string;
}
