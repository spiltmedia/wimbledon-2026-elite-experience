import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MultiStepBookingForm from './MultiStepBookingForm';

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

  return (
    <div className="relative h-[85vh] overflow-hidden">
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
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="https://mlv.com/wp-content/uploads/2021/10/MLV_Logo.png.webp"
                alt="Major League Vacations"
                className="h-24 mx-auto"
              />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Wimbledon 2026
              <span className="block text-[#dc2626]">
                Centre Court Experience
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              5 Nights in London | Exclusive Debenture Tickets | VIP Access
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-gray-200">
                <Calendar className="w-5 h-5 text-[#dc2626]" />
                <span className="font-medium">June 26 - July 1, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <MapPin className="w-5 h-5 text-[#dc2626]" />
                <span className="font-medium">London, England</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white text-lg px-8 py-6 h-auto shadow-xl"
                onClick={() => setIsFormOpen(true)}
              >
                Book Your Package
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-slate-900 backdrop-blur-sm text-lg px-8 py-6 h-auto transition-all"
                onClick={() => window.scrollTo({ top: document.getElementById('pricing').offsetTop - 100, behavior: 'smooth' })}
              >
                View Packages
              </Button>
            </div>

            {/* Pricing Teaser */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12"
            >
              <p className="text-gray-300 text-lg">
                Packages from <span className="text-3xl font-bold text-white">$5,555</span> per person
              </p>
            </motion.div>
          </motion.div>
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