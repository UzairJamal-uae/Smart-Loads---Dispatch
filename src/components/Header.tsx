import React, { useState } from 'react';
import { Truck, Phone, Mail, Menu, X, Shield, Award } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenConsultation: () => void;
}

export default function Header({ currentTab, setCurrentTab, onOpenConsultation }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'carrier-setup', label: 'Carrier Setup Portal' },
    { id: 'earnings-calc', label: 'Earnings Estimator' },
    
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner with Owner & Contact Details */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white text-xs font-bold py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Direct Dispatch Support: <a href="tel:03291707944" className="underline hover:text-orange-100 transition-colors">0329-1707944</a>
            </span>
            <span className="hidden md:inline text-white/60">|</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Email: <a href="mailto:roypassenger47@gmail.com" className="underline hover:text-orange-100 transition-colors">roypassenger47@gmail.com</a>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">
              <Shield className="w-3 h-3" /> USA Logistics Market
            </span>
            <span className="text-[10px] md:inline hidden font-medium">Owner: Amer Arshad Chouhan</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand Brand */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="bg-orange-500 text-white p-2.5 rounded-lg font-black tracking-tighter shadow-md shadow-orange-500/10 group-hover:bg-orange-600 group-hover:scale-105 transition-all">
              <Truck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight leading-none block">
                SMART<span className="text-orange-500 font-bold">LOADS</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] block mt-0.5">
                Logistics & Dispatch
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-menu" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  currentTab === item.id
                    ? 'text-slate-950 bg-slate-100 border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {item.label}
                </div>
                {currentTab === item.id && (
                  <span className="absolute bottom-[-1px] left-1/4 right-1/4 h-[2px] bg-orange-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Call To Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-consult-btn"
              onClick={onOpenConsultation}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-extrabold px-5 py-2.5 rounded-lg shadow-lg shadow-orange-500/15 active:scale-95 transition-all cursor-pointer"
            >
              Get Dispatch Offer
            </button>
          </div>

          {/* Mobile Menu Open Button */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-950 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold ${
                  currentTab === item.id
                    ? 'text-slate-950 bg-slate-50 border-l-4 border-orange-500'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
            <div className="pt-4 px-4">
              <button
                id="mobile-consult-btn"
                onClick={() => {
                  setIsOpen(false);
                  onOpenConsultation();
                }}
                className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-all"
              >
                Get Dispatch Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
