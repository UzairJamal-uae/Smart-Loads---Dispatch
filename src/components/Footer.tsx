import React from 'react';
import { Truck, Phone, Mail, Clock, ShieldAlert, FileCheck, Landmark } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleFooterLinkClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className="bg-slate-950 text-slate-400 border-t border-slate-900/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white p-2 rounded-lg">
                <Truck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                SMART<span className="text-orange-500 font-bold">LOADS</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium truck dispatch agency navigating the complex US logistics market. We represent Owner-Operators and Fleet Owners with top-tier load booking, broker credit clearance, and rate negotiations.
            </p>
            <div className="flex flex-col gap-2.5 mt-2">
              <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                <ShieldAlert className="w-4 h-4 text-orange-500" />
                Fully Insured & Regulatory Compliant
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                <FileCheck className="w-4 h-4 text-orange-500" />
                Automatic Multi-doc Carrier Setup Portal
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('home')} 
                  className="hover:text-orange-500 text-slate-400 transition-colors text-left"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('services')} 
                  className="hover:text-orange-500 text-slate-400 transition-colors text-left"
                >
                  Freight Dispatch Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('case-studies')} 
                  className="hover:text-orange-500 text-slate-400 transition-colors text-left"
                >
                  Carrier Success Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('carrier-setup')} 
                  className="hover:text-orange-500 text-slate-400 transition-colors text-left"
                >
                  Submit Setup (MC / W9)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('earnings-calc')} 
                  className="hover:text-orange-500 text-slate-400 transition-colors text-left"
                >
                  Net Gross Estimator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('dispatcher-hub')} 
                  className="hover:text-orange-500 text-slate-400 transition-colors text-left font-bold"
                >
                  Dispatcher Portal (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Value Prop & Hours */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase">Hours & Operations</h3>
            <p className="text-sm text-slate-400">
              The US logistics market doesn't sleep. Our team is available round-the-clock for active over-the-road freight assistance.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-2.5 text-sm">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Dispatcher Coverage: 24/7/365</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Landmark className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Factoring / Invoice Processing: 8 AM - 6 PM EST</span>
              </div>
            </div>
          </div>

          {/* Direct Address & Contact Card */}
          <div className="flex flex-col gap-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
            <h3 className="text-white font-bold text-sm tracking-wider">Smart Loads Logistics</h3>
            
            <div className="flex flex-col gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Call/WhatsApp</p>
                  <a href="tel:03291707944" className="hover:text-orange-500 underline">0329-1707944</a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Direct Email</p>
                  <a href="mailto:roypassenger47@gmail.com" className="hover:text-orange-500 underline break-all">roypassenger47@gmail.com</a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-slate-400">
                <p><span className="text-slate-300 font-semibold text-[11px]">Owner:</span> Amer Arshad Chouhan</p>
                <p className="mt-1 text-[10px]">Headquarters & Dispatch Hub</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Smart Loads Logistics. All Rights Reserved. Managed under US regulatory standards.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer font-bold">MC and DOT Compliance Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
