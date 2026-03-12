import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Search, X } from 'lucide-react';

const faqs = [
  {
    category: 'Tickets & Access',
    questions: [
      {
        q: 'What are Debenture tickets and how are they different from regular tickets?',
        a: "Debenture tickets are privately owned, premium seats for Centre Court at Wimbledon. Unlike ballot tickets, Debentures guarantee the same seat for every session across the entire Championships. They also come with exclusive access to the Debenture Holders' Lounge, private restaurants, bars, and a members-only terrace — a level of access simply not available with standard tickets."
      },
      {
        q: 'Which day of play is included in the package?',
        a: 'Your package includes tickets for Centre Court on July 1, 2026 — the final Saturday of the Championships, which historically features top-tier quarterfinal or semifinal matches. This is widely considered one of the most exciting days of the entire tournament.'
      },
      {
        q: 'Are tickets transferable or can I choose my seats?',
        a: 'As Debenture holders, your seats are fixed and guaranteed for the session. They are located in the premium Debenture section of Centre Court, offering excellent sightlines of the entire court. These cannot be exchanged for different seats.'
      },
    ]
  },
  {
    category: 'Travel & Logistics',
    questions: [
      {
        q: 'What does "private transfers" include exactly?',
        a: 'Your package includes roundtrip airport transfers between London Heathrow (or Gatwick) and your hotel, plus a private motorcoach from the hotel to Wimbledon and back on match day. All logistics are handled — you simply show up and enjoy.'
      },
      {
        q: 'Do I need a visa to travel to the UK?',
        a: 'US and Canadian citizens do not currently require a visa for short stays in the UK (up to 6 months). However, the UK is introducing an Electronic Travel Authorisation (ETA) requirement. We recommend checking the UK government website or contacting us closer to the travel date for the latest requirements.'
      },
      {
        q: 'Is daily breakfast really included every day?',
        a: 'Yes! A full English breakfast is included every morning of your stay at whichever hotel you choose. It\'s a wonderful way to start each day before exploring London or heading to the Championships.'
      },
    ]
  },
  {
    category: 'Booking & Payment',
    questions: [
      {
        q: 'How much is the deposit and when is full payment due?',
        a: 'A deposit of $500 per person secures your spot. The remaining balance is due 90 days prior to departure (around late March 2026). We accept all major credit cards and can discuss payment plans on a case-by-case basis — just reach out to our team.'
      },
      {
        q: 'What happens if Wimbledon is cancelled or postponed?',
        a: 'In the extremely unlikely event of a full cancellation or postponement by the All England Club, we will work with you to either rebook for the rescheduled dates or provide a full refund of all amounts paid. Your investment is protected.'
      },
      {
        q: 'How many spots are still available?',
        a: 'Availability is very limited — we have a small number of packages remaining across both hotels. Debenture tickets are finite and highly sought after. We recommend reserving your spot as soon as possible to avoid disappointment. Contact us today to confirm current availability.'
      },
      {
        q: 'Can I customize the package (extra nights, different flights, etc.)?',
        a: 'Absolutely. Our team at Major League Vacations specializes in bespoke travel experiences. Whether you want to extend your stay, add pre/post-trip excursions around the UK, or arrange premium flights, we can tailor a package to fit your needs. Just get in touch and we\'ll make it happen.'
      },
    ]
  }
];

export default function FAQSection() {
  const [query, setQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return faqs;
    const q = query.toLowerCase();
    return faqs
      .map(group => ({
        ...group,
        questions: group.questions.filter(
          item => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
        ),
      }))
      .filter(group => group.questions.length > 0);
  }, [query]);

  const totalResults = filteredFaqs.reduce((acc, g) => acc + g.questions.length, 0);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-[#1e3a8a]/10 text-[#1e3a8a] font-semibold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Everything you need to know before booking your Wimbledon 2026 experience.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-10"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions — e.g. "visa", "deposit", "tickets"..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm text-slate-800 placeholder-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/30 focus:border-[#1e3a8a]/50 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {query && (
            <p className="text-sm text-slate-400 mt-2 pl-1">
              {totalResults > 0
                ? `${totalResults} result${totalResults !== 1 ? 's' : ''} found`
                : 'No results found — try a different keyword'}
            </p>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredFaqs.length > 0 ? (
            <motion.div
              key={query}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {filteredFaqs.map((group, gi) => (
                <div key={gi}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#dc2626] mb-3 pl-1">
                    {group.category}
                  </h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {group.questions.map((item, qi) => (
                      <AccordionItem
                        key={qi}
                        value={`${gi}-${qi}`}
                        className="bg-white border border-slate-200 rounded-xl px-6 shadow-sm data-[state=open]:border-[#1e3a8a]/30 data-[state=open]:shadow-md transition-all"
                      >
                        <AccordionTrigger className="text-left text-slate-900 font-semibold text-base hover:no-underline py-5">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-base">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-slate-400"
            >
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No matching questions found.</p>
              <p className="text-sm mt-1">Try searching with different keywords or browse all questions by clearing the search.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-slate-500 mt-10"
        >
          Still have questions?{' '}
          <a href="mailto:shantall@mlv.com" className="text-[#dc2626] font-semibold hover:underline">
            Email our team
          </a>{' '}
          or call{' '}
          <a href="tel:+18002226256" className="text-[#dc2626] font-semibold hover:underline">
            800-222-6256
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}