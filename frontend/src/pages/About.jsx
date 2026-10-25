import React, { useEffect, useState, useRef } from 'react';
import officeMap from '../assets/mapOf_takshara.png';

function Counter({ target, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = Math.ceil(target / steps);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, stepTime);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.5 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function MissionVisionHero() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-[#0b1329] to-slate-900 text-white">
      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-max mx-auto px-margin-mobile lg:px-margin-desktop">
        {/* Header Content with Fade-In Animation */}
        <div className={`max-w-3xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>


          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug mb-4">
            Powering Secure, Scalable &amp; Intelligent Payment Infrastructure
          </h2>

          <p className="text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mb-10 lg:mb-12">
            Cairnloop Technologies builds modern payment and payout infrastructure that helps businesses simplify transactions, streamline operations, and scale with confidence.
          </p>
        </div>

        {/* Two Glassmorphism Panels with Slide-Up Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Our Mission Panel */}
          <div
            className={`bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-3xl p-7 lg:p-9 text-white shadow-2xl hover:bg-white/[0.12] hover:border-white/25 hover:-translate-y-1.5 hover:shadow-blue-500/10 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.79-2.82C8.29 16.68 8 16.5 8 16.5z" />
                  <path d="M12 15l-3-3" />
                  <path d="M20.4 4.6a13.4 13.4 0 0 0-7.7-3.6C11 1 9.8 1.8 9 3c-1.8 2.7-2.1 6.3-1 9l-4 4 4 4 4-4c2.7 1.1 6.3.8 9-1 1.2-.8 2-2 2-3.7a13.4 13.4 0 0 0-3.6-7.7z" />
                </svg>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">Our Mission</h3>

              <p className="text-slate-300 text-sm lg:text-base leading-relaxed font-normal">
                Empower businesses with secure, developer-friendly payment and payout infrastructure that reduces operational complexity and enables seamless digital transactions.
              </p>
            </div>
          </div>

          {/* Our Vision Panel */}
          <div
            className={`bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-3xl p-7 lg:p-9 text-white shadow-2xl hover:bg-white/[0.12] hover:border-white/25 hover:-translate-y-1.5 hover:shadow-indigo-500/10 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300 shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">Our Vision</h3>

              <p className="text-slate-300 text-sm lg:text-base leading-relaxed font-normal">
                Create a trusted financial ecosystem where businesses of every size can access reliable payment technology, automate money movement, and grow through innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section (Typography Driven) */}
      <section className="w-full pt-margin-desktop pb-margin-desktop bg-surface-container-lowest">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10 -mt-[200px] -mr-[200px]"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end">
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-base">
              <span className="font-label-md text-label-md text-primary uppercase tracking-widest [writing-mode:vertical-rl] absolute -left-8 top-1/2 -translate-y-1/2 hidden xl:block">About Us</span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Pioneering digital excellence for the modern enterprise.</h1>
            </div>
            <div className="col-span-1 lg:col-span-4">
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Cairnloop Technologies builds modern payment and payout infrastructure that helps businesses simplify transactions, streamline operations, and scale with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision (Video Hero with Glassmorphism Panels) */}
      <MissionVisionHero />

      {/* Key Metrics (Bento Grid) */}
      <section className="w-full py-margin-desktop bg-surface-container-lowest">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="mb-gutter">
            <h2 className="font-headline-md text-headline-md text-on-surface">By the Numbers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-base">
            {/* Stat Card 1 */}
            <div className="col-span-2 lg:col-span-1 bg-surface-container-low p-gutter rounded-xl flex flex-col justify-between min-h-[160px] group">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider group-hover:text-primary transition-colors">Years of Experience</span>
              <div className="font-headline-lg text-headline-lg text-on-surface flex items-baseline gap-1">
                <Counter target={15} />
              </div>
            </div>
            {/* Stat Card 2 */}
            <div className="col-span-2 lg:col-span-1 bg-surface-container-low p-gutter rounded-xl flex flex-col justify-between min-h-[160px] group">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider group-hover:text-primary transition-colors">Global Clients</span>
              <div className="font-headline-lg text-headline-lg text-on-surface flex items-baseline gap-1">
                <Counter target={500} />
              </div>
            </div>
            {/* Visual / Map Card */}
            <div className="col-span-2 lg:col-span-2 bg-surface p-base rounded-xl overflow-hidden relative min-h-[160px]">
              <img
                src={officeMap}
                alt="Cairnloop Global Office Map"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/90 to-transparent p-gutter flex flex-col justify-end">
                <span className="font-label-sm text-label-sm text-on-surface font-semibold bg-surface/50 backdrop-blur-md px-2 py-1 rounded w-max inline-block">Global HQ: Gwalior, MP, India</span>
              </div>
            </div>
            {/* Stat Card 3 */}
            <div className="col-span-2 lg:col-span-1 bg-primary-container p-gutter rounded-xl flex flex-col justify-between min-h-[160px]">
              <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider opacity-80">Projects Delivered</span>
              <div className="font-headline-lg text-headline-lg text-on-primary-container flex items-baseline gap-1">
                <Counter target={1200} />
              </div>
            </div>
            {/* Stat Card 4 */}
            <div className="col-span-2 lg:col-span-3 bg-secondary p-gutter rounded-xl flex flex-col md:flex-row justify-between items-start md:items-end min-h-[160px] relative overflow-hidden">
              <svg className="absolute right-0 top-0 h-full text-secondary-fixed/20 pointer-events-none" fill="currentColor" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M45.7,11.8C65.5-1.9,94.9-3.4,120.3,5.1c25.4,8.5,46.7,29.1,59.2,53.4c12.5,24.3,16,52.3,7.9,78.2c-8.1,25.9-27.7,49.6-53,60.8 C109,208.7,78.1,207.5,52,194.2C25.9,180.9,4.6,155.6,0.7,126.3C-3.2,97,9.6,65.8,28.8,42.8C34.4,36.1,40.6,29.8,45.7,23V11.8z"></path>
              </svg>
              <div className="z-10 mb-4 md:mb-0">
                <span className="font-label-sm text-label-sm text-on-secondary uppercase tracking-wider opacity-80 block mb-2">Team Members</span>
                <div className="font-headline-lg text-headline-lg text-on-secondary flex items-baseline gap-1">
                  <Counter target={250} />
                </div>
              </div>
              <div className="z-10 max-w-sm">
                <p className="font-body-md text-body-md text-on-secondary opacity-90">A diverse team of engineers, designers, and strategists dedicated to your success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="w-full py-margin-desktop bg-surface relative overflow-hidden">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
              <span className="h-[1px] w-8 bg-blue-400/60"></span>
              OUR VALUES
              <span className="h-[1px] w-8 bg-blue-400/60"></span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 tracking-tight mb-4">
              Principles That Drive Us
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Our values define how we build, how we work, and how we create impact for businesses and communities.
            </p>
          </div>

          {/* 2x2 Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Card 01 - Innovation First (Left Icon Layout) */}
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.08)] transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 group relative overflow-hidden">
              {/* Outer Ring & Icon (Left) */}
              <div className="relative shrink-0 flex items-center justify-center w-28 h-28 lg:w-32 lg:h-32 rounded-full border border-blue-200/60 bg-gradient-to-br from-blue-50/70 via-blue-50/20 to-white shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_8px_20px_rgba(37,99,235,0.06)] group-hover:scale-105 transition-transform duration-500">
                {/* Decorative swoosh line & dot */}
                <svg className="absolute -top-2 -left-2 w-20 h-20 text-blue-500/40 pointer-events-none" viewBox="0 0 80 80" fill="none">
                  <path d="M 20 60 A 35 35 0 0 1 60 20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
                <div className="absolute top-1 left-2 w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
                <div className="absolute bottom-2 right-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>

                {/* Inner Icon Circle */}
                <div className="w-20 h-20 lg:w-22 lg:h-22 rounded-full bg-white flex items-center justify-center border border-blue-100/80 shadow-sm text-blue-600">
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.79-2.82C8.29 16.68 8 16.5 8 16.5z" />
                    <path d="M12 15l-3-3" />
                    <path d="M20.4 4.6a13.4 13.4 0 0 0-7.7-3.6C11 1 9.8 1.8 9 3c-1.8 2.7-2.1 6.3-1 9l-4 4 4 4 4-4c2.7 1.1 6.3.8 9-1 1.2-.8 2-2 2-3.7a13.4 13.4 0 0 0-3.6-7.7z" />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
                <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-md shadow-sm mb-3">01</span>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">Innovation First</h3>
                <div className="w-8 h-1 bg-blue-600 rounded-full mb-3"></div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We constantly experiment, innovate and iterate to solve real-world problems and stay ahead of change.
                </p>
              </div>
            </div>

            {/* Card 02 - Inclusive by Design (Right Icon Layout) */}
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.08)] transition-all duration-300 flex flex-col-reverse sm:flex-row items-center sm:items-start gap-6 group relative overflow-hidden">
              {/* Text Content */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
                <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-md shadow-sm mb-3">02</span>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">Inclusive by Design</h3>
                <div className="w-8 h-1 bg-blue-600 rounded-full mb-3"></div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We embrace diverse perspectives and build a culture where everyone feels respected, valued and heard.
                </p>
              </div>

              {/* Outer Ring & Icon (Right) */}
              <div className="relative shrink-0 flex items-center justify-center w-28 h-28 lg:w-32 lg:h-32 rounded-full border border-blue-200/60 bg-gradient-to-br from-blue-50/70 via-blue-50/20 to-white shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_8px_20px_rgba(37,99,235,0.06)] group-hover:scale-105 transition-transform duration-500">
                {/* Decorative swoosh line & dot */}
                <svg className="absolute -top-2 -right-2 w-20 h-20 text-blue-500/40 pointer-events-none" viewBox="0 0 80 80" fill="none">
                  <path d="M 60 60 A 35 35 0 0 0 20 20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
                <div className="absolute top-1 right-2 w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
                <div className="absolute bottom-2 left-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>

                {/* Inner Icon Circle */}
                <div className="w-20 h-20 lg:w-22 lg:h-22 rounded-full bg-white flex items-center justify-center border border-blue-100/80 shadow-sm text-blue-600">
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 03 - Trust & Integrity (Left Icon Layout) */}
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.08)] transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 group relative overflow-hidden">
              {/* Outer Ring & Icon (Left) */}
              <div className="relative shrink-0 flex items-center justify-center w-28 h-28 lg:w-32 lg:h-32 rounded-full border border-emerald-200/60 bg-gradient-to-br from-emerald-50/70 via-emerald-50/20 to-white shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_8px_20px_rgba(16,185,129,0.06)] group-hover:scale-105 transition-transform duration-500">
                {/* Decorative swoosh line & dot */}
                <svg className="absolute -top-2 -left-2 w-20 h-20 text-emerald-500/40 pointer-events-none" viewBox="0 0 80 80" fill="none">
                  <path d="M 20 60 A 35 35 0 0 1 60 20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
                <div className="absolute top-1 left-2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                <div className="absolute bottom-2 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400"></div>

                {/* Inner Icon Circle */}
                <div className="w-20 h-20 lg:w-22 lg:h-22 rounded-full bg-white flex items-center justify-center border border-emerald-100/80 shadow-sm text-emerald-500">
                  <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
                <span className="bg-emerald-500 text-white font-bold text-xs px-3 py-1 rounded-md shadow-sm mb-3">03</span>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">Trust & Integrity</h3>
                <div className="w-8 h-1 bg-emerald-500 rounded-full mb-3"></div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We are transparent, accountable and committed to doing what's right—always.
                </p>
              </div>
            </div>

            {/* Card 04 - Empower Growth (Right Icon Layout) */}
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.08)] transition-all duration-300 flex flex-col-reverse sm:flex-row items-center sm:items-start gap-6 group relative overflow-hidden">
              {/* Text Content */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
                <span className="bg-purple-600 text-white font-bold text-xs px-3 py-1 rounded-md shadow-sm mb-3">04</span>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">Empower Growth</h3>
                <div className="w-8 h-1 bg-purple-600 rounded-full mb-3"></div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We empower businesses and individuals with reliable solutions to unlock their full potential.
                </p>
              </div>

              {/* Outer Ring & Icon (Right) */}
              <div className="relative shrink-0 flex items-center justify-center w-28 h-28 lg:w-32 lg:h-32 rounded-full border border-purple-200/60 bg-gradient-to-br from-purple-50/70 via-purple-50/20 to-white shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_8px_20px_rgba(139,92,246,0.06)] group-hover:scale-105 transition-transform duration-500">
                {/* Decorative swoosh line & dot */}
                <svg className="absolute -top-2 -right-2 w-20 h-20 text-purple-500/40 pointer-events-none" viewBox="0 0 80 80" fill="none">
                  <path d="M 60 60 A 35 35 0 0 0 20 20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
                <div className="absolute top-1 right-2 w-2.5 h-2.5 rounded-full bg-purple-600 shadow-[0_0_8px_rgba(139,92,246,0.6)]"></div>
                <div className="absolute bottom-2 left-1 w-1.5 h-1.5 rounded-full bg-purple-400"></div>

                {/* Inner Icon Circle */}
                <div className="w-20 h-20 lg:w-22 lg:h-22 rounded-full bg-white flex items-center justify-center border border-purple-100/80 shadow-sm text-purple-600">
                  <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                    <path d="M19 5v4h-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Callout Banner */}
          <div className="mt-12 max-w-6xl mx-auto bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-blue-50/80 border border-blue-100/90 rounded-2xl p-5 md:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4 text-slate-800">
              <svg className="w-8 h-8 text-blue-400/90 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm md:text-base font-medium leading-snug">
                We are committed to building technology that is{' '}
                <strong className="text-blue-600 font-bold">secure, scalable and meaningful</strong>
                —today and for the future.
              </p>
            </div>

            <div className="hidden md:block w-[1px] h-10 bg-blue-200/80"></div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-100/90 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-700 leading-snug">
                <p>Values in action,</p>
                <p>impact in every transaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
