import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Dumbbell, Coffee, Utensils, Clock, Award } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import TestimonialCarousel from './TestimonialCarousel';

const hotels = [
  {
    name: 'Holiday Inn London - Bloomsbury',
    location: 'Russell Square, Bloomsbury',
    rating: 8.5,
    stars: 4,
    image: 'https://digital.ihg.com/is/image/ihg/holiday-inn-london-5572933831-4x3',
    heroImage: 'https://digital.ihg.com/is/image/ihg/holiday-inn-london-6240528914-16x5',
    description: 'A modern 4-star hotel perfectly positioned in the heart of historic Bloomsbury, just steps from the British Museum and London\'s most iconic attractions.',
    highlights: [
      'Only 150m from Russell Square Tube Station',
      'Walking distance to British Museum & West End',
      'Direct Piccadilly Line to Heathrow Airport',
      'Rated "Very Good" by thousands of guests',
      'Recently renovated rooms & facilities'
    ],
    amenities: [
      { icon: Wifi, label: 'Free WiFi' },
      { icon: Coffee, label: 'Daily Breakfast' },
      { icon: Utensils, label: 'Callaghans Sports Pub' },
      { icon: Clock, label: '24/7 Front Desk' }
    ],
    testimonial: '"Excellent location in Bloomsbury, helpful staff, and high-quality breakfast. Perfect base for exploring London!"',
    reviewCount: '2,400+ reviews'
  },
  {
    name: 'The Welbeck Hotel',
    location: 'Marylebone, West End',
    rating: 8.6,
    stars: 4,
    image: 'https://thewelbeckhotel.com/wp-content/uploads/2024/09/10e26babc2154ce6e14e07076212c675.jpeg',
    heroImage: 'https://thewelbeckhotel.com/wp-content/uploads/2024/11/IHG_Deluxe-Room-4-1800x1027.jpg',
    description: 'A sophisticated 4-star boutique hotel in London\'s prestigious Marylebone district, offering 164 modern rooms with wellness-focused amenities and prime West End access.',
    highlights: [
      'Prime West End location near Oxford Circus',
      'Steps from Selfridges & Oxford Street shopping',
      'Close to Hyde Park & Regent\'s Park',
      'Rated "Excellent" with 8.6/10 guest score',
      '164 contemporary boutique rooms'
    ],
    amenities: [
      { icon: Dumbbell, label: 'Fitness Center' },
      { icon: Coffee, label: 'Elegant Lounge' },
      { icon: Wifi, label: 'Free WiFi' },
      { icon: Award, label: 'Boutique Service' }
    ],
    testimonial: '"Exceptional West End location, beautiful modern rooms, and outstanding service. The perfect London luxury base!"',
    reviewCount: '1,800+ reviews',
    premium: true
  }
];

export default function HotelShowcase() {
  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const allTestimonials = await base44.entities.Testimonial.filter({ is_active: true });
      return allTestimonials;
    }
  });

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your London Accommodations
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose from two exceptional 4-star hotels in prime Central London locations
          </p>
        </motion.div>

        <div className="space-y-16">
          {hotels.map((hotel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative overflow-hidden rounded-3xl ${
                hotel.premium 
                  ? 'bg-gradient-to-br from-[#1e3a8a]/40 to-slate-800 border-2 border-[#dc2626]/30' 
                  : 'bg-slate-800 border border-slate-700'
              }`}
            >
              {hotel.premium && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white px-4 py-2 rounded-full font-semibold text-sm z-10 shadow-lg">
                  Most Popular Choice
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Gallery */}
                <div className="relative h-96 lg:h-auto">
                  <img 
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-6 left-6 bg-white rounded-xl px-4 py-3 shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                      <span className="text-2xl font-bold text-slate-900">{hotel.rating}</span>
                      <span className="text-gray-600">/10</span>
                    </div>
                    <div className="text-xs text-gray-600">{hotel.reviewCount}</div>
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{hotel.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    {hotel.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {hotel.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {hotel.amenities.map((amenity, i) => {
                      const Icon = amenity.icon;
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#1e3a8a]/20 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-[#1e3a8a]" />
                          </div>
                          <span className="text-gray-300 text-sm">{amenity.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Testimonials Carousel */}
                  <TestimonialCarousel 
                    testimonials={testimonials.filter(t => 
                      t.hotel === hotel.name || t.hotel === 'Both'
                    )} 
                  />
                </div>
              </div>

              {/* Room Preview */}
              <div className="relative h-48 border-t border-slate-700">
                <img 
                  src={hotel.heroImage}
                  alt={`${hotel.name} rooms`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent flex items-center">
                  <div className="px-8">
                    <p className="text-white font-semibold text-lg">Comfortable Modern Rooms</p>
                    <p className="text-gray-300 text-sm">Designed for your London experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-lg">
            Both hotels offer exceptional Central London locations, making it easy to experience 
            <br className="hidden md:block" />
            everything from world-class museums to West End shows, all while staying minutes from Wimbledon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}