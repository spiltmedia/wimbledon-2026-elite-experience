import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

const itineraryData = [
  { day: 'Day 1', date: 'Friday, June 26', title: 'Arrival in London', description: 'Arrive in London and enjoy private airport transfers to your centrally located hotel. Settle in and explore your neighborhood or relax with an evening out.', travelTime: '45-60 minutes from Heathrow to hotel', attire: 'Casual travel attire' },
  { day: 'Day 2', date: 'Saturday, June 27', title: 'Iconic London', description: 'After breakfast, discover London with a Hop-On/Hop-Off tour. Visit Buckingham Palace, Big Ben, Westminster Abbey, and the River Thames at your own pace.', travelTime: '15 minutes walk to tour starting point', attire: 'Comfortable walking shoes, layered clothing, weather-appropriate jacket' },
  { day: 'Day 3', date: 'Sunday, June 28', title: 'Culture & Leisure', description: "Explore London's cultural highlights including the British Museum, nearby parks, shopping in Covent Garden, or dining in Marylebone.", travelTime: '5 minutes walk from hotel to British Museum', attire: 'Smart casual, comfortable shoes for museum walking' },
  { day: 'Day 4', date: 'Monday, June 29', title: 'London on Your Terms', description: "A full free day to experience London your way—historic neighborhoods, culinary discoveries, afternoon tea, or simply soaking in the city's rhythm.", travelTime: 'Flexible - use Oyster Card or travel pass', attire: 'Based on your chosen activities (smart for afternoon tea)' },
  { day: 'Day 5', date: 'Tuesday, June 30', title: 'Wimbledon Championships', description: "The highlight of your journey! Full day at The All England Club featuring Centre Court Debenture tickets, VIP lounge access, and Men's & Ladies' Singles - 1st Round.", travelTime: '45-50 minutes via District Line to Southfields station', attire: 'Smart casual (collared shirts recommended, no torn jeans). Layers advised for weather changes.', highlight: true },
  { day: 'Day 6', date: 'Wednesday, July 1', title: 'Departure', description: 'Following breakfast, enjoy private transfers to the airport for your onward journey, departing London with unforgettable Wimbledon memories.', travelTime: '45-75 minutes to Heathrow (arrive 3 hours before international flights)', attire: 'Comfortable travel attire' },
];

const hotels = [
  { name: 'Holiday Inn London – Bloomsbury', location: 'Russell Square, Bloomsbury', stars: 4, rating: '8.5/10', highlights: ['150m from Russell Square Tube Station', 'Walking distance to British Museum & West End', 'Direct Piccadilly Line to Heathrow', 'Recently renovated rooms & facilities'] },
  { name: 'The Welbeck Hotel', location: 'Marylebone, West End', stars: 4, rating: '8.6/10', highlights: ['Prime West End location near Oxford Circus', 'Steps from Selfridges & Oxford Street shopping', 'Close to Hyde Park & Regent\'s Park', '164 contemporary boutique rooms'] },
];

const packageHighlights = [
  'Centre Court Debenture Seats – Men\'s & Ladies\' Singles 1st Round (June 30)',
  'Access to exclusive VIP lounges & restaurants at The All England Club',
  '5 nights in a 4-star Central London hotel (choice of two)',
  'Private airport transfers on arrival and departure',
  'London Hop-On/Hop-Off bus tour included',
  '£15 Travel Card for London transport',
  'Daily breakfast at your hotel',
  'Dedicated trip support from Major League Vacations',
];

