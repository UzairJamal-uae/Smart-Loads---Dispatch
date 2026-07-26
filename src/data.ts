import { CaseStudy, LoadService } from './types';

export const dispatchServices: LoadService[] = [
  {
    id: 'reefer',
    title: 'Refrigerated (Reefer)',
    description: 'Cold-chain lane optimization and thermal tracking. Secure premium floral, produce, and pharma loads.',
    equipmentSupported: ['53ft Reefer', 'Multi-Temp'],
    features: [
      'Active temp-monitoring audits',
      'Premium cold-chain contracts',
      'Fuel surcharge validation',
      'Lumper fee recovery support'
    ],
    icon: 'ThermometerSnowflake'
  },
  {
    id: 'dryvan',
    title: 'Dry Van Dispatch',
    description: 'Premium freight volume optimization. High dwell-time protection and consistent high-yield lanes.',
    equipmentSupported: ['53ft Dry Van', 'Logistics Post'],
    features: [
      'High-yield dry van lanes',
      'Dwell & detention tracking',
      'Drop-and-hook opportunities',
      'Rapid invoice submission'
    ],
    icon: 'Box'
  },
  {
    id: 'flatbed',
    title: 'Flatbed & Specialized',
    description: 'Heavy machinery and specialized flatbed freight. Full permit support and accessory billing.',
    equipmentSupported: ['48ft/53ft Flatbed', 'Step Deck', 'Conestoga', 'RGN'],
    features: [
      'Permit and oversize planning',
      'Guaranteed tarp & accessory pay',
      'Industrial shipper network',
      'DOT corridor mapping'
    ],
    icon: 'TrendingUp'
  },
  {
    id: 'poweronly',
    title: 'Power Only',
    description: 'Tractor-only load dispatch using shipper trailer sets. Seamless terminal terminal turnaround.',
    equipmentSupported: ['Daycab Tractors', 'Sleeper Cabs'],
    features: [
      'Amazon & Tier-1 carrier networks',
      'Zero trailer hardware costs',
      'One-way haul recovery',
      'High scheduling flexibility'
    ],
    icon: 'Truck'
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    driverName: 'Chouhan Logistics',
    equipment: 'Dry Van (Owner-Op)',
    challenge: 'Struggling with $1.85/mile spot rates, 25% empty miles, and uncompensated detention.',
    solution: 'Lane restructuring, hard broker negotiations, and automatic detention collection.',
    metrics: {
      beforeWeeklyGross: 4810,
      afterWeeklyGross: 7800,
      beforeRatePerMile: 1.85,
      afterRatePerMile: 2.60,
      averageWeeklyMiles: 3000
    },
    duration: '6 Months',
    testimonial: 'Eliminated my deadhead time entirely. Earning real gross revenue now.'
  },
  {
    id: '2',
    driverName: 'Falcon Reefers',
    equipment: '53ft Reefer Solo',
    challenge: 'Lumper claims disputes and low seasonal rates in southeastern lanes.',
    solution: 'Sourced direct pharma loads, automated billing, and secured high-paying northern runs.',
    metrics: {
      beforeWeeklyGross: 6200,
      afterWeeklyGross: 9100,
      beforeRatePerMile: 2.15,
      afterRatePerMile: 2.95,
      averageWeeklyMiles: 3100
    },
    duration: '4 Months',
    testimonial: 'They handle every single piece of paperwork. I just drive and earn.'
  },
  {
    id: '3',
    driverName: 'Roadmaster Flatbed LLC',
    equipment: 'Step Deck Specialized',
    challenge: 'Unreliable machinery rates and complex state-line permit delays.',
    solution: 'Continuous industrial contracts, pre-arranged permits, and guaranteed tarp pay.',
    metrics: {
      beforeWeeklyGross: 5500,
      afterWeeklyGross: 8400,
      beforeRatePerMile: 2.20,
      afterRatePerMile: 3.10,
      averageWeeklyMiles: 2700
    },
    duration: '8 Months',
    testimonial: 'Best oversized freight coordinators around. Saved me countless DOT delays.'
  }
];

export const calculatorPresets = {
  equipmentTypes: [
    { type: 'Dry Van', avgRate: 2.50, standardMiles: 2800 },
    { type: 'Reefer (Ref)', avgRate: 2.85, standardMiles: 3000 },
    { type: 'Flatbed', avgRate: 3.10, standardMiles: 2600 },
    { type: 'Power Only', avgRate: 2.30, standardMiles: 2900 },
    { type: 'Hotshot', avgRate: 2.10, standardMiles: 2500 }
  ],
  dispatchFeePercentage: 6 // 6% is a highly competitive, standard rate
};
