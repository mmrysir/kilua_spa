"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, User, Phone, MessageSquare, Leaf, DollarSign } from "lucide-react";
import { MenuItem } from "@/data/menu";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: MenuItem | null;
}

// Kilua Spa WhatsApp Number (Zanzibar/Tanzania country code +255 is common for tropical wellness)
const SPA_WHATSAPP_NUMBER = "255776583434"; // Easily modifiable by the owner

export default function BookingModal({ isOpen, onClose, selectedItem }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedOption, setSelectedOption] = useState<{ label: string; price: number } | null>(null);

  // Initialize/reset selected option when item changes
  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.priceOptions && selectedItem.priceOptions.length > 0) {
        setSelectedOption(selectedItem.priceOptions[0]);
      } else {
        setSelectedOption(null);
      }
    }
  }, [selectedItem]);

  if (!isOpen || !selectedItem) return null;

  const currentPrice = selectedOption ? selectedOption.price : selectedItem.price;
  const currentDuration = selectedOption ? selectedOption.label : selectedItem.duration;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Context & Text formatting
    const serviceDetails = selectedOption 
      ? `${selectedItem.name} (${selectedOption.label})` 
      : `${selectedItem.name}${selectedItem.duration ? ` (${selectedItem.duration})` : ""}`;

    const message = 
`*Kilua Spa & Massage*
Malika Nungwi Hotel, Nungwi, Zanzibar

---
NEW BOOKING REQUEST
---

Client Name: ${name}
Contact Number: ${phone}

Selected Treatment: ${serviceDetails}
Price: $${currentPrice}

Preferred Date: ${date}
Preferred Time: ${time}

${notes ? `Special Requests / Notes:\n${notes}\n` : ""}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SPA_WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Redirect
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-lg max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto bg-white sm:rounded-2xl rounded-t-3xl shadow-2xl animate-slide-up sm:animate-scale-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#C5A059]/40 via-[#C5A059] to-[#C5A059]/40 rounded-t-3xl sm:rounded-t-2xl shrink-0" />

        {/* Mobile drag handle */}
        <div className="flex justify-center pt-2 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#2C3230]/15" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute p-2 transition-colors duration-200 rounded-full right-4 top-4 text-[#2C3230]/50 hover:text-[#C5A059] hover:bg-[#FDFBF7] z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="px-5 pt-3 pb-3 text-center shrink-0">
          <div className="inline-flex items-center justify-center p-2 mb-2 bg-[#FDFBF7] rounded-full text-[#C5A059]">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-[#2C3230]">Book Your Serenity</h3>
          <p className="mt-0.5 text-xs text-[#2C3230]/55">
            Details go directly to our reservation desk via WhatsApp.
          </p>
        </div>

        {/* Service Details Card */}
        <div className="px-5 pb-3 shrink-0">
          <div className="px-4 py-3 border rounded-xl bg-[#FDFBF7] border-[#C5A059]/10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A059]">
                  Selected Treatment
                </span>
                <h4 className="mt-0.5 font-serif font-medium text-[#2C3230] text-sm leading-snug">
                  {selectedItem.name}
                </h4>
                {selectedItem.description && (
                  <p className="mt-1 text-[11px] text-[#2C3230]/55 line-clamp-1">
                    {selectedItem.description}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="font-serif text-lg font-bold text-[#C5A059]">
                  ${currentPrice}
                </span>
                {currentDuration && (
                  <div className="text-[10px] text-[#2C3230]/50 font-medium">{currentDuration}</div>
                )}
              </div>
            </div>

            {/* Duration options */}
            {selectedItem.priceOptions && selectedItem.priceOptions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[#C5A059]/10">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#2C3230]/60 block mb-2">
                  Choose Duration
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.priceOptions.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedOption(opt)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                        selectedOption?.label === opt.label
                          ? "bg-[#C5A059] text-white border-transparent shadow-sm"
                          : "bg-white text-[#2C3230] border-[#C5A059]/20 hover:border-[#C5A059]"
                      }`}
                    >
                      {opt.label} — ${opt.price}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="px-5 pb-6 space-y-3 flex-1">
          {/* Name + Phone stacked on mobile, side-by-side sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="bm-name" className="block text-[11px] font-semibold text-[#2C3230]/75 uppercase tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/35">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="bm-name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 text-sm bg-white border border-[#C5A059]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="bm-phone" className="block text-[11px] font-semibold text-[#2C3230]/75 uppercase tracking-wide">
                WhatsApp Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/35">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  id="bm-phone"
                  type="tel"
                  required
                  placeholder="+255 776 583 434"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 text-sm bg-white border border-[#C5A059]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Date + Time always side-by-side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="bm-date" className="block text-[11px] font-semibold text-[#2C3230]/75 uppercase tracking-wide">
                Date
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/35">
                  <Calendar className="w-4 h-4" />
                </span>
                <input
                  id="bm-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-2 py-3 text-sm bg-white border border-[#C5A059]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="bm-time" className="block text-[11px] font-semibold text-[#2C3230]/75 uppercase tracking-wide">
                Time
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/35">
                  <Clock className="w-4 h-4" />
                </span>
                <input
                  id="bm-time"
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-9 pr-2 py-3 text-sm bg-white border border-[#C5A059]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label htmlFor="bm-notes" className="block text-[11px] font-semibold text-[#2C3230]/75 uppercase tracking-wide">
              Special Requests <span className="normal-case font-normal text-[#2C3230]/45">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-[#2C3230]/35">
                <MessageSquare className="w-4 h-4" />
              </span>
              <textarea
                id="bm-notes"
                rows={2}
                placeholder="Allergies, pressure level, therapist preference..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full pl-9 pr-3 py-3 text-sm bg-white border border-[#C5A059]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-[#C5A059] hover:bg-[#b08d4b] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            Confirm & Send via WhatsApp
          </button>
        </form>
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
