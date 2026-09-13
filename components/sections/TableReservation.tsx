"use client";

import React, { useState } from 'react';
import { useSceneStore, TableBooking } from '@/store/useSceneStore';

interface Table {
  id: string;
  name: string;
  zone: 'Barista Counter' | 'Cozy Leather Booths' | 'Window Canopy' | 'Outdoor Terrace';
  capacity: number;
  status: 'available' | 'reserved' | 'selected';
  description: string;
  x: number; // percentage coordinate for floor plan
  y: number;
}

const INITIAL_TABLES: Table[] = [
  // Barista counter
  { id: 'B1', name: 'Bar Stool 01', zone: 'Barista Counter', capacity: 1, status: 'available', description: 'Front-row view of Slayer 3-group extraction & V60 slow bar', x: 22, y: 25 },
  { id: 'B2', name: 'Bar Stool 02', zone: 'Barista Counter', capacity: 1, status: 'reserved', description: 'Direct interaction with our head barista and roastmaster', x: 30, y: 25 },
  { id: 'B3', name: 'Bar Stool 03', zone: 'Barista Counter', capacity: 1, status: 'available', description: 'Front-row view of Slayer 3-group extraction & V60 slow bar', x: 38, y: 25 },
  { id: 'B4', name: 'Bar Stool 04', zone: 'Barista Counter', capacity: 1, status: 'available', description: 'Direct view of Kyoto cold drip glass towers', x: 46, y: 25 },

  // Leather booths
  { id: 'V1', name: 'Booth Alpha', zone: 'Cozy Leather Booths', capacity: 4, status: 'available', description: 'Deep smoked leather with warm ambient Edison lighting', x: 75, y: 25 },
  { id: 'V2', name: 'Booth Beta', zone: 'Cozy Leather Booths', capacity: 4, status: 'reserved', description: 'Intimate corner booth with acoustic dampening', x: 75, y: 48 },
  { id: 'V3', name: 'Booth Gamma', zone: 'Cozy Leather Booths', capacity: 4, status: 'available', description: 'Plush velvet seating, perfect for intimate meetings', x: 75, y: 72 },

  // Window canopy
  { id: 'W1', name: 'Window Bay 1', zone: 'Window Canopy', capacity: 2, status: 'available', description: 'Overlooking Indiranagar 100ft road green tree canopy', x: 18, y: 65 },
  { id: 'W2', name: 'Window Bay 2', zone: 'Window Canopy', capacity: 2, status: 'available', description: 'Natural morning sunlight and marble coffee table', x: 28, y: 65 },
  { id: 'W3', name: 'Window Bay 3', zone: 'Window Canopy', capacity: 4, status: 'available', description: 'High-backed cane lounge chairs with tree views', x: 38, y: 65 },

  // Outdoor terrace
  { id: 'T1', name: 'Garden Patio 1', zone: 'Outdoor Terrace', capacity: 4, status: 'available', description: 'Open-air terrazzo garden shaded by silver oaks', x: 22, y: 88 },
  { id: 'T2', name: 'Garden Patio 2', zone: 'Outdoor Terrace', capacity: 6, status: 'available', description: 'Large round teak table for family coffee tastings', x: 40, y: 88 },
  { id: 'T3', name: 'Garden Patio 3', zone: 'Outdoor Terrace', capacity: 2, status: 'reserved', description: 'Breeze-kissed bistro table with lantern glow', x: 58, y: 88 },
];

const TIME_SLOTS = [
  '8:00 AM',
  '10:30 AM',
  '1:00 PM',
  '3:30 PM',
  '5:30 PM',
  '7:30 PM',
  '9:00 PM',
];

