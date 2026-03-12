import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Send, CheckCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MultiStepBookingForm from './MultiStepBookingForm';
import { base44 } from '@/api/base44Client';

export default function CTASection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.Inquiry.create({ ...formData, package_interest: 'General Inquiry' });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: headline + contact */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <span className="inline-block bg-[#dc2626] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 w-fit">
                Limited Availability
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Ready for<br />Wimbledon 2026?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Seats are filling fast. Send us a message and our team will personally reach out within 24 hours to walk you through the packages.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-white text-[#1e3a8a] hover:bg-gray-100 text-base px-8 py-5 h-auto shadow-xl font-bold w-fit"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Package Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 bg-transparent text-white hover:bg-white/10 text-base px-8 py-5 h-auto w-fit"
                  onClick={() => window.scrollTo({ top: document.getElementById('pricing').offsetTop - 100, behavior: 'smooth' })}
                >
                  View Packages & Pricing
                </Button>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3 text-gray-300 text-sm">
                <a href="mailto:shantall@mlv.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#dc2626]" /> shantall@mlv.com
                </a>
                <a href="tel:+18002226256" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#dc2626]" /> 800-222-6256 ext. 200
                </a>
                <a href="tel:+12673833665" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#dc2626]" /> 267-383-3665
                </a>
                <p className="text-gray-400 text-xs pt-1">Mon–Fri | 9am–5pm EST</p>
              </div>
            </div>

            {/* Right: inline contact form */}
            <div className="bg-white/5 backdrop-blur-sm border-l border-white/10 p-10 lg:p-14 flex flex-col justify-center">
              {!isSuccess ? (
                <>
                  <h3 className="text-2xl font-bold text-white mb-1">Send Us a Message</h3>
                  <p className="text-gray-400 text-sm mb-6">We'll get back to you within 24 hours.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
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
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="Phone number (optional)"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                      />
                    </div>
                    <textarea
                      required
                      placeholder="Tell us which package interests you, your travel dates, group size, or any questions..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all resize-none"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-5 h-auto text-base font-bold shadow-lg"
                    >
                      {isSubmitting ? 'Sending...' : (
                        <><Send className="w-4 h-4 mr-2" /> Send My Inquiry</>
                      )}
                    </Button>
                    <p className="text-center text-gray-400 text-xs">
                      No spam. We'll only contact you about your Wimbledon inquiry.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                  <p className="text-gray-300 mb-6">Our team will reach out within 24 hours to discuss your Wimbledon experience.</p>
                  <Button
                    className="bg-white text-[#1e3a8a] hover:bg-gray-100 font-bold"
                    onClick={() => setIsFormOpen(true)}
                  >
                    <Calendar className="w-4 h-4 mr-2" /> Book Your Package Now
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <MultiStepBookingForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
}