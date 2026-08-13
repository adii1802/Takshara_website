import React from 'react';
import { Link } from 'react-router-dom';
import logoTak from '../../assets/logo_tak.png';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low pt-margin-desktop pb-gutter">
      <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-margin-desktop">
          {/* Brand Info */}
          <div className="flex flex-col gap-gutter lg:col-span-1">
            <div className="flex items-center gap-base">
              <img
                alt="Takshara Technologies"
                className="h-7 w-auto object-contain rounded"
                src={logoTak}
              />
              <span className="font-headline-md text-headline-md text-on-surface font-bold">Takshara</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              India’s trusted payment &amp; payout infrastructure. Empowering modern enterprises through digital excellence.
            </p>
          </div>

          {/* PRODUCTS Column */}
          <div>
            <h4 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider mb-gutter">
              PRODUCTS
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/solutions">
                Payment Gateway
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/solutions">
                Bulk Payouts Engine
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/solutions">
                UPI AutoPay &amp; QR
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/developers">
                Instant Verification APIs
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/solutions">
                Payment Links &amp; Invoices
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/solutions">
                Auto Collect Virtual Accounts
              </Link>
            </nav>
          </div>

          {/* DEVELOPERS Column */}
          <div>
            <h4 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider mb-gutter">
              DEVELOPERS
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/developers">
                API Documentation
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/developers">
                Sandbox Console
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/developers">
                Webhooks &amp; Events
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/developers">
                Node / Python / Java SDKs
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/developers">
                System Uptime Dashboard
              </Link>
            </nav>
          </div>

          {/* COMPANY Column */}
          <div>
            <h4 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider mb-gutter">
              COMPANY
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/about">
                About Us
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/services">
                Services
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/solutions">
                Solutions
              </Link>
              <Link className="text-on-surface-variant hover:text-primary transition-colors text-body-md" to="/contact">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* CONNECT Column */}
          <div>
            <h4 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider mb-gutter">
              CONNECT
            </h4>
            <div className="flex gap-base mb-4">
              <a href="#" className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">language</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </a>
              <Link to="/contact" className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">contact_mail</span>
              </Link>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Vasundra Tower, City Center Gwalior, MP, India
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-gutter border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-base">
          <p className="font-label-sm text-label-sm text-outline">
            © {new Date().getFullYear()} Takshara Technologies. All rights reserved.
          </p>
          <div className="flex gap-gutter">
            <a className="text-label-sm text-outline hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
            <a className="text-label-sm text-outline hover:text-on-surface transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
