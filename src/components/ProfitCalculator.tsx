import React, { useState, useEffect } from 'react';
import { calculatorPresets } from '../data';
import { PanelLeft, Fuel, Truck, Calculator, LineChart, DollarSign, ArrowUpRight, Percent } from 'lucide-react';

export default function ProfitCalculator() {
  const [equipmentType, setEquipmentType] = useState('Reefer (Ref)');
  const [miles, setMiles] = useState(2800);
  const [customRate, setCustomRate] = useState<number>(2.85);
  const [fuelPrice, setFuelPrice] = useState(3.95);
  const [mpg, setMpg] = useState(6.5);
  const [dispatchFee, setDispatchFee] = useState(6); // 6% Standard
  const [otherWeeklyExpenses, setOtherWeeklyExpenses] = useState(1200); // Insurance, trailer lease, maintenance

  // Sync custom rate with preset defaults when equipmentType changes
  useEffect(() => {
    const preset = calculatorPresets.equipmentTypes.find(e => e.type.startsWith(equipmentType.substring(0, 5)));
    if (preset) {
      setCustomRate(preset.avgRate);
      setMiles(preset.standardMiles);
    }
  }, [equipmentType]);

  // Calculations
  const grossRevenue = miles * customRate;
  const dispatchFeeAmount = grossRevenue * (dispatchFee / 100);
  const totalGallonsUsed = miles / mpg;
  const estimatedFuelCost = totalGallonsUsed * fuelPrice;
  const totalWeeklyOperatingCosts = estimatedFuelCost + dispatchFeeAmount + otherWeeklyExpenses;
  const netWeeklyProfit = grossRevenue - totalWeeklyOperatingCosts;
  
  // Year-end estimation
  const netYearlyProfit = netWeeklyProfit * 50; // assuming 50 weeks on road
  const grossYearlyRevenue = grossRevenue * 50;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
      {/* Upper header */}
      <div className="bg-gradient-to-r from-slate-50 to-white p-6 md:p-8 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-orange-500/10 text-orange-600 p-2 rounded-lg">
            <Calculator className="w-5 h-5 text-orange-600" />
          </div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Interactive Calculator</span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Gross & Net Estimator</h3>
        <p className="text-slate-600 text-sm mt-1">
          Check your prospective weekly and yearly net profits based on current market rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side Inputs */}
        <div className="lg:col-span-6 p-6 md:p-8 border-r border-slate-200 flex flex-col gap-5 bg-white">
          <h4 className="text-slate-900 font-extrabold text-base flex items-center gap-2">
            <PanelLeft className="w-4 h-4 text-orange-500" />
            Your Carrier Setup & Expenses
          </h4>

          {/* Equipment Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-600 text-xs font-bold uppercase tracking-wider">Trailer/Equipment Type</label>
            <div className="relative">
              <select
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-900 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="Reefer (Ref)">Reefer (53ft Temperature Controlled)</option>
                <option value="Dry Van">Dry Van (53ft Dry Freight)</option>
                <option value="Flatbed">Flatbed (Heavy/Specialized Equipment)</option>
                <option value="Power Only">Power Only (Tractor Hook-up)</option>
                <option value="Hotshot">Hotshot (Dually & Gooseneck)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <Truck className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Grid Inputs for Rate and Miles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-600 text-xs font-bold uppercase tracking-wider">Assigned Rate Per Mile ($)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  min="0.5"
                  value={customRate}
                  onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg pl-8 pr-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <span className="absolute left-3 top-3 text-slate-400 text-xs font-bold">$</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-600 text-xs font-bold uppercase tracking-wider">Weekly Loaded Miles</label>
              <input
                type="number"
                step="50"
                min="100"
                value={miles}
                onChange={(e) => setMiles(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Grid Inputs for Fuel parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Fuel className="w-3 h-3 text-orange-500" /> Diesel Fuel Price ($/Gal)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  min="1"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg pl-8 pr-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <span className="absolute left-3 top-3 text-slate-400 text-xs font-bold">$</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-600 text-xs font-bold uppercase tracking-wider">Truck MPG (Avg)</label>
              <input
                type="number"
                step="0.1"
                min="3"
                value={mpg}
                onChange={(e) => setMpg(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Dispatcher Commission Fee & Fixed Overheads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-orange-500" /> Dispatch Fee (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  min="3"
                  max="12"
                  value={dispatchFee}
                  onChange={(e) => setDispatchFee(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg pr-8 pl-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <span className="absolute right-3 top-3 text-slate-400 text-xs font-bold">%</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-600 text-xs font-bold uppercase tracking-wider">Other Weekly Expenses ($)</label>
              <div className="relative">
                <input
                  type="number"
                  step="50"
                  min="0"
                  value={otherWeeklyExpenses}
                  onChange={(e) => setOtherWeeklyExpenses(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg pl-8 pr-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <span className="absolute left-3 top-3 text-slate-400 text-xs font-bold">$</span>
              </div>
              <span className="text-[10px] text-slate-500">Includes insurance, maintenance & lease reserves.</span>
            </div>
          </div>
        </div>

        {/* Right Side Outputs (Visual Panels) */}
        <div className="lg:col-span-6 p-6 md:p-8 bg-slate-50 flex flex-col justify-between gap-6 border-t md:border-t-0 lg:border-t-0">
          <div>
            <h4 className="text-slate-900 font-extrabold text-base flex items-center gap-2 mb-4">
              <LineChart className="w-4 h-4 text-emerald-600" />
              Smart Loads Financial Forecast
            </h4>

            {/* Main Net Profit Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-5 flex flex-col justify-center">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest block mb-1">
                Net Weekly Take-Home (Profit)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black text-emerald-700 tracking-tight">
                  ${netWeeklyProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-emerald-600 font-bold">/ week Net</span>
              </div>
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between items-center py-2.5 border-b border-slate-200">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  Estimated Weekly Gross:
                </span>
                <span className="text-slate-900 font-bold">${grossRevenue.toLocaleString('en-US')}</span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-slate-200">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-orange-500/60" />
                  Calculated Diesel Fuel Cost:
                </span>
                <span className="text-red-600 font-semibold">-${estimatedFuelCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>

              <div className="flex justify-between items-center py-2.5 border-b border-slate-200">
                <span className="text-slate-600 flex items-center gap-1.5 text-xs font-bold bg-orange-500/5 text-orange-600 px-2 py-0.5 rounded border border-orange-500/10">
                  Dispatcher Fee ({dispatchFee}%):
                </span>
                <span className="text-slate-700 font-semibold">-${dispatchFeeAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>

              <div className="flex justify-between items-center py-2.5">
                <span className="text-slate-600">Fixed Trailer & Maintenance:</span>
                <span className="text-slate-700">-${otherWeeklyExpenses.toLocaleString('en-US')}</span>
              </div>
            </div>
          </div>

          {/* Yearly Projections */}
          <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between mt-4">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Estimated Yearly Gross</span>
              <span className="text-slate-900 font-extrabold text-base">${grossYearlyRevenue.toLocaleString('en-US')}</span>
            </div>
            <div className="text-right border-l border-slate-200 pl-4">
              <span className="text-emerald-700 text-[10px] uppercase font-bold tracking-wider block flex items-center gap-1 justify-end">
                Yearly Net Profit <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              </span>
              <span className="text-emerald-600 font-black text-xl">${netYearlyProfit.toLocaleString('en-US')}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
