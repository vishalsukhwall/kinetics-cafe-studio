'use client';

import React, { useState } from 'react';
import { useSceneStore, TableBooking } from '@/store/useSceneStore';

const TABLES = [
  { id: 'B1', zone: 'bar', x: 20, y: 30, seats: 2, status: 'available' },
  { id: 'B2', zone: 'bar', x: 20, y: 50, seats: 2, status: 'available' },
  { id: 'B3', zone: 'bar', x: 20, y: 70, seats: 2, status: 'reserved' },
  { id: 'B4', zone: 'bar', x: 40, y: 40, seats: 2, status: 'available' },
  { id: 'L1', zone: 'lounge', x: 60, y: 30, seats: 4, status: 'available' },
  { id: 'L2', zone: 'lounge', x: 60, y: 70, seats: 4, status: 'available' },
  { id: 'L3', zone: 'lounge', x: 80, y: 50, seats: 6, status: 'reserved' },
  { id: 'W1', zone: 'window', x: 30, y: 15, seats: 2, status: 'available' },
  { id: 'W2', zone: 'window', x: 70, y: 15, seats: 2, status: 'available' },
  { id: 'T1', zone: 'terrace', x: 85, y: 25, seats: 4, status: 'available' },
  { id: 'T2', zone: 'terrace', x: 85, y: 75, seats: 4, status: 'available' }
];

const DATES = ['Today', 'Tomorrow', 'Weekend'];
const TIME_SLOTS = ['8:30 AM', '11:00 AM', '2:30 PM', '5:00 PM', '7:30 PM', '9:00 PM'];
const PARTY_SIZES = [1, 2, 4, 6];

