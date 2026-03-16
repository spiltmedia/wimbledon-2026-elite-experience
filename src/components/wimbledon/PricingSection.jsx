import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MultiStepBookingForm from './MultiStepBookingForm';

const packages = [
  {
    hotel: 'Holiday Inn Bloomsbury',
    location: 'Russell Square',
    rating: '4-Star',
    singlePrice: 6605,
    doublePrice: 5405,
    features: [
      '150m from Russell Square Tube',
      'Walking distance to British Museum',
      'Callaghans Sports Pub on-site',
      '8-9/10 guest ratings',
      'Modern, comfortable rooms'
    ]
  },
  {
    hotel: 'The Welbeck Hotel',
    location: 'Marylebone',
    rating: '4-Star Boutique',
    singlePrice: 6805,
    doublePrice: 5505,
    features: [
      'Prime West End location',
      'Near Selfridges & Oxford Street',
      'Fitness center & wellness focus',
      '8.6/10 guest ratings',
      '164 modern boutique rooms'
    ],
    popular: true
  }
];

const included = [
  'Private roundtrip airport transfers',
  '5 nights hotel accommodation',
  'Daily breakfast',
  'Hop-On/Hop-Off London tour',
  'Wimbledon Centre Court Debenture tickets',
  'All taxes and service fees'
];

export default function PricingSection() {
  const [occupancy, setOccupancy] = useState('double');
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <section id="pricing" className="py-12 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Package Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Transparent pricing for your championship experience
          </p>

          {/* Occupancy Toggle */}
          <div className="inline-flex bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button
              onClick={() => setOccupancy('single')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                occupancy === 'single'
                  ? 'bg-[#dc2626] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Single Occupancy
            </button>
            <button
              onClick={() => setOccupancy('double')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                occupancy === 'double'
                  ? 'bg-[#dc2626] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Double Occupancy
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-slate-800 rounded-2xl overflow-hidden ${
                pkg.popular 
                  ? 'border-2 border-[#dc2626]' 
                  : 'border border-slate-700'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white text-center py-2 font-semibold flex items-center justify-center gap-2">
                  <Star className="w-4 h-4" fill="currentColor" />
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${pkg.popular ? 'pt-16' : ''}`}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.hotel}</h3>
                  <div className="flex items-center gap-3 text-gray-400">
                    <span>{pkg.location}</span>
                    <span>•</span>
                    <span>{pkg.rating}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-5xl font-bold text-white mb-2">
                    ${occupancy === 'single' ? pkg.singlePrice.toLocaleString() : pkg.doublePrice.toLocaleString()}
                  </div>
                  <div className="text-gray-400">per person</div>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-6 text-lg"
                  onClick={() => {
                    const packageId = pkg.hotel.includes('Welbeck') 
                      ? (occupancy === 'single' ? 'welbeck-single' : 'welbeck-double')
                      : (occupancy === 'single' ? 'holiday-inn-single' : 'holiday-inn-double');
                    setSelectedPackage(packageId);
                    setIsBookingFormOpen(true);
                  }}
                >
                  Select This Package
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deposit Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#1e3a8a]/30 to-[#dc2626]/20 border border-[#dc2626]/30 rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Payment Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-800/60 rounded-xl p-5 text-center border border-slate-700">
              <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest mb-2">At Booking</p>
              <div className="text-3xl font-bold text-white mb-1">$1,791</div>
              <p className="text-gray-400 text-sm">per person</p>
              <p className="text-gray-500 text-xs mt-2">($3,582 with CC surcharge)</p>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-5 text-center border border-slate-700">
              <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest mb-2">April 1, 2026</p>
              <div className="text-3xl font-bold text-white mb-1">$1,791</div>
              <p className="text-gray-400 text-sm">per person</p>
              <p className="text-gray-500 text-xs mt-2">Second deposit</p>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-5 text-center border border-slate-700">
              <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest mb-2">May 1, 2026</p>
              <div className="text-3xl font-bold text-white mb-1">Balance</div>
              <p className="text-gray-400 text-sm">remaining amount</p>
              <p className="text-gray-500 text-xs mt-2">Final payment</p>
            </div>
          </div>
          <p className="text-gray-400 text-center text-sm max-w-2xl mx-auto">
            Total deposit: $3,450 per person ($3,582 with CC surcharge) • Split evenly at booking and April 1st
          </p>
        </motion.div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Package Includes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {included.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-center mt-6 italic">
            Flights can be added from your preferred departure city
          </p>
        </motion.div>

        <MultiStepBookingForm 
          isOpen={isBookingFormOpen} 
          onClose={() => {
            setIsBookingFormOpen(false);
            setSelectedPackage(null);
          }}
          preSelectedPackage={selectedPackage}
        />
      </div>
    </section>
  );
}