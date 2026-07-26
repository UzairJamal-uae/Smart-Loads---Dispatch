import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfitCalculator from './components/ProfitCalculator';
import CarrierSetupForm from './components/CarrierSetupForm';
import DispatcherHub from './components/DispatcherHub';
import { dispatchServices, caseStudies } from './data';
import { motion, AnimatePresence } from 'motion/react';
import heroHighway from './assets/images/hero_highway_1780914349128.png';
import dispatcherOps from './assets/images/dispatcher_ops_1780914371503.png';
import { 
  Truck, Phone, Mail, FileText, ShieldCheck, DollarSign, Clock, 
  ArrowRight, MapPin, UserCheck, AlertCircle, Calendar, Award, 
  TrendingUp, ChevronRight, Star, CheckCircle, MessageSquare, HelpCircle,
  Shield, Check, Users, FileSpreadsheet
} from 'lucide-react';
import { CarrierSetupSubmission } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [carrierName, setCarrierName] = useState('');
  const [carrierEmail, setCarrierEmail] = useState('');
  const [carrierPhone, setCarrierPhone] = useState('');
  const [carrierEquipment, setCarrierEquipment] = useState('Reefer');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSubmitted(true);
    setTimeout(() => {
      // Auto dismiss modal after 3 seconds
      setShowConsultModal(false);
      setConsultationSubmitted(false);
      setCarrierName('');
      setCarrierEmail('');
      setCarrierPhone('');
    }, 4500);
  };

  const handleCarrierSetupSuccess = (submission: CarrierSetupSubmission) => {
    setCurrentTab('dispatcher-hub'); // Smoothly jump to dispatcher hub to view submission!
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div id="application-root" className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-500 selection:text-white flex flex-col justify-between">
      
      {/* Premium Navigation Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onOpenConsultation={() => setShowConsultModal(true)} 
      />

      {/* Main Multi-Screen Content Container */}
      <main id="main-content" className="flex-grow">
        
        <AnimatePresence mode="wait">
          {/* TAP 1: HOME PAGE */}
          {currentTab === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-20 pb-20"
            >
              {/* Dynamic Industrial Hero Section */}
              <section 
                id="hero-banner" 
                className="pt-12 pb-24 md:py-32 border-b border-slate-900 overflow-hidden relative bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.88), rgba(2, 6, 23, 0.96)), url(${heroHighway})` }}
              >
                {/* Background Grid Accent */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e1e2d_1px,transparent_1px),linear-gradient(to_bottom,#0e1e2d_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Brand Marketing Statement */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold text-orange-400 uppercase tracking-widest">
                      <Award className="w-3.5 h-3.5" /> High-Paying US Dispatch
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
                      Keep Rolling.<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 select-all font-sans">
                        Maximize Your Gross.
                      </span>
                    </h1>

                    <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold">
                      We negotiate top rates with brokers, manage paperwork, and protect your schedule. <strong>No forced dispatch, ever.</strong>
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2">
                       <button
                        onClick={() => {
                          setCurrentTab('carrier-setup');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg shadow-orange-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Start Setup <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      <button
                        onClick={() => setShowConsultModal(true)}
                        className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 active:scale-95 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all"
                      >
                        Call Owner
                      </button>
                    </div>

                    {/* Direct Owner contact info inside Hero */}
                    <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-slate-400">
                      <div className="flex items-center gap-2 font-medium">
                        <Phone className="w-4 h-4 text-orange-400" />
                        <span>Owner Direct: <a href="tel:03291707944" className="hover:text-orange-400 font-bold underline">0329-1707944</a></span>
                      </div>
                      <div className="hidden sm:inline text-slate-800">|</div>
                      <div className="flex items-center gap-2 font-medium">
                        <Mail className="w-4 h-4 text-orange-400" />
                        <span>Email: <a href="mailto:roypassenger47@gmail.com" className="hover:text-orange-400 font-bold underline">roypassenger47@gmail.com</a></span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Value Badges Bento Box Grid */}
                  <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-5 rounded-2xl space-y-2">
                      <span className="p-2 bg-orange-500/10 text-orange-400 rounded-lg inline-block">
                        <DollarSign className="w-5 h-5" />
                      </span>
                      <h3 className="text-white font-bold text-sm">6% Flat Fee</h3>
                      <p className="text-slate-400 text-xs text-slate-350">Simple fee structure. No weekly minimums or contracts.</p>
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-5 rounded-2xl space-y-2">
                      <span className="p-2 bg-orange-500/10 text-orange-400 rounded-lg inline-block">
                        <TrendingUp className="w-5 h-5" />
                      </span>
                      <h3 className="text-white font-bold text-sm">Top Market Rates</h3>
                      <p className="text-slate-400 text-xs text-slate-350">Direct broker routing audits targeting peak fuel surcharges.</p>
                    </div>

                     <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-5 rounded-2xl space-y-2">
                      <span className="p-2 bg-orange-500/10 text-orange-400 rounded-lg inline-block">
                        <Users className="w-5 h-5" />
                      </span>
                      <h3 className="text-white font-bold text-sm">Fast Onboarding</h3>
                      <p className="text-slate-400 text-xs text-slate-350">Packets submitted and broker approvals processed inside 1 hour.</p>
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur border border-slate-800 p-5 rounded-2xl space-y-2">
                      <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg inline-block">
                        <ShieldCheck className="w-5 h-5" />
                      </span>
                      <h3 className="text-white font-bold text-sm">No Forced Loads</h3>
                      <p className="text-slate-400 text-xs text-slate-350">You choose active routes, schedules, and home time.</p>
                    </div>

                  </div>

                </div>
              </section>

              {/* Statistical Value counters */}
              <motion.section 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
                  
                  <div className="space-y-1 text-center">
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight block font-sans">98%</span>
                    <span className="text-xs uppercase font-black tracking-widest text-slate-400">Carrier Retention</span>
                  </div>

                  <div className="space-y-1 text-center border-l border-slate-200">
                    <span className="text-3xl md:text-4xl font-extrabold text-orange-600 tracking-tight block font-sans">$2.75</span>
                    <span className="text-xs uppercase font-black tracking-widest text-slate-400">Avg Rate/Mile Reefer</span>
                  </div>

                  <div className="space-y-1 text-center border-l lg:border-l border-slate-200">
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight block font-sans">24/7</span>
                    <span className="text-xs uppercase font-black tracking-widest text-slate-400">Live Driver tracking</span>
                  </div>

                  <div className="space-y-1 text-center border-l border-slate-200">
                    <span className="text-3xl md:text-4xl font-extrabold text-orange-500 tracking-tight block font-sans">3.2M+</span>
                    <span className="text-xs uppercase font-black tracking-widest text-slate-400">Loaded Miles Dispatched</span>
                  </div>

                </div>
              </motion.section>

              {/* Meet Amer Arshad Chouhan - The Owner and Commitment section */}
              <motion.section 
                id="owner-bio" 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-4 flex flex-col items-center text-center">
                    <div className="relative w-40 h-40 rounded-full border-4 border-orange-500 p-1 bg-white overflow-hidden flex items-center justify-center shadow-lg">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-4xl">
                        AAC
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-4">Amer Arshad Chouhan</h3>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Founder</span>
                  </div>

                  <div className="lg:col-span-8 space-y-5 text-left">
                    <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-600 text-[10px] font-bold uppercase px-3 py-1 rounded-md">
                      <Truck className="w-3.5 h-3.5" /> Founder Statement
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">"We Shift the Power to Drivers"</h2>
                    
                    <p className="text-slate-600 text-sm leading-relaxed font-semibold">
                      "Drivers bear the heaviest physical and cost burdens on the American road today. At Smart Loads Logistics, we protect your business integrity. We run full broker credit checks, secure high delay layover pay, and maximize spot margins. No forced dispatch is our solid promise."
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-slate-200 text-xs shadow-sm">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="text-slate-400 font-bold uppercase text-[9px]">WhatsApp Direct</p>
                          <a href="tel:03291707944" className="text-slate-900 font-extrabold hover:text-orange-600">0329-1707944</a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-slate-200 text-xs shadow-sm">
                        <Mail className="w-4 h-4 text-orange-500" />
                        <div>
                          <p className="text-slate-400 font-bold uppercase text-[9px]">Direct Email Address</p>
                          <a href="mailto:roypassenger47@gmail.com" className="text-slate-900 font-extrabold hover:text-orange-600">roypassenger47@gmail.com</a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.section>

              {/* Services Highlights on Homepage */}
              <motion.section 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
              >
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest animate-pulse">Our Specialties</span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Freight Focus</h2>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    Matching your trailers with optimized high-priority loads across top shipping lanes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dispatchServices.map((service, index) => (
                    <motion.div 
                      key={service.id} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white border border-slate-200 hover:border-orange-500/30 p-6 rounded-2xl flex flex-col justify-between transition-all group hover:scale-[1.02] shadow-sm hover:shadow-md"
                    >
                      <div className="space-y-4 text-left">
                        <div className="text-orange-500 group-hover:scale-110 transition-transform inline-block">
                          <Truck className="w-8 h-8 opacity-90" />
                        </div>
                        <h3 className="text-slate-900 font-extrabold text-base tracking-tight">{service.title}</h3>
                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-medium">{service.description}</p>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentTab('services');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-orange-600 hover:text-orange-700 font-bold text-xs tracking-wider flex items-center gap-1 mt-6 cursor-pointer"
                      >
                        Explore Service <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* About SmartLoads History Section */}
              <motion.section 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase tracking-widest">
                    Our Origin
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
                    The SmartLoads Story
                  </h2>
                  
                  <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-sans">
                    <p>
                      SmartLoads was founded with a single mission: to return sovereignty to the independent truck driver. 
                    </p>
                    <p>
                      Industry veteran Amer Arshad Chouhan watched carriers absorb rising operating costs while dealing with unfair broker manipulation and unpaid warehouse wait times. He built SmartLoads to be a protective shield.
                    </p>
                    <p>
                      We don't just book loads; we engineer profitable, deadhead-free driving lanes. We validate broker credit in minutes, secure premium layover fees, and ensure our drivers maintain absolute final route authority.
                    </p>
                  </div>

                  <div className="flex gap-6 pt-2">
                    <div>
                      <div className="text-2xl font-black text-slate-900 font-mono">0%</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Forced Dispatch</div>
                    </div>
                    <div className="border-l border-slate-200 h-10"></div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 font-mono">1 Hour</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Broker Approvals</div>
                    </div>
                    <div className="border-l border-slate-200 h-10"></div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 font-mono">100%</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Rate Transparency</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden aspect-video sm:aspect-[21/10] lg:aspect-[4/3]">
                    <img 
                      src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80" 
                      alt="SmartLoads Semi Truck on Highway" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-left">
                      <span className="text-[10px] bg-orange-500/20 border border-orange-400/30 text-orange-600 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                        Active Lane Operations
                      </span>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Case Studies overview Link with dispatcher_ops background */}
              <motion.section 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <div 
                  className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-cover bg-center bg-no-repeat relative overflow-hidden border border-slate-800"
                  style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.95)), url(${dispatcherOps})` }}
                >
                  <div className="space-y-2 text-center md:text-left relative z-10">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">Core Results</span>
                    <h3 className="text-2xl font-black text-white tracking-tight">Proven Revenue Growth</h3>
                    <p className="text-slate-300 text-xs md:text-sm max-w-md leading-relaxed font-sans font-semibold">
                      Help drivers pivot to $7,800+ weekly gross through planned routing and delayed fee collections.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentTab('case-studies');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-black text-sm px-6 py-3 rounded-xl shadow-lg shadow-orange-500/10 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 relative z-10"
                  >
                    View Carrier Stories <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.section>

              {/* Why Choose Us Section */}
              <motion.section 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
              >
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block font-black">THE ADVANTAGE</span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Why Choose Smart Loads Logistics?</h2>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto font-semibold">
                    Built for owner-operators who require maximum gross margins with zero compromises.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
                  {/* Card 1 */}
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:border-orange-500/30 transition-all">
                    <span className="p-2.5 bg-orange-500/10 text-orange-600 rounded-xl inline-block">
                      <Shield className="w-5 h-5" />
                    </span>
                    <h3 className="text-slate-900 font-extrabold text-base">0% Forced Dispatch</h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans font-semibold">
                      Absolute freedom. We search and offer the top USA lanes, but you hold 100% final route approval. No pressured loads.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:border-orange-500/30 transition-all">
                    <span className="p-2.5 bg-orange-500/10 text-orange-600 rounded-xl inline-block">
                      <DollarSign className="w-5 h-5" />
                    </span>
                    <h3 className="text-slate-900 font-extrabold text-base">Automatic Detention Guard</h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans font-semibold">
                      We secure accessorial money. Detention tracking, layovers, and TONU (Truck Order Not Used) are claimed instantly.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:border-orange-500/30 transition-all">
                    <span className="p-2.5 bg-orange-500/10 text-orange-650 rounded-xl inline-block">
                      <UserCheck className="w-5 h-5 text-orange-600" />
                    </span>
                    <h3 className="text-slate-900 font-extrabold text-base">Direct Credit Checking</h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans font-semibold">
                      Zero payment risk. We conduct rigorous, instant broker credit reviews before loading to guarantee rapid factoring.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Frequently Asked Questions */}
              <motion.section 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8"
              >
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block font-mono">
                    COMMON QUESTIONS
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
                    CARRIER PROBLEMS & SOLUTIONS FAQ
                  </h2>
                </div>

                <div className="border-t border-slate-200 divide-y divide-slate-100">
                  {[
                    {
                      q: "TIRED OF LOW SPOT RATES AND UNPAID DEADHEAD MILES?",
                      a: "We actively construct efficient circular lane combinations to eliminate empty miles. Since we negotiate directly with high-volume brokers, we secure rates significantly higher than the spot average."
                    },
                    {
                      q: "LOSING PROFITS IN UNCOMPENSATED DETENTION AND LOADING DELAYS?",
                      a: "Your time is money. We monitor electronic logging timestamps and file immediate detention, layover, or TONU invoices with brokers directly. We recover every dollar while you rest."
                    },
                    {
                      q: "FED UP WITH CREDIT REJECTIONS AND FACTORING COMPLICATIONS?",
                      a: "No more cargo booking risks. We perform instantaneous credit-worthiness reviews on every broker before presenting any options. Every single load we book is 100% factorable with immediate daily cash payouts."
                    },
                    {
                      q: "STRUGGLING WITH FORCED LOADS OR INFLEXIBLE DELIVERY WINDOWS?",
                      a: "Full lane sovereignty. You choose where, when, and what cargo you haul. No contracts hold you down, and there is zero forced dispatch. If you dislike an option, we simply build a new selection."
                    }
                  ].map((item, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div key={idx} className="py-5 text-left">
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className="w-full flex justify-between items-center text-left py-2 group cursor-pointer focus:outline-none"
                        >
                          <span className="text-slate-900 font-extrabold text-sm sm:text-base tracking-wide font-sans group-hover:text-orange-600 transition-colors uppercase leading-snug pr-4">
                            {item.q}
                          </span>
                          <span className="text-orange-500 font-bold text-xl sm:text-2xl transition-transform duration-300 transform select-none shrink-0">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-slate-600 text-xs sm:text-sm pt-3 pb-2 leading-relaxed font-sans max-w-3xl font-medium">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.section>

            </motion.div>
          )}

          {/* TAP 2: SERVICES PAGE */}
          {currentTab === 'services' && (
            <motion.div
              key="services-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest animate-pulse">Services Suit</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Optimized Lanes, Maximum Efficiency</h2>
                <p className="text-slate-600 text-sm max-w-sm mx-auto font-medium">
                  Trusted broker networking, rapid load bookings, and zero factoring complications.
                </p>
              </div>

              {/* Main Services detailed display */}
              <div className="space-y-12">
                {dispatchServices.map((service, index) => (
                  <motion.div 
                    key={service.id} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-10 rounded-3xl border border-slate-200 hover:border-orange-500/20 transition-all shadow-sm ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    
                    <div className="lg:col-span-6 space-y-5 text-left">
                      <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-600 text-xs px-3 py-1 rounded font-bold uppercase tracking-wider">
                        <Truck className="w-3.5 h-3.5" /> Service Category
                      </div>

                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{service.title}</h3>
                      
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">{service.description}</p>
                      
                      <div className="space-y-3 pt-2">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Core Operations & Benefits:</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {service.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-slate-700">
                              <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                              <span className="font-semibold">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-left shadow-inner">
                      <p className="text-slate-500 text-xs font-extrabold uppercase tracking-widest text-[10px]">Equipment Requirements & Standards</p>
                      
                      <div className="space-y-2">
                        {service.equipmentSupported.map((eq, eIdx) => (
                          <div key={eIdx} className="bg-white p-3 rounded-lg flex justify-between items-center border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-700 font-bold">{eq}</span>
                            <span className="text-[9px] bg-orange-500/10 text-orange-600 px-2 py-0.5 rounded font-black">Standard Spec</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                        <span className="font-bold uppercase tracking-wider">Standard Commission Rate</span>
                        <span className="text-slate-900 font-black text-sm">6% Flat Rate</span>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentTab('carrier-setup');
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold py-3.5 rounded-lg text-center shadow-md shadow-orange-500/10 hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
                      >
                        Submit Carrier Onboarding Setup
                      </button>
                    </div>

                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAP 3: CASE STUDIES & PORTFOLIO */}
          {currentTab === 'case-studies' && (
            <motion.div
              key="cases-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest animate-pulse">On-The-Road Proof</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Proven Market Performance</h2>
                <p className="text-slate-600 text-sm max-w-sm mx-auto font-semibold">
                  Real revenue metrics and feedback from carriers under local dispatch representation.
                </p>
              </div>

              {/* Case study list with responsive animation */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {caseStudies.map((caseS, index) => (
                  <motion.div 
                    key={caseS.id} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6 hover:shadow-xl hover:border-orange-500/30 transition-all text-left hover:scale-[1.01]"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-orange-600 font-extrabold uppercase">{caseS.equipment}</span>
                        <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-full text-slate-500 font-bold">{caseS.duration}</span>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-950">{caseS.driverName}</h3>
                      
                      <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Before Setup (Average)</p>
                        <div className="flex justify-between text-xs text-slate-500 font-semibold">
                          <span>Weekly Gross:</span>
                          <span className="text-red-500 font-bold">${caseS.metrics.beforeWeeklyGross.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 font-semibold">
                          <span>Rate / Mile:</span>
                          <span>${caseS.metrics.beforeRatePerMile.toFixed(2)}/mi</span>
                        </div>

                        <p className="text-[10px] text-orange-650 font-bold uppercase tracking-wider pt-2 border-t border-slate-100">Under Smart Loads Dispatch</p>
                        <div className="flex justify-between text-xs text-slate-850 font-extrabold">
                          <span>Weekly Gross:</span>
                          <span className="text-emerald-600 font-extrabold">${caseS.metrics.afterWeeklyGross.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-850 font-extrabold">
                          <span>Rate / Mile:</span>
                          <span className="text-emerald-600 font-bold">${caseS.metrics.afterRatePerMile.toFixed(2)}/mi</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-600 leading-relaxed font-semibold">
                        <p><span className="text-slate-400 font-bold">Challenge:</span> {caseS.challenge}</p>
                        <p className="mt-1"><span className="text-slate-400 font-bold">Action:</span> {caseS.solution}</p>
                      </div>
                    </div>

                    {/* Client Testimonial */}
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <div className="flex text-orange-500 gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                        ))}
                      </div>
                      <p className="text-slate-600 text-[11px] italic leading-relaxed font-semibold">
                        "{caseS.testimonial}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAP 4: CARRIER ONBOARDING SETUP Portal */}
          {currentTab === 'carrier-setup' && (
            <motion.div
              key="setup-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              <CarrierSetupForm onSuccess={handleCarrierSetupSuccess} />
            </motion.div>
          )}

          {/* TAP 5: DYNAMIC EARNINGS ESTIMATOR */}
          {currentTab === 'earnings-calc' && (
            <motion.div
              key="calc-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              <div className="max-w-4xl mx-auto space-y-10">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block font-mono">Profit Tool</span>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">Earnings Estimator</h2>
                  <p className="text-slate-600 text-sm max-w-md mx-auto font-sans font-semibold">
                    Calculate your net load profit by tuning active fuel costs, dispatcher fees, and operating expenses.
                  </p>
                </div>
                
                <ProfitCalculator />
              </div>
            </motion.div>
          )}

          {/* TAP 6: DISPATCHER ADMIN Hub */}
          {currentTab === 'dispatcher-hub' && (
            <motion.div
              key="hub-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              <DispatcherHub />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* FOOTER Contact & Branding Panel */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* PROMPT DISPATCH CONSULTATION MODAL */}
      <AnimatePresence>
        {showConsultModal && (
          <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 md:p-8 space-y-6 relative text-left shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setShowConsultModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-extrabold"
              >
                ✕
              </button>

              <div className="space-y-2">
                <span className="text-[10px] bg-orange-500/10 border border-orange-500/20 text-orange-600 px-2.5 py-0.5 rounded font-black uppercase tracking-widest animate-pulse">
                  Quick Response
                </span>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Request Load Offers</h3>
                <p className="text-xs text-slate-500 font-bold leading-normal">
                  Amer will contact you within minutes containing active loads matching your preferred lanes.
                </p>
              </div>

              {consultationSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center text-emerald-800 space-y-2 animate-fade-in">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-extrabold text-slate-900">Request Received!</p>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">We will contact you shortly with custom load options.</p>
                </div>
              ) : (
                <form id="consult-form" onSubmit={handleConsultSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="text-slate-500 font-bold uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amer Chouhan"
                      value={carrierName}
                      onChange={(e) => setCarrierName(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500 font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="text-slate-500 font-bold uppercase tracking-wider">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0329-1707944"
                      value={carrierPhone}
                      onChange={(e) => setCarrierPhone(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500 font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="text-slate-500 font-bold uppercase tracking-wider">Main Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. roypassenger47@gmail.com"
                      value={carrierEmail}
                      onChange={(e) => setCarrierEmail(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500 font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs">
                    <label className="text-slate-500 font-bold uppercase tracking-wider">Equipment Classification</label>
                    <select
                      value={carrierEquipment}
                      onChange={(e) => setCarrierEquipment(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none pointer-events-auto font-bold"
                    >
                      <option value="Reefer">Reefer (Temperature Controlled)</option>
                      <option value="Dry Van">Dry Van (53ft)</option>
                      <option value="Flatbed">Flatbed / Stepdeck</option>
                      <option value="Power Only">Power Only</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm py-3.5 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Send Offer Request
                  </button>
                </form>
              )}

              <p className="text-[10px] text-slate-400 text-center leading-normal font-semibold">
                By submitting, you agree to receive immediate phone calls or WhatsApp SMS alerts related to load opportunities.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
