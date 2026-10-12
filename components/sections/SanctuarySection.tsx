'use client';

import React, { useState } from 'react';
import { useSceneStore, TableBooking } from '@/store/useSceneStore';

interface TableDef {
  id: string;
  zone: 'Bar' | 'Lounge' | 'Terrace' | 'Roastery';
  x: number;
  y: number;
  seats: number;
  status: 'available' | 'reserved';
  view: string;
}

const TABLES: TableDef[] = [
  { id: 'B1', zone: 'Bar', x: 20, y: 30, seats: 2, status: 'available', view: 'Front view of Slayer Espresso Bar' },
  { id: 'B2', zone: 'Bar', x: 20, y: 50, seats: 2, status: 'available', view: 'Adjacent to Cold Drip Towers' },
  { id: 'B3', zone: 'Bar', x: 20, y: 70, seats: 2, status: 'reserved', view: 'Hand Pour Slow Bar counter' },
  { id: 'B4', zone: 'Bar', x: 40, y: 40, seats: 2, status: 'available', view: 'Center Bar with high wooden stools' },
  { id: 'L1', zone: 'Lounge', x: 60, y: 30, seats: 4, status: 'available', view: 'Plush velvet sofa & marble coffee table' },
  { id: 'L2', zone: 'Lounge', x: 60, y: 70, seats: 4, status: 'available', view: 'Cozy book nook & ambient warm lighting' },
  { id: 'L3', zone: 'Lounge', x: 80, y: 50, seats: 6, status: 'reserved', view: 'Private banquette seating for groups' },
  { id: 'W1', zone: 'Terrace', x: 30, y: 15, seats: 2, status: 'available', view: 'Sunlit window canopy overlooking gardens' },
  { id: 'W2', zone: 'Terrace', x: 70, y: 15, seats: 2, status: 'available', view: 'Panoramic glass facade with morning sun' },
  { id: 'T1', zone: 'Terrace', x: 85, y: 25, seats: 4, status: 'available', view: 'Outdoor teak pergola with herb planters' },
  { id: 'T2', zone: 'Terrace', x: 85, y: 75, seats: 4, status: 'available', view: 'Breezy courtyard terrace seating' }
];

const DATES = ['Today', 'Tomorrow', 'This Weekend'];
const TIME_SLOTS = ['8:30 AM', '11:00 AM', '2:30 PM', '5:00 PM', '7:30 PM', '9:00 PM'];
const PARTY_SIZES = [
  { count: 1, label: '1 Guest' },
  { count: 2, label: '2 Guests' },
  { count: 4, label: '4 Guests' },
  { count: 6, label: '6 Guests' }
];

