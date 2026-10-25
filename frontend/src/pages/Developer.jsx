import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Developer() {
  const [activeTab, setActiveTab] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const [apiKeyGenerated, setApiKeyGenerated] = useState(false);
  const [pubKey, setPubKey] = useState('pk_test_98a72b39f4e56c810d');
  const [secretKey, setSecretKey] = useState('sk_test_7f3b89012a45c678');
  const [showSecret, setShowSecret] = useState(false);
  const [copiedPub, setCopiedPub] = useState(false);
  const [copiedSec, setCopiedSec] = useState(false);

  const codeSnippets = {
    javascript: `// Initialize Cairnloop SDK
import { Cairnloop } from '@cairnloop/sdk';

const cairnloop = new Cairnloop('${pubKey}');

// Create a payment order
const order = await cairnloop.orders.create({
  amount: 5000, // Amount in paise (₹50.00)
  currency: 'INR',
  receipt: 'order_rcptid_11',
  notes: {
    customer_name: 'Aditya Sharma',
    service: 'Enterprise Cloud Subscription'
  }
});

console.log('Order ID:', order.id);`,

    python: `# Initialize Cairnloop Client
import cairnloop

client = cairnloop.Client(api_key="${pubKey}")

# Create a payment order
order = client.orders.create({
    "amount": 5000,
    "currency": "INR",
    "receipt": "order_rcptid_11",
    "notes": {
        "customer_name": "Aditya Sharma",
        "service": "Enterprise Cloud Subscription"
    }
})

print("Order Created:", order["id"])`,

    curl: `# Create Payment Order via REST API
curl -X POST https://api.cairnloop.com/v1/orders \\
  -u ${pubKey}: \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 5000,
    "currency": "INR",
    "receipt": "order_rcptid_11",
    "notes": {
      "customer_name": "Aditya Sharma",
      "service": "Enterprise Cloud Subscription"
    }
  }'`,

    java: `// Initialize Cairnloop Java SDK
import com.cairnloop.CairnloopClient;
import com.cairnloop.models.Order;

CairnloopClient client = new CairnloopClient("${pubKey}");

OrderRequest request = OrderRequest.builder()
    .amount(5000L)
    .currency("INR")
    .receipt("order_rcptid_11")
    .build();

Order order = client.orders().create(request);
System.out.println("Order ID: " + order.getId());`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateNewKey = () => {
    const randomHex1 = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const randomHex2 = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setPubKey(`pk_test_${randomHex1}`);
    setSecretKey(`sk_test_${randomHex2}`);
    setApiKeyGenerated(true);
    setTimeout(() => setApiKeyGenerated(false), 2500);
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Developer Portal Hero Header */}
      <div className="relative w-full bg-surface-container-lowest border-b border-outline-variant/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop py-16 lg:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-sm text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Developer Portal & API Hub
              </div>
              <h1 className="font-headline-lg text- headline-lg text-on-surface mb-4">
                Build & Scale Faster with Cairnloop APIs
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                Clean REST APIs, robust webhooks, and production-ready SDKs designed for modern engineering teams. Integrate payments in minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#integration-steps"
                  className="px-6 py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-md hover:bg-primary-container transition-all"
                >
                  Explore 3-Step Setup
                </a>
                <a
                  href="#api-playground"
                  className="px-6 py-3 bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-low transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                  API Reference & Snippets
                </a>
              </div>
            </div>

            {/* Developer Credentials Widget */}
            <div className="w-full lg:w-[420px] bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
              {/* Header with Title, Subtitle, and Badge */}
              <div className="flex items-start justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Developer Credentials</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Manage API access for your applications</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold whitespace-nowrap">
                  TEST MODE
                </span>
              </div>

              {/* Keys List Container */}
              <div className="space-y-3 mb-4">
                {/* 1. Publishable Key */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="font-medium text-slate-300">Publishable Key</span>
                    <span className="text-[10px] text-slate-500">Client-side</span>
                  </div>
                  <div className="bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 font-mono text-xs text-amber-400 flex items-center justify-between gap-2">
                    <span className="truncate">{pubKey}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(pubKey);
                        setCopiedPub(true);
                        setTimeout(() => setCopiedPub(false), 2000);
                      }}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[11px] shrink-0"
                      title="Copy Publishable Key"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copiedPub ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 2. Secret Key (Masked) */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="font-medium text-slate-300">Secret Key</span>
                    <span className="text-[10px] text-rose-400/90">Server-side only</span>
                  </div>
                  <div className="bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 font-mono text-xs text-amber-400 flex items-center justify-between gap-2">
                    <span className="truncate font-mono">
                      {showSecret ? secretKey : 'sk_test_••••••••••••••••••••'}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setShowSecret(!showSecret)}
                        className="text-slate-400 hover:text-white transition-colors flex items-center"
                        title={showSecret ? "Hide Secret Key" : "Show Secret Key"}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {showSecret ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(secretKey);
                          setCopiedSec(true);
                          setTimeout(() => setCopiedSec(false), 2000);
                        }}
                        className="text-slate-400 hover:text-white transition-colors flex items-center"
                        title="Copy Secret Key"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {copiedSec ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: Regenerate Keys */}
              <button
                onClick={generateNewKey}
                className="w-full py-2 bg-primary/80 hover:bg-primary text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <span className={`material-symbols-outlined text-sm ${apiKeyGenerated ? 'animate-spin' : ''}`}>
                  refresh
                </span>
                {apiKeyGenerated ? 'Credentials Regenerated!' : 'Regenerate Credentials'}
              </button>

              {/* Compact Footer Row */}
              <div className="border-t border-slate-800/80 pt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Last rotated: Today
                </span>
                <span>API version: v1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PLUG, PLAY, GO-LIVE FEATURE SECTION (Matches user image design) */}
      <section id="integration-steps" className="w-full py-16 lg:py-24 bg-white border-b border-outline-variant/30">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Heading, Subtitle & Action CTA */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <h2 className="font-extrabold text-4xl lg:text-5xl text-[#003d9b] tracking-tight uppercase leading-[1.1] mb-5">
                PLUG,<br />PLAY,<br />GO-LIVE
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md leading-relaxed">
                Connect your platform quickly with our intuitive APIs. From setup to live transactions, integration is fast, simple, and hassle-free.
              </p>
              <div>
                <Link
                  to="/contact"
                  className="inline-block px-7 py-3.5 bg-[#F58220] hover:bg-[#e07010] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Right Column: 3 Horizontal Steps */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* STEP 1 */}
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="text-[#F58220] font-semibold text-sm block mb-1">Step 1</span>
                  <h3 className="text-[#003d9b] font-extrabold text-lg lg:text-xl tracking-tight uppercase mb-2">
                    GET API KEYS
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-snug min-h-[48px]">
                    Sign up, generate your API credentials, and access developer documentation instantly.
                  </p>
                </div>
                
                {/* Step 1 Mockup Card Container */}
                <div className="mt-auto bg-[#F4F4F6] rounded-3xl p-5 min-h-[240px] flex items-center justify-center border border-slate-200/60 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-full max-w-[210px] bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-[#005C9E] p-3 text-center relative flex justify-center items-center">
                      <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-lg">person</span>
                      </div>
                    </div>
                    <div className="p-3.5 flex flex-col gap-2.5">
                      <div>
                        <div className="text-[9px] text-slate-400 font-medium mb-0.5">Email ID</div>
                        <div className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] text-slate-600">
                          developer@company.com
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 font-medium mb-0.5">Password</div>
                        <div className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[10px] text-slate-400 flex items-center justify-between">
                          <span>••••••••••••</span>
                          <span className="material-symbols-outlined text-[10px]">visibility_off</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[8px] text-slate-500 pt-0.5">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-2.5 h-2.5 rounded accent-[#003D9B]" />
                          <span>Remember Me</span>
                        </label>
                        <span className="text-[#005C9E] hover:underline cursor-pointer">Forgot Password?</span>
                      </div>
                      <button className="w-full py-1.5 bg-[#003D9B] text-white text-[10px] font-semibold rounded hover:bg-[#002e77] transition-colors mt-1">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="text-[#F58220] font-semibold text-sm block mb-1">Step 2</span>
                  <h3 className="text-[#003d9b] font-extrabold text-lg lg:text-xl tracking-tight uppercase mb-2">
                    PLUG & CONFIGURE
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-snug min-h-[48px]">
                    Integrate using our clear SDKs, REST APIs or no-code customize payments.
                  </p>
                </div>
                
                {/* Step 2 Mockup Card Container (Code Snippet Image Mockup) */}
                <div className="mt-auto bg-[#F4F4F6] rounded-3xl p-5 min-h-[240px] flex items-center justify-center border border-slate-200/60 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-full max-w-[220px] bg-[#0d1117] text-slate-100 rounded-xl shadow-xl border border-slate-800 overflow-hidden transform group-hover:scale-105 transition-transform duration-300 font-mono text-[10px]">
                    {/* Window Title Bar */}
                    <div className="bg-[#161b22] px-3 py-1.5 border-b border-slate-800 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
                      <span className="ml-2 text-[9px] text-slate-500 font-sans">cairnloop_checkout.js</span>
                    </div>
                    {/* Code Editor Body */}
                    <div className="p-3 leading-relaxed tracking-wide">
                      <div>
                        <span className="text-[#ff79c6]">const</span>{' '}
                        <span className="text-[#8be9fd]">payment</span>{' '}
                        <span className="text-slate-400">=</span>{' '}
                        <span className="text-[#ff79c6]">await</span>{' '}
                        <span className="text-[#50fa7b]">cairnloop</span>
                        <span className="text-slate-300">.</span>
                        <span className="text-[#50fa7b]">orders</span>
                        <span className="text-slate-300">.</span>
                        <span className="text-[#50fa7b]">create</span>
                        <span className="text-slate-300">(&#123;</span>
                      </div>
                      <div className="pl-3">
                        <span className="text-[#8be9fd]">amount</span>
                        <span className="text-slate-400">:</span>{' '}
                        <span className="text-[#bd93f9]">5000</span>
                        <span className="text-slate-400">,</span>
                      </div>
                      <div className="pl-3">
                        <span className="text-[#8be9fd]">currency</span>
                        <span className="text-slate-400">:</span>{' '}
                        <span className="text-[#f1fa8c]">'INR'</span>
                        <span className="text-slate-400">,</span>
                      </div>
                      <div className="pl-3">
                        <span className="text-[#8be9fd]">receipt</span>
                        <span className="text-slate-400">:</span>{' '}
                        <span className="text-[#f1fa8c]">'rec_123'</span>
                      </div>
                      <div>
                        <span className="text-slate-300">&#125;);</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="text-[#F58220] font-semibold text-sm block mb-1">Step 3</span>
                  <h3 className="text-[#003d9b] font-extrabold text-lg lg:text-xl tracking-tight uppercase mb-2">
                    GO LIVE
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-snug min-h-[48px]">
                    Test your setup in sandbox mode, then launch live payments with full monitoring.
                  </p>
                </div>
                
                {/* Step 3 Mockup Card Container */}
                <div className="mt-auto bg-[#F4F4F6] rounded-3xl p-5 min-h-[240px] flex items-center justify-center border border-slate-200/60 shadow-sm hover:shadow-md transition-all group">
                  <div className="w-full max-w-[220px] bg-white rounded-xl shadow-lg border border-slate-200 p-3 transform group-hover:scale-105 transition-transform duration-300 flex flex-col gap-2">
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-800">Cairnloop Dashboard</span>
                      </div>
                      <span className="text-[8px] bg-emerald-100 text-emerald-700 font-semibold px-1.5 py-0.5 rounded">LIVE</span>
                    </div>

                    {/* Dashboard Metrics preview */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                        <div className="text-[8px] text-slate-400">Total Revenue</div>
                        <div className="text-[11px] font-bold text-slate-800">₹4,85,200</div>
                      </div>
                      <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                        <div className="text-[8px] text-slate-400">Success Rate</div>
                        <div className="text-[11px] font-bold text-emerald-600">99.94%</div>
                      </div>
                    </div>

                    {/* Chart Graphic Simulation */}
                    <div className="bg-slate-900 text-white rounded-lg p-2 relative overflow-hidden flex flex-col justify-between h-16">
                      <div className="flex items-center justify-between text-[8px] text-slate-400">
                        <span>Live Transactions</span>
                        <span className="text-emerald-400 font-mono">+12.4%</span>
                      </div>
                      {/* Mini Bar Graph */}
                      <div className="flex items-end gap-1 h-8 pt-1">
                        <div className="w-full bg-primary/40 rounded-t h-[40%]" />
                        <div className="w-full bg-primary/60 rounded-t h-[65%]" />
                        <div className="w-full bg-primary/80 rounded-t h-[50%]" />
                        <div className="w-full bg-primary rounded-t h-[85%]" />
                        <div className="w-full bg-emerald-400 rounded-t h-[100%]" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE API CODE PLAYGROUND */}
      <section id="api-playground" className="w-full py-16 bg-surface-container-lowest">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">
              Interactive Code Snippets
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Integrate Cairnloop in your preferred programming language with zero friction.
            </p>
          </div>

          {/* Language selector tabs */}
          <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto border border-slate-800">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                {[
                  { id: 'javascript', label: 'Node.js / JS' },
                  { id: 'python', label: 'Python' },
                  { id: 'curl', label: 'cURL' },
                  { id: 'java', label: 'Java' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">
                  {copied ? 'check' : 'content_copy'}
                </span>
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            {/* Code view */}
            <div className="p-6 font-mono text-xs sm:text-sm text-slate-100 overflow-x-auto bg-slate-900 leading-relaxed">
              <pre className="whitespace-pre">{codeSnippets[activeTab]}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPER RESOURCES & CAPABILITIES GRID */}
      <section className="w-full py-16 bg-background border-t border-outline-variant/30">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="mb-12">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Developer Tools & Resources</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Everything you need to launch and scale enterprise payments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">api</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2">REST API Reference</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4">
                Detailed documentation for all endpoints including Payments, Refunds, Subscriptions, and Transfers.
              </p>
              <span className="text-primary font-label-md text-xs flex items-center gap-1 group-hover:underline">
                Read API Specs <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </span>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">webhook</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2">Webhooks & Event Streams</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4">
                Real-time event notifications with HMAC signature verification to automatically sync transaction states.
              </p>
              <span className="text-primary font-label-md text-xs flex items-center gap-1 group-hover:underline">
                Configure Webhooks <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </span>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">devices</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2">Mobile & Web SDKs</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4">
                Native SDKs for iOS, Android, React Native, Flutter, and Web Checkout for seamless UI integration.
              </p>
              <span className="text-primary font-label-md text-xs flex items-center gap-1 group-hover:underline">
                Explore SDKs <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </span>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">science</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2">Sandbox Simulator</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4">
                Simulate payment flows, test card numbers, UPI handle responses, and failure scenarios safely.
              </p>
              <span className="text-primary font-label-md text-xs flex items-center gap-1 group-hover:underline">
                View Test Cards <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </span>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2">Security & PCI Compliance</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4">
                PCI-DSS Level 1 compliant infrastructure with TLS 1.3 encryption and automated fraud detection.
              </p>
              <span className="text-primary font-label-md text-xs flex items-center gap-1 group-hover:underline">
                Security Overview <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </span>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <h3 className="font-headline-md text-lg text-on-surface mb-2">Developer Support</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4">
                Dedicated technical account managers, Discord community, and 24/7 developer helpdesk.
              </p>
              <Link to="/contact" className="text-primary font-label-md text-xs flex items-center gap-1 group-hover:underline">
                Contact Engineering <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="w-full py-16 bg-[#003d9b] text-white">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 font-body-md">
            Create your sandbox account in less than 2 minutes and start testing payments right away.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#F58220] hover:bg-[#e07010] text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              Get Free Sandbox Keys
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-all"
            >
              Talk to Solutions Engineer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
