import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-green-600 rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">Major League Vacations</div>
              <div className="text-gray-400 text-sm">Your Wimbledon Experience Specialists</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center text-gray-400 text-sm">
            <p>2805 S Front St, Suite 200, Philadelphia, PA, 19148</p>
            <p className="mt-2">
              <a href="tel:+18002226256" className="hover:text-white transition-colors">800-222-6256</a>
              {' • '}
              <a href="mailto:shantall@mlv.com" className="hover:text-white transition-colors">shantall@mlv.com</a>
              {' • '}
              <a href="http://www.mlv.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.mlv.com</a>
            </p>
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm pt-6 border-t border-slate-800 text-center">
            <p>© 2026 Major League Vacations. All rights reserved.</p>
            <p className="mt-1 text-xs">Wimbledon is a registered trademark of The All England Lawn Tennis Club (Championships) Limited.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}