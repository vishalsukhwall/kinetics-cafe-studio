"use client";

import React, { useState } from 'react';
import { useSceneStore, TableBooking } from '@/store/useSceneStore';

interface Table {
  id: string;
  name: string;
  zone: string;
  capacity: number;
  status: 'available' | 'reserved';
  description: string;
  x: number;
  y: number;
}

const SANCTUARY_PHOTOS = [
  {
    title: 'The Slayer Espresso Bar',
    zone: 'Zone A · Bar Counter',
    description: 'Front-row view of 9-bar extraction & V60 slow bar',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Sunlit Window Canopy',
    zone: 'Zone B · Lounge Bays',
    description: 'Natural morning light overlooking lush Indiranagar canopies',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Terrazzo Oak Garden',
    zone: 'Zone C · Outdoor Patio',
    description: 'Open-air teak seating shaded by silver oaks',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
  },
];

const TABLES: Table[] = [
  { id: 'B1', name: 'Bar Stool 01', zone: 'Bar Counter', capacity: 1, status: 'available', description: 'Front-row view of Slayer extraction', x: 20, y: 25 },
  { id: 'B2', name: 'Bar Stool 02', zone: 'Bar Counter', capacity: 1, status: 'available', description: 'Direct interaction with head barista', x: 30, y: 25 },
  { id: 'B3', name: 'Bar Stool 03', zone: 'Bar Counter', capacity: 1, status: 'reserved', description: 'Front-row view of slow bar', x: 40, y: 25 },
  { id: 'B4', name: 'Bar Stool 04', zone: 'Bar Counter', capacity: 1, status: 'available', description: 'Kyoto cold drip view', x: 50, y: 25 },

  { id: 'L1', name: 'Leather Booth 1', zone: 'Leather Booths', capacity: 4, status: 'available', description: 'Deep smoked leather with warm ambient lighting', x: 78, y: 28 },
  { id: 'L2', name: 'Leather Booth 2', zone: 'Leather Booths', capacity: 4, status: 'reserved', description: 'Acoustic dampened corner booth', x: 78, y: 55 },
  { id: 'L3', name: 'Leather Booth 3', zone: 'Leather Booths', capacity: 4, status: 'available', description: 'Plush seating for intimate gatherings', x: 78, y: 80 },

  { id: 'W1', name: 'Window Bay 1', zone: 'Window Canopy', capacity: 2, status: 'available', description: 'Natural morning sunlight & tree view', x: 22, y: 62 },
  { id: 'W2', name: 'Window Bay 2', zone: 'Window Canopy', capacity: 2, status: 'available', description: 'Marble table with green canopy view', x: 38, y: 62 },

  { id: 'T1', name: 'Garden Table 1', zone: 'Outdoor Patio', capacity: 4, status: 'available', description: 'Open-air patio under silver oaks', x: 22, y: 88 },
  { id: 'T2', name: 'Garden Table 2', zone: 'Outdoor Patio', capacity: 6, status: 'available', description: 'Round teak table for group tastings', x: 42, y: 88 },
];

const TIME_SLOTS = ['8:30 AM', '11:00 AM', '2:30 PM', '5:00 PM', '7:30 PM', '9:00 PM'];

