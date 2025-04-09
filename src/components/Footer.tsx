
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-10">
      <div className="news-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">AAJTAK</span>
              <span className="ml-1 text-xs font-semibold bg-aajtak text-white rounded px-1 py-0.5">INSIGHTS</span>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Your trusted source for breaking news, analysis, and in-depth coverage of events across India and the world.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-slate-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-slate-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-slate-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-slate-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-slate-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/national" className="text-slate-300 hover:text-white">National</Link></li>
              <li><Link to="/international" className="text-slate-300 hover:text-white">International</Link></li>
              <li><Link to="/sports" className="text-slate-300 hover:text-white">Sports</Link></li>
              <li><Link to="/entertainment" className="text-slate-300 hover:text-white">Entertainment</Link></li>
              <li><Link to="/business" className="text-slate-300 hover:text-white">Business</Link></li>
              <li><Link to="/technology" className="text-slate-300 hover:text-white">Technology</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white">Contact Us</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-slate-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/advertise" className="text-slate-300 hover:text-white">Advertise with Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Download Our App</h4>
            <p className="text-slate-300 text-sm mb-4">
              Stay updated with our mobile app. Get real-time notifications for breaking news.
            </p>
            <div className="flex flex-col space-y-2">
              <Link to="#" className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded text-sm text-center">
                Download on App Store
              </Link>
              <Link to="#" className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded text-sm text-center">
                Get it on Google Play
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-950 py-4">
        <div className="news-container text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Aajtak Insights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
