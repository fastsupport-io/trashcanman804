/**
 * TRASH CAN MAN 804 — Home Page (Sales Funnel)
 * Design: Clean Green Commerce
 * Brand: Forest Green #2D7A3A | Oswald (display) | Source Sans 3 (body)
 * Sections: Nav → Hero + Quote Form → Trust Bar → Products → Pricing → How It Works → FAQ → CTA → Footer
 */

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Phone, CheckCircle2, Truck, Package, Star, ChevronDown, ChevronUp,
  ArrowRight, Shield, Clock, MapPin, Mail, MessageCircle
} from "lucide-react";

// ─── Asset URLs ───────────────────────────────────────────────────────────────
const MASCOT_URL = "/manus-storage/mascot_clean_8e04bf45.png";
const HERO_WAREHOUSE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663036148199/Gkkik3jyg4CkhinikTZJM7/hero_warehouse-8qzQkpoL4KzqmYjSceS3sf.webp";
const HERO_DELIVERY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663036148199/Gkkik3jyg4CkhinikTZJM7/hero_delivery-Vj5bx6BM9yWWoLp3DLadsx.webp";
const CANS_CLOSEUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663036148199/Gkkik3jyg4CkhinikTZJM7/cans_closeup-7L2vmqtu2cjGWSvzHEZRag.webp";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Sticky nav scroll state ──────────────────────────────────────────────────
function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="[font-family:'Oswald',sans-serif] font-semibold text-lg text-[#1C2B1E]">{q}</span>
        {open ? <ChevronUp className="shrink-0 text-[#2D7A3A]" size={20} /> : <ChevronDown className="shrink-0 text-[#2D7A3A]" size={20} />}
      </button>
      {open && (
        <div className="pb-5 text-gray-600 font-body leading-relaxed text-base animate-fade-up">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Quote Form ───────────────────────────────────────────────────────────────
function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", canType: "", quantity: "", address: "", notes: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const qty = parseInt(form.quantity) || 0;
  const pricePerCan = qty >= 50 ? 30 : 35;
  const subtotal = qty > 0 ? qty * pricePerCan : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.canType || !form.quantity) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success("Quote request sent! You'll receive an SMS/email confirmation shortly.");
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <CheckCircle2 className="text-[#2D7A3A]" size={56} />
        <h3 className="[font-family:'Oswald',sans-serif] text-2xl font-bold text-[#1C2B1E]">Quote Request Received!</h3>
        <p className="text-gray-600 max-w-sm">
          We're calculating your quote now. You'll receive an SMS and email confirmation within minutes with your total price.
        </p>
        <p className="text-sm text-gray-500">Questions? Call us at <a href="tel:+18888888888" className="text-[#2D7A3A] font-semibold">(888) 888-8888</a></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!compact && (
        <div className="mb-2">
          <h3 className="[font-family:'Oswald',sans-serif] text-2xl font-bold text-[#1C2B1E]">Get Your Instant Quote</h3>
          <p className="text-gray-500 text-sm mt-1">Fill out the form — we'll text and email your price in minutes.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="font-body font-semibold text-[#1C2B1E] text-sm">Full Name *</Label>
          <Input id="name" placeholder="John Smith" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="mt-1 border-gray-300 focus:border-[#2D7A3A] focus:ring-[#2D7A3A]" required />
        </div>
        <div>
          <Label htmlFor="phone" className="font-body font-semibold text-[#1C2B1E] text-sm">Phone Number *</Label>
          <Input id="phone" type="tel" placeholder="(804) 555-0100" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="mt-1 border-gray-300 focus:border-[#2D7A3A]" required />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="font-body font-semibold text-[#1C2B1E] text-sm">Email Address</Label>
        <Input id="email" type="email" placeholder="john@company.com" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="mt-1 border-gray-300 focus:border-[#2D7A3A]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="font-body font-semibold text-[#1C2B1E] text-sm">Can Size *</Label>
          <Select onValueChange={v => setForm({ ...form, canType: v })}>
            <SelectTrigger className="mt-1 border-gray-300">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="96-gallon">96-Gallon (Large)</SelectItem>
              <SelectItem value="64-gallon">64-Gallon (Medium)</SelectItem>
              <SelectItem value="mixed">Mixed (96 & 64 Gallon)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="quantity" className="font-body font-semibold text-[#1C2B1E] text-sm">Quantity *</Label>
          <Input id="quantity" type="number" min="1" placeholder="e.g. 100" value={form.quantity}
            onChange={e => setForm({ ...form, quantity: e.target.value })}
            className="mt-1 border-gray-300 focus:border-[#2D7A3A]" required />
        </div>
      </div>

      {qty > 0 && (
        <div className={`rounded-lg p-4 border-2 ${qty >= 50 ? 'bg-green-50 border-[#2D7A3A]' : 'bg-amber-50 border-amber-400'}`}>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm font-semibold text-gray-700">
              {qty >= 50 ? '🎉 Bulk Rate Applied!' : `Add ${50 - qty} more for bulk pricing`}
            </span>
            <span className="[font-family:'Oswald',sans-serif] font-bold text-xl text-[#1C2B1E]">
              ${pricePerCan}/can
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">{qty} × ${pricePerCan} (excl. shipping)</span>
            <span className="[font-family:'Oswald',sans-serif] font-bold text-2xl text-[#2D7A3A]">${subtotal.toLocaleString()}</span>
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="address" className="font-body font-semibold text-[#1C2B1E] text-sm">Shipping Address</Label>
        <Input id="address" placeholder="123 Main St, Richmond, VA 23220" value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          className="mt-1 border-gray-300 focus:border-[#2D7A3A]" />
        <p className="text-xs text-gray-400 mt-1">Needed to calculate shipping cost</p>
      </div>

      {!compact && (
        <div>
          <Label htmlFor="notes" className="font-body font-semibold text-[#1C2B1E] text-sm">Additional Notes</Label>
          <Textarea id="notes" placeholder="Any special requirements, delivery instructions, etc." value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            className="mt-1 border-gray-300 focus:border-[#2D7A3A] resize-none" rows={3} />
        </div>
      )}

      <Button type="submit" disabled={loading}
        className="w-full btn-primary cta-pulse text-base py-4 h-auto bg-[#2D7A3A] hover:bg-[#235f2d] text-white [font-family:'Oswald',sans-serif] font-bold uppercase tracking-wider">
        {loading ? "Sending..." : "Get My Instant Quote →"}
      </Button>
      <p className="text-xs text-center text-gray-400">
        No spam. We'll only contact you about your quote. <br />
        Or call us directly: <a href="tel:+18888888888" className="text-[#2D7A3A] font-semibold">(888) 888-8888</a>
      </p>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const scrolled = useScrolled();
  const productsReveal = useReveal();
  const pricingReveal = useReveal();
  const howReveal = useReveal();
  const faqReveal = useReveal();

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── Sticky Navigation ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}>
        <div className="container flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src={MASCOT_URL} alt="Trash Can Man 804 Logo" className="h-12 w-auto" />
            <div>
              <div className={`[font-family:'Oswald',sans-serif] font-bold text-xl leading-tight ${scrolled ? 'text-[#1C2B1E]' : 'text-white'}`}>
                TRASH CAN MAN
              </div>
              <div className={`[font-family:'Oswald',sans-serif] font-bold text-2xl leading-tight text-[#2D7A3A]`}>804</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {[["Products", "#products"], ["Pricing", "#pricing"], ["How It Works", "#how-it-works"], ["FAQ", "#faq"]].map(([label, href]) => (
              <a key={label} href={href}
                className={`font-body font-semibold text-sm transition-colors hover:text-[#2D7A3A] ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+18888888888"
              className={`hidden sm:flex items-center gap-2 font-body font-semibold text-sm transition-colors ${scrolled ? 'text-[#2D7A3A]' : 'text-white'}`}>
              <Phone size={16} />
              (888) 888-8888
            </a>
            <a href="#quote"
              className="bg-[#2D7A3A] text-white [font-family:'Oswald',sans-serif] font-semibold uppercase tracking-wider text-sm px-5 py-2.5 rounded transition-all hover:bg-[#235f2d] hover:shadow-lg">
              Get Quote
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={HERO_WAREHOUSE} alt="Warehouse full of used trash cans" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C2B1E]/90 via-[#1C2B1E]/70 to-transparent" />
        </div>

        <div className="relative container pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero copy */}
            <div className="text-white">
              <Badge className="bg-[#2D7A3A] text-white font-body text-xs uppercase tracking-widest mb-6 px-3 py-1">
                Virginia's #1 Bulk Trash Can Supplier
              </Badge>
              <h1 className="[font-family:'Oswald',sans-serif] font-bold text-5xl md:text-6xl lg:text-7xl leading-none mb-6 text-white">
                STOP<br />
                OVERPAYING<br />
                <span className="text-[#5CB85C]">FOR TRASH CANS.</span>
              </h1>
              <p className="font-body text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
                Used 96-gallon and 64-gallon wheeled carts — the same heavy-duty cans used by municipalities — at a fraction of the retail price. Bulk orders ship nationwide.
              </p>

              {/* Price callout */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4">
                  <div className="[font-family:'Oswald',sans-serif] font-bold text-4xl text-[#5CB85C]">$30</div>
                  <div className="font-body text-sm text-white/70">per can · 50+ orders</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4">
                  <div className="[font-family:'Oswald',sans-serif] font-bold text-4xl text-white">$35</div>
                  <div className="font-body text-sm text-white/70">per can · under 50</div>
                </div>
                <div className="bg-[#F59E0B]/20 border border-[#F59E0B]/40 rounded-xl px-6 py-4">
                  <div className="[font-family:'Oswald',sans-serif] font-bold text-2xl text-[#F59E0B]">vs $39</div>
                  <div className="font-body text-sm text-white/70">B&G Sales price</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#quote" className="btn-primary bg-[#2D7A3A] text-white cta-pulse inline-flex items-center gap-2">
                  Get Instant Quote <ArrowRight size={18} />
                </a>
                <a href="tel:+18888888888" className="inline-flex items-center gap-2 border-2 border-white/40 text-white [font-family:'Oswald',sans-serif] font-semibold uppercase tracking-wider px-8 py-4 rounded hover:bg-white/10 transition-all">
                  <Phone size={18} /> Call Now
                </a>
              </div>
            </div>

            {/* Right: Quote form */}
            <div id="quote" className="bg-white rounded-2xl shadow-2xl p-8">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-[#2D7A3A] py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { icon: <Package size={24} />, label: "Thousands Sold", sub: "Proven inventory" },
              { icon: <Truck size={24} />, label: "Ships Nationwide", sub: "Any US address" },
              { icon: <Clock size={24} />, label: "Fast Response", sub: "Quote in minutes" },
              { icon: <Shield size={24} />, label: "Trusted Seller", sub: "Verified on FB Marketplace" },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="text-[#5CB85C]">{icon}</div>
                <div className="[font-family:'Oswald',sans-serif] font-bold text-base">{label}</div>
                <div className="font-body text-xs text-white/70">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products Section ── */}
      <section id="products" className="py-20 bg-[#FAFAF8]">
        <div
          ref={productsReveal.ref}
          className={`container transition-all duration-500 ${productsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-14">
            <Badge className="bg-green-100 text-[#2D7A3A] font-body text-xs uppercase tracking-widest mb-4">Our Products</Badge>
            <h2 className="[font-family:'Oswald',sans-serif] font-bold text-4xl md:text-5xl text-[#1C2B1E] mb-4">
              TWO SIZES. ONE LOW PRICE.
            </h2>
            <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto">
              Heavy-duty used wheeled carts retired from municipal service. Cleaned, inspected, and ready to work for your property, business, or community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 96-gallon */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img src={CANS_CLOSEUP} alt="96-gallon used trash can" className="w-full h-full object-cover object-left group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#2D7A3A] text-white [font-family:'Oswald',sans-serif] font-bold text-lg px-4 py-2">96 GAL</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="[font-family:'Oswald',sans-serif] font-bold text-2xl text-[#1C2B1E] mb-2">96-Gallon Wheeled Cart</h3>
                <p className="font-body text-gray-500 text-sm mb-4 leading-relaxed">
                  The industry-standard large cart. Holds 8 kitchen bags. Ideal for residential properties, HOAs, municipalities, junk removal, and property managers.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Heavy-duty HDPE construction", "Attached hinged lid", "Durable rubber wheels", "Rear-axle design for easy rolling", "Cleaned & inspected"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 font-body">
                      <CheckCircle2 size={16} className="text-[#2D7A3A] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="[font-family:'Oswald',sans-serif] font-bold text-4xl text-[#2D7A3A]">$30</span>
                    <span className="font-body text-gray-400 text-sm ml-1">/ can (50+)</span>
                  </div>
                  <a href="#quote" className="bg-[#2D7A3A] text-white [font-family:'Oswald',sans-serif] font-semibold uppercase tracking-wider text-sm px-5 py-2.5 rounded hover:bg-[#235f2d] transition-colors">
                    Order Now
                  </a>
                </div>
              </div>
            </div>

            {/* 64-gallon */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img src={CANS_CLOSEUP} alt="64-gallon used trash can" className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gray-700 text-white [font-family:'Oswald',sans-serif] font-bold text-lg px-4 py-2">64 GAL</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="[font-family:'Oswald',sans-serif] font-bold text-2xl text-[#1C2B1E] mb-2">64-Gallon Wheeled Cart</h3>
                <p className="font-body text-gray-500 text-sm mb-4 leading-relaxed">
                  The compact powerhouse. Holds 4–5 kitchen bags. Perfect for smaller properties, apartment complexes, small businesses, and supplemental capacity.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Compact yet high-capacity", "Attached hinged lid", "Smooth-rolling wheels", "Fits standard cart tippers", "Cleaned & inspected"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 font-body">
                      <CheckCircle2 size={16} className="text-[#2D7A3A] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="[font-family:'Oswald',sans-serif] font-bold text-4xl text-[#2D7A3A]">$30</span>
                    <span className="font-body text-gray-400 text-sm ml-1">/ can (50+)</span>
                  </div>
                  <a href="#quote" className="bg-[#2D7A3A] text-white [font-family:'Oswald',sans-serif] font-semibold uppercase tracking-wider text-sm px-5 py-2.5 rounded hover:bg-[#235f2d] transition-colors">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section id="pricing" className="py-20 bg-[#1C2B1E]">
        <div
          ref={pricingReveal.ref}
          className={`container transition-all duration-500 ${pricingReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-14">
            <Badge className="bg-[#2D7A3A] text-white font-body text-xs uppercase tracking-widest mb-4">Simple Pricing</Badge>
            <h2 className="[font-family:'Oswald',sans-serif] font-bold text-4xl md:text-5xl text-white mb-4">
              TRANSPARENT. COMPETITIVE. FAIR.
            </h2>
            <p className="font-body text-lg text-white/60 max-w-xl mx-auto">
              No hidden fees. No complicated tiers. Just two straightforward prices based on your order size.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Bulk tier */}
            <div className="relative bg-[#2D7A3A] rounded-2xl p-8 border-2 border-[#5CB85C] shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#F59E0B] text-[#1C2B1E] [font-family:'Oswald',sans-serif] font-bold uppercase tracking-wider px-4 py-1">Best Value</Badge>
              </div>
              <div className="text-center mb-6">
                <div className="[font-family:'Oswald',sans-serif] font-bold text-6xl text-white mb-1">$30</div>
                <div className="font-body text-white/70 text-sm">per can · plus shipping</div>
                <div className="[font-family:'Oswald',sans-serif] font-bold text-xl text-[#5CB85C] mt-3">BULK ORDER — 50+ CANS</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "96-gallon OR 64-gallon",
                  "Mix sizes in one order",
                  "Priority processing",
                  "Freight shipping available",
                  "Instant SMS quote",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-white font-body text-sm">
                    <CheckCircle2 size={16} className="text-[#5CB85C] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a href="#quote" className="block w-full text-center bg-white text-[#2D7A3A] [font-family:'Oswald',sans-serif] font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-gray-100 transition-colors">
                Get Bulk Quote
              </a>
            </div>

            {/* Standard tier */}
            <div className="bg-white/5 border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="[font-family:'Oswald',sans-serif] font-bold text-6xl text-white mb-1">$35</div>
                <div className="font-body text-white/50 text-sm">per can · plus shipping</div>
                <div className="[font-family:'Oswald',sans-serif] font-bold text-xl text-white/80 mt-3">STANDARD — UNDER 50 CANS</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "96-gallon OR 64-gallon",
                  "No minimum order",
                  "Standard processing",
                  "Ground shipping available",
                  "Instant SMS quote",
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 text-white/80 font-body text-sm">
                    <CheckCircle2 size={16} className="text-[#5CB85C] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a href="#quote" className="block w-full text-center bg-[#2D7A3A] text-white [font-family:'Oswald',sans-serif] font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-[#235f2d] transition-colors">
                Get Standard Quote
              </a>
            </div>
          </div>

          <p className="text-center text-white/40 font-body text-sm mt-8">
            Shipping calculated separately based on delivery location and order size. <br />
            Call <a href="tel:+18888888888" className="text-[#5CB85C] hover:underline">(888) 888-8888</a> for large freight quotes.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 bg-[#FAFAF8]">
        <div
          ref={howReveal.ref}
          className={`container transition-all duration-500 ${howReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-14">
            <Badge className="bg-green-100 text-[#2D7A3A] font-body text-xs uppercase tracking-widest mb-4">Simple Process</Badge>
            <h2 className="[font-family:'Oswald',sans-serif] font-bold text-4xl md:text-5xl text-[#1C2B1E] mb-4">
              FROM QUOTE TO DELIVERY<br />IN 4 EASY STEPS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Request a Quote", desc: "Fill out our form, call our AI line at 1-888-TCM-804, or message us on Facebook Marketplace.", icon: <MessageCircle size={32} /> },
              { step: "02", title: "Instant Price", desc: "You'll receive an SMS and email with your exact quote — product cost plus shipping — within minutes.", icon: <Phone size={32} /> },
              { step: "03", title: "Confirm & Pay", desc: "Approve your quote and complete payment. We'll coordinate with our logistics partner for pickup.", icon: <CheckCircle2 size={32} /> },
              { step: "04", title: "Delivered to You", desc: "Your cans are loaded and shipped directly to your address. Track your order every step of the way.", icon: <Truck size={32} /> },
            ].map(({ step, title, desc, icon }, i) => (
              <div key={step} className="relative">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-1rem)] w-8 border-t-2 border-dashed border-[#2D7A3A]/30 z-10" />
                )}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="[font-family:'Oswald',sans-serif] font-bold text-4xl text-[#2D7A3A]/20 leading-none">{step}</div>
                    <div className="text-[#2D7A3A] mt-1">{icon}</div>
                  </div>
                  <h3 className="[font-family:'Oswald',sans-serif] font-bold text-xl text-[#1C2B1E] mb-2">{title}</h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery image */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-xl relative">
            <img src={HERO_DELIVERY} alt="Bulk trash can delivery truck" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C2B1E]/80 to-transparent flex items-center">
              <div className="p-8 md:p-12">
                <h3 className="[font-family:'Oswald',sans-serif] font-bold text-3xl md:text-4xl text-white mb-3">Ready to Order?</h3>
                <p className="font-body text-white/80 mb-6 max-w-md">We ship pallets and full truckloads nationwide. Our logistics team handles everything from pickup to final delivery.</p>
                <a href="#quote" className="inline-flex items-center gap-2 bg-[#2D7A3A] text-white [font-family:'Oswald',sans-serif] font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-[#235f2d] transition-colors">
                  Get My Quote <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us / Competitive Comparison ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="[font-family:'Oswald',sans-serif] font-bold text-4xl text-[#1C2B1E] mb-3">WHY TRASH CAN MAN 804?</h2>
            <p className="font-body text-gray-500">See how we compare to the competition</p>
          </div>
          <div className="overflow-x-auto max-w-3xl mx-auto">
            <table className="w-full border-collapse font-body text-sm">
              <thead>
                <tr className="bg-[#1C2B1E] text-white">
                  <th className="text-left p-4 [font-family:'Oswald',sans-serif] font-bold">Feature</th>
                  <th className="text-center p-4 [font-family:'Oswald',sans-serif] font-bold text-[#5CB85C]">Trash Can Man 804</th>
                  <th className="text-center p-4 [font-family:'Oswald',sans-serif] font-bold text-gray-400">B&G Sales</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["96-Gal Price (Bulk)", "$30/can", "$39/can"],
                  ["64-Gal Price (Bulk)", "$30/can", "$30/can"],
                  ["Instant SMS Quote", "✅ Yes", "❌ No"],
                  ["AI Phone Receptionist", "✅ 24/7", "❌ No"],
                  ["Facebook Marketplace", "✅ Active", "Limited"],
                  ["Nationwide Shipping", "✅ Yes", "✅ Yes"],
                  ["Response Time", "Minutes", "24+ hours"],
                ].map(([feature, us, them], i) => (
                  <tr key={feature} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-4 font-semibold text-[#1C2B1E]">{feature}</td>
                    <td className="p-4 text-center text-[#2D7A3A] font-bold">{us}</td>
                    <td className="p-4 text-center text-gray-400">{them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section id="faq" className="py-20 bg-[#FAFAF8]">
        <div
          ref={faqReveal.ref}
          className={`container transition-all duration-500 ${faqReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-green-100 text-[#2D7A3A] font-body text-xs uppercase tracking-widest mb-4">Common Questions</Badge>
              <h2 className="[font-family:'Oswald',sans-serif] font-bold text-4xl md:text-5xl text-[#1C2B1E]">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              {[
                {
                  q: "How much do used 96-gallon trash cans cost in bulk?",
                  a: "At Trash Can Man 804, used 96-gallon wheeled trash cans are $30 each when you order 50 or more, and $35 each for orders under 50 cans. Shipping is calculated separately based on your delivery location."
                },
                {
                  q: "What condition are the used trash cans in?",
                  a: "Our cans are retired municipal and residential carts in functional condition. They are cleaned and inspected before sale. Wheels, axles, and lids are intact. These are the same heavy-duty carts used by waste management companies — built to last decades."
                },
                {
                  q: "Do you ship used trash cans nationwide?",
                  a: "Yes! We ship used 96-gallon and 64-gallon wheeled trash cans anywhere in the United States. We work with freight carriers for large pallet orders and standard ground shipping for smaller quantities. Contact us for a shipping quote to your location."
                },
                {
                  q: "How do I get a quote?",
                  a: "Three easy ways: (1) Fill out the quote form on this page, (2) Call our AI-powered quote line at 1-888-TCM-804 — available 24/7, or (3) Message us on Facebook Marketplace. You'll receive an instant SMS and email with your price."
                },
                {
                  q: "Can I mix 96-gallon and 64-gallon cans in one order?",
                  a: "Absolutely. You can mix sizes in a single order. The pricing tier ($30 for bulk, $35 for standard) is based on the total quantity of cans ordered, regardless of size mix."
                },
                {
                  q: "What's the minimum order quantity?",
                  a: "There is no minimum order. You can order as few as 1 can at the standard rate of $35 each, or 50+ cans at the bulk rate of $30 each. For very large orders (500+), contact us for special pricing."
                },
              ].map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-[#2D7A3A]">
        <div className="container text-center">
          <img src={MASCOT_URL} alt="Trash Can Man mascot" className="h-24 w-auto mx-auto mb-6" />
          <h2 className="[font-family:'Oswald',sans-serif] font-bold text-4xl md:text-5xl text-white mb-4">
            READY TO SAVE BIG ON TRASH CANS?
          </h2>
          <p className="font-body text-xl text-white/80 mb-10 max-w-xl mx-auto">
            Join hundreds of property managers, municipalities, and businesses who trust Trash Can Man 804 for their bulk trash can needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="inline-flex items-center justify-center gap-2 bg-white text-[#2D7A3A] [font-family:'Oswald',sans-serif] font-bold uppercase tracking-wider px-10 py-5 rounded-xl text-lg hover:bg-gray-100 transition-all hover:shadow-xl">
              Get My Instant Quote <ArrowRight size={20} />
            </a>
            <a href="tel:+18888888888" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white [font-family:'Oswald',sans-serif] font-bold uppercase tracking-wider px-10 py-5 rounded-xl text-lg hover:bg-white/10 transition-all">
              <Phone size={20} /> (888) 888-8888
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1C2B1E] py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={MASCOT_URL} alt="Trash Can Man 804" className="h-14 w-auto" />
                <div>
                  <div className="[font-family:'Oswald',sans-serif] font-bold text-lg text-white leading-tight">TRASH CAN MAN</div>
                  <div className="[font-family:'Oswald',sans-serif] font-bold text-2xl text-[#5CB85C] leading-tight">804</div>
                </div>
              </div>
              <p className="font-body text-white/50 text-sm leading-relaxed">
                Trash Can Man LLC — Virginia's trusted source for used bulk wheeled trash cans. Serving property managers, municipalities, and businesses nationwide.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="[font-family:'Oswald',sans-serif] font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[["Products", "#products"], ["Pricing", "#pricing"], ["How It Works", "#how-it-works"], ["FAQ", "#faq"], ["Get a Quote", "#quote"]].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="font-body text-white/50 hover:text-[#5CB85C] transition-colors text-sm">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="[font-family:'Oswald',sans-serif] font-bold text-white uppercase tracking-wider mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[#5CB85C] shrink-0" />
                  <a href="tel:+18888888888" className="font-body text-white/70 hover:text-white text-sm">(888) 888-8888</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-[#5CB85C] shrink-0" />
                  <a href="mailto:trashcanman804@gmail.com" className="font-body text-white/70 hover:text-white text-sm">trashcanman804@gmail.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#5CB85C] shrink-0" />
                  <span className="font-body text-white/50 text-sm">Richmond, Virginia</span>
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-[#F59E0B] fill-[#F59E0B]" />)}
                </div>
                <span className="font-body text-white/50 text-xs">Trusted on Facebook Marketplace</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-white/30 text-xs">
              © {new Date().getFullYear()} Trash Can Man LLC. All rights reserved.
            </p>
            <p className="font-body text-white/30 text-xs">
              Richmond, VA · trashcanman804@gmail.com
            </p>
          </div>
        </div>
      </footer>

      {/* ── Mobile Sticky CTA Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex gap-3">
        <a href="tel:+18888888888" className="flex-1 flex items-center justify-center gap-2 border-2 border-[#2D7A3A] text-[#2D7A3A] [font-family:'Oswald',sans-serif] font-bold uppercase tracking-wider py-3 rounded-lg text-sm active:scale-95 transition-transform">
          <Phone size={16} /> Call
        </a>
        <a href="#quote" className="flex-1 flex items-center justify-center gap-2 bg-[#2D7A3A] text-white [font-family:'Oswald',sans-serif] font-bold uppercase tracking-wider py-3 rounded-lg text-sm active:scale-95 transition-transform">
          Get Quote <ArrowRight size={16} />
        </a>
      </div>

      {/* ── Pulsing Floating Call Button (mobile only, above sticky bar) ── */}
      <style>{`
        @keyframes tcm-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(45,122,58,0.7); }
          60%  { box-shadow: 0 0 0 14px rgba(45,122,58,0); }
          100% { box-shadow: 0 0 0 0 rgba(45,122,58,0); }
        }
        @keyframes tcm-ring {
          0%,100% { transform: rotate(0deg); }
          10%      { transform: rotate(-15deg); }
          20%      { transform: rotate(15deg); }
          30%      { transform: rotate(-10deg); }
          40%      { transform: rotate(10deg); }
          50%      { transform: rotate(0deg); }
        }
        .tcm-float-btn {
          animation: tcm-pulse 2s ease-out infinite;
        }
        .tcm-float-btn:hover .tcm-ring-icon,
        .tcm-float-btn:focus .tcm-ring-icon {
          animation: tcm-ring 0.6s ease-in-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .tcm-float-btn { animation: none; }
        }
      `}</style>
      <a
        href="tel:+18888888888"
        aria-label="Call (888) 888-8888"
        className="tcm-float-btn fixed z-50 md:hidden"
        style={{
          bottom: '90px',
          right: '20px',
          width: '62px',
          height: '62px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3a9648 0%, #2D7A3A 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 18px rgba(45,122,58,0.45)',
        }}
      >
        <Phone size={22} className="tcm-ring-icon" strokeWidth={2.5} />
        <span style={{ fontSize: '9px', fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1 }}>CALL</span>
      </a>
    </div>
  );
}
