import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Landmark, Camera, Coffee, Trophy, Home, Map, List, Clock, Shirt, ExternalLink } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const itinerary = [
  {
    day: 'Day 1',
    date: 'Friday, June 26',
    title: 'Arrival in London',
    icon: Plane,
    description: 'Arrive in London and enjoy private airport transfers to your centrally located hotel. Settle in and explore your neighborhood or relax with an evening out.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    location: [51.5219, -0.1230],
    travelTime: '45-60 minutes from Heathrow to hotel',
    attire: 'Casual travel attire',
    links: [
      { name: 'Russell Square', url: 'https://www.camden.gov.uk/russell-square' },
      { name: 'Bloomsbury Guide', url: 'https://www.visitlondon.com/things-to-do/place/6081-bloomsbury' }
    ]
  },
  {
    day: 'Day 2',
    date: 'Saturday, June 27',
    title: 'Iconic London',
    icon: Landmark,
    description: 'After breakfast, discover London with a Hop-On/Hop-Off tour. Visit Buckingham Palace, Big Ben, Westminster Abbey, and the River Thames at your own pace.',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80',
    location: [51.5014, -0.1419],
    travelTime: '15 minutes walk to tour starting point',
    attire: 'Comfortable walking shoes, layered clothing, weather-appropriate jacket',
    links: [
      { name: 'Buckingham Palace', url: 'https://www.rct.uk/visit/buckingham-palace' },
      { name: 'Westminster Abbey', url: 'https://www.westminster-abbey.org' },
      { name: 'Hop-On Hop-Off Tours', url: 'https://www.theoriginaltour.com' }
    ]
  },
  {
    day: 'Day 3',
    date: 'Sunday, June 28',
    title: 'Culture & Leisure',
    icon: Camera,
    description: 'Explore London\'s cultural highlights including the British Museum, nearby parks, shopping in Covent Garden, or dining in Marylebone.',
    image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80',
    location: [51.5194, -0.1270],
    travelTime: '5 minutes walk from hotel to British Museum',
    attire: 'Smart casual, comfortable shoes for museum walking',
    links: [
      { name: 'British Museum', url: 'https://www.britishmuseum.org' },
      { name: 'Covent Garden', url: 'https://www.coventgarden.london' },
      { name: 'Marylebone Village', url: 'https://www.marylebonevillage.com' }
    ],
    customHeight: '533px'
  },
  {
    day: 'Day 4',
    date: 'Monday, June 29',
    title: 'London on Your Terms',
    icon: Coffee,
    description: 'A full free day to experience London your way—historic neighborhoods, culinary discoveries, afternoon tea, or simply soaking in the city\'s rhythm.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    location: [51.5155, -0.1415],
    travelTime: 'Flexible - use Oyster Card or travel pass',
    attire: 'Based on your chosen activities (smart for afternoon tea)',
    links: [
      { name: 'London Afternoon Tea Guide', url: 'https://www.visitlondon.com/things-to-do/food-and-drink/afternoon-tea' },
      { name: 'Hyde Park', url: 'https://www.royalparks.org.uk/parks/hyde-park' },
      { name: 'Oxford Street Shopping', url: 'https://www.oxfordstreet.co.uk' }
    ]
  },
  {
    day: 'Day 5',
    date: 'Tuesday, June 30',
    title: 'Wimbledon Championships',
    icon: Trophy,
    description: 'The highlight of your journey! Full day at The All England Club featuring Centre Court Debenture tickets, VIP lounge access, and Men\'s & Ladies\' Singles - 1st Round.',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',
    highlight: true,
    location: [51.4344, -0.2141],
    travelTime: '45-50 minutes via District Line to Southfields station',
    attire: 'Smart casual (collared shirts recommended, no torn jeans). Layers advised for weather changes.',
    links: [
      { name: 'Wimbledon Official Site', url: 'https://www.wimbledon.com' },
      { name: 'All England Club', url: 'https://www.wimbledon.com/en_GB/atoz/all_england_club.html' },
      { name: 'Getting to Wimbledon', url: 'https://www.wimbledon.com/en_GB/visit_and_tickets/guide_to_wimbledon.html' }
    ]
  },
  {
    day: 'Day 6',
    date: 'Wednesday, July 1',
    title: 'Departure',
    icon: Home,
    description: 'Following breakfast, enjoy private transfers to the airport for your onward journey, departing London with unforgettable Wimbledon memories.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    location: [51.4700, -0.4543],
    travelTime: '45-75 minutes to Heathrow (arrive 3 hours before international flights)',
    attire: 'Comfortable travel attire',
    links: [
      { name: 'Heathrow Airport', url: 'https://www.heathrow.com' },
      { name: 'Flight Check-in Times', url: 'https://www.heathrow.com/at-the-airport/flight-connections' }
    ]
  }
];