export default function SanctuarySection() {
  const setBooking = useSceneStore((state) => state.setBooking);
  
  const [selectedTableId, setSelectedTableId] = useState<string>('B1');
  const [date, setDate] = useState(DATES[0]);
  const [time, setTime] = useState(TIME_SLOTS[1]);
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const selectedTable = TABLES.find(t => t.id === selectedTableId) || TABLES[0];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTableId || !name || !phone) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const bookingId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newBooking: TableBooking = {
        tableId: selectedTableId,
        tableName: `Table ${selectedTableId} (${selectedTable.zone})`,
        zone: selectedTable.zone.toUpperCase(),
        date,
        timeSlot: time,
        guests: partySize,
        guestName: name,
        phone,
      };
      
      setBooking(newBooking);
      setConfirmation(bookingId);
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <section id="sanctuary" className="bg-theme-sanctuary text-[#2B2421] py-28 px-6 sm:px-8 lg:px-12 w-full transition-colors duration-700 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-300 text-teal-800 text-xs font-mono font-bold tracking-widest uppercase mb-3 shadow-2xs">
            <span>🛋️</span>
            <span>SANCTUARY &amp; ATMOSPHERE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2B2421] mb-4 tracking-tight">
            Reserve Your Sanctuary
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
            Choose your preferred corner on our live floor plan—from sunlit window canopies to the intimate Slayer espresso bar.
          </p>
        </div>

        {/* PART 1: Visual Atmosphere Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="md:col-span-2 h-72 sm:h-80 glass-card p-0 overflow-hidden group relative shadow-md border-amber-200/60">
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80" 
              alt="The Slayer Espresso Bar"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest mb-1 block font-bold">Zone 01 · Hand Pour Bar</span>
              <h3 className="text-2xl font-serif font-bold">The Slayer Espresso Bar</h3>
              <p className="text-xs text-white/80 font-light mt-1">Direct front-row seating to specialty extraction</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="h-[148px] glass-card p-0 overflow-hidden group relative shadow-sm border-teal-200/60">
              <img 
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80" 
                alt="Sunlit Window Canopy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 text-white">
                <h4 className="text-base font-serif font-bold">Sunlit Window Canopy</h4>
                <span className="text-[10px] font-mono text-teal-300">Natural morning sun</span>
              </div>
            </div>

            <div className="h-[148px] glass-card p-0 overflow-hidden group relative shadow-sm border-emerald-200/60">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" 
                alt="Terrazzo Oak Courtyard"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 text-white">
                <h4 className="text-base font-serif font-bold">Terrazzo Courtyard</h4>
                <span className="text-[10px] font-mono text-emerald-300">Breezy outdoor terrace</span>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: Interactive Live Floor Map & Instant Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Floor Map */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 relative overflow-hidden border-teal-200/60 shadow-md">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-800">Interactive Floor Plan</h3>
                <p className="text-xs text-slate-500">Tap any available green table to select your spot</p>
              </div>

              {/* Status Legend */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs"></div>
                  <span className="text-slate-600 font-medium">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-300 shadow-xs"></div>
                  <span className="text-slate-900 font-bold">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400 opacity-60"></div>
                  <span className="text-slate-400">Reserved</span>
                </div>
              </div>
            </div>

            {/* Map Canvas */}
            <div className="relative h-[420px] w-full bg-slate-900/5 rounded-2xl border border-slate-300/70 overflow-hidden shadow-inner">
              {/* Floor Plan Zone Labels */}
              <div className="absolute top-4 left-4 text-[10px] font-mono font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-md border shadow-2xs uppercase">
                ☕ Espresso Bar
              </div>
              <div className="absolute bottom-4 left-4 text-[10px] font-mono font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-md border shadow-2xs uppercase">
                🛋️ Velvet Lounge
              </div>
              <div className="absolute top-4 right-4 text-[10px] font-mono font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-md border shadow-2xs uppercase">
                🌿 Garden Terrace
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-md border shadow-2xs uppercase">
                🏭 Roastery View
              </div>

              {/* Table Marker Buttons */}
              {TABLES.map(table => {
                const isSelected = selectedTableId === table.id;
                const isReserved = table.status === 'reserved';
                
                let markerBg = 'bg-emerald-500 hover:bg-emerald-600 text-white';
                if (isSelected) {
                  markerBg = 'bg-amber-500 text-slate-950 ring-4 ring-amber-300 shadow-lg scale-110';
                } else if (isReserved) {
                  markerBg = 'bg-rose-300 text-rose-800 opacity-60 cursor-not-allowed';
                }

                return (
                  <button
                    key={table.id}
                    disabled={isReserved}
                    onClick={() => setSelectedTableId(table.id)}
                    className={`absolute flex items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-300 shadow-sm ${markerBg}`}
                    style={{ 
                      left: `${table.x}%`, 
                      top: `${table.y}%`,
                      width: table.seats > 2 ? '46px' : '38px',
                      height: table.seats > 2 ? '46px' : '38px',
                      transform: 'translate(-50%, -50%)',
                      cursor: isReserved ? 'not-allowed' : 'pointer'
                    }}
                    title={`${table.id} (${table.seats} Seats) - ${table.view}`}
                  >
                    <span>{table.id}</span>
                  </button>
                );
              })}
            </div>

            {/* Currently Selected Table Info Pill */}
            <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest block">
                  SELECTED: TABLE {selectedTable.id} &middot; {selectedTable.zone.toUpperCase()} ZONE
                </span>
                <p className="text-xs text-slate-700 font-medium mt-0.5">{selectedTable.view}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-200/70 text-amber-900 text-xs font-mono font-bold w-max">
                Up to {selectedTable.seats} Guests
              </span>
            </div>
          </div>

          {/* Right Column: User-Friendly Reservation Form */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 border-amber-200/60 shadow-md">
            {confirmation ? (
              <div className="text-center flex flex-col items-center py-4 animate-fade-in-up">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 shadow-sm border border-emerald-200">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-[#2B2421] mb-1 font-bold">Sanctuary Reserved!</h3>
                <p className="text-slate-600 mb-6 font-light text-xs">We have reserved Table {selectedTableId} for {name}.</p>
                
                <div className="bg-white p-5 rounded-2xl border border-slate-200 w-full mb-6 shadow-sm space-y-2 text-xs font-mono">
                  <div className="flex justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500 font-semibold">BOOKING TOKEN</span>
                    <span className="text-amber-700 font-bold">{confirmation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">TABLE</span>
                    <span className="text-slate-800 font-bold">Table {selectedTableId} ({selectedTable.zone})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DATE &amp; TIME</span>
                    <span className="text-slate-800 font-bold">{date}, {time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">PARTY SIZE</span>
                    <span className="text-slate-800 font-bold">{partySize} Guests</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 w-full">
                  <a
                    href={`https://wa.me/919352457597?text=Hello%20Kinetics%20Caffe,%20I%20have%20booked%20Table%20${selectedTableId}%20with%20Token%20${confirmation}%20for%20${name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile w-full py-3 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Receive Confirmation on WhatsApp</span>
                  </a>
                  
                  <button 
                    onClick={() => {
                      setConfirmation(null);
                      setName('');
                      setPhone('');
                    }}
                    className="btn-tactile w-full py-3 rounded-full border border-slate-300 text-slate-700 font-semibold text-xs uppercase tracking-wider hover:bg-slate-100 cursor-pointer"
                  >
                    Book Another Table
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="flex flex-col gap-5">
                <div>
                  <h3 className="text-2xl font-serif text-[#2B2421] font-bold">Table Reservation</h3>
                  <p className="text-slate-500 text-xs font-light mt-0.5">Instant booking confirmation with zero reservation fees.</p>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="text-xs font-mono text-slate-700 font-bold uppercase mb-2 block">
                    1. Select Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {DATES.map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDate(d)}
                        className={`py-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                          date === d 
                            ? 'bg-amber-600 border-amber-600 text-white font-bold shadow-xs' 
                            : 'bg-white/80 border-slate-200 text-slate-600 hover:border-amber-400'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="text-xs font-mono text-slate-700 font-bold uppercase mb-2 block">
                    2. Select Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`py-2 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                          time === t 
                            ? 'bg-amber-600 border-amber-600 text-white font-bold shadow-xs' 
                            : 'bg-white/80 border-slate-200 text-slate-600 hover:border-amber-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <label className="text-xs font-mono text-slate-700 font-bold uppercase mb-2 block">
                    3. Party Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {PARTY_SIZES.map(p => (
                      <button
                        key={p.count}
                        type="button"
                        onClick={() => setPartySize(p.count)}
                        className={`py-2 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                          partySize === p.count 
                            ? 'bg-amber-600 border-amber-600 text-white font-bold shadow-xs' 
                            : 'bg-white/80 border-slate-200 text-slate-600 hover:border-amber-400'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-xs font-mono text-slate-700 font-semibold uppercase mb-1.5 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-amber-600 shadow-2xs"
                      placeholder="e.g. Nilesh Rajani"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-700 font-semibold uppercase mb-1.5 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 text-xs focus:outline-none focus:border-amber-600 shadow-2xs"
                      placeholder="+91 93524 57597"
                    />
                  </div>
                </div>

                {/* Confirmation Button */}
                <button
                  type="submit"
                  disabled={!selectedTableId || !name || !phone || isSubmitting}
                  className={`btn-tactile w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all border cursor-pointer shadow-sm mt-1 ${
                    !selectedTableId || !name || !phone 
                      ? 'bg-slate-200 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-600 to-rose-600 border-transparent text-white hover:brightness-105'
                  }`}
                >
                  {isSubmitting 
                    ? 'Confirming Sanctuary...' 
                    : `Confirm Table ${selectedTableId} · ${date}, ${time}`
                  }
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}