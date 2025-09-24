import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-white/10 pb-14">
        {/* Brand */}
        <div className="md:max-w-96">
          <img className="w-36 h-auto" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm text-gray-400">
            KINOLLO — online cinema tickets. Browse movies, pick seats, and book instantly.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <img src={assets.googlePlay} alt="google play" className="h-9 w-auto" />
            <img src={assets.appStore} alt="app store" className="h-9 w-auto" />
          </div>
        </div>

        {/* Links + Contacts */}
        <div className="flex-1 flex items-start md:justify-end gap-16 md:gap-28">
          <nav aria-label="Footer">
            <h2 className="font-semibold mb-4">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a className="hover:text-white/90" href="/">Home</a></li>
              <li><a className="hover:text-white/90" href="#about">About us</a></li>
              <li><a className="hover:text-white/90" href="#contact">Contact</a></li>
              <li><a className="hover:text-white/90" href="#privacy">Privacy policy</a></li>
            </ul>
          </nav>

          <div>
            <h2 className="font-semibold mb-4">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>
                <a className="hover:text-white/90" href="tel:+1234567890">
                  +1-234-567-890
                </a>
              </p>
              <p>
                <a className="hover:text-white/90" href="mailto:contact@example.com">
                  contact@example.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center text-sm pb-5 text-gray-400">
        Copyright {new Date().getFullYear()} © KINOLLO. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

