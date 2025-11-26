import { Menu, X, Phone, Mail, ArrowRight, CheckCircle2, TrendingUp, Target, Zap, Users, BarChart3, Search, MessageSquare, Eye, Globe, Star, Clock, Award, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import RippleGrid from './components/RippleGrid';
import Waves from './components/Waves';
import ScrollProgress from './components/ScrollProgress';
import FloatingContact from './components/FloatingContact';
import AnimatedStats from './components/AnimatedStats';
import AnimatedSection from './components/AnimatedSection';
import { AnimatedStat } from './components/AnimatedSection';
import { useScrollAnimation, useCountUp } from './hooks/useScrollAnimation';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    from_name: '',
    business_name: '',
    from_email: '',
    phone: '',
    website: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // EmailJS Configuration - Get from environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_orbbcdo';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.from_name,
          business_name: formData.business_name,
          from_email: formData.from_email,
          phone: formData.phone,
          website: formData.website || 'Not provided',
          budget: formData.budget || 'Not specified',
          message: formData.message || 'No additional details provided',
          to_email: 'saed@optimisedmarketing.online'
        }
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');

      // Reset form
      setFormData({
        from_name: '',
        business_name: '',
        from_email: '',
        phone: '',
        website: '',
        budget: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <ScrollProgress />
      <FloatingContact />

      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/98 backdrop-blur-xl border-b border-gray-800 shadow-2xl' : 'bg-black/90 backdrop-blur-lg'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <img
                src="/Transparency1.png"
                alt="Optimised Marketing"
                className="h-10 w-auto transition-opacity duration-300 hover:opacity-80"
              />
              <span className="text-xl font-black text-white uppercase tracking-tight hidden sm:inline">
                Optimised Marketing
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-[#FDB515] transition-colors font-semibold text-sm uppercase tracking-wide">Services</a>
              <a href="#results" className="text-gray-300 hover:text-[#FDB515] transition-colors font-semibold text-sm uppercase tracking-wide">Case Studies</a>
              <a href="#process" className="text-gray-300 hover:text-[#FDB515] transition-colors font-semibold text-sm uppercase tracking-wide">Our Process</a>
              <a href="#about" className="text-gray-300 hover:text-[#FDB515] transition-colors font-semibold text-sm uppercase tracking-wide">About</a>
              <a href="tel:1300678177" className="flex items-center space-x-2 text-[#FDB515] hover:text-[#f5a400] transition-colors font-bold">
                <Phone className="w-4 h-4" />
                <span>1300 678 177</span>
              </a>
              <a href="#contact" className="bg-[#FDB515] px-6 py-3 rounded-sm font-black hover:bg-[#f5a400] hover:scale-105 transition-all text-black uppercase text-sm shadow-lg shadow-[#FDB515]/30">
                Book Strategy Call
              </a>
            </div>

            <button
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/98 backdrop-blur-xl border-t border-gray-800">
            <div className="px-6 py-6 space-y-4">
              <a href="#services" className="block text-gray-300 hover:text-[#FDB515] transition-colors font-semibold uppercase text-sm">Services</a>
              <a href="#results" className="block text-gray-300 hover:text-[#FDB515] transition-colors font-semibold uppercase text-sm">Case Studies</a>
              <a href="#process" className="block text-gray-300 hover:text-[#FDB515] transition-colors font-semibold uppercase text-sm">Our Process</a>
              <a href="#about" className="block text-gray-300 hover:text-[#FDB515] transition-colors font-semibold uppercase text-sm">About</a>
              <a href="tel:1300678177" className="block text-[#FDB515] hover:text-[#f5a400] transition-colors font-bold">
                Call: 1300 678 177
              </a>
              <a href="#contact" className="block bg-[#FDB515] px-6 py-4 rounded-sm font-black text-center text-black uppercase text-sm">
                Book Strategy Call
              </a>
            </div>
          </div>
        )}
      </nav>

      <a href="tel:1300678177" className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#FDB515] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <Phone className="w-6 h-6 text-black" />
      </a>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black">
        <div className="absolute inset-0">
          <Waves
            lineColor="rgba(253, 181, 21, 0.3)"
            backgroundColor="black"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={50}
            waveAmpY={25}
            xGap={15}
            yGap={45}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black pointer-events-none"></div>
        </div>

        <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center space-x-2 bg-[#FDB515]/10 border border-[#FDB515]/30 px-6 py-3 rounded-full mb-8">
            <Award className="w-5 h-5 text-[#FDB515]" />
            <span className="text-[#FDB515] font-bold text-sm uppercase tracking-wide">Melbourne's Local Marketing Specialists</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] uppercase">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">We Make Local</span>
            <br />
            <span className="text-[#FDB515] relative inline-block drop-shadow-[0_2px_15px_rgba(253,181,21,0.5)]">
              Brands Unmissable
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#FDB515]/20"></div>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Integrated digital marketing that actually grows your business.
            <br />
            <span className="text-white font-bold">SEO | Google Ads | Social Media | Websites</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="#contact" className="group bg-[#FDB515] px-10 py-5 rounded-sm font-black text-lg hover:bg-[#f5a400] hover:scale-105 transition-all flex items-center space-x-3 text-black uppercase shadow-2xl shadow-[#FDB515]/40">
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#results" className="px-10 py-5 rounded-sm font-black text-lg border-2 border-white hover:bg-white hover:text-black transition-all text-white uppercase">
              See Our Results
            </a>
          </div>

          <AnimatedStats />
        </div>
      </section>

      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDB515]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <p className="text-gray-600 uppercase tracking-[0.2em] text-xs font-bold mb-3">Certified Partners</p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#FDB515]/50 to-transparent mx-auto"></div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20 opacity-50 hover:opacity-100 transition-opacity duration-700">
            {[
              { name: 'Google Partner', icon: <Search className="w-12 h-12" /> },
              { name: 'Meta Partner', icon: <MessageSquare className="w-12 h-12" /> },
              { name: 'SEO Certified', icon: <TrendingUp className="w-12 h-12" /> },
              { name: 'Analytics Pro', icon: <BarChart3 className="w-12 h-12" /> },
              { name: 'Web Expert', icon: <Globe className="w-12 h-12" /> }
            ].map((partner, index) => (
              <div key={index} className="flex flex-col items-center justify-center group">
                <div className="text-gray-700 group-hover:text-[#FDB515] transition-all duration-500 mb-4 group-hover:scale-125 filter group-hover:drop-shadow-[0_0_8px_rgba(253,181,21,0.3)]">
                  {partner.icon}
                </div>
                <span className="text-gray-700 text-[10px] font-bold uppercase tracking-[0.15em] group-hover:text-gray-500 transition-colors duration-500">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection animation="slideUp" className="text-center mb-20">
            <div className="inline-block bg-[#FDB515] px-8 py-4 mb-6 transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <h2 className="text-5xl md:text-7xl font-black text-black uppercase transform rotate-1">
                Services That Perform
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Not just clicks. Actual business growth. Every service is strategy-first, results-driven.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Search className="w-12 h-12" />,
                title: 'SEO & Local Search',
                promise: 'Dominate Google in your local area',
                description: 'Strategic SEO that gets you found by customers ready to buy. Local search optimization that drives foot traffic and phone calls.',
                highlight: true
              },
              {
                icon: <Target className="w-12 h-12" />,
                title: 'Google Ads & PPC',
                promise: 'Every dollar works harder for you',
                description: 'High-performance ad campaigns with transparent ROI tracking. Stop wasting money on clicks that don\'t convert.',
                highlight: false
              },
              {
                icon: <MessageSquare className="w-12 h-12" />,
                title: 'Social Media Marketing',
                promise: 'Build a brand people remember',
                description: 'Content that engages, converts, and builds community. From strategy to execution across all platforms.',
                highlight: false
              },
              {
                icon: <Globe className="w-12 h-12" />,
                title: 'Websites & Landing Pages',
                promise: 'Your 24/7 sales machine',
                description: 'Fast, conversion-optimized websites that turn visitors into customers. Mobile-first, SEO-ready, lead-generating.',
                highlight: false
              },
              {
                icon: <BarChart3 className="w-12 h-12" />,
                title: 'Marketing Strategy',
                promise: 'Know exactly where to invest',
                description: 'Data-driven strategy that aligns all channels. Clear roadmaps, competitive analysis, and quarterly planning.',
                highlight: true
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: 'Campaign Management',
                promise: 'Set it and grow it',
                description: 'Full-service campaign management with weekly optimization. Transparent reporting and continuous improvement.',
                highlight: false
              }
            ].map((service, index) => (
              <AnimatedSection key={index} animation="slideUp" delay={index * 100}>
                <div
                  className={`hover-tilt group p-8 transition-all duration-300 hover:shadow-2xl ${
                    service.highlight
                      ? 'bg-black text-white border-4 border-[#FDB515]'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-[#FDB515]'
                  }`}
                >
                <div className={`w-20 h-20 flex items-center justify-center mb-6 transition-all ${
                  service.highlight
                    ? 'bg-[#FDB515] text-black'
                    : 'bg-black text-[#FDB515] group-hover:bg-[#FDB515] group-hover:text-black'
                }`}>
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-black mb-3 uppercase ${
                  service.highlight ? 'text-white' : 'text-black'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-lg font-bold mb-4 ${
                  service.highlight ? 'text-[#FDB515]' : 'text-gray-900'
                }`}>
                  {service.promise}
                </p>
                <p className={`mb-6 leading-relaxed ${
                  service.highlight ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>
                <a href="#contact" className={`inline-flex items-center space-x-2 font-bold uppercase text-sm group-hover:translate-x-2 transition-transform ${
                  service.highlight ? 'text-[#FDB515]' : 'text-black'
                }`}>
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB515] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FDB515] rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-[#FDB515]/10 border border-[#FDB515]/30 px-6 py-3 rounded-full mb-8">
                <span className="text-[#FDB515] font-bold text-sm uppercase tracking-wide">Why Optimised Marketing</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase leading-tight">
                Not Just Clicks
                <br />
                <span className="text-[#FDB515]">Actual Business Growth</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                We're not your typical agency. We're local business specialists who understand what it takes to grow in competitive markets.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Transparent, no-BS reporting you can actually understand' },
                  { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Local business specialists based in Melbourne' },
                  { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Strategy first, channels second approach' },
                  { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Direct access to senior strategists, not juniors' },
                  { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Month-to-month contracts, no lock-ins' },
                  { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Results-driven with clear KPIs and milestones' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FDB515]/10 border border-[#FDB515]/30 rounded-lg flex items-center justify-center text-[#FDB515]">
                      {item.icon}
                    </div>
                    <p className="text-lg text-gray-300 font-medium pt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <AnimatedSection animation="scale" delay={0}>
                <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all hover:scale-105 hover-tilt">
                  <AnimatedStat value={215} label="Avg Organic Traffic Growth" prefix="+" suffix="%" />
                  <div className="text-gray-400 text-sm mt-2">6 months</div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="scale" delay={100}>
                <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all hover:scale-105 hover-tilt">
                  <div className="text-5xl font-black text-[#FDB515] mb-3">3.4x</div>
                  <div className="text-white font-bold mb-2 uppercase text-sm">Average ROAS</div>
                  <div className="text-gray-400 text-sm">Paid campaigns</div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="scale" delay={200}>
                <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all hover:scale-105 hover-tilt">
                  <AnimatedStat value={92} label="Client Retention Rate" suffix="%" />
                  <div className="text-gray-400 text-sm mt-2">Year over year</div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="scale" delay={300}>
                <div className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all hover:scale-105 hover-tilt">
                  <div className="text-5xl font-black text-[#FDB515] mb-3">&lt;24h</div>
                  <div className="text-white font-bold mb-2 uppercase text-sm">Response Time</div>
                  <div className="text-gray-400 text-sm">Always accessible</div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-black px-8 py-4 mb-6">
              <h2 className="text-5xl md:text-7xl font-black text-[#FDB515] uppercase">
                Featured Case Study
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Real businesses. Real results. Real growth.
            </p>
          </div>

          <div className="bg-gradient-to-br from-black to-gray-900 p-8 md:p-12 mb-20 border-4 border-[#FDB515]">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="inline-block bg-[#FDB515] px-4 py-2 text-black font-black uppercase text-sm mb-6">
                  Local Tradie Business
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  From 2 Enquiries Per Month to 40+ Qualified Calls
                </h3>
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h4 className="text-[#FDB515] font-bold uppercase mb-2">The Problem</h4>
                    <p className="leading-relaxed">Zero online presence, relying 100% on word-of-mouth. Inconsistent work pipeline and competing with larger companies who dominated Google.</p>
                  </div>
                  <div>
                    <h4 className="text-[#FDB515] font-bold uppercase mb-2">Our Strategy</h4>
                    <p className="leading-relaxed">Built SEO-optimized website, launched local Google Ads campaign, implemented Google Business Profile optimization, and created service area pages for 15 Melbourne suburbs.</p>
                  </div>
                  <div>
                    <h4 className="text-[#FDB515] font-bold uppercase mb-2">The Results</h4>
                    <p className="leading-relaxed">Within 4 months: first page rankings for 23 keywords, 3.8x increase in organic traffic, and consistent 40-50 quality enquiries monthly. Now fully booked 6 weeks ahead.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                {[
                  { metric: '+2,150%', description: 'Increase in monthly enquiries' },
                  { metric: '23', description: 'First page keyword rankings' },
                  { metric: '$4.20', description: 'Cost per qualified lead' },
                  { metric: '6 weeks', description: 'Now booked in advance' }
                ].map((result, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 p-6">
                    <div className="text-5xl font-black text-[#FDB515] mb-2">{result.metric}</div>
                    <div className="text-white font-bold uppercase text-sm">{result.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                industry: 'Health & Wellness',
                headline: 'Triple Revenue in 8 Months',
                result: 'Combined SEO and social media strategy drove 425% increase in bookings.',
                stats: '+425% Revenue'
              },
              {
                industry: 'Professional Services',
                headline: 'From Invisible to Industry Leader',
                result: 'Comprehensive digital strategy secured 10+ high-value clients monthly.',
                stats: '10x Lead Flow'
              },
              {
                industry: 'E-Commerce',
                headline: 'Scale from $15K to $180K/Month',
                result: 'Strategic Google Ads + email automation transformed online store.',
                stats: '12x Growth'
              }
            ].map((study, index) => (
              <div key={index} className="bg-gray-50 border-2 border-gray-200 p-8 hover:border-black hover:shadow-2xl transition-all group">
                <div className="inline-block bg-black text-[#FDB515] px-4 py-2 text-xs font-black uppercase mb-4">
                  {study.industry}
                </div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase leading-tight group-hover:text-[#FDB515] transition-colors">
                  {study.headline}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{study.result}</p>
                <div className="text-4xl font-black text-black mb-4">{study.stats}</div>
                <a href="#contact" className="inline-flex items-center space-x-2 font-bold uppercase text-sm text-black hover:text-[#FDB515] transition-colors">
                  <span>Read Full Case Study</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-[#FDB515] px-8 py-4 mb-6 transform rotate-1">
              <h2 className="text-5xl md:text-7xl font-black text-black uppercase transform -rotate-1">
                How We Get Results
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Our proven 4-step process that turns strategy into measurable growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                icon: <Phone className="w-10 h-10" />,
                title: 'Deep Discovery Call',
                description: 'We audit your current marketing, understand your goals, and identify quick wins plus long-term opportunities.'
              },
              {
                step: '02',
                icon: <Target className="w-10 h-10" />,
                title: 'Strategy & Mapping',
                description: 'Custom roadmap tailored to your business. Clear KPIs, channel mix, budget allocation, and timeline milestones.'
              },
              {
                step: '03',
                icon: <Zap className="w-10 h-10" />,
                title: 'Launch & Optimize',
                description: 'Rapid implementation with continuous testing. Weekly optimization based on real data and performance metrics.'
              },
              {
                step: '04',
                icon: <TrendingUp className="w-10 h-10" />,
                title: 'Scale & Report',
                description: 'Double down on what works. Transparent monthly reports with insights, recommendations, and next steps.'
              }
            ].map((process, index) => (
              <div key={index} className="relative group">
                <div className="bg-white border-2 border-gray-200 p-8 hover:border-[#FDB515] hover:shadow-2xl transition-all hover:-translate-y-2">
                  <div className="text-8xl font-black text-gray-100 absolute top-4 right-4 group-hover:text-[#FDB515]/10 transition-colors">
                    {process.step}
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-black text-[#FDB515] flex items-center justify-center mb-6 group-hover:bg-[#FDB515] group-hover:text-black transition-all">
                      {process.icon}
                    </div>
                    <h3 className="text-2xl font-black text-black mb-4 uppercase">{process.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{process.description}</p>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ChevronRight className="w-8 h-8 text-[#FDB515]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="#contact" className="inline-flex items-center space-x-3 bg-black text-white px-10 py-5 rounded-sm font-black text-lg hover:bg-gray-900 hover:scale-105 transition-all uppercase">
              <span>Start Your Growth Journey</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-[#FDB515] px-8 py-4 mb-6">
              <h2 className="text-5xl md:text-7xl font-black text-black uppercase">
                Client Success Stories
              </h2>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Best decision we made was switching to Optimised Marketing. Our enquiries tripled in the first 2 months and haven't stopped growing.",
                author: 'Sarah Thompson',
                business: 'Thompson Plumbing Services',
                rating: 5
              },
              {
                quote: "Finally, an agency that actually understands local business. Clear reporting, great communication, and most importantly - real results.",
                author: 'Michael Chen',
                business: 'Chen Family Dental',
                rating: 5
              },
              {
                quote: "We were skeptical about digital marketing. The Optimised team proved us wrong with consistent leads and transparent ROI tracking.",
                author: 'Jennifer Martinez',
                business: 'Martinez Legal Group',
                rating: 5
              }
            ].map((review, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all">
                <div className="flex space-x-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#FDB515] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed italic">"{review.quote}"</p>
                <div className="border-t border-white/10 pt-6">
                  <div className="font-bold text-white uppercase text-sm">{review.author}</div>
                  <div className="text-gray-400 text-sm">{review.business}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="https://www.google.com/search?q=optimised+marketing+reviews" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-[#FDB515] hover:text-[#f5a400] font-bold uppercase text-sm transition-colors">
              <span>Read All Reviews on Google</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-black px-6 py-3 mb-8">
                <h2 className="text-5xl md:text-6xl font-black text-[#FDB515] uppercase">
                  About Us
                </h2>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-black mb-6 uppercase leading-tight">
                Melbourne-Based Digital Marketing Specialists
              </h3>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                We're not a faceless agency. We're a tight-knit team of marketing strategists, creative minds, and data nerds who genuinely care about local business success.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Founded in Melbourne, we've spent 10+ years helping local businesses compete and win against bigger competitors. Our secret? We treat every client like they're our only client.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <Zap className="w-6 h-6" />, title: 'Innovation First', description: 'Latest strategies, not yesterday\'s tactics' },
                  { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Honest Always', description: 'Transparent reporting, no smoke and mirrors' },
                  { icon: <TrendingUp className="w-6 h-6" />, title: 'Results Driven', description: 'Your growth is our success metric' },
                  { icon: <Users className="w-6 h-6" />, title: 'Partnership Focused', description: 'We\'re in this together, long-term' }
                ].map((pillar, index) => (
                  <div key={index} className="bg-gray-50 border-2 border-gray-200 p-6 hover:border-black transition-colors">
                    <div className="w-12 h-12 bg-black text-[#FDB515] flex items-center justify-center mb-4">
                      {pillar.icon}
                    </div>
                    <h4 className="font-black text-black uppercase text-sm mb-2">{pillar.title}</h4>
                    <p className="text-gray-600 text-sm">{pillar.description}</p>
                  </div>
                ))}
              </div>

              <a href="#contact" className="inline-flex items-center space-x-3 bg-[#FDB515] text-black px-8 py-4 rounded-sm font-black hover:bg-[#f5a400] hover:scale-105 transition-all uppercase">
                <span>Let's Talk About Your Goals</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="aspect-square bg-[#FDB515] flex items-center justify-center p-12">
                    <img src="/M3QvJPmj copy copy copy.png" alt="Optimised Marketing Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="aspect-square bg-black flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-5xl font-black text-[#FDB515] mb-2">10+</div>
                      <div className="text-white font-bold uppercase text-sm">Years Experience</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="aspect-square bg-black flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-5xl font-black text-[#FDB515] mb-2">150+</div>
                      <div className="text-white font-bold uppercase text-sm">Active Clients</div>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-900 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-5xl font-black text-[#FDB515] mb-2">24/7</div>
                      <div className="text-white font-bold uppercase text-sm">Support Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FDB515] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#FDB515] rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <img src="/aob5Wzbb.jpg" alt="Optimised Marketing" className="w-24 h-24 mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase leading-tight">
              Ready To Grow
              <br />
              <span className="text-[#FDB515]">Your Business?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Let's optimise your marketing, not just your ad spend. Book a no-obligation strategy call and get a clear roadmap to growth.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold mb-2 uppercase text-sm">Your Name *</label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#FDB515] transition-colors"
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-bold mb-2 uppercase text-sm">Business Name *</label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#FDB515] transition-colors"
                    placeholder="Smith & Co"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold mb-2 uppercase text-sm">Email *</label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#FDB515] transition-colors"
                    placeholder="john@smithco.com.au"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-bold mb-2 uppercase text-sm">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#FDB515] transition-colors"
                    placeholder="04XX XXX XXX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-bold mb-2 uppercase text-sm">Website (if applicable)</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#FDB515] transition-colors"
                  placeholder="www.yoursite.com.au"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2 uppercase text-sm">Monthly Marketing Budget</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#FDB515] transition-colors"
                >
                  <option value="">Select a range</option>
                  <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                  <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000+">$10,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-bold mb-2 uppercase text-sm">What are your main goals?</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-[#FDB515] transition-colors h-32 resize-none"
                  placeholder="Tell us what you want to achieve..."
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border-2 border-green-500 text-white px-6 py-4 rounded-lg flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="font-bold">Success! We'll contact you within 24 hours.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border-2 border-red-500 text-white px-6 py-4 rounded-lg flex items-center space-x-3">
                  <X className="w-6 h-6 text-red-500" />
                  <span className="font-bold">Failed to send. Please try again or email us directly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#FDB515] text-black py-5 font-black text-lg uppercase transition-all shadow-2xl shadow-[#FDB515]/30 ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#f5a400] hover:scale-105'
                }`}
              >
                {isSubmitting ? 'SENDING...' : 'Book My Strategy Call'}
              </button>

              <p className="text-center text-gray-400 text-sm">
                Or prefer to email?{' '}
                <a href="mailto:info@optimisedmarketing.com.au" className="text-[#FDB515] hover:text-[#f5a400] font-bold underline">
                  info@optimisedmarketing.com.au
                </a>
              </p>
            </form>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            <div>
              <Phone className="w-8 h-8 text-[#FDB515] mx-auto mb-4" />
              <div className="text-white font-bold mb-2">Call Us</div>
              <a href="tel:1300678177" className="text-[#FDB515] hover:text-[#f5a400] font-black text-xl">
                1300 678 177
              </a>
            </div>
            <div>
              <Mail className="w-8 h-8 text-[#FDB515] mx-auto mb-4" />
              <div className="text-white font-bold mb-2">Email Us</div>
              <a href="mailto:info@optimisedmarketing.com.au" className="text-[#FDB515] hover:text-[#f5a400] font-bold">
                info@optimisedmarketing.com.au
              </a>
            </div>
            <div>
              <Globe className="w-8 h-8 text-[#FDB515] mx-auto mb-4" />
              <div className="text-white font-bold mb-2">Visit Our Office</div>
              <p className="text-gray-400 text-sm">
                102/420-428 Spencer St
                <br />
                Melbourne VIC 3033
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src="/M3QvJPmj copy.png"
                  alt="Optimised Marketing"
                  className="h-10 w-auto"
                />
                <span className="text-lg font-black text-white uppercase">Optimised Marketing</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Melbourne's local marketing specialists. We make brands unmissable.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/optimisedmarketing/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FDB515] hover:border-[#FDB515] transition-colors group">
                  <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-black" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-black text-white mb-4 uppercase text-sm">Services</h3>
              <ul className="space-y-3">
                <li><a href="#services" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm">SEO & Local Search</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm">Google Ads & PPC</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm">Social Media Marketing</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm">Website Development</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm">Marketing Strategy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-black text-white mb-4 uppercase text-sm">Company</h3>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm">About Us</a></li>
                <li><a href="#results" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm">Case Studies</a></li>
                <li><a href="#process" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm">Our Process</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-black text-white mb-4 uppercase text-sm">Get In Touch</h3>
              <ul className="space-y-3">
                <li>
                  <a href="tel:1300678177" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>1300 678 177</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@optimisedmarketing.com.au" className="text-gray-400 hover:text-[#FDB515] transition-colors text-sm flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Us</span>
                  </a>
                </li>
                <li className="text-gray-400 text-sm">
                  102/420-428 Spencer St<br />
                  Melbourne VIC 3033
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              © 2024 Optimised Marketing. All rights reserved.
            </div>
            <div className="text-gray-500 text-sm">
              <a href="https://www.optimisedmarketing.com.au" className="hover:text-[#FDB515] transition-colors">
                www.optimisedmarketing.com.au
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
