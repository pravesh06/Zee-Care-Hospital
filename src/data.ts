import { Department, Doctor, ServiceItem, Testimonial, HighlightFeature, BlogPost } from "./types";

export const DEPARTMENTS: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    iconName: "Heart",
    shortDescription: "Comprehensive heart care, advanced diagnostics, and minimally invasive cardiac procedures."
  },
  {
    id: "neurology",
    name: "Neurology",
    iconName: "Brain",
    shortDescription: "Specialized treatment for complex head, spinal, and peripheral nervous system conditions."
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    iconName: "Activity",
    shortDescription: "Joint replacements, sports medicine, spinal adjustments, and bone fracture treatments."
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    iconName: "Baby",
    shortDescription: "Compassionate, child-centric medical care and vaccinations for infants, kids, and teens."
  },
  {
    id: "oncology",
    name: "Oncology",
    iconName: "Shield",
    shortDescription: "Advanced cancer therapies, precision immunotherapy, and compassionate palliative care."
  },
  {
    id: "gynecology",
    name: "Gynecology & Obstetrics",
    iconName: "Sparkles",
    shortDescription: "Dedicated women's health services, prenatal care, and safe, comfortable deliveries."
  },
  {
    id: "dermatology",
    name: "Dermatology",
    iconName: "Eye",
    shortDescription: "Expert diagnosis and therapy for diverse skin, hair, nail, and aesthetic conditions."
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    iconName: "Eye",
    shortDescription: "Precision vision correction, cataract surgeries, and comprehensive eye disease management."
  },
  {
    id: "ent",
    name: "ENT",
    iconName: "Volume2",
    shortDescription: "Diagnosis and care for complex ear, nose, throat, voice, and equilibrium disorders."
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    iconName: "Scissors",
    shortDescription: "Expert inpatient and outpatient surgical interventions utilizing laparoscopic techniques."
  },
  {
    id: "psychiatry",
    name: "Psychiatry",
    iconName: "Smile",
    shortDescription: "Compassionate mental health therapies, psychiatric counseling, and mood treatments."
  },
  {
    id: "radiology",
    name: "Radiology",
    iconName: "Tv",
    shortDescription: "High-resolution digital X-rays, 3T MRIs, ultrarapid CT scans, and ultrasound imaging."
  }
];