export default function Itinerary() {
  const [viewMode, setViewMode] = useState('list');

  return (
    <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Your 6-Day Journey
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-6">
            From London's iconic landmarks to Centre Court's championship action
          </p>
          
          {/* View Toggle */}
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'default' : 'outline'}
              className={viewMode === 'list' ? 'bg-[#1e3a8a] hover:bg-[#1e40af]' : 'border-slate-600 text-slate-300 hover:bg-slate-800'}
            >
              <List className="w-4 h-4 mr-2" />
              List View
            </Button>
            <Button
              onClick={() => setViewMode('map')}
              variant={viewMode === 'map' ? 'default' : 'outline'}
              className={viewMode === 'map' ? 'bg-[#1e3a8a] hover:bg-[#1e40af]' : 'border-slate-600 text-slate-300 hover:bg-slate-800'}
            >
              <Map className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>
        </motion.div>

        {viewMode === 'list' ? (
          <div className="space-y-6">
            {itinerary.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl ${
                    item.highlight 
                      ? 'bg-gradient-to-r from-[#1e3a8a]/50 to-[#dc2626]/30 border-2 border-[#dc2626]/50' 
                      : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl ${
                          item.highlight 
                            ? 'bg-gradient-to-br from-[#dc2626] to-[#b91c1c]' 
                            : 'bg-gradient-to-br from-[#1e3a8a] to-[#1e40af]'
                        } flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#dc2626]">{item.day}</div>
                          <div className="text-base font-bold text-white">{item.date}</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-sm mb-4">{item.description}</p>
                      
                      {/* Practical Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start gap-2 text-xs text-gray-400">
                          <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                          <span>{item.travelTime}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-gray-400">
                          <Shirt className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400" />
                          <span>{item.attire}</span>
                        </div>
                      </div>

                      {/* External Links */}
                      {item.links && item.links.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs font-semibold text-gray-400 mb-1">Useful Links:</div>
                          {item.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>{link.name}</span>
                            </a>
                          ))}
                        </div>
                      )}
                      
                      {item.highlight && (
                        <div className="mt-4 pt-4 border-t border-slate-700 space-y-1">
                          <div className="flex items-center gap-2 text-xs text-green-400">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            <span>Debenture tickets on Centre Court</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-green-400">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            <span>Access to exclusive VIP lounges & restaurants</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-green-400">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            <span>£15 Travel Card included</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image */}
                    <div className="relative h-48 lg:h-auto rounded-xl overflow-hidden" style={item.customHeight ? { height: item.customHeight } : {}}>
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.highlight && (
                        <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 px-4 py-2 rounded-full font-bold text-sm">
                          Championship Day
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-slate-700"
          >
            <div style={{ height: '600px' }}>
              <MapContainer
                center={[51.5074, -0.1278]}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {itinerary.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Marker key={index} position={item.location}>
                      <Popup>
                        <div className="p-2 max-w-xs">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-8 h-8 rounded-lg ${
                            item.highlight 
                              ? 'bg-gradient-to-br from-[#dc2626] to-[#b91c1c]' 
                              : 'bg-gradient-to-br from-[#1e3a8a] to-[#1e40af]'
                          } flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#dc2626]">{item.day}</div>
                            <div className="text-sm font-bold">{item.title}</div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{item.date}</p>
                        <p className="text-xs mb-2">{item.description}</p>

                        <div className="space-y-1 mb-2">
                          <div className="flex items-start gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3 mt-0.5" />
                            <span>{item.travelTime}</span>
                          </div>
                          <div className="flex items-start gap-1 text-xs text-gray-600">
                            <Shirt className="w-3 h-3 mt-0.5" />
                            <span>{item.attire}</span>
                          </div>
                        </div>

                        {item.links && item.links.length > 0 && (
                          <div className="border-t pt-1 mt-2">
                            {item.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>{link.name}</span>
                              </a>
                            ))}
                          </div>
                        )}

                        {item.highlight && (
                          <div className="mt-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                            Championship Day
                          </div>
                        )}
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}