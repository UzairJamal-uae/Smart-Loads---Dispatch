import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Trash2, ArrowRight, UserCheck, ShieldCheck, Mail, Phone, Building } from 'lucide-react';
import { CarrierSetupSubmission, FileSimulated } from '../types';

interface CarrierSetupFormProps {
  onSuccess: (submission: CarrierSetupSubmission) => void;
}

export default function CarrierSetupForm({ onSuccess }: CarrierSetupFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [mcNumber, setMcNumber] = useState('');
  const [dotNumber, setDotNumber] = useState('');
  const [equipmentType, setEquipmentType] = useState('Reefer');

  // Document files simulated states
  const [mcLetter, setMcLetter] = useState<FileSimulated | null>(null);
  const [w9Form, setW9Form] = useState<FileSimulated | null>(null);
  const [coi, setCoi] = useState<FileSimulated | null>(null);
  const [noa, setNoa] = useState<FileSimulated | null>(null);

  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Hidden inputs refs
  const mcInputRef = useRef<HTMLInputElement>(null);
  const w9InputRef = useRef<HTMLInputElement>(null);
  const coiInputRef = useRef<HTMLInputElement>(null);
  const noaInputRef = useRef<HTMLInputElement>(null);

  // Simulate file generation on uploads
  const handleFileChangeSimulate = (docType: string, fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];
    const simulated: FileSimulated = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.type || 'application/pdf',
      uploadedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    if (docType === 'mcLetter') setMcLetter(simulated);
    if (docType === 'w9Form') setW9Form(simulated);
    if (docType === 'coi') setCoi(simulated);
    if (docType === 'noa') setNoa(simulated);
  };

  // Drag handlers
  const handleDragOver = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    setActiveDrag(type);
  };

  const handleDragLeave = () => {
    setActiveDrag(null);
  };

  const handleDrop = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    setActiveDrag(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChangeSimulate(type, e.dataTransfer.files);
    }
  };

  const removeDoc = (type: string) => {
    if (type === 'mcLetter') setMcLetter(null);
    if (type === 'w9Form') setW9Form(null);
    if (type === 'coi') setCoi(null);
    if (type === 'noa') setNoa(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: string[] = [];

    if (!companyName.trim()) tempErrors.push('Carrier/Company Name is required.');
    if (!ownerName.trim()) tempErrors.push('Owner/Contact Name is required.');
    if (!phone.trim()) tempErrors.push('Phone Number is required.');
    if (!email.trim()) tempErrors.push('Email address is required.');
    if (!mcNumber.trim()) tempErrors.push('MC License Number is required (e.g. MC-123456).');
    if (!dotNumber.trim()) tempErrors.push('USDOT Number is required (e.g. DOT-3456789).');

    // Make documents required to ensure realistic carrier submission
    if (!mcLetter) tempErrors.push('Please upload your MC Authority Letter.');
    if (!w9Form) tempErrors.push('Please upload your completed W9 Form.');
    if (!coi) tempErrors.push('Please upload your Certificate of Insurance (COI).');
    if (!noa) tempErrors.push('Please upload your Notice of Assignment (NOA) (Upload mock agreement or write-in if self-factored).');

    if (tempErrors.length > 0) {
      setErrors(tempErrors);
      window.scrollTo({ top: document.getElementById('error-holder')?.offsetTop || 200, behavior: 'smooth' });
      return;
    }

    setErrors([]);
    const submission: CarrierSetupSubmission = {
      id: `SML-${Math.floor(100000 + Math.random() * 900000)}`,
      submittedAt: new Date().toLocaleString('en-US'),
      companyName,
      ownerName,
      phoneNumber: phone,
      email,
      mcNumber,
      dotNumber,
      equipmentType,
      documents: { mcLetter, w9Form, coi, noa },
      status: 'Pending'
    };

    // Store in LocalStorage
    const existing: CarrierSetupSubmission[] = JSON.parse(localStorage.getItem('smartloads_carrier_setups') || '[]');
    existing.push(submission);
    localStorage.setItem('smartloads_carrier_setups', JSON.stringify(existing));

    setSubmitSuccess(true);
    onSuccess(submission);

    // Reset Form
    setCompanyName('');
    setOwnerName('');
    setPhone('');
    setEmail('');
    setMcNumber('');
    setDotNumber('');
    setMcLetter(null);
    setW9Form(null);
    setCoi(null);
    setNoa(null);
  };

  const loadDemoData = () => {
    setCompanyName('Swift Wheels Transport LLC');
    setOwnerName('Robert Vance');
    setPhone('+1 (512) 555-0199');
    setEmail('safety@swiftwheelslogistics.com');
    setMcNumber('MC-992147');
    setDotNumber('DOT-3814672');
    setEquipmentType('Flatbed');

    // Simulated files
    setMcLetter({ name: 'MC_Authority_SwiftWheels.pdf', size: '1.24 MB', type: 'application/pdf', uploadedAt: '10:15 AM' });
    setW9Form({ name: 'W9_FederalTax_Signed_2026.pdf', size: '640 KB', type: 'application/pdf', uploadedAt: '10:15 AM' });
    setCoi({ name: 'CertificateOfInsurance_Progressive_1M.pdf', size: '2.84 MB', type: 'application/pdf', uploadedAt: '10:15 AM' });
    setNoa({ name: 'TriumphPay_NOA_Direct_Swift.pdf', size: '890 KB', type: 'application/pdf', uploadedAt: '10:15 AM' });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
      
      {/* Portal Header */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200 px-6 py-8 md:px-10 md:py-10 text-center relative">
        <div className="absolute top-4 right-4">
          <button 
            type="button"
            onClick={loadDemoData}
            className="text-xs bg-orange-500/10 hover:bg-orange-500 hover:text-white border border-orange-500/30 text-orange-600 px-3 py-1.5 rounded-lg active:scale-95 transition-all font-bold uppercase tracking-wider"
          >
            Load Demo Data
          </button>
        </div>
        <div className="flex justify-center mb-3">
          <span className="flex items-center gap-1 bg-orange-500/15 border border-orange-500/20 text-orange-600 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
            <UserCheck className="w-3.5 h-3.5" /> US DOT Onboarding
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Carrier Registration</h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto mt-2 font-sans">
          Complete your profile and upload 4 mandatory regulatory files to unlock immediate dispatcher load bookings.
        </p>
      </div>

      <form id="carrier-onboarding-form" onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
        
        {/* Error holder */}
        {errors.length > 0 && (
          <div id="error-holder" className="bg-red-50 border border-red-200 rounded-xl p-5 flex gap-3 text-sm text-red-700">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold mb-1">Please correct errors before submitting:</p>
              <ul className="list-disc pl-5 space-y-1">
                {errors.map((err, idx) => (
                  <li key={idx} className="font-medium">{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Success Trigger */}
        {submitSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex gap-3 text-sm text-emerald-800">
              <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="font-extrabold text-slate-950 text-base">Setup Completed!</p>
                <p className="text-slate-600 mt-0.5 font-medium">We will verify your setup immediately. Expect a phone call within 1 hour.</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 border border-slate-200 hover:bg-slate-50 bg-white px-3.5 py-2 rounded-lg transition-all"
            >
              Dismiss Announcement
            </button>
          </div>
        )}

        {/* SECTION 1: Company Profile Fields */}
        <div>
          <h3 className="text-slate-900 font-extrabold text-base flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
            <span className="text-orange-500">01.</span>
            Commercial Company Profile
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Carrier Company Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" /> Carrier / Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. Chouhan Transport LLC"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-950 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* Owner Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" /> Owner / Contact Name
              </label>
              <input
                type="text"
                placeholder="e.g. Amer Chouhan"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-950 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* Phone Column */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> Telephone Contact Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 0329-1707944"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-950 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* Email Contact */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Dispatch Office Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. drivers@chouhanloads.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-950 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Authority Credentials */}
        <div>
          <h3 className="text-slate-900 font-extrabold text-base flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
            <span className="text-orange-500">02.</span>
            FMCSA Authority Credentials & Equipment
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* MC Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">MC # (Motor Carrier ID)</label>
              <input
                type="text"
                placeholder="e.g. MC-123456"
                value={mcNumber}
                onChange={(e) => setMcNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-950 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* USDOT Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">USDOT # (Compliance ID)</label>
              <input
                type="text"
                placeholder="e.g. DOT-3456789"
                value={dotNumber}
                onChange={(e) => setDotNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-950 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {/* Equipment Segment */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">Trailer Classification</label>
              <select
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-950 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="Reefer">Reefer (Temperature Controlled)</option>
                <option value="Dry Van">Dry Van (53ft)</option>
                <option value="Flatbed">Flatbed / Stepdeck</option>
                <option value="Power Only">Power Only</option>
                <option value="Hotshot / LTL">Hotshot / LTL / Cargo van</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: The 4 Mandatory Documents Upload Grid */}
        <div>
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-200">
            <h3 className="text-slate-900 font-extrabold text-base flex items-center gap-2">
              <span className="text-orange-500">03.</span>
              Upload 4 Mandatory Carrier Documents
            </h3>
            <span className="text-[10px] text-orange-600 bg-orange-500/10 px-2.5 py-0.5 rounded font-extrabold uppercase tracking-wider">PDF, PNG, JPG supported</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            
            {/* DOCUMENT A: MC Authority Letter */}
            <div className="flex flex-col gap-2">
              <span className="text-slate-700 text-xs font-extrabold uppercase tracking-wide flex justify-between items-center">
                <span>1. MC Authority Letter</span>
                <span className="text-[10px] text-red-500 font-bold">*Required</span>
              </span>
              <div
                onDragOver={(e) => handleDragOver(e, 'mcLetter')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'mcLetter')}
                onClick={() => mcInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                  mcLetter ? 'bg-slate-50 border-emerald-500/50 text-slate-900' : 'bg-slate-50 hover:bg-slate-100/50 border-slate-200 hover:border-slate-300 text-slate-500'
                } ${activeDrag === 'mcLetter' ? 'border-orange-500 scale-[1.02] bg-white' : ''}`}
              >
                <input 
                  type="file" 
                  ref={mcInputRef} 
                  onChange={(e) => handleFileChangeSimulate('mcLetter', e.target.files)} 
                  className="hidden" 
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                {mcLetter ? (
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 text-left text-xs text-slate-700">
                      <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="font-extrabold text-slate-900 truncate max-w-[150px]">{mcLetter.name}</p>
                        <p className="text-[10px] text-slate-500 font-semibold">{mcLetter.size} • {mcLetter.uploadedAt}</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); removeDoc('mcLetter'); }}
                      className="p-1.5 hover:bg-red-500/10 hover:text-red-400 text-slate-500 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-2">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <p className="text-xs font-extrabold text-slate-700">Drag & Drop file or Click to Browse</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">FMCSA MC Authority letter of license approval</p>
                  </div>
                )}
              </div>
            </div>

            {/* DOCUMENT B: W9 Form */}
            <div className="flex flex-col gap-2">
              <span className="text-slate-700 text-xs font-extrabold uppercase tracking-wide flex justify-between items-center">
                <span>2. W9 Form (Tax Information)</span>
                <span className="text-[10px] text-red-500 font-bold">*Required</span>
              </span>
              <div
                onDragOver={(e) => handleDragOver(e, 'w9Form')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'w9Form')}
                onClick={() => w9InputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                  w9Form ? 'bg-slate-50 border-emerald-500/50 text-slate-900' : 'bg-slate-50 hover:bg-slate-100/50 border-slate-200 hover:border-slate-300 text-slate-500'
                } ${activeDrag === 'w9Form' ? 'border-orange-500 scale-[1.02] bg-white' : ''}`}
              >
                <input 
                  type="file" 
                  ref={w9InputRef} 
                  onChange={(e) => handleFileChangeSimulate('w9Form', e.target.files)} 
                  className="hidden" 
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                {w9Form ? (
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 text-left text-xs text-slate-700">
                      <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="font-extrabold text-slate-900 truncate max-w-[150px]">{w9Form.name}</p>
                        <p className="text-[10px] text-slate-500 font-semibold">{w9Form.size} • {w9Form.uploadedAt}</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); removeDoc('w9Form'); }}
                      className="p-1.5 hover:bg-red-500/10 hover:text-red-400 text-slate-500 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-2">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <p className="text-xs font-extrabold text-slate-700">Drag & Drop file or Click to Browse</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Signed federal identification document</p>
                  </div>
                )}
              </div>
            </div>

            {/* DOCUMENT C: Certificate of Insurance (COI) */}
            <div className="flex flex-col gap-2">
              <span className="text-slate-700 text-xs font-extrabold uppercase tracking-wide flex justify-between items-center">
                <span>3. Certificate of Insurance (COI)</span>
                <span className="text-[10px] text-red-500 font-bold">*Required</span>
              </span>
              <div
                onDragOver={(e) => handleDragOver(e, 'coi')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'coi')}
                onClick={() => coiInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                  coi ? 'bg-slate-50 border-emerald-500/50 text-slate-900' : 'bg-slate-50 hover:bg-slate-100/50 border-slate-200 hover:border-slate-300 text-slate-500'
                } ${activeDrag === 'coi' ? 'border-orange-500 scale-[1.02] bg-white' : ''}`}
              >
                <input 
                  type="file" 
                  ref={coiInputRef} 
                  onChange={(e) => handleFileChangeSimulate('coi', e.target.files)} 
                  className="hidden" 
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                {coi ? (
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 text-left text-xs text-slate-700">
                      <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="font-extrabold text-slate-900 truncate max-w-[150px]">{coi.name}</p>
                        <p className="text-[10px] text-slate-500 font-semibold">{coi.size} • {coi.uploadedAt}</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); removeDoc('coi'); }}
                      className="p-1.5 hover:bg-red-500/10 hover:text-red-400 text-slate-500 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-2">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <p className="text-xs font-extrabold text-slate-700">Drag & Drop file or Click to Browse</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Requires $1M General Liability & $100K Cargo insurance</p>
                  </div>
                )}
              </div>
            </div>

            {/* DOCUMENT D: Notice of Assignment (NOA) */}
            <div className="flex flex-col gap-2">
              <span className="text-slate-700 text-xs font-extrabold uppercase tracking-wide flex justify-between items-center">
                <span>4. Notice of Assignment (NOA)</span>
                <span className="text-[10px] text-red-500 font-bold">*Required</span>
              </span>
              <div
                onDragOver={(e) => handleDragOver(e, 'noa')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'noa')}
                onClick={() => noaInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                  noa ? 'bg-slate-50 border-emerald-500/50 text-slate-900' : 'bg-slate-50 hover:bg-slate-100/50 border-slate-200 hover:border-slate-300 text-slate-500'
                } ${activeDrag === 'noa' ? 'border-orange-500 scale-[1.02] bg-white' : ''}`}
              >
                <input 
                  type="file" 
                  ref={noaInputRef} 
                  onChange={(e) => handleFileChangeSimulate('noa', e.target.files)} 
                  className="hidden" 
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                {noa ? (
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 text-left text-xs text-slate-700">
                      <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="font-extrabold text-slate-950 truncate max-w-[150px]">{noa.name}</p>
                        <p className="text-[10px] text-slate-500 font-semibold">{noa.size} • {noa.uploadedAt}</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); removeDoc('noa'); }}
                      className="p-1.5 hover:bg-red-500/10 hover:text-red-400 text-slate-500 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-2">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <p className="text-xs font-extrabold text-slate-700">Drag & Drop file or Click to Browse</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Factoring agreement letter for loading payouts</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Legal Declaration */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-600 text-[11px] leading-relaxed">
          <p className="font-extrabold text-slate-800 flex items-center gap-1.5 mb-1 text-xs">
            <ShieldCheck className="w-4 h-4 text-orange-600" /> Carrier Compliance Declaration & Agreement
          </p>
          By clicking form submission, I hereby authorize Smart Loads Logistics and its designated representative Amer Arshad Chouhan to check credentials, conduct motor carrier credit checks with reputable brokers, process transport packet submissions, and book commercial vehicle freight loads on behalf of my trucking authority.
        </div>

        {/* Submit handle */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Submit credentials securely. All document communications are protected via 256-bit transport SSL encryption key.
          </p>
          <button
            type="submit"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-orange-500/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Submit Setup Packet <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