export default function SanctuarySection() {
  const setBooking = useSceneStore((state) => state.setBooking);
  
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [date, setDate] = useState(DATES[0]);
  const [time, setTime] = useState(TIME_SLOTS[1]);
  const [partySize, setPartySize] = useState(PARTY_SIZES[1]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable || !name || !phone) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const bookingId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
      const tableObj = TABLES.find(t => t.id === selectedTable);
      
      const newBooking: TableBooking = {
        tableId: selectedTable,
        tableName: `Table ${selectedTable}`,
        zone: tableObj ? tableObj.zone.toUpperCase() : 'MAIN',
        date,
        timeSlot: time,
        guests: partySize,
        guestName: name,
        phone,
      };
      
      setBooking(newBooking);
      setConfirmation(bookingId);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section id="sanctuary" className="bg-theme-sanctuary py-32 px-6 sm:px-8 lg:px-12 w-full transition-colors duration-700">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-[11px] font-mono text-terracotta tracking-[0.2em] uppercase block mb-4 font-medium">
            04 &middot; SANCTUARY &amp; ATMOSPHERE
          </span>
          <h2 className="text-5xl sm:text-6xl font-serif text-espresso mb-6">Our Space</h2>
          <p className="text-espresso/70 text-lg max-w-2xl font-light">
            Experience the flagship sanctuary. A multi-sensory environment designed to elevate your coffee journey, featuring organic textures, soft warm paper hues, and dedicated slow brew bars.
          </p>
        </div>

        {/* PART 1: Immersive Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <div className="lg:col-span-2 h-80 glass-card p-0 overflow-hidden group relative transition-colors duration-500">
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80" 
              alt="The Slayer Espresso Bar"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/20 to-transparent opacity-90"></div>
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] font-mono text-espresso/60 uppercase tracking-wider mb-2 block font-medium">Zone 01</span>
              <h3 className="text-2xl font-serif text-espresso">The Slayer Espresso Bar</h3>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="h-[152px] glass-card p-0 overflow-hidden group relative">
              <img 
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80" 
                alt="Sunlit Window Canopy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/20 to-transparent opacity-90"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-serif text-espresso">Sunlit Canopy</h3>
              </div>
            </div>
            <div className="h-[152px] glass-card p-0 overflow-hidden group relative">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" 
                alt="Terrazzo Oak Garden"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/20 to-transparent opacity-90"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-serif text-espresso">Terrazzo Garden</h3>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: Table Reservation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          
          {/* Floor Map */}
          <div className="lg:col-span-7 glass-card p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoNDMsIDM2LCAzMywgMC4xNSkiLz48L3N2Zz4=')] opacity-50"></div>
            
            <div className="relative h-[450px] w-full bg-white/40 rounded-2xl border border-border mb-6 backdrop-blur-md">
              {/* Zones */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-espresso/50 font-bold uppercase">Espresso Bar</div>
              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-espresso/50 font-bold uppercase">Lounge</div>
              <div className="absolute top-4 right-4 text-[10px] font-mono text-espresso/50 font-bold uppercase">Terrace</div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-espresso/50 font-bold uppercase">Roastery View</div>

              {/* Tables */}
              {TABLES.map(table => {
                const isSelected = selectedTable === table.id;
                const isReserved = table.status === 'reserved';
                
                let bgColor = 'bg-white/80';
                let borderColor = 'border-border';
                let textColor = 'text-espresso/60';
                
                if (isSelected) {
                  bgColor = 'bg-terracotta';
                  borderColor = 'border-terracotta';
                  textColor = 'text-white';
                } else if (isReserved) {
                  bgColor = 'bg-espresso/10';
                  borderColor = 'border-border/50';
                  textColor = 'text-espresso/30';
                }

                return (
                  <button
                    key={table.id}
                    disabled={isReserved}
                    onClick={() => setSelectedTable(table.id)}
                    className={`absolute flex items-center justify-center rounded-full transition-all duration-300 ${bgColor} border ${borderColor} ${
                      !isReserved && !isSelected ? 'hover:border-terracotta/50 hover:bg-white' : ''
                    } ${isSelected ? 'shadow-sm' : ''} ${textColor} ${isReserved ? 'opacity-50' : ''}`}
                    style={{ 
                      left: `${table.x}%`, 
                      top: `${table.y}%`,
                      width: table.seats > 2 ? '48px' : '36px',
                      height: table.seats > 2 ? '48px' : '36px',
                      transform: 'translate(-50%, -50%)',
                      cursor: isReserved ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <span className="text-[10px] font-mono font-medium">{table.id}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="flex gap-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white border border-border"></div>
                <span className="text-xs font-mono text-espresso/60 font-medium">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-terracotta border border-terracotta"></div>
                <span className="text-xs font-mono text-espresso/60 font-medium">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-espresso/10 border border-border/50 opacity-50"></div>
                <span className="text-xs font-mono text-espresso/60 font-medium">Reserved</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {confirmation ? (
              <div className="glass-card p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mb-6 border border-border">
                  <svg className="w-8 h-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-espresso mb-2 font-bold">Sanctuary Secured</h3>
                <p className="text-espresso/70 mb-8 font-light">We look forward to hosting you, {name}.</p>
                <div className="bg-white/50 p-6 rounded-xl border border-border w-full mb-8 backdrop-blur-md">
                  <div className="flex justify-between mb-4 border-b border-border pb-4">
                    <span className="font-mono text-espresso/50 text-sm font-medium">TOKEN</span>
                    <span className="font-mono text-terracotta text-sm font-bold">{confirmation}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-espresso/50 text-xs font-medium">TABLE</span>
                    <span className="font-mono text-espresso text-xs font-bold">{selectedTable}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-espresso/50 text-xs font-medium">TIME</span>
                    <span className="font-mono text-espresso text-xs font-bold">{date}, {time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-espresso/50 text-xs font-medium">GUESTS</span>
                    <span className="font-mono text-espresso text-xs font-bold">{partySize}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setConfirmation(null);
                    setSelectedTable(null);
                    setName('');
                    setPhone('');
                  }}
                  className="btn-tactile w-full py-3 rounded-xl border border-border text-espresso font-medium text-sm transition-all hover:bg-white/50"
                >
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="flex flex-col gap-6">
                <div>
                  <h3 className="text-3xl font-serif text-espresso mb-2 font-bold">Reserve a Table</h3>
                  <p className="text-espresso/60 text-sm font-light">Select your preferred setting in our immersive space.</p>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono text-espresso/70 font-medium uppercase mb-3">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Date
                  </label>
                  <div className="flex gap-3">
                    {DATES.map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDate(d)}
                        className={`flex-1 py-2.5 rounded-xl text-sm transition-all border font-medium ${
                          date === d 
                            ? 'bg-white border-terracotta text-espresso shadow-sm' 
                            : 'bg-transparent border-border text-espresso/60 hover:border-terracotta/50 hover:bg-white/50'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono text-espresso/70 font-medium uppercase mb-3">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Time
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {TIME_SLOTS.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`py-2 rounded-xl text-sm font-mono transition-all border font-medium ${
                          time === t 
                            ? 'bg-white border-terracotta text-espresso shadow-sm' 
                            : 'bg-transparent border-border text-espresso/60 hover:border-terracotta/50 hover:bg-white/50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono text-espresso/70 font-medium uppercase mb-3">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4-4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Party Size
                  </label>
                  <div className="flex gap-3">
                    {PARTY_SIZES.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setPartySize(s)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-mono transition-all border font-medium ${
                          partySize === s 
                            ? 'bg-white border-terracotta text-espresso shadow-sm' 
                            : 'bg-transparent border-border text-espresso/60 hover:border-terracotta/50 hover:bg-white/50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-mono text-espresso/70 font-medium uppercase mb-3">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/50 border border-border rounded-xl px-4 py-2.5 text-espresso text-sm focus:outline-none focus:border-terracotta focus:bg-white transition-colors backdrop-blur-sm"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-mono text-espresso/70 font-medium uppercase mb-3">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/50 border border-border rounded-xl px-4 py-2.5 text-espresso text-sm focus:outline-none focus:border-terracotta focus:bg-white transition-colors backdrop-blur-sm"
                      placeholder="+91..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedTable || !name || !phone || isSubmitting}
                  className={`btn-tactile w-full py-4 rounded-xl font-medium text-sm transition-all mt-4 border ${
                    !selectedTable || !name || !phone 
                      ? 'bg-espresso/5 border-border/50 text-espresso/30 cursor-not-allowed'
                      : 'bg-espresso border-espresso text-paper hover:bg-espresso/90 shadow-sm'
                  }`}
                >
                  {isSubmitting 
                    ? 'Confirming...' 
                    : !selectedTable 
                      ? 'Select a Table on Map' 
                      : `Confirm Table ${selectedTable} \u2014 ${date}, ${time}`
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
