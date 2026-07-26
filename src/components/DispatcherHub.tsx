import React, { useState, useEffect } from 'react';
import { CarrierSetupSubmission } from '../types';
import { CheckCircle2, AlertCircle, Clock, ShieldAlert, FileText, Search, User, Filter, RefreshCw, ClipboardList, TrendingUp } from 'lucide-react';

export default function DispatcherHub() {
  const [submissions, setSubmissions] = useState<CarrierSetupSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedSubmission, setSelectedSubmission] = useState<CarrierSetupSubmission | null>(null);

  // Load from local storage
  const loadSubmissions = () => {
    let list: CarrierSetupSubmission[] = JSON.parse(localStorage.getItem('smartloads_carrier_setups') || '[]');
    
    // Seed default submissions if localStorage is empty to provide great demonstration out of the box
    if (list.length === 0) {
      list = [
        {
          id: 'SML-428174',
          submittedAt: '6/8/2026, 9:24 AM',
          companyName: 'Vance Refrigerated Hauler',
          ownerName: 'James Vance',
          phoneNumber: '+1 (404) 555-0182',
          email: 'dispatch@vancereeferhackers.com',
          mcNumber: 'MC-814729',
          dotNumber: 'DOT-2947118',
          equipmentType: 'Reefer',
          documents: {
            mcLetter: { name: 'MC_Authority_Vance.pdf', size: '1.45 MB', type: 'application/pdf', uploadedAt: '09:24 AM' },
            w9Form: { name: 'W9_Tax_ID_Vance.pdf', size: '420 KB', type: 'application/pdf', uploadedAt: '09:24 AM' },
            coi: { name: 'COI_1Million_Progressive.pdf', size: '2.14 MB', type: 'application/pdf', uploadedAt: '09:24 AM' },
            noa: { name: 'TriumphFactoring_NOA.pdf', size: '920 KB', type: 'application/pdf', uploadedAt: '09:24 AM' }
          },
          status: 'In Review',
          notes: 'Checked insurance levels with broker registry. $1,000,000 standard liability is approved.'
        },
        {
          id: 'SML-519283',
          submittedAt: '6/7/2026, 4:15 PM',
          companyName: 'Lone Star Flatbed & Stepdeck',
          ownerName: 'Amer Chouhan Sr.',
          phoneNumber: '+1 (214) 555-0311',
          email: 'safety@lonestarflatbeds.co',
          mcNumber: 'MC-248167',
          dotNumber: 'DOT-1847119',
          equipmentType: 'Flatbed',
          documents: {
            mcLetter: { name: 'LoneStar_FMCSA_Authority.pdf', size: '930 KB', type: 'application/pdf', uploadedAt: '04:15 PM' },
            w9Form: { name: 'LoneStar_W9_Signed.pdf', size: '610 KB', type: 'application/pdf', uploadedAt: '04:15 PM' },
            coi: { name: 'COI_Commercial_Auto_Liability.pdf', size: '3.12 MB', type: 'application/pdf', uploadedAt: '04:15 PM' },
            noa: { name: 'OTR_Notice_of_Assignment.pdf', size: '1.05 MB', type: 'application/pdf', uploadedAt: '04:15 PM' }
          },
          status: 'Approved',
          notes: 'Set up directly in Amer\'s high-priority heavy machine load directory. Ready for booking.'
        }
      ];
      localStorage.setItem('smartloads_carrier_setups', JSON.stringify(list));
    }
    
    setSubmissions(list);
    if (list.length > 0 && !selectedSubmission) {
      setSelectedSubmission(list[0]);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleUpdateStatus = (subId: string, newStatus: CarrierSetupSubmission['status']) => {
    const updated = submissions.map(sub => {
      if (sub.id === subId) {
        return { ...sub, status: newStatus };
      }
      return sub;
    });
    setSubmissions(updated);
    localStorage.setItem('smartloads_carrier_setups', JSON.stringify(updated));
    if (selectedSubmission && selectedSubmission.id === subId) {
      setSelectedSubmission({ ...selectedSubmission, status: newStatus });
    }
  };

  const handleUpdateNotes = (subId: string, notes: string) => {
    const updated = submissions.map(sub => {
      if (sub.id === subId) {
        return { ...sub, notes };
      }
      return sub;
    });
    setSubmissions(updated);
    localStorage.setItem('smartloads_carrier_setups', JSON.stringify(updated));
    if (selectedSubmission && selectedSubmission.id === subId) {
      setSelectedSubmission({ ...selectedSubmission, notes });
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to reset all registration setups? This will restore original seed mockups.')) {
      localStorage.removeItem('smartloads_carrier_setups');
      loadSubmissions();
    }
  };

  // Searching and Filtering
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sub.mcNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Banner segment */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 p-6 md:p-8 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block">Dispatcher Operations Hub</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Carrier Setup Registry</h2>
          <p className="text-slate-600 text-sm mt-0.5">
            Internal interface for Amer Arshad Chouhan & Smart Loads dispatchers to review submitted carrier document packets.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadSubmissions}
            className="flex items-center gap-1.5 text-xs bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 px-3 py-2 rounded-lg text-slate-700 transition-all font-semibold shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reload List
          </button>
          
          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-1.5 text-xs bg-red-50 hover:bg-red-100/80 hover:text-red-700 border border-red-200 px-3 py-2 rounded-lg text-red-600 transition-all font-semibold"
          >
            Reset Setups
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side: Onboarding list */}
        <div className="lg:col-span-5 border-r border-slate-200 flex flex-col h-[600px] bg-white">
          
          {/* Searches & filters */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Carrier, Owner or MC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 text-slate-900 rounded-lg pl-9 pr-4 py-2 text-xs font-semibold focus:ring-1 focus:ring-orange-500 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
            </div>

            <div className="flex items-center justify-between gap-2.5">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-400" /> Filter Compliance:
              </span>
              <div className="flex gap-1.5">
                {['All', 'Pending', 'In Review', 'Approved'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`text-[10px] px-2 py-1 rounded font-bold transition-all ${
                      statusFilter === status 
                        ? 'bg-orange-500 text-white shadow-sm' 
                        : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scollable Records list */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {filteredSubmissions.length === 0 ? (
              <div className="p-10 text-center text-slate-500 flex flex-col items-center justify-center h-full">
                <ClipboardList className="w-10 h-10 text-slate-300 mb-2" />
                <p className="text-sm font-semibold">No setups correspond to current query.</p>
                <p className="text-xs text-slate-400 mt-1">Submit a test setup form in the Carrier Setup Portal tab first!</p>
              </div>
            ) : (
              filteredSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubmission(sub)}
                  className={`p-4 cursor-pointer transition-all hover:bg-slate-50 text-left ${
                    selectedSubmission?.id === sub.id ? 'bg-orange-500/5 border-l-4 border-orange-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-800 font-extrabold text-xs truncate max-w-[190px]">{sub.companyName}</span>
                    <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">{sub.id}</span>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="text-orange-600 font-bold">{sub.equipmentType}</span>
                      <span>•</span>
                      <span>{sub.mcNumber}</span>
                    </div>

                    {/* Status badge */}
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                      sub.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      sub.status === 'In Review' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      sub.status === 'Requires Attention' ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-orange-50 text-orange-700 border border-orange-200' // Pending/None
                    }`}>
                      {sub.status === 'Approved' && <CheckCircle2 className="w-2.5 h-2.5" />}
                      {sub.status === 'In Review' && <Clock className="w-2.5 h-2.5" />}
                      {sub.status === 'Requires Attention' && <AlertCircle className="w-2.5 h-2.5" />}
                      {sub.status === 'Pending' && <Clock className="w-2.5 h-2.5" />}
                      {sub.status}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-400 mt-1.5 flex justify-between">
                    <span>Contact: {sub.ownerName}</span>
                    <span>{sub.submittedAt.split(',')[0]}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Detailed carrier setup inspector */}
        <div className="lg:col-span-7 bg-slate-50/50 p-6 md:p-8 h-[600px] overflow-y-auto flex flex-col justify-between">
          
          {selectedSubmission ? (
            <div className="space-y-6 text-left">
              
              {/* Card header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-normal">{selectedSubmission.companyName}</h3>
                  <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Requested Route Representative: <span className="text-orange-600 font-bold">{selectedSubmission.ownerName}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider text-right">Administrative Action</span>
                  <div className="flex gap-1 bg-slate-100 border border-slate-200 p-1 rounded-lg">
                    {(['Pending', 'In Review', 'Approved'] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedSubmission.id, st)}
                        className={`text-[9px] px-2.5 py-1 rounded font-bold transition-all ${
                          selectedSubmission.status === st
                            ? st === 'Approved' ? 'bg-emerald-600 text-white' :
                              st === 'In Review' ? 'bg-blue-600 text-white' :
                              'bg-orange-500 text-white'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid with DOT / Phone details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
                  <p className="text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">Onboarding Details</p>
                  <p className="text-slate-700">
                    <span className="text-slate-400 font-semibold">USDOT Number:</span>{' '}
                    <span className="text-slate-900 font-mono font-bold">{selectedSubmission.dotNumber}</span>
                  </p>
                  <p className="text-slate-700">
                    <span className="text-slate-400 font-semibold">MC Auth Number:</span>{' '}
                    <span className="text-slate-900 font-mono font-bold">{selectedSubmission.mcNumber}</span>
                  </p>
                  <p className="text-slate-700">
                    <span className="text-slate-400 font-semibold">Trailer Class:</span>{' '}
                    <span className="text-orange-600 font-bold">{selectedSubmission.equipmentType}</span>
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-sm">
                  <p className="text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">Contact Credentials</p>
                  <p className="text-slate-700 font-medium">
                    <span className="text-slate-400 font-semibold">Phone Contact:</span>{' '}
                    <a href={`tel:${selectedSubmission.phoneNumber}`} className="text-slate-900 font-bold underline hover:text-orange-600">{selectedSubmission.phoneNumber}</a>
                  </p>
                  <p className="text-slate-700 font-medium pb-1 truncate block">
                    <span className="text-slate-400 font-semibold block">Main Email:</span>{' '}
                    <a href={`mailto:${selectedSubmission.email}`} className="text-slate-900 font-medium hover:text-orange-600 underline truncate block">{selectedSubmission.email}</a>
                  </p>
                  <p className="text-slate-700 font-medium">
                    <span className="text-slate-400 font-semibold">Registered At:</span>{' '}
                    <span className="text-slate-500 font-mono text-[11px] font-bold">{selectedSubmission.submittedAt}</span>
                  </p>
                </div>
              </div>

              {/* PDF Documents review section */}
              <div className="space-y-3">
                <h4 className="text-slate-700 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-orange-500" />
                  Uploaded Packet Documents ({Object.values(selectedSubmission.documents).filter(Boolean).length}/4)
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  {/* MC Letter */}
                  <div className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2 text-slate-600 truncate">
                      <FileText className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <div className="truncate text-[11px]">
                        <p className="font-bold text-slate-900 truncate max-w-[100px]">{selectedSubmission.documents.mcLetter ? 'MC Letter' : 'MC Letter Missing'}</p>
                        <p className="text-[9px] text-slate-500 font-medium truncate max-w-[100px]">{selectedSubmission.documents.mcLetter?.name || 'Requires upload'}</p>
                      </div>
                    </div>
                    {selectedSubmission.documents.mcLetter && (
                      <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold border border-emerald-150">PDF</span>
                    )}
                  </div>

                  {/* W9 Form */}
                  <div className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2 text-slate-600 truncate">
                      <FileText className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <div className="truncate text-[11px]">
                        <p className="font-bold text-slate-900 truncate max-w-[100px]">{selectedSubmission.documents.w9Form ? 'W9 Form' : 'W9 Missing'}</p>
                        <p className="text-[9px] text-slate-500 font-medium truncate max-w-[100px]">{selectedSubmission.documents.w9Form?.name || 'Requires upload'}</p>
                      </div>
                    </div>
                    {selectedSubmission.documents.w9Form && (
                      <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold border border-emerald-150">PDF</span>
                    )}
                  </div>

                  {/* COI */}
                  <div className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2 text-slate-600 truncate">
                      <FileText className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <div className="truncate text-[11px]">
                        <p className="font-bold text-slate-900 truncate max-w-[100px]">{selectedSubmission.documents.coi ? 'Insurance COI' : 'COI Missing'}</p>
                        <p className="text-[9px] text-slate-500 font-medium truncate max-w-[100px]">{selectedSubmission.documents.coi?.name || 'Requires upload'}</p>
                      </div>
                    </div>
                    {selectedSubmission.documents.coi && (
                      <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold border border-emerald-150">PDF</span>
                    )}
                  </div>

                  {/* NOA */}
                  <div className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2 text-slate-600 truncate">
                      <FileText className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <div className="truncate text-[11px]">
                        <p className="font-bold text-slate-900 truncate max-w-[100px]">{selectedSubmission.documents.noa ? 'NOA (Factoring)' : 'NOA Missing'}</p>
                        <p className="text-[9px] text-slate-500 font-medium truncate max-w-[100px]">{selectedSubmission.documents.noa?.name || 'Requires upload'}</p>
                      </div>
                    </div>
                    {selectedSubmission.documents.noa && (
                      <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold border border-emerald-150">PDF</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Internal dispatch comments */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-slate-400" /> Internal Notes (Amer's Setup Audit CRM)
                </label>
                <textarea
                  value={selectedSubmission.notes || ''}
                  onChange={(e) => handleUpdateNotes(selectedSubmission.id, e.target.value)}
                  placeholder="Insert compliance updates here (e.g. Approved and dispatched first structural reefer run to Illinois)..."
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-xl p-3 h-20 focus:ring-1 focus:ring-orange-500 focus:outline-none leading-relaxed shadow-sm font-semibold"
                />
              </div>

            </div>
          ) : (
            <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full">
              <ClipboardList className="w-12 h-12 text-slate-300 mb-2" />
              <p className="text-sm font-semibold">Select a registration packet on the left panel to begin regulatory auditing.</p>
            </div>
          )}

          {/* Quick status indicator */}
          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-500/60" /> All operations reside locally in sandbox mode.
            </span>
            <span>Amer Chouhan Dispatch Hub • Active</span>
          </div>

        </div>

      </div>
    </div>
  );
}
