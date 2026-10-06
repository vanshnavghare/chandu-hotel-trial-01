import React, { useState } from 'react';
import { HOTEL_INFO } from '../data/menuData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Navigation,
  Share2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Dining Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="text-xs uppercase font-bold tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block">
          Reach Out to Us
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Contact Chandu Hotel
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Have a question about party bookings, catering, or today's tandoori specials? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Info Cards & Hours (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Address Card */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-stone-900">Our Location</h3>
                <p className="text-xs text-stone-500">Highway Dining Landmark</p>
              </div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              {HOTEL_INFO.address}
            </p>
            <div className="pt-1">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(HOTEL_INFO.name + ' ' + HOTEL_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Phone & WhatsApp Card */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-stone-900">Phone & WhatsApp</h3>
                <p className="text-xs text-stone-500">Direct Kitchen & Reception Line</p>
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-stone-500">Primary Mobile:</span>
                <a href={`tel:${HOTEL_INFO.phone}`} className="font-bold text-stone-900 hover:text-amber-700">
                  {HOTEL_INFO.phone}
                </a>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-stone-500">Secondary Mobile:</span>
                <a href={`tel:${HOTEL_INFO.secondaryPhone}`} className="font-bold text-stone-900 hover:text-amber-700">
                  {HOTEL_INFO.secondaryPhone}
                </a>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-stone-500">Reception Landline:</span>
                <span className="font-semibold text-stone-800">{HOTEL_INFO.landline}</span>
              </div>

              <div className="pt-1">
                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=Namaste%20Chandu%20Hotel,%20I%20have%20an%20inquiry:`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Timings */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-stone-900">Opening Hours</h3>
                <p className="text-xs text-stone-500">{HOTEL_INFO.timings.days}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Interactive Message & Feedback Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">Message Received!</h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                Thank you, {name}. Our guest relations team will respond to {phone} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  Send Us a Message
                </h3>
                <p className="text-xs text-stone-500">
                  For banquet inquiries, outdoor catering, or customized party platters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Meera Joshi"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-phone-input"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98234 00000"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Email Address (Optional)
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. meera@gmail.com"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Topic of Inquiry
                  </label>
                  <select
                    id="contact-topic-select"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="General Dining Inquiry">General Dining Inquiry</option>
                    <option value="Bulk / Party Platter Catering">Bulk / Party Platter Catering</option>
                    <option value="Hall Booking for Event">Hall Booking for Event</option>
                    <option value="Chef Feedback / Suggestion">Chef Feedback / Suggestion</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Message / Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message-input"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can assist you..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