export default function TableReservation() {
  const [tables] = useState<Table[]>(INITIAL_TABLES);
  const [selectedTable, setSelectedTable] = useState<Table>(INITIAL_TABLES[0]);
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedTime, setSelectedTime] = useState<string>('3:30 PM');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);

  const setStoreBooking = useSceneStore((s) => s.setBooking);

  const handleSelectTable = (tbl: Table) => {
    if (tbl.status === 'reserved') return;
    setSelectedTable(tbl);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const booking: TableBooking = {
      tableId: selectedTable.id,
      tableName: selectedTable.name,
      zone: selectedTable.zone,
      date: selectedDate,
      timeSlot: selectedTime,
      guests,
      guestName: name,
      phone,
    };

    setConfirmedBooking(booking);
    setStoreBooking(booking);
  };

  return (
    <section
      id="reserve"
      className="relative min-h-screen w-full bg-[#FBF9F5] text-[#2B2421] py-28 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-700"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[700px] h-[500px] bg-[#A8583B]/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#A8583B] font-semibold block mb-2">
            Sanctuary Seating
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-wide uppercase text-[#2B2421] mt-3">
            Reserve Your Spot
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A5049] font-light leading-relaxed">
            Select your preferred aesthetic sanctuary—from front-row Slayer barista stools to shaded outdoor terrazzo gardens.
          </p>
        </div>

        {/* Interactive Floor Plan + Booking Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Architectural Floor Map */}
          <div className="lg:col-span-7 bg-[#F2EDE4] border border-[#2B2421]/15 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-serif text-[#2B2421]">Cafe Floor Map</h3>
                <span className="text-[11px] font-mono text-[#5A5049] uppercase tracking-wider font-medium">
                  Indiranagar Flagship · Ground Level
                </span>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A8583B]" />
                  <span className="text-[#2B2421] font-medium">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#2B2421]/20 shadow-sm" />
                  <span className="text-[#5A5049]">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2B2421]/10 border border-[#2B2421]/15 opacity-60" />
                  <span className="text-[#5A5049]/60">Reserved</span>
                </div>
              </div>
            </div>

            {/* Spatial Architectural Layout Canvas Area */}
            <div className="relative w-full h-[440px] sm:h-[480px] bg-white/70 border border-[#2B2421]/15 rounded-2xl overflow-hidden p-4 select-none shadow-sm">
              
              {/* Floor grid pattern */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(#2B2421 1px, transparent 1px), linear-gradient(90deg, #2B2421 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Architectural Zone Labels */}
              <div className="absolute top-3 left-4 text-[10px] font-mono text-[#A8583B] uppercase tracking-widest font-semibold">
                [Zone A: Espresso & Slow Bar]
              </div>
              <div className="absolute top-3 right-4 text-[10px] font-mono text-[#A8583B] uppercase tracking-widest font-semibold">
                [Zone B: Leather Booths]
              </div>
              <div className="absolute top-[52%] left-4 text-[10px] font-mono text-[#A8583B] uppercase tracking-widest font-semibold">
                [Zone C: Canopy Windows]
              </div>
              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[#A8583B] uppercase tracking-widest font-semibold">
                [Zone D: Outdoor Terrazzo Garden]
              </div>

              {/* Espresso Counter Graphic */}
              <div className="absolute top-14 left-10 w-[42%] h-4 bg-[#F2EDE4] border border-[#2B2421]/15 rounded-md flex items-center justify-center shadow-sm">
                <span className="text-[8px] font-mono uppercase text-[#5A5049] tracking-widest font-semibold">
                  Brew Bar & Slayer Machine
                </span>
              </div>

              {/* Clickable Tables Placed Spatially */}
              {tables.map((tbl) => {
                const isSelected = selectedTable.id === tbl.id;
                const isReserved = tbl.status === 'reserved';

                return (
                  <button
                    key={tbl.id}
                    onClick={() => handleSelectTable(tbl)}
                    disabled={isReserved}
                    style={{ left: `${tbl.x}%`, top: `${tbl.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 rounded-xl flex flex-col items-center justify-center cursor-pointer disabled:cursor-not-allowed ${
                      tbl.capacity === 1
                        ? 'w-10 h-10 rounded-full'
                        : tbl.capacity === 2
                        ? 'w-12 h-12'
                        : 'w-16 h-14'
                    } ${
                      isSelected
                        ? 'bg-[#A8583B] text-white font-bold shadow-md scale-110 z-20 ring-2 ring-[#A8583B]/30'
                        : isReserved
                        ? 'bg-[#2B2421]/10 border border-[#2B2421]/15 text-[#2B2421]/30 opacity-50'
                        : 'bg-white border border-[#2B2421]/20 text-[#2B2421] hover:border-[#A8583B] hover:scale-105 shadow-sm'
                    }`}
                  >
                    <span className="text-[11px] font-mono font-bold">{tbl.id}</span>
                    <span className="text-[9px] opacity-75 font-mono">{tbl.capacity}p</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Spot Details Badge */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-[#2B2421]/15 flex justify-between items-center shadow-sm">
              <div>
                <span className="text-xs font-serif text-[#2B2421] font-bold block">
                  {selectedTable.name} · {selectedTable.zone}
                </span>
                <p className="text-[11px] text-[#5A5049] font-light mt-0.5">
                  {selectedTable.description} · Accommodates up to {selectedTable.capacity} guests
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#A8583B]/10 text-[#A8583B] border border-[#A8583B]/30 font-semibold">
                Selected
              </span>
            </div>

          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-5 bg-[#F2EDE4] border border-[#2B2421]/15 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-sm">
            <h3 className="text-xl font-serif text-[#2B2421] mb-6 font-bold">Booking Details</h3>

            <form onSubmit={handleConfirmReservation} className="space-y-6">
              
              {/* Date Selection */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#5A5049] block mb-2 font-semibold">
                  Select Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'This Weekend'].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedDate === d
                          ? 'border-[#A8583B] bg-white text-[#2B2421] shadow-sm font-semibold'
                          : 'border-[#2B2421]/15 bg-transparent text-[#5A5049] hover:border-[#A8583B]/50 hover:bg-white/50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#5A5049] block mb-2 font-semibold">
                  Time Slot (IST)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 px-2.5 rounded-xl text-[11px] font-mono border transition-all cursor-pointer ${
                        selectedTime === t
                          ? 'border-[#A8583B] bg-white text-[#A8583B] shadow-sm font-semibold'
                          : 'border-[#2B2421]/15 bg-transparent text-[#5A5049] hover:border-[#A8583B]/50 hover:bg-white/50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#5A5049] block mb-2 font-semibold">
                  Party Size
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 6].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                        guests === num
                          ? 'border-[#A8583B] bg-white text-[#A8583B] shadow-sm font-semibold'
                          : 'border-[#2B2421]/15 bg-transparent text-[#5A5049] hover:border-[#A8583B]/50 hover:bg-white/50'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-widest text-[#5A5049] block mb-1 font-semibold">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aditya Sharma"
                    className="w-full bg-white border border-[#2B2421]/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B2421] placeholder-[#2B2421]/30 focus:outline-none focus:border-[#A8583B] shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-widest text-[#5A5049] block mb-1 font-semibold">
                    WhatsApp / Mobile (+91)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-[#2B2421]/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2B2421] placeholder-[#2B2421]/30 focus:outline-none focus:border-[#A8583B] shadow-sm"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#2B2421] text-[#FBF9F5] font-medium uppercase tracking-[0.15em] text-xs hover:bg-[#A8583B] shadow-sm transition-all cursor-pointer"
              >
                Confirm Spot at {selectedTable.name}
              </button>

            </form>
          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2421]/70 backdrop-blur-md p-4">
          <div className="max-w-md w-full bg-[#FBF9F5] border border-[#2B2421]/20 rounded-3xl p-8 shadow-xl text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-[#A8583B]/10 border border-[#A8583B] text-[#A8583B] mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-serif text-[#2B2421] mb-1 font-bold">Spot Reserved!</h3>
            <p className="text-xs font-mono text-[#A8583B] uppercase tracking-widest mb-6 font-semibold">
              Token #RES-{Math.floor(1000 + Math.random() * 9000)}
            </p>

            <div className="bg-[#F2EDE4] p-4 rounded-2xl border border-[#2B2421]/15 text-left space-y-2 text-xs font-mono mb-6">
              <div className="flex justify-between">
                <span className="text-[#5A5049]">Spot:</span>
                <span className="text-[#2B2421] font-semibold">{confirmedBooking.tableName} ({confirmedBooking.zone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A5049]">Date & Time:</span>
                <span className="text-[#2B2421] font-semibold">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A5049]">Guest:</span>
                <span className="text-[#2B2421] font-semibold">{confirmedBooking.guestName} ({confirmedBooking.guests}p)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A5049]">Location:</span>
                <span className="text-[#2B2421] font-semibold">Indiranagar Flagship, Bengaluru</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="w-full py-3.5 rounded-full bg-[#2B2421] text-[#FBF9F5] font-medium text-xs uppercase tracking-widest hover:bg-[#A8583B] transition-all cursor-pointer shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </section>
  );
}