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
      className="relative min-h-screen w-full bg-[#0E0704] py-24 px-4 sm:px-6 lg:px-8 text-[#F5E6D0]"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[700px] h-[500px] bg-[#D89B5A]/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D89B5A] font-light">
            Sanctuary Seating
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-[0.18em] uppercase text-[#F5E6D0] mt-3">
            Reserve Your Spot
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#C9A86C]/80 font-light leading-relaxed">
            Select your preferred aesthetic sanctuary—from front-row Slayer barista stools to shaded outdoor terrazzo gardens.
          </p>
        </div>

        {/* Interactive Floor Plan + Booking Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Architectural Floor Map */}
          <div className="lg:col-span-7 bg-[#160D08]/90 border border-[#C9A86C]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-serif text-[#F5E6D0]">Cafe Floor Map</h3>
                <span className="text-[11px] font-mono text-[#C9A86C]/70 uppercase tracking-wider">
                  Indiranagar Flagship · Ground Level
                </span>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D89B5A]" />
                  <span className="text-[#F5E6D0]">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3D2517] border border-[#C9A86C]/40" />
                  <span className="text-[#F5E6D0]/60">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-950 border border-red-800/40" />
                  <span className="text-[#F5E6D0]/40">Reserved</span>
                </div>
              </div>
            </div>

            {/* Spatial Architectural Layout Canvas Area */}
            <div className="relative w-full h-[440px] sm:h-[480px] bg-[#0B0604] border border-[#2A180E] rounded-2xl overflow-hidden p-4 select-none">
              
              {/* Floor grid pattern */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(#C9A86C 1px, transparent 1px), linear-gradient(90deg, #C9A86C 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Architectural Zone Labels */}
              <div className="absolute top-3 left-4 text-[10px] font-mono text-[#D89B5A]/60 uppercase tracking-widest">
                [Zone A: Espresso & Slow Bar]
              </div>
              <div className="absolute top-3 right-4 text-[10px] font-mono text-[#D89B5A]/60 uppercase tracking-widest">
                [Zone B: Leather Booths]
              </div>
              <div className="absolute top-[52%] left-4 text-[10px] font-mono text-[#D89B5A]/60 uppercase tracking-widest">
                [Zone C: Canopy Windows]
              </div>
              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[#D89B5A]/60 uppercase tracking-widest">
                [Zone D: Outdoor Terrazzo Garden]
              </div>

              {/* Espresso Counter Graphic */}
              <div className="absolute top-14 left-10 w-[42%] h-4 bg-[#2A180E] border border-[#C9A86C]/40 rounded-md flex items-center justify-center">
                <span className="text-[8px] font-mono uppercase text-[#C9A86C]/80 tracking-widest">
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
                        ? 'bg-[#D89B5A] text-[#0B0705] font-bold shadow-[0_0_20px_rgba(216,155,90,0.8)] scale-110 z-20'
                        : isReserved
                        ? 'bg-red-950/40 border border-red-900/40 text-red-400/40 opacity-50'
                        : 'bg-[#2A180E]/90 border border-[#C9A86C]/40 text-[#F5E6D0] hover:border-[#D89B5A] hover:scale-105'
                    }`}
                  >
                    <span className="text-[11px] font-mono">{tbl.id}</span>
                    <span className="text-[9px] opacity-75">{tbl.capacity}p</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Spot Details Badge */}
            <div className="mt-6 p-4 rounded-2xl bg-[#0B0604]/80 border border-[#2A180E] flex justify-between items-center">
              <div>
                <span className="text-xs font-serif text-[#D89B5A] font-bold block">
                  {selectedTable.name} · {selectedTable.zone}
                </span>
                <p className="text-[11px] text-[#F5E6D0]/70 font-light mt-0.5">
                  {selectedTable.description} · Accommodates up to {selectedTable.capacity} guests
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#D89B5A]/20 text-[#D89B5A] border border-[#D89B5A]/40">
                Selected
              </span>
            </div>

          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-5 bg-[#160D08]/90 border border-[#C9A86C]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <h3 className="text-xl font-serif text-[#F5E6D0] mb-6">Booking Details</h3>

            <form onSubmit={handleConfirmReservation} className="space-y-6">
              
              {/* Date Selection */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#C9A86C]/80 block mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'This Weekend'].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                        selectedDate === d
                          ? 'border-[#D89B5A] bg-[#2A180E] text-[#F5E6D0]'
                          : 'border-[#2A180E] bg-[#0B0604]/60 text-[#F5E6D0]/60 hover:border-[#C9A86C]/40'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#C9A86C]/80 block mb-2">
                  Time Slot (IST)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 px-2.5 rounded-xl text-[11px] font-mono border transition-all ${
                        selectedTime === t
                          ? 'border-[#D89B5A] bg-[#2A180E] text-[#D89B5A]'
                          : 'border-[#2A180E] bg-[#0B0604]/60 text-[#F5E6D0]/60 hover:border-[#C9A86C]/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#C9A86C]/80 block mb-2">
                  Party Size
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 6].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono border transition-all ${
                        guests === num
                          ? 'border-[#D89B5A] bg-[#2A180E] text-[#D89B5A]'
                          : 'border-[#2A180E] bg-[#0B0604]/60 text-[#F5E6D0]/60 hover:border-[#C9A86C]/40'
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
                  <label className="text-[11px] font-mono uppercase tracking-widest text-[#C9A86C]/80 block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aditya Sharma"
                    className="w-full bg-[#0B0604] border border-[#2A180E] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F5E6D0] placeholder-[#F5E6D0]/30 focus:outline-none focus:border-[#D89B5A]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-widest text-[#C9A86C]/80 block mb-1">
                    WhatsApp / Mobile (+91)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#0B0604] border border-[#2A180E] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F5E6D0] placeholder-[#F5E6D0]/30 focus:outline-none focus:border-[#D89B5A]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-tactile w-full py-4 rounded-2xl bg-gradient-to-r from-[#D89B5A] via-[#C9A86C] to-[#B8722E] text-[#0B0705] font-semibold uppercase tracking-[0.18em] text-xs shadow-[0_0_25px_rgba(216,155,90,0.4)] hover:shadow-[0_0_40px_rgba(216,155,90,0.7)] transition-all"
              >
                Confirm Spot at {selectedTable.name}
              </button>

            </form>
          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0705]/90 backdrop-blur-xl p-4">
          <div className="max-w-md w-full bg-[#180E09] border border-[#D89B5A] rounded-3xl p-8 shadow-[0_0_60px_rgba(216,155,90,0.3)] text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-[#D89B5A]/20 border border-[#D89B5A] text-[#D89B5A] mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-serif text-[#F5E6D0] mb-1">Spot Reserved!</h3>
            <p className="text-xs font-mono text-[#D89B5A] uppercase tracking-widest mb-6">
              Token #RES-{Math.floor(1000 + Math.random() * 9000)}
            </p>

            <div className="bg-[#0B0604] p-4 rounded-2xl border border-[#2A180E] text-left space-y-2 text-xs font-mono mb-6">
              <div className="flex justify-between">
                <span className="text-[#C9A86C]/70">Spot:</span>
                <span className="text-[#F5E6D0]">{confirmedBooking.tableName} ({confirmedBooking.zone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C9A86C]/70">Date & Time:</span>
                <span className="text-[#F5E6D0]">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C9A86C]/70">Guest:</span>
                <span className="text-[#F5E6D0]">{confirmedBooking.guestName} ({confirmedBooking.guests}p)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C9A86C]/70">Location:</span>
                <span className="text-[#F5E6D0]">Indiranagar Flagship, Bengaluru</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="btn-tactile w-full py-3.5 rounded-xl bg-[#D89B5A] text-[#0B0705] font-semibold text-xs uppercase tracking-wider hover:brightness-110"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
