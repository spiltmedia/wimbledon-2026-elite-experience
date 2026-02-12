import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MultiStepBookingForm from './MultiStepBookingForm';

export default function CTASection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="py-12 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-900 to-green-900 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready for Wimbledon 2026?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Secure your spot for the championship experience of a lifetime. Limited availability!
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-10 py-6 h-auto shadow-xl hover:text-purple-900"
              onClick={() => setIsFormOpen(true)}
            >
              <Calendar className="w-5 h-5 mr-2 text-purple-900" />
              Book Your Package
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 text-lg px-10 py-6 h-auto transition-all"
              onClick={() => window.scrollTo({ top: document.getElementById('pricing').offsetTop - 100, behavior: 'smooth' })}
            >
              <Mail className="w-5 h-5 mr-2" />
              View Packages
            </Button>
          </div>

          {/* Contact Information */}
          <div className="border-t border-white/20 pt-8">
            <p className="text-white font-semibold mb-4">Questions? We're here to help!</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-200">
              <a 
                href="mailto:shantall@mlv.com" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>shantall@mlv.com</span>
              </a>
              <div className="hidden sm:block text-white/40">|</div>
              <a 
                href="tel:+18002226256" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>800-222-6256 ext. 200</span>
              </a>
              <div className="hidden sm:block text-white/40">|</div>
              <a 
                href="tel:+12673833665" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>267-383-3665</span>
              </a>
            </div>
            <p className="text-gray-300 text-sm mt-4">
              Office Hours: Monday to Friday | 9am - 5pm EST
            </p>
          </div>
        </motion.div>
      </div>

      <MultiStepBookingForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
}