export default function SanctuarySection() {
  const [selectedTable, setSelectedTable] = useState<Table>(TABLES[0]);
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('5:00 PM');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);

  const setBooking = useSceneStore((s) => s.setBooking);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const b: TableBooking = {
      tableId: selectedTable.id,
      tableName: selectedTable.name,
      zone: selectedTable.zone,
      date,
      timeSlot: time,
      guests,
      guestName: name,
      phone,
    };
    setConfirmedBooking(b);
    setBooking(b);
  };

  return (
    <section
      id="sanctuary"
      className="relative min-h-screen w-full bg-[#0C0603] py-32 px-6 sm:px-8 lg:px-12 text-[#F5E6D0]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#D89B5A] block mb-3">
            03 · Sanctuary & Atmosphere
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-[0.16em] uppercase text-[#F5E6D0]">
            Reserve Your Spot
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#C9A86C]/70 font-light leading-relaxed">
            Experience our Indiranagar sanctuary. Select your preferred atmosphere before arriving.
          </p>
        </div>

        {/* 1. Cafe Atmosphere Highlights (3 Clean Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {SANCTUARY_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="group relative h-72 rounded-3xl overflow-hidden border border-[#C9A86C]/20 bg-[#160D08]"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0705]/95 via-[#0B0705]/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono text-[#D89B5A] uppercase tracking-widest block mb-1">
                  {photo.zone}
                </span>
                <h3 className="text-xl font-serif text-[#F5E6D0] mb-1">{photo.title}</h3>
                <p className="text-xs text-[#F5E6D0]/70 font-light">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Interactive Floor Plan & Reservation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Spatial Architectural Floor Map */}
          <div className="lg:col-span-7 bg-[#140C07]/70 border border-[#C9A86C]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-serif text-[#F5E6D0]">Interactive Seating Map</h3>
                <span className="text-[10px] font-mono text-[#C9A86C]/70 uppercase tracking-widest">
                  Tap any available table to select
                </span>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D89B5A]" />
                  <span className="text-[#F5E6D0]">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2A180E] border border-[#C9A86C]/30" />
                  <span className="text-[#F5E6D0]/60">Available</span>
                </div>
              </div>
            </div>

            {/* Spatial Layout Canvas */}
            <div className="relative w-full h-96 sm:h-[420px] bg-[#0A0503] border border-[#24150E] rounded-2xl p-4 select-none overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(#C9A86C 1px, transparent 1px), linear-gradient(90deg, #C9A86C 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />

              <div className="absolute top-3 left-4 text-[9px] font-mono text-[#D89B5A]/50 uppercase tracking-widest">
                [Zone A: Espresso Bar]
              </div>
              <div className="absolute top-3 right-4 text-[9px] font-mono text-[#D89B5A]/50 uppercase tracking-widest">
                [Zone B: Booths]
              </div>
              <div className="absolute bottom-3 left-4 text-[9px] font-mono text-[#D89B5A]/50 uppercase tracking-widest">
                [Zone C: Garden Patio]
              </div>

              {/* Espresso bar counter */}
              <div className="absolute top-12 left-8 w-44 h-3.5 bg-[#20120B] border border-[#C9A86C]/30 rounded flex items-center justify-center">
                <span className="text-[7px] font-mono text-[#C9A86C]/70 uppercase tracking-widest">Slayer Bar</span>
              </div>

              {/* Interactive Table Pins */}
              {TABLES.map((t) => {
                const isSelected = selectedTable.id === t.id;
                const isReserved = t.status === 'reserved';

                return (
                  <button
                    key={t.id}
                    onClick={() => !isReserved && setSelectedTable(t)}
                    disabled={isReserved}
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col items-center justify-center transition-all ${
                      t.capacity === 1 ? 'w-9 h-9 rounded-full' : t.capacity === 2 ? 'w-11 h-11' : 'w-14 h-12'
                    } ${
                      isSelected
                        ? 'bg-[#D89B5A] text-[#0B0705] font-bold shadow-[0_0_15px_rgba(216,155,90,0.8)] scale-105 z-10'
                        : isReserved
                        ? 'bg-red-950/20 border border-red-900/30 text-red-400/40 opacity-40 cursor-not-allowed'
                        : 'bg-[#1C1009] border border-[#C9A86C]/30 text-[#F5E6D0] hover:border-[#D89B5A]'
                    }`}
                  >
                    <span className="text-[10px] font-mono">{t.id}</span>
                    <span className="text-[8px] opacity-75">{t.capacity}p</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Spot Details */}
            <div className="mt-5 p-4 rounded-2xl bg-[#0A0503] border border-[#20120B] flex justify-between items-center text-xs">
              <div>
                <span className="font-serif text-[#D89B5A] font-bold block">
                  {selectedTable.name} · {selectedTable.zone}
                </span>
                <span className="text-[#F5E6D0]/60 text-[11px] font-light">
                  {selectedTable.description} (Up to {selectedTable.capacity} guests)
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#D89B5A]/20 text-[#D89B5A]">
                Selected
              </span>
            </div>

          </div>

          {/* Right: Booking Details Card */}
          <div className="lg:col-span-5 bg-[#140C07]/70 border border-[#C9A86C]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-xl font-serif text-[#F5E6D0] mb-6">Reservation Details</h3>

            <form onSubmit={handleBook} className="space-y-5">
              
              {/* Date */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A86C]/70 block mb-2">
                  Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'Weekend'].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setDate(d)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                        date === d
                          ? 'border-[#D89B5A] bg-[#24150D] text-[#D89B5A]'
                          : 'border-[#24150E] text-[#F5E6D0]/60 hover:border-[#C9A86C]/30'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A86C]/70 block mb-2">
                  Time Slot (IST)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTime(t)}
                      className={`py-2 rounded-xl text-xs font-mono border transition-all ${
                        time === t
                          ? 'border-[#D89B5A] bg-[#24150D] text-[#D89B5A]'
                          : 'border-[#24150E] text-[#F5E6D0]/60 hover:border-[#C9A86C]/30'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Party Size */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#C9A86C]/70 block mb-2">
                  Party Size
                </label>
                <div className="flex gap-2">
                  {[1, 2, 4, 6].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono border transition-all ${
                        guests === num
                          ? 'border-[#D89B5A] bg-[#24150D] text-[#D89B5A]'
                          : 'border-[#24150E] text-[#F5E6D0]/60 hover:border-[#C9A86C]/30'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-[#0A0503] border border-[#24150E] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F5E6D0] placeholder-[#F5E6D0]/30 focus:outline-none focus:border-[#D89B5A]"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile / WhatsApp (+91)"
                  className="w-full bg-[#0A0503] border border-[#24150E] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F5E6D0] placeholder-[#F5E6D0]/30 focus:outline-none focus:border-[#D89B5A]"
                />
              </div>

              <button
                type="submit"
                className="btn-tactile w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D89B5A] to-[#B8722E] text-[#0B0705] font-semibold uppercase tracking-[0.16em] text-xs shadow-lg hover:brightness-110 transition-all"
              >
                Confirm Spot at {selectedTable.name}
              </button>

            </form>
          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0705]/90 backdrop-blur-md p-4">
          <div className="max-w-sm w-full bg-[#140C07] border border-[#D89B5A] rounded-3xl p-7 shadow-2xl text-center animate-fade-in-up">
            <div className="w-12 h-12 rounded-full bg-[#D89B5A]/20 text-[#D89B5A] mx-auto flex items-center justify-center mb-3">
              ✓
            </div>
            <h3 className="text-xl font-serif text-[#F5E6D0]">Spot Reserved</h3>
            <p className="text-[11px] font-mono text-[#D89B5A] mt-1 mb-5">#RES-{Math.floor(1000 + Math.random() * 9000)}</p>
            <div className="text-xs font-mono text-[#F5E6D0]/70 space-y-1.5 text-left bg-[#0A0503] p-3 rounded-xl border border-[#20120B] mb-5">
              <div>Table: {confirmedBooking.tableName}</div>
              <div>Time: {confirmedBooking.date} at {confirmedBooking.timeSlot}</div>
              <div>Guest: {confirmedBooking.guestName} ({confirmedBooking.guests}p)</div>
            </div>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="btn-tactile w-full py-2.5 rounded-xl bg-[#D89B5A] text-[#0B0705] font-semibold text-xs uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
