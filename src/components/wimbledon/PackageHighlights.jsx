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
    title: '5-Star Accommodations',
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
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Championship Experience
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need for an unforgettable Wimbledon journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            const colorClasses = item.color === 'purple' 
              ? 'from-[#1e3a8a] to-[#1e40af] shadow-blue-500/20' 
              : 'from-[#dc2626] to-[#b91c1c] shadow-red-500/20';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-[#dc2626]/50 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses} flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}