export const DOCTORS: Doctor[] = [
  // Cardiology Doctors
  {
    id: "doc-cardio-1",
    name: "Dr. Arvind Mehta",
    departmentId: "cardiology",
    specialization: "Interventional Cardiologist",
    qualification: "MD, DM (Cardiology), FACC",
    experienceYears: 18
  },
  {
    id: "doc-cardio-2",
    name: "Dr. Sarah Alston",
    departmentId: "cardiology",
    specialization: "Pediatric Cardiologist",
    qualification: "MBBS, MD, Fellow in Pediatric Cardiology",
    experienceYears: 12
  },
  {
    id: "doc-cardio-3",
    name: "Dr. Benjamin Carter",
    departmentId: "cardiology",
    specialization: "Electrophysiologist & Cardiologist",
    qualification: "MD, Board Certified in Cardiovascular Disease",
    experienceYears: 15
  },

  // Neurology Doctors
  {
    id: "doc-neuro-1",
    name: "Dr. Rajesh K. Nair",
    departmentId: "neurology",
    specialization: "Senior Neurologist",
    qualification: "MD, DM (Neurology)",
    experienceYears: 20
  },
  {
    id: "doc-neuro-2",
    name: "Dr. Elena Rostov",
    departmentId: "neurology",
    specialization: "Stroke & Neuro-intervention Specialist",
    qualification: "MD, PhD (Neuroscience)",
    experienceYears: 14
  },
  {
    id: "doc-neuro-3",
    name: "Dr. Marcus Vance",
    departmentId: "neurology",
    specialization: "Epilepsy Specialists & Neurologist",
    qualification: "MBBS, MD (Neurology), FAAN",
    experienceYears: 16
  },

  // Orthopedics Doctors
  {
    id: "doc-ortho-1",
    name: "Dr. Vivek Deshmukh",
    departmentId: "orthopedics",
    specialization: "Joint Replacement Specialist",
    qualification: "MS (Orthopedics), MCh (Ortho - UK)",
    experienceYears: 19
  },
  {
    id: "doc-ortho-2",
    name: "Dr. Chloe Thompson",
    departmentId: "orthopedics",
    specialization: "Sports Medicine Specialist",
    qualification: "MBBS, MS (Orthopedics), Fellow in Arthroscopy",
    experienceYears: 11
  },
  {
    id: "doc-ortho-3",
    name: "Dr. Liam Gallagher",
    departmentId: "orthopedics",
    specialization: "Spine Surgery Expert",
    qualification: "MD, Fellow in Spine Surgery",
    experienceYears: 15
  },

  // Pediatrics Doctors
  {
    id: "doc-ped-1",
    name: "Dr. Meera Sen",
    departmentId: "pediatrics",
    specialization: "Consultant Pediatrician",
    qualification: "MBBS, DCH, MD (Pediatrics)",
    experienceYears: 16
  },
  {
    id: "doc-ped-2",
    name: "Dr. David Kim",
    departmentId: "pediatrics",
    specialization: "Neonatalogist",
    qualification: "MD (Pediatrics), Fellowship in Neonatal Medicine",
    experienceYears: 13
  },
  {
    id: "doc-ped-3",
    name: "Dr. Fiona Higgins",
    departmentId: "pediatrics",
    specialization: "Developmental Pediatrician",
    qualification: "MBBS, MD, FRCPCH",
    experienceYears: 14
  },

  // Oncology Doctors
  {
    id: "doc-onco-1",
    name: "Dr. Sanjay Dutt",
    departmentId: "oncology",
    specialization: "Surgical Oncologist",
    qualification: "MS, MCh (Surgical Oncology)",
    experienceYears: 17
  },
  {
    id: "doc-onco-2",
    name: "Dr. Katherine Pierce",
    departmentId: "oncology",
    specialization: "Medical Oncologist",
    qualification: "MD, DM (Medical Oncology)",
    experienceYears: 13
  },

  // Gynecology Doctors
  {
    id: "doc-gyn-1",
    name: "Dr. Shalini Rao",
    departmentId: "gynecology",
    specialization: "Obstetrician & Gynecologist",
    qualification: "MD, DGO, FICOG",
    experienceYears: 22
  },
  {
    id: "doc-gyn-2",
    name: "Dr. Beatrice Vance",
    departmentId: "gynecology",
    specialization: "Infertility Specialist",
    qualification: "MBBS, MS (Gynecology & Obstetrics), Fellow in IVF",
    experienceYears: 12
  },

  // Dermatology Doctors
  {
    id: "doc-derm-1",
    name: "Dr. Rohan Joshi",
    departmentId: "dermatology",
    specialization: "Clinical & Aesthetic Dermatologist",
    qualification: "MD (Dermatology)",
    experienceYears: 10
  },

  // Ophthalmology Doctors
  {
    id: "doc-oph-1",
    name: "Dr. Charles Xavier",
    departmentId: "ophthalmology",
    specialization: "Cataract & Refractive Surgeon",
    qualification: "MS, FRCS (Ophthalmology)",
    experienceYears: 21
  },

  // ENT Doctors
  {
    id: "doc-ent-1",
    name: "Dr. Anita Desai",
    departmentId: "ent",
    specialization: "ENT Consultant",
    qualification: "MBBS, MS (Ophthalmology & ENT)",
    experienceYears: 14
  },

  // General Surgery Doctors
  {
    id: "doc-surg-1",
    name: "Dr. Richard Webber",
    departmentId: "general-surgery",
    specialization: "Chief Laparoscopic Surgeon",
    qualification: "MS (General Surgery), FRCS",
    experienceYears: 25
  },

  // Psychiatry Doctors
  {
    id: "doc-psych-1",
    name: "Dr. Linda Martin",
    departmentId: "psychiatry",
    specialization: "Child & Adult Psychiatrist",
    qualification: "MD (Psychiatry)",
    experienceYears: 15
  },

  // Radiology Doctors
  {
    id: "doc-rad-1",
    name: "Dr. Bruce Banner",
    departmentId: "radiology",
    specialization: "Diagnostic & Interventional Radiologist",
    qualification: "MD, DM (Interventional Radiology)",
    experienceYears: 16
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "service-1",
    title: "24/7 Emergency Care",
    description: "Fully staffed trauma center equipped with state-of-the-art lifesaving assets for immediate acute intervention.",
    iconName: "Activity"
  },
  {
    id: "service-2",
    title: "Advanced Diagnostics & Imaging",
    description: "High-resolution digital imaging, including 3T MRIs, high-definition CT scans, and 4D color ultrasound.",
    iconName: "Cpu"
  },
  {
    id: "service-3",
    title: "ICU & Critical Care",
    description: "Intensive care units delivering multi-system organ monitoring and nurse-to-patient ratio of 1:1 or 2:1.",
    iconName: "Activity"
  },
  {
    id: "service-4",
    title: "Outpatient Consultations",
    description: "Multidisciplinary clinics offering comprehensive medical consults, preventive health coaching, and tailored scripts.",
    iconName: "Thermometer"
  },
  {
    id: "service-5",
    title: "Preventive Health Checkups",
    description: "Structured medical screenings, comprehensive blood panels, cardiac stress testing, and metabolic profiling.",
    iconName: "Shield"
  },
  {
    id: "service-6",
    title: "Minimally Invasive Surgery",
    description: "Advanced laparoscopic and robotic procedures that minimize tissue trauma, accelerate recovery, and reduce scars.",
    iconName: "Sparkles"
  },
  {
    id: "service-7",
    title: "Pharmacy & Medication",
    description: "Onsite pharmacy carrying therapeutic medications, safety-checked vaccines, and medical devices under absolute compliance.",
    iconName: "Boxes"
  },
  {
    id: "service-8",
    title: "Ambulance Services",
    description: "Advanced life support (ALS) ambulances staffed with paramedics, fully integrated tracking, and essential trauma meds.",
    iconName: "Ambulance"
  },
  {
    id: "service-9",
    title: "Telemedicine Consultations",
    description: "Encrypted, HIPAA-compliant video clinics linking distant patients with specialists for rapid virtual triage.",
    iconName: "Tv"
  },
  {
    id: "service-10",
    title: "Health Insurance Assistance",
    description: "Seamless, cashless medical billing and administrative claims processing spanning leading global insurance firms.",
    iconName: "FolderHeart"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    patientName: "James Harrison",
    age: 54,
    departmentVisited: "Cardiology",
    rating: 5,
    quoteText: "The cardiology unit at Zee Care Hospital literally saved my life. Everyone from the ER team to the operating surgeons was incredibly rapid, professional, and reassuring. The care I received during recovery was top-class.",
    date: "May 12, 2026"
  },
  {
    id: "test-2",
    patientName: "Arundhati Roy",
    age: 38,
    departmentVisited: "Orthopedics",
    rating: 5,
    quoteText: "I had my knee ligament reconstruction surgery here. Dr. Deshmukh did an exceptional job explaining the procedure beforehand, and the rehabilitation nursing staff got me back on my feet faster than expected.",
    date: "April 28, 2026"
  },
  {
    id: "test-3",
    patientName: "Emily Watson",
    age: 29,
    departmentVisited: "Pediatrics",
    rating: 5,
    quoteText: "Bringing my baby to a hospital is always stressful, but the Pediatrics team here is magical. The colorful outpatient clinic, kind gestures from doctors, and complete clarity they give is comforting for all parents.",
    date: "May 20, 2026"
  },
  {
    id: "test-4",
    patientName: "Michael Chang",
    age: 47,
    departmentVisited: "Neurology",
    rating: 5,
    quoteText: "I visited the neuroscience clinic for chronic vertigo and migraines. The diagnostic precision, comprehensive consultation, and therapeutic medical schedule they designed has given me my quality of life back.",
    date: "March 15, 2026"
  },
  {
    id: "test-5",
    patientName: "Sarah Jenkins",
    age: 62,
    departmentVisited: "Oncology",
    rating: 5,
    quoteText: "Undergoing tumor therapy is terrifying, but Zee Care Hospital provided a warm, welcoming umbrella of support. The precision immunotherapy and positive, empathetic atmosphere from Dr. Pierce made all the difference in my recovery.",
    date: "May 02, 2026"
  },
  {
    id: "test-6",
    patientName: "Aisha Al-Mansoori",
    age: 31,
    departmentVisited: "Gynecology & Obstetrics",
    rating: 5,
    quoteText: "I delivered my first baby in the premium maternity ward here. The delivery room was exceptionally modern, quiet, and beautiful. The dedicated care from childbirth consultants and midwives was marvelous.",
    date: "June 01, 2026"
  }
];

