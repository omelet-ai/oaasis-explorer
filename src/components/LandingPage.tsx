'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, Sparkles, Zap, Globe, Brain, ChevronDown, Route, Calendar, Package, Warehouse, Wrench, Bot, Store, Layers, ExternalLink } from 'lucide-react';

const ExplorerCanvas = dynamic(() => import('./ExplorerCanvas'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[750px] flex items-center justify-center" style={{ background: '#0A0A0F' }}>
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#2DD4BF] animate-pulse" />
    </div>
  )
});

const verticalProducts = [
  { 
    name: 'Routing', 
    icon: Route, 
    url: 'https://routing.omelet.ai',
    description: 'Vehicle routing optimization',
    isLive: false
  },
  { 
    name: 'Scheduling', 
    icon: Calendar, 
    url: 'https://scheduling.omelet.ai',
    description: 'Resource & job scheduling',
    isLive: false
  },
  { 
    name: 'Packaging', 
    icon: Package, 
    url: 'https://packing.omelet.ai',
    description: 'Bin packing & container loading',
    isLive: false
  },
  { 
    name: 'Inventory', 
    icon: Warehouse, 
    url: 'https://inventory.omelet.ai',
    description: 'Inventory optimization',
    isLive: false
  },
];

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0F' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="https://www.omelet.ai" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/omelet-full-white.svg" alt="Omelet" className="h-7" />
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#platform" className="text-gray-400 hover:text-white text-sm transition-colors">
              Agent Platform
            </a>
            
            {/* Vertical Product Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
              >
                Vertical Product
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl py-2 shadow-2xl border border-white/10 overflow-hidden"
                  style={{ 
                    background: 'rgba(12, 12, 18, 0.98)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05)'
                  }}
                >
                  <div className="px-4 py-2 border-b border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Optimization Domains</span>
                  </div>
                  {verticalProducts.map((product) => {
                    const Icon = product.icon;
                    return (
                      <a
                        key={product.name}
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#A78BFA]/20 to-[#2DD4BF]/20 flex items-center justify-center group-hover:from-[#A78BFA]/30 group-hover:to-[#2DD4BF]/30 transition-all">
                          <Icon className="w-4 h-4 text-[#A78BFA] group-hover:text-[#2DD4BF] transition-colors" />
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{product.name}</div>
                          <div className="text-gray-500 text-xs">{product.description}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            
            <a href="#explore" className="text-gray-400 hover:text-white text-sm transition-colors">Explore</a>
            <a href="https://docs.omelet.ai" className="text-gray-400 hover:text-white text-sm transition-colors">Docs</a>
          </div>
          
          <a 
            href="https://omelet.ai/contact" 
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-medium transition-all"
          >
            Contact Us
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-12">
        {/* Ambient backgrounds */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] ambient-violet rounded-full blur-[150px] opacity-30" />
          <div className="absolute bottom-[15%] right-[10%] w-[550px] h-[550px] ambient-teal rounded-full blur-[150px] opacity-25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-3 px-6 py-3 glass-light rounded-full mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Sparkles className="w-6 h-6 text-[#A78BFA]" />
            <span className="text-gray-400 text-lg">Enterprise Optimization Platform</span>
          </div>

          {/* Main Title */}
          <h1 
            className={`text-7xl md:text-9xl font-bold tracking-tight mb-8 transition-all duration-1000 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="text-white">Decision </span>
            <span className="gradient-text-mixed">OS</span>
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto mb-8 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Optimization AI Agent Platform
          </p>

          {/* OaaSIS Explanation */}
          <div 
            className={`max-w-3xl mx-auto mb-14 transition-all duration-1000 delay-450 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="text-4xl font-bold gradient-text-mixed">OaaSIS</span>
            </div>
            <p className="text-gray-500 text-lg leading-relaxed">
              <span className="gradient-text-violet font-semibold">O</span>ptimization <span className="text-gray-400">as a</span>{' '}
              <span className="gradient-text-teal font-semibold">S</span>ervice / <span className="gradient-text-teal font-semibold">I</span>nfrastructure / <span className="gradient-text-teal font-semibold">S</span>ystem
            </p>
          </div>

          {/* Value Props */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="glass-light rounded-2xl p-7 text-left">
              <div className="w-14 h-14 rounded-xl bg-[#A78BFA]/10 flex items-center justify-center mb-5">
                <Brain className="w-7 h-7 text-[#A78BFA]" />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">AI Foundation</h3>
              <p className="text-gray-500 text-base leading-relaxed">
                State-of-the-art optimization algorithms powered by AI
              </p>
            </div>
            
            <div className="glass-light rounded-2xl p-7 text-left">
              <div className="w-14 h-14 rounded-xl bg-[#2DD4BF]/10 flex items-center justify-center mb-5">
                <Zap className="w-7 h-7 text-[#2DD4BF]" />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">MCP Architecture</h3>
              <p className="text-gray-500 text-base leading-relaxed">
                Modular components for any optimization domain
              </p>
            </div>
            
            <div className="glass-light rounded-2xl p-7 text-left">
              <div className="w-14 h-14 rounded-xl bg-[#34D399]/10 flex items-center justify-center mb-5">
                <Globe className="w-7 h-7 text-[#34D399]" />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">No-Code Agents</h3>
              <p className="text-gray-500 text-base leading-relaxed">
                Build production-ready apps without engineering
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <a 
            href="#explore"
            className={`inline-flex flex-col items-center gap-3 text-gray-500 hover:text-gray-300 transition-all duration-1000 delay-750 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="text-sm">Explore the Architecture</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </section>

      {/* Platform Section - Interactive Graph */}
      <section id="explore" className="relative py-20">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Platform Architecture</h2>
              <p className="text-gray-500 text-sm">
                Click on any node to explore • Hover to see connections
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#A78BFA]" />
                <span>Core & Solvers</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#2DD4BF]" />
                <span>MCP & Applications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Graph */}
        <div className="relative">
          <div className="glass-light rounded-3xl mx-6 overflow-hidden">
            <ExplorerCanvas embedded={true} />
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="platform" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Platform Ecosystem</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Build, share, and deploy optimization solutions with our comprehensive marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Tool Marketplace */}
            <div className="glass rounded-2xl p-8 relative overflow-hidden group hover:border-[#A78BFA]/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 ambient-violet rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#A78BFA]/10 flex items-center justify-center mb-5">
                  <Wrench className="w-7 h-7 text-[#A78BFA]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">Tool Marketplace</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  Browse and integrate pre-built optimization tools. From routing engines to scheduling solvers, 
                  find the perfect components for your workflow. Each tool is tested, documented, and ready to deploy.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20">
                    100+ Tools
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                    API Ready
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                    One-Click Deploy
                  </span>
                </div>
                <a href="https://omelet.ai/tools" className="inline-flex items-center gap-2 text-[#A78BFA] text-sm font-medium hover:underline">
                  Explore Tools →
                </a>
              </div>
            </div>

            {/* Agent Marketplace */}
            <div className="glass rounded-2xl p-8 relative overflow-hidden group hover:border-[#2DD4BF]/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 ambient-teal rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#2DD4BF]/10 flex items-center justify-center mb-5">
                  <Bot className="w-7 h-7 text-[#2DD4BF]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">Agent Marketplace</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  Discover ready-to-use AI agents built by the community. From logistics optimization to 
                  healthcare scheduling, leverage pre-trained agents or customize them for your specific needs.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20">
                    50+ Agents
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                    Pre-trained
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                    Customizable
                  </span>
                </div>
                <a href="https://omelet.ai/agents" className="inline-flex items-center gap-2 text-[#2DD4BF] text-sm font-medium hover:underline">
                  Browse Agents →
                </a>
              </div>
            </div>
          </div>

          {/* Philosophy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-10">
              <div className="text-[#FBBF24] text-sm font-semibold mb-4">01 —</div>
              <h3 className="text-white text-xl font-semibold mb-4">
                Your Experts Build. No Code Required.
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Domain specialists create production-ready optimization agents without engineering dependencies. 
                Focus on the problem, not the infrastructure.
              </p>
            </div>

            <div className="glass rounded-2xl p-10">
              <div className="text-[#FBBF24] text-sm font-semibold mb-4">02 —</div>
              <h3 className="text-white text-xl font-semibold mb-4">
                Build Organizational Decision IQ
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                A self-improving system that turns every decision into institutional knowledge. 
                Your organization gets smarter with every optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 ambient-violet rounded-full blur-[100px] opacity-20" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 ambient-teal rounded-full blur-[100px] opacity-15" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Enterprise <span className="gradient-text-violet">AX</span> Partner
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                From Strategy to Execution — All in One Platform
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://omelet.ai/demo"
                  className="px-8 py-3 bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] rounded-xl text-white font-medium transition-all shadow-lg shadow-purple-500/25"
                >
                  Request Demo
                </a>
                <a 
                  href="https://docs.omelet.ai"
                  className="px-8 py-3 glass hover:bg-white/10 rounded-xl text-white font-medium transition-all"
                >
                  Read Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/omelet-full-white.svg" alt="Omelet" className="h-5 opacity-60" />
              <span className="text-gray-500 text-sm">© 2025 Omelet AI. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://omelet.ai" className="text-gray-500 hover:text-white text-sm transition-colors">
                omelet.ai
              </a>
              <a href="https://github.com/omelet-ai" className="text-gray-500 hover:text-white text-sm transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
