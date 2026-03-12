import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Send, CheckCircle, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MultiStepBookingForm from './MultiStepBookingForm';
import { base44 } from '@/api/base44Client';

function useCountdown(targetDate) {
  const calculate = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calculate);
  useEffect(() => {
    const id = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl w-16 md:w-20 h-16 md:h-20 flex items-center justify-center shadow-lg">
        <span className="text-2xl md:text-4xl font-bold text-white tabular-nums leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[10px] md:text-xs uppercase tracking-widest text-gray-300 font-semibold">{label}</span>
    </div>
  );
}

export default function Hero() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const countdown = useCountdown('2026-06-26T09:00:00');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleQuickInquiry = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.Inquiry.create({ ...formData, message: 'Quick inquiry from hero banner', package_interest: 'General Inquiry' });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="relative min-h-[85vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698df621cc553bf3c1408272/060d5b9a6_2AE918C9-AFC6-4E03-8557-9F59A916490E.png"
          alt="Wimbledon Tennis"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-[#1e3a8a]/40 to-[#0f172a]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <img
                  src="https://mlv.com/wp-content/uploads/2021/10/MLV_Logo.png.webp"
                  alt="Major League Vacations"
                  className="h-20"
                />
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                Wimbledon 2026
                <span className="block text-[#dc2626]">Centre Court</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-6">
                5 Nights in London | Exclusive Debenture Tickets | VIP Access
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-200">
                  <Calendar className="w-4 h-4 text-[#dc2626]" />
                  <span className="text-sm font-medium">June 26 – July 1, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <MapPin className="w-4 h-4 text-[#dc2626]" />
                  <span className="text-sm font-medium">London, England</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white text-base px-6 py-5 h-auto shadow-xl"
                  onClick={() => setIsFormOpen(true)}
                >
                  Book Your Package
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-900 backdrop-blur-sm text-base px-6 py-5 h-auto"
                  onClick={() => window.scrollTo({ top: document.getElementById('pricing').offsetTop - 100, behavior: 'smooth' })}
                >
                  View Packages
                </Button>
              </div>

              {/* Countdown */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
                <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">⏳ Tournament begins in</p>
                <div className="flex items-center gap-2 md:gap-3">
                  <CountdownUnit value={countdown.days} label="Days" />
                  <span className="text-white/40 text-2xl font-light mb-4">:</span>
                  <CountdownUnit value={countdown.hours} label="Hours" />
                  <span className="text-white/40 text-2xl font-light mb-4">:</span>
                  <CountdownUnit value={countdown.minutes} label="Min" />
                  <span className="text-white/40 text-2xl font-light mb-4">:</span>
                  <CountdownUnit value={countdown.seconds} label="Sec" />
                </div>
                <p className="text-gray-300 mt-4 text-base">
                  Packages from <span className="text-2xl font-bold text-white">$5,555</span> per person
                </p>
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-[#0f172a]/90 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                {!isSuccess ? (
                  <>
                    <h3 className="text-xl font-bold text-white mb-1">Reserve Your Spot</h3>
                    <p className="text-gray-300 text-sm mb-5">Leave your details and we'll reach out within 24 hours.</p>
                    <form onSubmit={handleQuickInquiry} className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="Email address"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="tel"
                          placeholder="Phone number (optional)"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-5 h-auto text-base font-bold shadow-lg mt-1"
                      >
                        {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Get More Information</>}
                      </Button>
                    </form>
                    <div className="mt-5 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-3 text-xs text-gray-400 justify-center">
                      <a href="tel:+18002226256" className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Phone className="w-3 h-3" /> 800-222-6256
                      </a>
                      <a href="mailto:shantall@mlv.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Mail className="w-3 h-3" /> shantall@mlv.com
                      </a>
                    </div>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                    <p className="text-gray-300 text-sm mb-5">Our team will reach out within 24 hours.</p>
                    <Button className="bg-white text-[#1e3a8a] hover:bg-gray-100 font-bold" onClick={() => setIsFormOpen(true)}>
                      <Calendar className="w-4 h-4 mr-2" /> Book Now
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>

      <MultiStepBookingForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}