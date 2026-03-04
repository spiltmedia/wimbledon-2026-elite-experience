import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { base44 } from '@/api/base44Client';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('exitIntentShown');
    if (alreadyShown) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.Inquiry.create({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: 'Exit intent popup - $200 off exclusive offer request',
      status: 'new'
    });
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-md bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Red Banner */}
          <div className="bg-[#dc2626] px-6 py-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Gift className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg uppercase tracking-widest">Exclusive Offer</span>
            </div>
            <p className="text-white/80 text-sm">Before you go...</p>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="text-6xl font-black text-white mb-1">$200 OFF</div>
                  <p className="text-gray-300 text-sm">your Wimbledon 2026 land package</p>
                  <p className="text-gray-500 text-xs mt-2">Fill in your details and we'll send your exclusive discount code.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-gray-300 text-sm mb-1 block">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        required
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-gray-500 focus:border-[#dc2626]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 text-sm mb-1 block">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-gray-500 focus:border-[#dc2626]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 text-sm mb-1 block">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        required
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-gray-500 focus:border-[#dc2626]"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-3 text-base mt-2"
                  >
                    {isSubmitting ? 'Claiming...' : 'Claim My $200 Discount'}
                  </Button>
                </form>

                <p className="text-center text-gray-600 text-xs mt-4">
                  No spam. We'll only contact you about your offer.
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You're all set!</h3>
                <p className="text-gray-400 text-sm">
                  Our team will reach out shortly with your exclusive $200 discount code.
                </p>
                <Button
                  onClick={() => setIsVisible(false)}
                  className="mt-6 bg-slate-700 hover:bg-slate-600 text-white"
                >
                  Continue Browsing
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}