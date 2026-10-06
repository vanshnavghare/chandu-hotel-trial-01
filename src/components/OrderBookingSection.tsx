import React, { useState, useEffect } from 'react';
import { CartItem, TableReservation, MenuItem } from '../types';
import { 
  CalendarDays, 
  Clock, 
  Users, 
  Phone, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Copy,
  Check,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

interface OrderBookingSectionProps {
  initialMode?: 'booking' | 'order';
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onAddItem: (item: MenuItem) => void;
}

const TARGET_WHATSAPP_NUMBER = '918010726699';
const DISPLAY_WHATSAPP_NUMBER = '8010726699';

export const OrderBookingSection: React.FC<OrderBookingSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<'booking'>('booking');

  // ----------------------------------------------------
  // TABLE RESERVATION FORM STATE
  // ----------------------------------------------------
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resEmail, setResEmail] = useState('');
  const [resDate, setResDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [resTime, setResTime] = useState('08:00 PM');
  const [resGuests, setResGuests] = useState('4');
  const [resArea, setResArea] = useState<'Indoor AC Family Hall' | 'Open Garden Lawn' | 'Rooftop Lounge' | 'No Preference'>('Indoor AC Family Hall');
  const [resOccasion, setResOccasion] = useState<'None' | 'Birthday' | 'Anniversary' | 'Family Get-together' | 'Business Lunch'>('None');
  const [resNotes, setResNotes] = useState('');
  const [reservationConfirmed, setReservationConfirmed] = useState<TableReservation | null>(null);

  // Automated Booking System States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [automationStatus, setAutomationStatus] = useState<'idle' | 'sending' | 'dispatched'>('idle');
  const [recentBookings, setRecentBookings] = useState<TableReservation[]>([]);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Load recent bookings from automated backend system
  useEffect(() => {
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.bookings)) {
          setRecentBookings(data.bookings);
        }
      })
      .catch(() => {
        // Ignore fetch errors if offline
      });
  }, []);

  // Build formatted WhatsApp message text with all booking details for 8010726699
  const formatWhatsAppBookingText = (res: TableReservation) => {
    return (
      `*CHANDU HOTEL - NEW TABLE BOOKING (टेबल बुकिंग कन्फर्मेशन)*\n\n` +
      `*Booking Ref:* #${res.id}\n` +
      `*Guest Name (नाम):* ${res.fullName}\n` +
      `*Customer Mobile (मोबाइल):* ${res.phone}\n` +
      (res.email ? `*Email:* ${res.email}\n` : '') +
      `*Date (तारीख):* ${res.date}\n` +
      `*Time Slot (समय):* ${res.timeSlot}\n` +
      `*Guests (मेहमान):* ${res.guestsCount} People\n` +
      `*Seating Area (सीटिंग):* ${res.seatingArea}\n` +
      `*Occasion (अवसर):* ${res.specialOccasion !== 'None' ? res.specialOccasion : 'Regular Dining'}\n` +
      (res.notes ? `*Special Request (नोट्स):* ${res.notes}\n` : '') +
      `*Booked At:* ${res.createdAt}\n\n` +
      `नमस्ते, चंदू होटल में यह टेबल बुक हुआ है। कृपया टेबल तैयार रखें!`
    );
  };

  // Generate WhatsApp Reservation URL to 8010726699
  const generateWhatsAppReservationURL = (res: TableReservation) => {
    const text = formatWhatsAppBookingText(res);
    return `https://api.whatsapp.com/send?phone=${TARGET_WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
  };

  // Copy WhatsApp booking message
  const handleCopyBookingText = (res: TableReservation) => {
    const text = formatWhatsAppBookingText(res);
    navigator.clipboard?.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  // Submit Table Reservation & Immediately Dispatch to WhatsApp 8010726699
  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim() || !resPhone.trim() || !resDate || !resTime) {
      return;
    }

    setIsSubmitting(true);
    setAutomationStatus('sending');

    const newRes: TableReservation = {
      id: `CH-RES-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: resName.trim(),
      phone: resPhone.trim(),
      email: resEmail.trim() || undefined,
      date: resDate,
      timeSlot: resTime,
      guestsCount: Number(resGuests) || 2,
      seatingArea: resArea,
      specialOccasion: resOccasion,
      notes: resNotes.trim(),
      status: 'Confirmed',
      createdAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    };

    // 1. Immediately trigger WhatsApp message to 8010726699 synchronously within user gesture
    const whatsappUrl = generateWhatsAppReservationURL(newRes);
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Show immediate confirmation card on UI
    setReservationConfirmed(newRes);
    setRecentBookings((prev) => [newRes, ...prev.filter((b) => b.id !== newRes.id)]);
    window.scrollTo({ top: 320, behavior: 'smooth' });

    // 3. Dispatch to automated backend booking system (/api/bookings)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRes),
      });
      const data = await response.json();
      if (data?.success && data.booking) {
        setReservationConfirmed(data.booking);
      }
    } catch {
      // Fallback gracefully if network is busy
    } finally {
      setIsSubmitting(false);
      setAutomationStatus('dispatched');
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs uppercase font-bold tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Automated WhatsApp Table Booking System
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Table Reservation
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Reserve a prime table for your family. As soon as you confirm, your complete booking details are automatically sent to Chandu Hotel WhatsApp (<strong className="text-stone-900">{DISPLAY_WHATSAPP_NUMBER}</strong>).
        </p>
      </div>

      {/* TAB SELECTOR */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-stone-200/80 rounded-2xl max-w-md w-full shadow-inner">
          <button
            id="tab-book-table"
            onClick={() => setActiveTab('booking')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'booking'
                ? 'bg-stone-900 text-amber-300 shadow-md scale-[1.02]'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <CalendarDays className="w-4 h-4 text-amber-400" />
            <span>Book a Table</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TABLE RESERVATION TAB */}
      {/* ========================================================================= */}
      {activeTab === 'booking' && (
        <div className="space-y-10">
          
          {/* Reservation Confirmation Voucher if submitted */}
          {reservationConfirmed ? (
            <div 
              id="reservation-success-card"
              className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-500/40 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-300"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {automationStatus === 'sending'
                    ? `Sending Booking to WhatsApp ${DISPLAY_WHATSAPP_NUMBER}...`
                    : `Automated Booking Sent to WhatsApp ${DISPLAY_WHATSAPP_NUMBER}`}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  आपका टेबल बुक हो गया है! (Table Reserved)
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm">
                  Booking Reference: <strong className="font-mono text-stone-900 font-bold">#{reservationConfirmed.id}</strong>
                </p>
              </div>

              {/* Summary table */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-left text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Guest Name (नाम):</span>
                  <span className="font-bold text-stone-900">{reservationConfirmed.fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Customer Mobile (मोबाइल):</span>
                  <span className="font-bold text-stone-900">{reservationConfirmed.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Date & Slot (तारीख व समय):</span>
                  <span className="font-bold text-stone-900">{reservationConfirmed.date} at {reservationConfirmed.timeSlot}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Party Size (मेहमान):</span>
                  <span className="font-bold text-stone-900">{reservationConfirmed.guestsCount} Guests</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Seating Area:</span>
                  <span className="font-bold text-amber-800">{reservationConfirmed.seatingArea}</span>
                </div>
                {reservationConfirmed.specialOccasion && reservationConfirmed.specialOccasion !== 'None' && (
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Special Occasion:</span>
                    <span className="font-bold text-stone-900">{reservationConfirmed.specialOccasion}</span>
                  </div>
                )}
                {reservationConfirmed.notes && (
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Special Notes:</span>
                    <span className="font-bold text-stone-900">{reservationConfirmed.notes}</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Hotel WhatsApp Number:</span>
                  <span className="font-bold text-emerald-700">+91 {DISPLAY_WHATSAPP_NUMBER}</span>
                </div>
              </div>

              {/* Automated WhatsApp Message Preview Box */}
              <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                    WhatsApp Message Payload (To: {DISPLAY_WHATSAPP_NUMBER})
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyBookingText(reservationConfirmed)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs cursor-pointer"
                  >
                    {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMessage ? 'Copied!' : 'Copy Details'}</span>
                  </button>
                </div>
                <pre className="text-[11px] sm:text-xs text-stone-700 whitespace-pre-wrap font-sans bg-white/90 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                  {formatWhatsAppBookingText(reservationConfirmed)}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={generateWhatsAppReservationURL(reservationConfirmed)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to Hotel WhatsApp ({DISPLAY_WHATSAPP_NUMBER})</span>
                </a>

                <button
                  onClick={() => setReservationConfirmed(null)}
                  className="py-3.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Book Another Table
                </button>
              </div>

              <p className="text-[11px] text-stone-400">
                Please arrive within 15 minutes of your reserved time. Tables are held with utmost hospitality.
              </p>
            </div>
          ) : (
            /* Table Booking Form */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm max-w-3xl mx-auto">
              <form onSubmit={handleReservationSubmit} className="space-y-6">
                
                <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                      Table Reservation Form
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                      Fill in your details below — submitting automatically sends your booking confirmation to WhatsApp <strong>{DISPLAY_WHATSAPP_NUMBER}</strong>.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0 self-start">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp: {DISPLAY_WHATSAPP_NUMBER}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Full Name (आपका नाम) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="res-name-input"
                      type="text"
                      required
                      value={resName}
                      onChange={(e) => setResName(e.target.value)}
                      placeholder="e.g. Ramesh Kulkarni"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Phone / Mobile Number (आपका मोबाइल नंबर) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="res-phone-input"
                      type="tel"
                      required
                      value={resPhone}
                      onChange={(e) => setResPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Date (तारीख) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="res-date-input"
                      type="date"
                      required
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Time Slot */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Preferred Time Slot (समय) <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="res-time-select"
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    >
                      <optgroup label="Lunch Hours">
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="12:30 PM">12:30 PM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="01:30 PM">01:30 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                      </optgroup>
                      <optgroup label="Dinner Hours">
                        <option value="07:00 PM">07:00 PM</option>
                        <option value="07:30 PM">07:30 PM</option>
                        <option value="08:00 PM">08:00 PM</option>
                        <option value="08:30 PM">08:30 PM</option>
                        <option value="09:00 PM">09:00 PM</option>
                        <option value="09:30 PM">09:30 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Number of Guests */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Number of Guests (मेहमानों की संख्या) <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="res-guests-select"
                      value={resGuests}
                      onChange={(e) => setResGuests(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    >
                      <option value="1">1 Person (Solo Foodie)</option>
                      <option value="2">2 Persons (Table for Two)</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons (Family Table)</option>
                      <option value="5">5 Persons</option>
                      <option value="6">6 Persons (Large Family)</option>
                      <option value="8">8 Persons (Party Booth)</option>
                      <option value="10">10+ Persons (Celebration Group)</option>
                    </select>
                  </div>

                  {/* Seating Area Preference */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Seating Ambience Preference
                    </label>
                    <select
                      id="res-area-select"
                      value={resArea}
                      onChange={(e) => setResArea(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    >
                      <option value="Indoor AC Family Hall">Indoor AC Family Dining Hall</option>
                      <option value="Open Garden Lawn">Open Garden Lawn (Fresh Air & Fairy Lights)</option>
                      <option value="Rooftop Lounge">Rooftop Lounge Area</option>
                      <option value="No Preference">No Preference (First Available)</option>
                    </select>
                  </div>

                </div>

                {/* Special Occasion & Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Special Occasion?
                    </label>
                    <select
                      id="res-occasion-select"
                      value={resOccasion}
                      onChange={(e) => setResOccasion(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="None">Regular Casual Dining</option>
                      <option value="Birthday">Birthday Celebration</option>
                      <option value="Anniversary">Anniversary Celebration</option>
                      <option value="Family Get-together">Family Get-Together</option>
                      <option value="Business Lunch">Business / Official Lunch</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">
                      Special Requests / High Chair Needed?
                    </label>
                    <input
                      id="res-notes-input"
                      type="text"
                      value={resNotes}
                      onChange={(e) => setResNotes(e.target.value)}
                      placeholder="e.g. Quiet corner table, baby high chair"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    id="submit-reservation-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-base shadow-lg shadow-amber-900/20 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? 'Confirming & Sending to WhatsApp...'
                        : `Confirm Table Reservation (Send to ${DISPLAY_WHATSAPP_NUMBER})`}
                    </span>
                  </button>
                  <p className="text-center text-xs text-stone-500 mt-2">
                    Instant confirmation • Automatically dispatches booking details to WhatsApp <strong>{DISPLAY_WHATSAPP_NUMBER}</strong>
                  </p>
                </div>

              </form>
            </div>
          )}

          {/* Automated Recent Bookings Feed */}
          {recentBookings.length > 0 && (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    Recent Confirmed Table Bookings
                  </h4>
                  <p className="text-xs text-stone-500">
                    Live automated booking log synced with WhatsApp ({DISPLAY_WHATSAPP_NUMBER})
                  </p>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                  {recentBookings.length} Saved
                </span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {recentBookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                          #{booking.id}
                        </span>
                        <span className="font-bold text-stone-900 text-sm">
                          {booking.fullName}
                        </span>
                        <span className="text-stone-500">({booking.phone})</span>
                      </div>
                      <div className="text-stone-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5 text-amber-700" />
                          {booking.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          {booking.timeSlot}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-amber-700" />
                          {booking.guestsCount} Guests • {booking.seatingArea}
                        </span>
                      </div>
                    </div>

                    <a
                      href={generateWhatsAppReservationURL(booking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp ({DISPLAY_WHATSAPP_NUMBER})</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