export default function DownloadItineraryButton() {
  const [loading, setLoading] = useState(false);

  const generatePDF = () => {
    setLoading(true);
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = 210;
    const pageH = 297;
    const margin = 18;
    const contentW = pageW - margin * 2;

    const colors = {
      navy: [30, 58, 138],
      red: [220, 38, 38],
      dark: [15, 23, 42],
      gray: [100, 116, 139],
      lightGray: [241, 245, 249],
      white: [255, 255, 255],
      gold: [234, 179, 8],
    };

    const addPage = () => {
      doc.addPage();
      return margin;
    };

    // ── COVER PAGE ──────────────────────────────────────────────
    doc.setFillColor(...colors.dark);
    doc.rect(0, 0, pageW, pageH, 'F');

    // Red accent strip
    doc.setFillColor(...colors.red);
    doc.rect(0, 0, pageW, 6, 'F');
    doc.rect(0, pageH - 6, pageW, 6, 'F');

    // Main title block
    doc.setFillColor(...colors.navy);
    doc.roundedRect(margin, 60, contentW, 90, 4, 4, 'F');

    doc.setTextColor(...colors.gold);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('MAJOR LEAGUE VACATIONS PRESENTS', pageW / 2, 80, { align: 'center' });

    doc.setTextColor(...colors.white);
    doc.setFontSize(28);
    doc.text('WIMBLEDON 2026', pageW / 2, 100, { align: 'center' });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('LAND PACKAGE', pageW / 2, 112, { align: 'center' });

    doc.setFillColor(...colors.red);
    doc.roundedRect(pageW / 2 - 40, 122, 80, 14, 3, 3, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('6 DAYS · JUNE 26 – JULY 1, 2026', pageW / 2, 130.5, { align: 'center' });

    // Tagline
    doc.setTextColor(...colors.gray);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Centre Court Debenture Seats · VIP Lounge Access · Private Transfers', pageW / 2, 175, { align: 'center' });

    // Contact footer
    doc.setTextColor(...colors.gray);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('majorleaguevacations.com  ·  info@majorleaguevacations.com', pageW / 2, pageH - 20, { align: 'center' });

    // ── PAGE 2: PACKAGE HIGHLIGHTS ──────────────────────────────
    let y = addPage();

    // Header bar
    doc.setFillColor(...colors.navy);
    doc.rect(0, 0, pageW, 22, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('PACKAGE HIGHLIGHTS', margin, 14);
    doc.setFillColor(...colors.red);
    doc.rect(pageW - margin - 30, 6, 30, 10, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('WIMBLEDON 2026', pageW - margin - 15, 12, { align: 'center' });

    y = 36;
    packageHighlights.forEach((item, i) => {
      doc.setFillColor(...colors.lightGray);
      doc.roundedRect(margin, y, contentW, 14, 2, 2, 'F');
      doc.setFillColor(...colors.red);
      doc.circle(margin + 6, y + 7, 2.5, 'F');
      doc.setTextColor(...colors.white);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.text(`${i + 1}`, margin + 6, y + 8, { align: 'center' });
      doc.setTextColor(...colors.dark);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(item, contentW - 20);
      doc.text(lines[0], margin + 14, y + 8.5);
      y += 18;
    });

    // ── PAGE 3: HOTELS ──────────────────────────────────────────
    y = addPage();

    doc.setFillColor(...colors.navy);
    doc.rect(0, 0, pageW, 22, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('YOUR LONDON ACCOMMODATIONS', margin, 14);

    y = 34;
    hotels.forEach((hotel) => {
      // Card
      doc.setFillColor(...colors.lightGray);
      doc.roundedRect(margin, y, contentW, 72, 3, 3, 'F');
      doc.setFillColor(...colors.navy);
      doc.roundedRect(margin, y, contentW, 16, 3, 3, 'F');
      doc.rect(margin, y + 10, contentW, 6, 'F'); // square bottom corners

      doc.setTextColor(...colors.white);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(hotel.name, margin + 6, y + 10.5);

      doc.setTextColor(...colors.gray);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`${hotel.location}  ·  ${hotel.stars}★  ·  Rated ${hotel.rating}`, margin + 6, y + 22);

      let hy = y + 30;
      hotel.highlights.forEach((h) => {
        doc.setFillColor(...colors.navy);
        doc.circle(margin + 6, hy, 1.5, 'F');
        doc.setTextColor(...colors.dark);
        doc.setFontSize(9);
        doc.text(h, margin + 12, hy + 1);
        hy += 9;
      });

      y += 82;
    });

    // ── PAGES 4+: ITINERARY ─────────────────────────────────────
    y = addPage();

    doc.setFillColor(...colors.navy);
    doc.rect(0, 0, pageW, 22, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('6-DAY ITINERARY', margin, 14);

    y = 32;
    itineraryData.forEach((item) => {
      const cardH = 68;
      if (y + cardH > pageH - 20) {
        y = addPage();
        doc.setFillColor(...colors.navy);
        doc.rect(0, 0, pageW, 22, 'F');
        doc.setTextColor(...colors.white);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('6-DAY ITINERARY (continued)', margin, 14);
        y = 32;
      }

      // Card background
      const bgColor = item.highlight ? [30, 58, 138] : colors.lightGray;
      doc.setFillColor(...bgColor);
      doc.roundedRect(margin, y, contentW, cardH, 3, 3, 'F');

      // Day pill
      const pillColor = item.highlight ? colors.gold : colors.red;
      doc.setFillColor(...pillColor);
      doc.roundedRect(margin + 4, y + 5, 28, 10, 2, 2, 'F');
      doc.setTextColor(item.highlight ? colors.dark : colors.white);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.text(item.day.toUpperCase(), margin + 18, y + 11.5, { align: 'center' });

      // Date & title
      const textColor = item.highlight ? colors.white : colors.dark;
      doc.setTextColor(...textColor);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(item.date, margin + 38, y + 10);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text(item.title, margin + 38, y + 20);

      // Description
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(item.highlight ? [203, 213, 225] : colors.gray);
      const descLines = doc.splitTextToSize(item.description, contentW - 44);
      doc.text(descLines.slice(0, 2), margin + 4, y + 32);

      // Travel & attire
      const detailColor = item.highlight ? [148, 163, 184] : colors.gray;
      doc.setTextColor(...detailColor);
      doc.setFontSize(7.5);
      doc.text(`⏱  ${item.travelTime}`, margin + 4, y + 50);
      const attireLines = doc.splitTextToSize(`👔  ${item.attire}`, contentW - 10);
      doc.text(attireLines[0], margin + 4, y + 58);

      if (item.highlight) {
        doc.setTextColor(...colors.gold);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.text('★ CHAMPIONSHIP DAY', pageW - margin - 4, y + 10, { align: 'right' });
      }

      y += cardH + 6;
    });

    // ── FINAL PAGE: FOOTER ───────────────────────────────────────
    if (y + 40 > pageH - 20) y = addPage();
    y += 10;
    doc.setFillColor(...colors.navy);
    doc.roundedRect(margin, y, contentW, 30, 3, 3, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Ready to book? Contact us today.', pageW / 2, y + 11, { align: 'center' });
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor([147, 197, 253]);
    doc.text('majorleaguevacations.com  ·  info@majorleaguevacations.com', pageW / 2, y + 22, { align: 'center' });

    doc.save('Wimbledon-2026-Itinerary.pdf');
    setLoading(false);
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={loading}
      className="bg-white text-[#1e3a8a] hover:bg-gray-100 font-bold px-6 py-3 text-base shadow-lg"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      ) : (
        <Download className="w-5 h-5 mr-2" />
      )}
      Download Itinerary
    </Button>
  );
}