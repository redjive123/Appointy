import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-neutral-200 pt-12 pb-8 text-neutral-600">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-start">
        {/* Brand & Description */}
        <div className="md:col-span-6 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img className="h-8 w-auto object-contain" src={assets.logo} alt="Appointy" />
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-md font-normal">
            Appointy is a modern clinical scheduling infrastructure connecting verified healthcare professionals with patients worldwide. Book specialist consultations, manage medical appointments, and access clinical care with precision.
          </p>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-neutral-500 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            All Clinical Systems Operational
          </div>
        </div>

        {/* Company Links */}
        <div className="md:col-span-3 flex flex-col gap-2.5">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-semibold mb-1">Navigation</p>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm">
            <li><Link to="/" onClick={() => scrollTo(0, 0)} className="hover:text-neutral-950 transition-colors">Home</Link></li>
            <li><Link to="/doctors" onClick={() => scrollTo(0, 0)} className="hover:text-neutral-950 transition-colors">All Doctors</Link></li>
            <li><Link to="/about" onClick={() => scrollTo(0, 0)} className="hover:text-neutral-950 transition-colors">About Appointy</Link></li>
            <li><Link to="/contact" onClick={() => scrollTo(0, 0)} className="hover:text-neutral-950 transition-colors">Clinical Offices & Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="md:col-span-3 flex flex-col gap-2.5">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-semibold mb-1">Support & Inquiries</p>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm">
            <li className="font-mono text-xs">+91 (22) 5555-0199</li>
            <li className="font-mono text-xs">support@appointy.health</li>
            <li className="text-xs text-neutral-400">Available 24/7 for patient emergency coordination</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Appointy Healthcare Inc. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs">
          <span className="hover:text-neutral-800 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-neutral-800 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-neutral-800 cursor-pointer">HIPAA Compliance</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
