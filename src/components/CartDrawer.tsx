"use client";
import React, { useState } from "react";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageSquare, 
  ShoppingBag,
  Leaf,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { MenuItem } from "@/data/menu";

export interface CartItem {
  id: string; // unique ID computed as name + "-" + (selectedOptionLabel || "default")
  name: string;
  price: number;
  duration?: string;
  quantity: number;
  priceOptions?: { label: string; price: number }[];
  selectedOptionLabel?: string;
  description?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onUpdateOption: (id: string, optionLabel: string, price: number) => void;
  onClearCart: () => void;
}

const SPA_WHATSAPP_NUMBER = "255776583434"; // Zanzibar reservation line

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
  onUpdateOption,
  onClearCart
}: CartDrawerProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    const itemsText = cartItems.map(item => {
      const optionText = item.selectedOptionLabel ? ` (${item.selectedOptionLabel})` : (item.duration ? ` (${item.duration})` : "");
      return `💆‍♀️ *${item.name}${optionText}* × ${item.quantity} \n   └ 💰 $${item.price * item.quantity} ($${item.price} each)`;
    }).join("\n\n");

    const message = 
`*Kilua Spa & Massage* 🌿
_Malika Nungwi Hotel, Nungwi, Zanzibar_

━━━━━━━━━━━━━━━━━━━━━
🛒 *PACKAGE BOOKING REQUEST*
━━━━━━━━━━━━━━━━━━━━━

👤 *Client Name:* ${name}
📱 *Contact Number:* ${phone}

*Selected Treatments:*
${itemsText}

━━━━━━━━━━━━━━━━━━━━━
💳 *Total Price:* $${totalPrice}
📅 *Preferred Date:* ${date}
⏰ *Preferred Time:* ${time}
━━━━━━━━━━━━━━━━━━━━━

${notes ? `✍️ *Special Requests / Notes:*\n${notes}\n` : ""}
💵 *Payment:* Cash Accepted on Arrival

Thank you! Looking forward to welcoming you. 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SPA_WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Redirect & clean up
    window.open(whatsappUrl, "_blank");
    setIsSubmitting(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md sm:max-w-md bg-[#FDFBF7] text-[#2C3230] border-l border-[#C5A059]/20 shadow-2xl flex flex-col h-full transform transition-transform duration-500 animate-slide-in relative">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#C5A059]/10 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-serif text-lg font-bold text-[#2C3230]">Treatment Cart</h3>
              <span className="px-2 py-0.5 text-[10px] bg-[#C5A059]/10 text-[#C5A059] rounded-full font-bold">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 px-2.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-[#C5A059] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              // Empty State
              <div className="h-[70%] flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 rounded-full bg-[#C5A059]/5 border border-[#C5A059]/15 text-[#C5A059] animate-pulse">
                  <Leaf className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-lg font-semibold">Your Cart is Empty</h4>
                <p className="text-xs text-[#2C3230]/65 max-w-[240px]">
                  Build your ideal spa package. Browse our services and add treatments to your cart page.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#b08d4b] text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm"
                >
                  Browse Spa Menu
                </button>
              </div>
            ) : (
              // Items List
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#C5A059]/10">
                  <span className="text-xs font-semibold text-[#2C3230]/65">Selected Rituals</span>
                  <button 
                    onClick={onClearCart}
                    className="text-[10px] uppercase font-bold text-[#C5A059] hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-[#C5A059]/5 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif text-sm font-semibold text-[#2C3230] leading-tight">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="text-[10px] text-[#2C3230]/60 mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span className="font-serif text-sm font-semibold text-[#C5A059] shrink-0 pl-2">
                          ${item.price * item.quantity}
                        </span>
                      </div>

                      {/* Options & Controls Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        {/* Duration Options selector inside cart */}
                        {item.priceOptions && item.priceOptions.length > 0 ? (
                          <div className="flex gap-1.5 flex-wrap">
                            {item.priceOptions.map((opt) => (
                              <button
                                key={opt.label}
                                type="button"
                                onClick={() => onUpdateOption(item.id, opt.label, opt.price)}
                                className={`px-2 py-0.5 text-[9px] uppercase tracking-wider rounded border transition-all ${
                                  item.selectedOptionLabel === opt.label
                                    ? "bg-[#C5A059] text-white border-transparent"
                                    : "bg-white text-[#2C3230]/75 border-[#C5A059]/20 hover:border-[#C5A059]"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2C3230]/50">
                            {item.duration || "Treatment"}
                          </span>
                        )}

                        {/* Quantity Controls & Delete */}
                        <div className="flex items-center gap-3 ml-auto">
                          <div className="flex items-center border border-[#C5A059]/20 rounded-lg bg-white overflow-hidden">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1.5 hover:bg-[#FDFBF7] text-[#2C3230]/60 hover:text-[#C5A059] transition-all"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1.5 hover:bg-[#FDFBF7] text-[#2C3230]/60 hover:text-[#C5A059] transition-all"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveFromCart(item.id)}
                            className="p-1.5 rounded-lg border border-red-100 hover:border-red-200 text-neutral-400 hover:text-red-500 hover:bg-red-50/50 transition-all duration-200"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Scheduling & booking details Form */}
            {cartItems.length > 0 && (
              <form onSubmit={handleSubmit} className="pt-6 border-t border-[#C5A059]/10 space-y-4">
                <span className="text-xs font-semibold text-[#2C3230]/65 block mb-1">Reservation details</span>
                
                <div className="space-y-3">
                  {/* Client Name */}
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/40">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#C5A059]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/40">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Number (e.g. +255 777 123)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#C5A059]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                    />
                  </div>

                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/40">
                        <Calendar className="w-4 h-4" />
                      </span>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#C5A059]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2C3230]/40">
                        <Clock className="w-4 h-4" />
                      </span>
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#C5A059]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#2C3230]/40">
                      <MessageSquare className="w-4 h-4" />
                    </span>
                    <textarea
                      rows={2}
                      placeholder="Special requests or preferred therapist gender..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#C5A059]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 space-y-2.5">
                  {/* Add More Treatments — prominent gold-tinted call-to-action */}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }}
                    className="w-full py-3.5 bg-[#C5A059]/10 hover:bg-[#C5A059]/20 text-[#C5A059] border-2 border-dashed border-[#C5A059]/50 hover:border-[#C5A059] text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#C5A059] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Plus className="w-3 h-3" />
                    </span>
                    <span>Add Another Treatment</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#C5A059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>Request Booking via WhatsApp</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Total Bar (Floating at bottom if items exist) */}
          {cartItems.length > 0 && (
            <div className="bg-white border-t border-[#C5A059]/10 p-6 space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-[#2C3230]">Treatment Package Total</span>
                <span className="font-serif text-lg text-[#C5A059] font-bold">${totalPrice}</span>
              </div>
              <div className="text-[10px] text-[#2C3230]/50 text-center tracking-wide uppercase font-semibold">
                💵 Cash accepted on arrival &bull; No pre-payment required
              </div>
            </div>
          )}
          
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
