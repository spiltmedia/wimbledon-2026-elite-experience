import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Hotel, Bus, Coffee, Ticket, Shield } from 'lucide-react';

const highlights = [
  {
    icon: Ticket,
    title: 'Centre Court Debenture',
    description: 'Exclusive access to Centre Court with premium seating for the Championships',
    color: 'purple'
  },
  {
    icon: Hotel,
    title: '4-Star Accommodations',
    description: 'Choice of Holiday Inn Bloomsbury or The Welbeck Hotel in prime London locations',
    color: 'green'
  },
  {
    icon: Bus,
    title: 'Private Transfers',
    description: 'Roundtrip airport transfers and seamless transportation throughout your stay',
    color: 'purple'
  },
  {
    icon: Coffee,
    title: 'Daily Breakfast',
    description: 'Start each day with a delicious breakfast at your hotel',
    color: 'green'
  },
  {
    icon: Trophy,
    title: 'VIP Lounge Access',
    description: 'Exclusive access to Debenture Lounges, restaurants, bars, and terrace',
    color: 'purple'
  },
  {
    icon: Shield,
    title: 'All-Inclusive',
    description: 'All taxes, service fees, and Hop-On/Hop-Off London tour included',
    color: 'green'
  }
];

export default function PackageHighlights() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#dc2626]/10 text-[#dc2626] font-semibold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Everything Included</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your Championship Experience
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            Everything you need for an unforgettable Wimbledon journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            const colorClasses = item.color === 'purple' 
              ? 'from-[#1e3a8a] to-[#1e40af]' 
              : 'from-[#dc2626] to-[#b91c1c]';
            const bgTint = item.color === 'purple' ? 'bg-blue-50 border-blue-100' : 'bg-red-50 border-red-100';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${bgTint} border rounded-2xl p-8 hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses} flex items-center justify-center mb-5 shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}