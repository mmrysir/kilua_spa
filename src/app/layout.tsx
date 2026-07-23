import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import seoSchema from "../../seo.json";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kilua Spa & Massage | Luxury Tropical Wellness & Traditional Massages",
  description: "Experience luxury traditional massages, beauty therapies, and foot & hand grooming at Kilua Spa & Massage. Book your serene escape today via WhatsApp.",
  keywords: ["Kilua Spa", "Massage", "Spa", "Luxury Spa", "Zanzibar Spa", "Tropical Wellness", "Hot Stone Massage", "Traditional Massage", "Pedicure", "Manicure"],
  authors: [{ name: "Kilua Spa & Massage" }],
  icons: {
    icon: "/favicon-logo.jpg",
    shortcut: "/favicon-logo.jpg",
    apple: "/favicon-logo.jpg",
  },
  openGraph: {
    title: "Kilua Spa & Massage | Luxury Tropical Wellness",
    description: "Serene, high-end traditional wellness and massage treatments. Book your serene escape.",
    images: [{ url: "/favicon-logo.jpg", width: 1200, height: 630, alt: "Kilua Spa logo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kilua Spa & Massage",
    description: "Premium spa and wellness treatments.",
    images: ["/favicon-logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FDFBF7] text-[#2C3230]">
        {children}
      </body>
    </html>
  );
}
