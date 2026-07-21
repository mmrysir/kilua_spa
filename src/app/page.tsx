"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Leaf, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar, 
  Zap, 
  HelpCircle, 
  ChevronRight, 
  CheckCircle, 
  CreditCard,
  MessageSquare,
  Award,
  Shield,
  Star,
  Compass,
  Anchor,
  ShoppingBag,
  Sparkles
} from "lucide-react";
import { MenuItem } from "@/data/menu";
import MenuSection from "@/components/MenuSection";
import BookingModal from "@/components/BookingModal";
import CartDrawer, { CartItem } from "@/components/CartDrawer";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Package Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const defaultOption = item.priceOptions && item.priceOptions.length > 0 ? item.priceOptions[0] : null;
      const optionLabel = defaultOption ? defaultOption.label : undefined;
      const price = defaultOption ? defaultOption.price : item.price;
      const itemId = `${item.name}-${optionLabel || "default"}`;

      const existingIndex = prevCart.findIndex((i) => i.id === itemId);
      if (existingIndex > -1) {
        const revised = [...prevCart];
        revised[existingIndex].quantity += 1;
        return revised;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            name: item.name,
            price: price,
            duration: item.duration,
            quantity: 1,
            priceOptions: item.priceOptions,
            selectedOptionLabel: optionLabel,
            description: item.description
          }
        ];
      }
    });

    setToastMessage(`"${item.name}" added to package cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  const handleUpdateOption = (id: string, optionLabel: string, price: number) => {
    setCart((prevCart) => {
      const matchIndex = prevCart.findIndex((item) => item.id === id);
      if (matchIndex === -1) return prevCart;

      const matchedItem = prevCart[matchIndex];
      const newId = `${matchedItem.name}-${optionLabel}`;
      const targetIndex = prevCart.findIndex((item) => item.id === newId && item.id !== id);

      if (targetIndex > -1) {
        const revised = prevCart.filter((_, idx) => idx !== matchIndex);
        revised[targetIndex].quantity += matchedItem.quantity;
        return revised;
      } else {
        return prevCart.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              id: newId,
              selectedOptionLabel: optionLabel,
              price: price
            };
          }
          return item;
        });
      }
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBookItem = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleMainCTA = () => {
    // Default to the first popular item: Warm Herbal Oil Massage
    setSelectedItem({
      name: "Warm Herbal Oil Massage",
      price: 35,
      priceOptions: [
        { label: "60 Mins", price: 35 },
        { label: "30 Mins", price: 20 },
      ],
      description: "Very traditional and soothing massage done using warm herbal oil mixed with spices."
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C3230] pb-20 sm:pb-0">
      
      {/* Top Banner (Alerts/Notices) */}
      <div className="w-full bg-[#2C3230] text-[#FDFBF7] text-center py-2 px-4 text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
        <span>Tropical Sanctuary &bull; Traditional Wellness &bull; Cash Accepted on Arrival</span>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#C5A059]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Branding */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full border border-[#C5A059]/30 overflow-hidden bg-white shadow-sm flex items-center justify-center">
              <Image 
                src="/logo.jpg"
                alt="Kilua Spa & Massage Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wide text-[#2C3230] block leading-tight">
                KILUA
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C5A059] block">
                Spa & Massage
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase text-[#2C3230]/85">
            <a href="#about" className="hover:text-[#C5A059] transition-colors">Philosophy</a>
            <a href="#menu" className="hover:text-[#C5A059] transition-colors">Treatments</a>
            <a href="#experience" className="hover:text-[#C5A059] transition-colors">The Escape</a>
            <a href="#contact" className="hover:text-[#C5A059] transition-colors">Visit Us</a>
          </nav>

          {/* Booking CTA & Cart */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-white hover:bg-[#FDFBF7] text-[#2C3230] hover:text-[#C5A059] border border-[#C5A059]/20 hover:border-[#C5A059]/40 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center cursor-pointer"
              title="View spa packages"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C5A059] text-[10px] font-bold text-white shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Book CTA — text hidden on small screens */}
            <button
              onClick={handleMainCTA}
              className="flex items-center gap-2 px-3 sm:px-5 py-2.5 bg-[#C5A059] hover:bg-[#b08d4b] text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white border-t border-[#C5A059]/15 px-4 py-3 flex gap-3 shadow-[0_-4px_20px_rgba(44,50,48,0.08)]">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex-1 py-3 bg-[#FDFBF7] border border-[#C5A059]/30 rounded-xl text-xs font-bold uppercase tracking-wider text-[#2C3230] flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
          <span>View Cart</span>
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[#C5A059] text-[10px] font-bold text-white shadow">
              {cartItemsCount}
            </span>
          )}
        </button>
        <button
          onClick={handleMainCTA}
          className="flex-1 py-3 bg-[#C5A059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Now</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 border-b border-[#C5A059]/10">
        {/* Subtle decorative shapes */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#C5A059]/3 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            
            {/* Hero Typography */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#C5A059]/25 rounded-full shadow-sm text-xs font-semibold text-[#C5A059] tracking-wider uppercase">
                <Compass className="w-4 h-4 animate-spin-slow text-[#C5A059]" />
                <span>Escape to Tropical Paradise</span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2C3230] leading-[1.1] tracking-tight">
                Nourish Your Body, <br />
                <span className="text-[#C5A059] relative inline-block">
                  Rest Your Soul.
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#C5A059]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-[#2C3230]/75 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Welcome to Kilua Spa & Massage, a serene tropical sanctuary at Malika Nungwi Hotel where peaceful gardens meet traditional African therapies. Recharge with organic herbal blends, comforting hot stones, and the curative touch of our dedicated therapists.
              </p>

              {/* USP List */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-2">
                <div className="flex items-center gap-2 text-sm text-[#2C3230]/85 font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </span>
                  <span>Warm Spiced Oils</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#2C3230]/85 font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </span>
                  <span>Private Wellness Suites</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#2C3230]/85 font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </span>
                  <span>Instant WhatsApp Booking</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={handleMainCTA}
                  className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Book via WhatsApp</span>
                  <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
                </button>
                
                <a
                  href="#menu"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-[#2C3230]/90 border border-[#C5A059]/30 hover:border-[#C5A059] text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#FDFBF7] shadow-sm cursor-pointer"
                >
                  <span>Explore Menu</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Modern Hero Image Showcase */}
            <div className="lg:col-span-5 flex justify-center w-full relative">
              <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(197,160,89,0.25)] border-2 border-[#C5A059]/20 group bg-white">
                {/* Image */}
                <Image
                  src="/hero.jpg"
                  alt="Kilua Spa & Massage Resort Sanctuary"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                
                {/* Elegant overlay shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3230]/50 via-transparent to-transparent opacity-95 transition-opacity duration-300" />
                
                {/* Floating location card embedded on photo */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C5A059]/15 shadow-xl flex items-center justify-between transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-[10px] text-[#2C3230] uppercase tracking-wider">Locate Sanctuary</h4>
                      <p className="text-[11px] text-[#2C3230]/85 font-serif italic font-semibold">Malika Nungwi Hotel, Nungwi</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-[#C5A059] uppercase tracking-widest border-b border-[#C5A059]/40 pb-0.5">Visits Welcome</span>
                </div>
              </div>

              {/* Overlapping Floating Element 1: Five Star Rating */}
              <div className="absolute -top-5 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md border border-[#C5A059]/20 shadow-[0_10px_30px_rgba(44,50,48,0.08)] rounded-2xl p-4 flex items-center gap-3.5 z-10 transition-transform duration-300 hover:scale-105 max-sm:right-2">
                <div className="w-9 h-9 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] shrink-0">
                  <Star className="w-4.5 h-4.5 fill-[#C5A059] text-[#C5A059]" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-extrabold text-[#2C3230] tracking-wide">Top Rated Resort Spa</div>
                  <div className="text-[9px] font-semibold text-[#C5A059] uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                    <span>120+ Guests Reviews</span>
                  </div>
                </div>
              </div>

              {/* Overlapping Floating Element 2: Traditional treatment notice */}
              <div className="absolute top-1/2 -left-4 sm:-left-8 -translate-y-1/2 bg-[#2C3230] text-[#FDFBF7] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.15)] rounded-2xl p-4 z-10 transition-all duration-300 hover:scale-105 hidden sm:flex max-w-[210px] flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">Wellness Ritual</span>
                </div>
                <p className="text-[10px] text-white/80 leading-relaxed font-serif italic text-left">
                  "Traditional treatments rebalancing body, soul & mind in a tropical paradise."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section - Philosophy */}
      <section id="about" className="py-20 bg-white scroll-mt-20 border-b border-[#C5A059]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side: Beautiful logo brand showcase */}
            <div className="relative h-[480px] rounded-3xl overflow-hidden border border-[#C5A059]/15 shadow-xl bg-white flex flex-col items-center justify-center group">
              {/* Subtle gold decoration background */}
              <div className="absolute inset-0 bg-[#FDFBF7]/40 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#C5A059]/3 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative w-full h-[60%] max-w-sm flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-105 z-10">
                <Image 
                  src="/logo.jpg" 
                  alt="Kilua Spa & Massage Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              {/* Overlay with floating card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#FDFBF7]/95 backdrop-blur-sm border border-[#C5A059]/15 shadow-lg z-20">
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider block mb-1">Our Sanctuary</span>
                <p className="text-xs text-[#2C3230]/85 font-serif italic">
                  "Let the rhythmic whisper of tropical palms wash over you as warm oils melt away tension. Feel the revitalizing touch of Africa's ancient wellness traditions."
                </p>
              </div>
            </div>

            {/* Right side: Philosophy Details */}
            <div className="space-y-6">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#C5A059] block">
                Pure Tropical Healing
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C3230]">
                Traditional Wellness & Natural Ingredients
              </h2>
              <div className="w-16 h-0.5 bg-[#C5A059]" />

              <p className="text-[#2C3230]/75 leading-relaxed font-sans">
                At Kilua Spa & Massage, we honor the ancient connection between nature and physical health. Our signature massages, such as the <strong>Warm Herbal Oil Massage</strong>, utilize organic spices mixed in rich base oils to relax tight muscles, stimulate circulation, and purge everyday fatigue.
              </p>

              <p className="text-[#2C3230]/75 leading-relaxed font-sans">
                Our treatments represent the intersection of local organic knowledge, dedicated professionals, and the ultimate tropical backdrop of lush gardens. We believe in transparency and hospitality, making your booking immediate and stress-free.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C5A059]">
                    <Award className="w-5 h-5" />
                    <h4 className="font-serif font-bold text-sm text-[#2C3230]">Premium Quality</h4>
                  </div>
                  <p className="text-xs text-[#2C3230]/65">100% natural, eco-conscious aromatic oils and facial mask ingredients.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C5A059]">
                    <Shield className="w-5 h-5" />
                    <h4 className="font-serif font-bold text-sm text-[#2C3230]">Experienced Therapists</h4>
                  </div>
                  <p className="text-xs text-[#2C3230]/65">Our team is skilled in deep tissue release, reflexology, and hot stone methods.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Menu / Treatments Section */}
      <MenuSection onBookItem={handleBookItem} onAddToCart={handleAddToCart} />

      {/* Client Testimonials Section */}
      <section id="experience" className="py-20 bg-white border-t border-b border-[#C5A059]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#C5A059] block mb-2">
              Guest Stories
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#2C3230]">
              Serenity Shared
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#C5A059]/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-[#C5A059]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-[#2C3230]/80 italic font-medium leading-relaxed">
                  "The Mvua Africa Hot Stone Massage was absolute bliss. The volcanic stones hit all the tight spots. Listening to the rustling palms while the therapist worked their magic was unforgettable."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#C5A059]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#2C3230]">Elena Rostova</span>
                <span className="text-[10px] text-[#2C3230]/50 lowercase">Zanzibar Traveler</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#C5A059]/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-[#C5A059]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-[#2C3230]/80 italic font-medium leading-relaxed">
                  "I had their Warm Herbal Oil Massage after a long hiking week. The warm herbal mixture smelled divine and completely dissolved my lower back soreness. Outstanding wellness care!"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#C5A059]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#2C3230]">Malcolm Vance</span>
                <span className="text-[10px] text-[#2C3230]/50 lowercase">Resort Guest</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#C5A059]/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-[#C5A059]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-[#2C3230]/80 italic font-medium leading-relaxed">
                  "The combination pedicure & manicure is top tier! They used moisturizing oils instead of generic lotions which left my dry beach feet incredibly soft. Booking on WhatsApp took under a minute."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#C5A059]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#2C3230]">Amina Juma</span>
                <span className="text-[10px] text-[#2C3230]/50 lowercase">Weekend Visitor</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Booking Notice & Cash Accepted Banner */}
      <section className="py-12 bg-gradient-to-br from-[#2C3230] to-[#1A1F1E] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <Leaf className="w-8 h-8 text-[#C5A059] mx-auto animate-pulse" />
          <h3 className="font-serif text-2xl md:text-3xl font-semibold">Ready to Begin Your Serenity Journey?</h3>
          <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base">
            Select any spa treatment from our menu, click booking, and submit your details. Our WhatsApp reservation line will immediately receive your request.
          </p>
          
          <div className="inline-flex flex-wrap justify-center gap-6 text-xs tracking-wider uppercase font-semibold text-white/90">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#C5A059]" />
              No Pre-payment Needed
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#C5A059]" />
              Flexible Rescheduling
            </span>
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#C5A059]" />
              * Cash Accepted on Arrival
            </span>
          </div>

          <div>
            <button
              onClick={handleMainCTA}
              className="mt-4 px-8 py-3.5 bg-[#C5A059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Book Your Serenity Spot Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer / Practical Info Section */}
      <footer id="contact" className="bg-[#1A1F1E] text-white/80 border-t border-[#C5A059]/10 pt-16 pb-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
          
          {/* Col 1: About / Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full border border-[#C5A059]/30 overflow-hidden bg-white flex items-center justify-center">
                <Image 
                  src="/logo.jpg"
                  alt="Kilua Spa Emblem"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-white tracking-wide">KILUA</h4>
                <p className="text-[9px] uppercase tracking-widest font-semibold text-[#C5A059]">Spa & Massage</p>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Traditional and organic tropical wellness treatments tailored for local residents and global holidaymakers seeking complete rejuvenation.
            </p>
            <div className="text-xs text-white/50">
              Payments: <span className="font-semibold text-white">* Cash Accepted</span>
            </div>
          </div>

          {/* Col 2: Services shortcuts */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#C5A059]">Treatments</h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li><a href="#menu" className="hover:text-white transition-colors">Warm Herbal Oil Massage</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Mvua Africa Hot Stone Massage</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Aromatherapy Rituals</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Africa Wellbeing Facials</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Hands & Feet Grooming</a></li>
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#C5A059]">Hours of Serenity</h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li className="flex justify-between">
                <span>Monday - Friday</span> 
                <span className="font-semibold text-white">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span> 
                <span className="font-semibold text-white">9:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span> 
                <span className="font-semibold text-white">10:00 AM - 6:00 PM</span>
              </li>
              <li className="py-1 text-[10px] text-white/40 italic">
                * Booking appointments via WhatsApp highly recommended.
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#C5A059]">Contact & Location</h4>
            <ul className="space-y-3 text-xs text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Malika Nungwi Hotel, Nungwi, Zanzibar, Tanzania</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span>+255 776 785 002</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#C5A059]" />
                <span className="hover:text-white transition-colors cursor-pointer">reservations@kiluaspa.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 text-center text-xs text-white/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Kilua Spa & Massage. All rights preserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white">Terms of Serenity</a>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedItem={selectedItem} 
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateOption={handleUpdateOption}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 left-5 z-50 px-4 py-3 bg-[#2C3230] text-[#FDFBF7] border border-[#C5A059]/25 rounded-xl shadow-2xl flex items-center gap-2.5 animate-scale-in text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
