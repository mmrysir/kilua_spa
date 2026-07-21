"use client";

import React, { useState } from "react";
import { MenuItem, MenuCategory, menuCategories } from "@/data/menu";
import { Leaf, Clock, ArrowRight, Sparkles, Wand2, Scissors, Shrink } from "lucide-react";

interface MenuSectionProps {
  onBookItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case "therapy":
      return <Leaf className="w-5 h-5 text-[#C5A059]" />;
    case "beauty":
      return <Sparkles className="w-5 h-5 text-[#C5A059]" />;
    case "grooming":
      return <Scissors className="w-5 h-5 text-[#C5A059]" />;
    case "waxing-styling":
      return <Wand2 className="w-5 h-5 text-[#C5A059]" />;
    default:
      return <Leaf className="w-5 h-5 text-[#C5A059]" />;
  }
};

export default function MenuSection({ onBookItem, onAddToCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCategories = activeCategory === "all" 
    ? menuCategories 
    : menuCategories.filter(cat => cat.id === activeCategory);

  return (
    <section id="menu" className="py-20 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#C5A059] block mb-2">
            Wellness Rituals
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2C3230] leading-tight">
            Our Spa Menu
          </h2>
          <div className="w-24 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-6" />
          <p className="text-[#2C3230]/75 text-base md:text-lg">
            Indulge in our carefully curated treatments combining local ingredients, 
            traditional African methodologies, and serene tropical vibes.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === "all"
                ? "bg-[#C5A059] text-white border-transparent shadow-[0_4px_14px_rgba(197,160,89,0.3)]"
                : "bg-white text-[#2C3230]/80 border-[#C5A059]/10 hover:border-[#C5A059]/40 hover:text-[#C5A059]"
            }`}
          >
            Show All
          </button>
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border flex items-center gap-1.5 ${
                activeCategory === category.id
                  ? "bg-[#C5A059] text-white border-transparent shadow-[0_4px_14px_rgba(197,160,89,0.3)]"
                  : "bg-white text-[#2C3230]/80 border-[#C5A059]/10 hover:border-[#C5A059]/40 hover:text-[#C5A059]"
              }`}
            >
              {getCategoryIcon(category.id)}
              {category.name}
            </button>
          ))}
        </div>

        {/* Categories & Items Grid */}
        <div className="space-y-16">
          {filteredCategories.map((category) => (
            <div key={category.id} className="animate-fade-in">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#C5A059]/10">
                <div className="p-2 bg-white rounded-lg border border-[#C5A059]/15 shadow-sm">
                  {getCategoryIcon(category.id)}
                </div>
                <div>
                  <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#2C3230]">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-xs md:text-sm text-[#2C3230]/60 mt-1 max-w-2xl">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="group bg-white p-6 rounded-2xl border border-[#C5A059]/5 hover:border-[#C5A059]/25 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      {/* Name & Pricing Row */}
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-serif text-lg lg:text-xl font-medium text-[#2C3230] group-hover:text-[#C5A059] transition-colors duration-200">
                          {item.name}
                        </h4>
                        <div className="text-right shrink-0">
                          <span className="font-serif text-lg lg:text-xl font-semibold text-[#C5A059] block">
                            {item.priceOptions && item.priceOptions.length > 0 
                              ? `$${item.priceOptions[0].price}+`
                              : `$${item.price}`
                            }
                          </span>
                          {item.duration && (
                            <span className="text-[10px] text-[#2C3230]/50 tracking-wide font-semibold uppercase flex items-center justify-end gap-1 mt-0.5">
                              <Clock className="w-3.5 h-3.5" />
                              {item.duration}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {item.description && (
                        <p className="mt-3 text-sm text-[#2C3230]/70 leading-relaxed font-sans pr-4">
                          {item.description}
                        </p>
                      )}

                      {/* Multi-price Option Details */}
                      {item.priceOptions && item.priceOptions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.priceOptions.map((opt) => (
                            <span
                              key={opt.label}
                              className="text-[10px] uppercase font-semibold tracking-wider text-[#C5A059] bg-[#FDFBF7] px-2 py-0.5 rounded border border-[#C5A059]/10"
                            >
                              {opt.label}: ${opt.price}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Booking & Cart Trigger Buttons */}
                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <button
                        onClick={() => onBookItem(item)}
                        className="text-xs font-semibold uppercase tracking-wider text-[#2C3230]/75 hover:text-[#C5A059] transition-colors cursor-pointer"
                      >
                        Quick Book
                      </button>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-4 py-2 bg-[#C5A059] hover:bg-[#b08d4b] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
