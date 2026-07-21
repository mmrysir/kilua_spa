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
`*Kilua Spa & Massage* 🌿
_Malika Nungwi Hotel, Nungwi, Zanzibar_

━━━━━━━━━━━━━━━━━━━━━
📋 *NEW BOOKING REQUEST*
━━━━━━━━━━━━━━━━━━━━━

👤 *Client Name:* ${name}
📱 *Contact Number:* ${phone}

💆‍♀️ *Selected Treatment:* ${serviceDetails}
💰 *Price:* $${currentPrice}

📅 *Preferred Date:* ${date}
⏰ *Preferred Time:* ${time}

${notes ? `✍️ *Special Requests / Notes:*\n${notes}\n` : ""}
💵 *Payment:* Cash Accepted on Arrival

Thank you! Looking forward to welcoming you. 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SPA_WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Redirect
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-white border border-[#C5A059]/20 rounded-2xl shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Decor */}
        <div className="h-2 bg-gradient-to-r from-[#C5A059]/40 via-[#C5A059] to-[#C5A059]/40" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute p-2 transition-colors duration-200 rounded-full right-4 top-4 text-[#2C3230]/60 hover:text-[#C5A059] hover:bg-[#FDFBF7]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="px-6 pt-8 pb-4 text-center">
          <div className="inline-flex items-center justify-center p-2 mb-3 bg-[#FDFBF7] rounded-full text-[#C5A059]">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[#2C3230]">
            Book Your Serenity
          </h3>
          <p className="mt-1 text-sm text-[#2C3230]/60">
            Send your booking detail directly to our reservation desk.
          </p>
        </div>

        {/* Service Details Card */}
        <div className="px-6 py-3 mx-6 border rounded-xl bg-[#FDFBF7] border-[#C5A059]/10">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A059]">
                Selected Treatment
              </span>
              <h4 className="mt-0.5 font-serif font-medium text-[#2C3230]">
                {selectedItem.name}
              </h4>
              {selectedItem.description && (
                <p className="mt-1 text-xs text-[#2C3230]/60 line-clamp-2">
                  {selectedItem.description}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <span className="font-serif text-lg font-bold text-[#C5A059]">
                ${currentPrice}
              </span>
              {currentDuration && (
                <div className="text-[10px] text-[#2C3230]/50 font-medium">
                  {currentDuration}
                </div>
              )}
            </div>
          </div>

          {/* Option Selector for multi-price items */}
          {selectedItem.priceOptions && selectedItem.priceOptions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#C5A059]/10">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#2C3230]/60 block mb-1.5">
                Choose Duration
              </span>
              <div className="flex gap-2">
                {selectedItem.priceOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${
                      selectedOption?.label === opt.label
                        ? "bg-[#C5A059] text-white border-transparent shadow-sm"
                        : "bg-white text-[#2C3230] border-[#C5A059]/20 hover:border-[#C5A059]"
                    }`}
                  >
                    {opt.label} - ${opt.price}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs font-semibold text-[#2C3230]/80">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/40">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#C5A059]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                />
              </div>
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-1">
              <label htmlFor="phone" className="block text-xs font-semibold text-[#2C3230]/80">
                WhatsApp Phone Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/40">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="e.g. +255 777 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#C5A059]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-1">
              <label htmlFor="date" className="block text-xs font-semibold text-[#2C3230]/80">
                Preferred Date
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/40">
                  <Calendar className="w-4 h-4" />
                </span>
                <input
                  id="date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#C5A059]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                />
              </div>
            </div>

            {/* Time */}
            <div className="space-y-1">
              <label htmlFor="time" className="block text-xs font-semibold text-[#2C3230]/80">
                Preferred Time
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/40">
                  <Clock className="w-4 h-4" />
                </span>
                <input
                  id="time"
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#C5A059]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label htmlFor="notes" className="block text-xs font-semibold text-[#2C3230]/80">
              Special Requests & Notes (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[#2C3230]/40">
                <MessageSquare className="w-4 h-4" />
              </span>
              <textarea
                id="notes"
                rows={2}
                placeholder="Allergies, pressure level, preferred therapist gender, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#C5A059]/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all resize-none"
              />
            </div>
          </div>

          {/* Notice - Cash accepted */}
          <div className="p-2.5 text-[11px] text-[#2C3230]/70 bg-[#FDFBF7] border border-dashed border-[#C5A059]/30 rounded-lg flex items-center justify-between">
            <span className="font-semibold text-[#C5A059] flex items-center gap-1">
              💵 Note on Payment:
            </span>
            <span>* Cash Accepted on arrival</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-[#C5A059] hover:bg-[#b08d4b] text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Confirm & Open WhatsApp
          </button>
        </form>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