export const STATS = [
  { value: 50, label: "Doctors", suffix: "+" },
  { value: 20, label: "Departments", suffix: "+" },
  { value: 10000, label: "Patients Treated", suffix: "+" },
  { value: 25, label: "Years of Excellence", suffix: "+" }
];

export const HIGHLIGHTS: HighlightFeature[] = [
  {
    id: "h-1",
    title: "NABH Accredited",
    description: "Certified for ultimate clinical governance, strict safety compliance, and world-class healthcare delivery standards.",
    iconName: "Award"
  },
  {
    id: "h-2",
    title: "24/7 Emergency Care",
    description: "Immediate triage, trauma surgery, and cardiac resuscitation ready round-the-clock for medical emergencies.",
    iconName: "ShieldAlert"
  },
  {
    id: "h-3",
    title: "Expert Specialists",
    description: "Highly experienced doctors with international clinical training, board certifications, and comprehensive experience.",
    iconName: "User"
  },
  {
    id: "h-4",
    title: "State-of-the-Art Equipment",
    description: "Equipped with pioneering medical tech, robotic surgical components, high-magnetic resonance MRIs, and smart ICU systems.",
    iconName: "Cpu"
  },
  {
    id: "h-5",
    title: "Patient-Centered Care",
    description: "Empathy, patient privacy, clear medical counseling, and family-first facilities form the core of our operations.",
    iconName: "Heart"
  },
  {
    id: "h-6",
    title: "Zero Wait Time OPD",
    description: "Direct queue management and digital check-ins ensure minimized appointment waiting and swift consultations.",
    iconName: "Timer"
  },
  {
    id: "h-7",
    title: "Free Health Camps",
    description: "Conducting monthly medical outreach sessions and complimentary diagnostic checkups in neighboring communities.",
    iconName: "Smile"
  },
  {
    id: "h-8",
    title: "Insurance Cashless Facility",
    description: "Direct tie-ups with lead corporate insurance networks and automated claim validations for fully cashless admissions.",
    iconName: "FolderCheck"
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: "b-1",
    category: "Cardiology",
    title: "Understanding Heart-Healthy Lifestyles for Every Decade",
    excerpt: "Learn how cardiovascular needs shift as you grow older. This clinical guide covers structural diet adjustments, exercises, and diagnostic benchmarks.",
    date: "June 05, 2026",
    authorName: "Dr. Arvind Mehta"
  },
  {
    id: "b-2",
    category: "Wellness",
    title: "The Neuro-Science Behind High Quality Rest and Sleep",
    excerpt: "Deconstruct the deep neurological cycles of rapid-eye-movement (REM) sleep and find clinical sleep-hygiene protocols to fight chronic insomnia.",
    date: "May 28, 2026",
    authorName: "Dr. Elena Rostov"
  },
  {
    id: "b-3",
    category: "Pediatrics",
    title: "Essential Vaccines Guidelines for Toddlers and Young Children",
    excerpt: "An absolute, transparent timeline of immunizations required to shield kids from pediatric viral diseases and bolster early lifecycle immunity.",
    date: "May 15, 2026",
    authorName: "Dr. Meera Sen"
  }
];
