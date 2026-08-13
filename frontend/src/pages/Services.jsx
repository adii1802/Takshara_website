import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Data Structure: Industries and associated firms/clients
const INDUSTRIES_DATA = [
  {
    id: 'ecommerce',
    name: 'E-Commerce & Retail',
    icon: 'shopping_bag',
    description: 'High-speed payment processing, checkout optimization, and automated refund management for online storefronts and marketplaces.',
    servicesProvided: ['UPI & Card Gateway', 'Instant Refund Engine', 'Subscription Billing', 'Fraud Detection'],
    firms: [
      { name: 'ShopVibe Commerce', category: 'Fashion & Apparel', location: 'Bengaluru' },
      { name: 'FreshCart Mart', category: 'Grocery Delivery', location: 'Mumbai' },
      { name: 'TrendSpree Market', category: 'Multi-vendor Portal', location: 'Delhi NCR' },
      { name: 'LuxeLiving Direct', category: 'Home Decor', location: 'Hyderabad' },
    ]
  },
  {
    id: 'saas',
    name: 'SaaS & Software',
    icon: 'cloud_done',
    description: 'Automated recurring billing, global currency payouts, and automated compliance verification for modern cloud platforms.',
    servicesProvided: ['Subscription Engine', 'International Payouts', 'Tax & GST Validation', 'Virtual Accounts'],
    firms: [
      { name: 'CloudScale Stack', category: 'DevOps & Hosting', location: 'Pune' },
      { name: 'DataPulse Analytics', category: 'Business Intelligence', location: 'Bengaluru' },
      { name: 'WorkFlow Sync', category: 'HR Tech', location: 'Chennai' },
      { name: 'SecuVault SaaS', category: 'Cybersecurity', location: 'Noida' },
    ]
  },
  {
    id: 'fintech',
    name: 'Banking & Financial Services',
    icon: 'account_balance',
    description: 'Bank-grade security, instant bulk disbursements, real-time KYC identity verification, and multi-rail settlement engines.',
    servicesProvided: ['Bulk Disburse APIs', 'PAN & Aadhaar Verification', 'Escrow Automation', 'Instant Settlement'],
    firms: [
      { name: 'NexGen MicroFinance', category: 'Digital Lending', location: 'Mumbai' },
      { name: 'PeerLend Capital', category: 'P2P Lending Platform', location: 'Bengaluru' },
      { name: 'WealthSmart Robo', category: 'Investment Tech', location: 'Ahmedabad' },
      { name: 'InsurShield Digital', category: 'InsurTech', location: 'Gurugram' },
    ]
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Travel',
    icon: 'hotel',
    description: 'Split payment handling, instant vendor payouts to hotels & transport partners, and frictionless booking checkout.',
    servicesProvided: ['Split Settlements', 'Partner Payout Rail', 'QR Code POS', 'Multi-currency Support'],
    firms: [
      { name: 'StayZen Resorts', category: 'Boutique Stays', location: 'Goa' },
      { name: 'RouteFly Travels', category: 'Flight & Bus Aggregator', location: 'Kolkata' },
      { name: 'DineReserve App', category: 'Restaurant Booking', location: 'Bengaluru' },
      { name: 'NomadExpedition', category: 'Adventure Travel', location: 'Jaipur' },
    ]
  },
  {
    id: 'edtech',
    name: 'EdTech & Learning',
    icon: 'school',
    description: 'Flexible fee collection, EMI installment options, instructor payout automation, and verification APIs.',
    servicesProvided: ['No-Cost EMI Gateways', 'Tutor Payout Automation', 'Student Verification', 'Recurring Tuition Links'],
    firms: [
      { name: 'SkillCraft Academy', category: 'Coding Bootcamps', location: 'Bengaluru' },
      { name: 'EduSphere Online', category: 'K-12 Platform', location: 'Delhi NCR' },
      { name: 'LangMaster Hub', category: 'Language Learning', location: 'Pune' },
      { name: 'TestPrep Genius', category: 'Competitive Exams', location: 'Kota / Jaipur' },
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    icon: 'local_shipping',
    description: 'Driver salary payouts, vendor settlements, COD payment collection, and Automated Bank Account Verification.',
    servicesProvided: ['Driver Payout Rails', 'COD Collection Links', 'Vendor Bank Check', 'Fuel Card Top-ups'],
    firms: [
      { name: 'SwiftExpress Logistics', category: 'Last-Mile Delivery', location: 'Mumbai' },
      { name: 'CargoTrack Global', category: 'Freight Forwarding', location: 'Chennai' },
      { name: 'FleetFlow Transit', category: 'Fleet Management', location: 'Hyderabad' },
      { name: 'ColdChain Express', category: 'Pharma Cold Storage', location: 'Ahmedabad' },
    ]
  }
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter industries based on active category and search query
  const filteredIndustries = INDUSTRIES_DATA.filter((industry) => {
    const matchesCategory = selectedCategory === 'all' || industry.id === selectedCategory;
    const matchesSearch =
      industry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      industry.firms.some((firm) =>
        firm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        firm.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      
      {/* Hero Header Section */}
      <section className="relative py-16 lg:py-24 bg-surface-container-lowest border-b border-outline-variant/30 overflow-hidden">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4">
            <span className="font-label-md text-label-md text-primary uppercase tracking-widest font-semibold">
              Industry Solutions &amp; Client Ecosystem
            </span>
            <h1 className="font-headline-lg text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface">
              Industries We Serve &amp; Trusted Partners
            </h1>
            <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
              Explore how Takshara Technologies powers growth across key business verticals—delivering tailored payment infrastructure, automated payouts, and verification tools for leading enterprise firms.
            </p>

            {/* Search & Filter Bar */}
            <div className="w-full max-w-2xl mt-6 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search industries, services, or firms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface text-on-surface font-body-md text-body-md rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Quick Filter Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-1.5 rounded-full font-label-md text-sm transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                All Industries ({INDUSTRIES_DATA.length})
              </button>
              {INDUSTRIES_DATA.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setSelectedCategory(ind.id)}
                  className={`px-4 py-1.5 rounded-full font-label-md text-sm transition-all ${
                    selectedCategory === ind.id
                      ? 'bg-primary text-on-primary font-semibold'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {ind.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Industries & Associated Firms */}
      <section className="py-16 lg:py-24 bg-surface w-full">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-12">
          
          {filteredIndustries.length === 0 ? (
            <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">search_off</span>
              <h3 className="font-headline-md text-xl text-on-surface">No industries or firms found</h3>
              <p className="font-body-md text-on-surface-variant mt-1">Try clearing your search query or switching categories.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter items-stretch">
              {filteredIndustries.map((industry) => (
                <article
                  key={industry.id}
                  className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Industry Header */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
                          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                            {industry.icon}
                          </span>
                        </div>
                        <h2 className="font-headline-md text-xl font-bold text-on-surface">
                          {industry.name}
                        </h2>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-xs font-semibold shrink-0">
                        {industry.firms.length} Firms
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                      {industry.description}
                    </p>

                    {/* Key Services Offered */}
                    <div className="mb-6">
                      <h4 className="font-label-sm text-xs uppercase tracking-wider text-outline mb-2 font-semibold">
                        Key Services Deployed
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {industry.servicesProvided.map((service, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-surface-container-low text-on-surface text-xs rounded-md border border-outline-variant/30"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Associated Firms List */}
                    <div className="pt-4 border-t border-outline-variant/30">
                      <h3 className="font-label-md text-sm font-semibold text-on-surface mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">domain</span>
                        Featured Clients &amp; Firms
                      </h3>
                      <ul className="flex flex-col gap-2.5">
                        {industry.firms.map((firm, idx) => (
                          <li
                            key={idx}
                            className="p-3 bg-surface rounded-xl border border-outline-variant/30 flex items-center justify-between hover:border-primary/40 transition-colors"
                          >
                            <div className="flex flex-col">
                              <span className="font-label-md text-sm font-medium text-on-surface">
                                {firm.name}
                              </span>
                              <span className="font-body-md text-xs text-on-surface-variant">
                                {firm.category}
                              </span>
                            </div>
                            <span className="font-label-sm text-xs text-outline bg-surface-container-high px-2 py-0.5 rounded">
                              {firm.location}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="pt-6 mt-6 border-t border-outline-variant/30 flex items-center justify-between">
                    <span className="font-label-sm text-xs text-on-surface-variant">
                      Custom Stack Available
                    </span>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all"
                    >
                      <span>Explore for {industry.name.split(' ')[0]}</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full max-w-max mx-auto px-margin-mobile lg:px-margin-desktop py-12 mb-16">
        <div className="w-full bg-primary text-on-primary rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold">
              Don't see your industry listed?
            </h2>
            <p className="font-body-lg text-primary-fixed text-sm md:text-base">
              Takshara Technologies engineers custom fintech and enterprise infrastructure tailored to any complex vertical.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 bg-surface-container-lowest text-primary font-label-md text-label-md rounded-xl shadow-md hover:bg-surface-container transition-colors whitespace-nowrap"
          >
            Contact Integration Team
          </Link>
        </div>
      </section>

    </div>
  );
}

