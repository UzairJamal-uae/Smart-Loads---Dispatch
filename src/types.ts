export interface CarrierSetupSubmission {
  id: string;
  submittedAt: string;
  companyName: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  mcNumber: string;
  dotNumber: string;
  equipmentType: string;
  documents: {
    mcLetter: FileSimulated | null;
    w9Form: FileSimulated | null;
    coi: FileSimulated | null;
    noa: FileSimulated | null;
  };
  status: 'Pending' | 'In Review' | 'Approved' | 'Requires Attention';
  notes?: string;
}

export interface FileSimulated {
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface CaseStudy {
  id: string;
  driverName: string;
  equipment: string;
  challenge: string;
  solution: string;
  metrics: {
    beforeWeeklyGross: number;
    afterWeeklyGross: number;
    beforeRatePerMile: number;
    afterRatePerMile: number;
    averageWeeklyMiles: number;
  };
  duration: string;
  testimonial: string;
}

export interface LoadService {
  id: string;
  title: string;
  description: string;
  equipmentSupported: string[];
  features: string[];
  icon: string; // lucide icon name
}
