/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Check, MapPin, Phone, 
  Facebook, Twitter, Instagram, Linkedin, 
  ArrowRight, Quote, MessageSquare, 
  ChevronUp, Mail, Send
} from 'lucide-react';

// --- Components ---

const Reveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number; key?: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Counter = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 20);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center group">
      <h3 className="text-5xl md:text-6xl font-bold text-yellow mb-2 transition-transform group-hover:scale-110 duration-300">
        {count.toLocaleString()}+
      </h3>
      <p className="text-white uppercase tracking-widest text-xs font-semibold opacity-80">{label}</p>
    </div>
  );
};

const TestimonialCard = ({ name, role, quote, image }: { name: string; role: string; quote: string; image: string }) => (
  <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-black/5 border border-slate-100 flex flex-col h-full relative group transition-all duration-500 mx-2">
    <Quote className="absolute top-6 right-8 text-orange/10 group-hover:text-orange/20 transition-colors" size={40} />
    <div className="flex items-center gap-4 mb-6">
      <img 
        src={image} 
        alt={name} 
        className="w-12 h-12 rounded-full object-cover border-2 border-orange/20"
        referrerPolicy="no-referrer"
      />
      <div>
        <h4 className="font-bold text-navy text-base">{name}</h4>
        <p className="text-[10px] text-orange font-bold uppercase tracking-widest">{role}</p>
      </div>
    </div>
    <p className="text-slate-600 italic leading-relaxed relative z-10 flex-grow text-sm md:text-base">
      "{quote}"
    </p>
  </div>
);

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Adewale Johnson",
      role: "Alumni, 2023 Bootcamp",
      quote: "YMEI didn't just teach me how to code; they taught me how to think like an entrepreneur. I've now started my own small web agency in Ibadan.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Chidinma Okoro",
      role: "Student, UI Workshop",
      quote: "The mentorship program was a game-changer for me. Having someone who believes in your potential makes all the difference in the world.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Tunde Bakare",
      role: "Community Lead",
      quote: "Watching these kids grow from being unsure of themselves to launching their own community projects is the most rewarding experience.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Sarah Alabi",
      role: "Entrepreneurship Fellow",
      quote: "The mindset reorientation at YMEI is what Nigeria needs. It shifts the focus from seeking jobs to creating opportunities.",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Ibrahim Musa",
      role: "Agri-Tech Participant",
      quote: "I learned how to combine technology with agriculture. Now I'm helping my father's farm become more efficient through data.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Blessing Effiong",
      role: "Digital Literacy Student",
      quote: "Before YMEI, I was afraid of computers. Today, I'm building websites and teaching my younger siblings how to stay safe online.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Oluwaseun Adeyemi",
      role: "Creative Arts Lead",
      quote: "YMEI showed me that creativity can be a sustainable career. Their business workshops for artists were incredibly eye-opening.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Fatima Yusuf",
      role: "Leadership Graduate",
      quote: "The leadership training gave me the confidence to speak up for my community. I'm now a youth representative in our local council.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = testimonials.length - itemsToShow;
  
  const next = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <div className="overflow-hidden py-8">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="px-2 shrink-0"
              style={{ width: `${100 / itemsToShow}%` }}
            >
              <TestimonialCard {...t} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1 md:-mx-20 pointer-events-none">
        <button
          onClick={prev}
          className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-orange hover:text-white transition-all pointer-events-auto active:scale-90"
        >
          <ArrowRight size={16} className="rotate-180 md:w-6 md:h-6" />
        </button>
        <button
          onClick={next}
          className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-orange hover:text-white transition-all pointer-events-auto active:scale-90"
        >
          <ArrowRight size={16} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-orange w-8" : "bg-slate-200 hover:bg-orange/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Roadmap', href: '#theory' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Leadership', href: '#leadership' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange/30 selection:text-navy">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full flex justify-between items-center px-[8%] py-4 z-[2000] transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-xl shadow-black/5 py-3' : 'bg-transparent py-5'
      }`}>
        <a href="#" className={`font-extrabold text-3xl tracking-tighter transition-colors duration-500 ${
          scrolled ? 'text-navy' : 'text-white'
        }`}>
          YME<span className="text-orange">I</span>
        </a>
        
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`font-semibold text-sm transition-all hover:text-orange relative group ${
                scrolled ? 'text-navy' : 'text-white'
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange transition-all group-hover:w-full" />
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-orange text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-orange/30 hover:bg-navy transition-all hover:scale-105 active:scale-95"
          >
            Partner With Us
          </a>
        </div>

        <button onClick={toggleSidebar} className={`lg:hidden cursor-pointer transition-colors duration-500 ${
          scrolled ? 'text-navy' : 'text-white'
        }`}>
          <Menu size={32} />
        </button>
      </nav>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-[2500]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[300px] h-full bg-white z-[3000] p-10 flex flex-col gap-6 shadow-2xl"
            >
              <button onClick={toggleSidebar} className="self-end text-navy mb-8 hover:rotate-90 transition-transform">
                <X size={40} />
              </button>
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={toggleSidebar}
                  className="text-navy text-xl font-bold hover:text-orange transition-colors flex items-center justify-between group"
                >
                  {link.name}
                  <ArrowRight size={20} className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </a>
              ))}
              <div className="mt-auto pt-10 border-t border-slate-100">
                <a 
                  href="#contact" 
                  onClick={toggleSidebar}
                  className="bg-orange text-white px-6 py-4 rounded-2xl font-bold text-center shadow-xl shadow-orange/30 block hover:bg-navy transition-all"
                >
                  Partner With Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero */}
      <header className="relative h-screen flex items-center justify-center px-[8%] pt-20 md:pt-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
          style={{ 
            backgroundImage: "linear-gradient(rgba(10, 61, 98, 0.7), rgba(10, 61, 98, 0.85)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80')" 
          }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-[700px] text-center"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-yellow font-bold uppercase text-sm mb-6 block tracking-[0.2em]"
          >
            Empowering the Next Generation
          </motion.span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 md:mb-8 tracking-tight">
            Igniting <span className="text-yellow italic">Potential</span>, <br />
            Building <span className="text-orange">Futures</span>.
          </h1>
          <p className="text-white/80 text-base md:text-xl mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto">
            We bridge the gap between traditional education and real-world entrepreneurship for underserved Nigerian youth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#about" className="bg-white text-navy px-10 py-4 rounded-full font-bold hover:bg-yellow transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group">
              Learn More <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex gap-3">
              <div className="bg-orange/20 backdrop-blur-md text-white border border-white/20 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider">
                SDG 4
              </div>
              <div className="bg-orange/20 backdrop-blur-md text-white border border-white/20 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider">
                SDG 8
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </header>

      {/* About */}
      <section id="about" className="py-12 md:py-20 px-[8%] bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <Reveal className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">Our Core Identity</h2>
          <div className="w-24 h-2 bg-orange mx-auto rounded-full" />
          <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
            YMEI is more than an organization; it's a movement dedicated to reshaping the mindset of the Nigerian youth.
          </p>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <Reveal delay={0.2}>
            <div className="p-8 md:p-12 bg-light rounded-[2.5rem] border-l-8 border-navy h-full relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-navy/5 group-hover:text-navy/10 transition-colors">
                <MessageSquare size={100} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-navy mb-6">Our Mission</h3>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed relative z-10">
                To bridge the gap between education and entrepreneurship by equipping young people with mindset reorientation and life skills that foster self-reliance.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="p-8 md:p-12 bg-light rounded-[2.5rem] border-l-8 border-orange h-full relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-orange/5 group-hover:text-orange/10 transition-colors">
                <ArrowRight size={100} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-navy mb-6">Our Vision</h3>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed relative z-10">
                A transformed generation of Nigerian youth who are practically skilled, economically empowered, and socially responsible leaders.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-navy py-12 md:py-16 px-[8%] grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        </div>
        <Counter target={2500} label="Students Trained" />
        <Counter target={28} label="Schools Reached" />
        <Counter target={150} label="Students Skilled" />
        <Counter target={15} label="Expert Volunteers" />
      </div>

      {/* Theory of Change */}
      <section id="theory" className="py-12 md:py-20 px-[8%] bg-slate-50">
        <Reveal className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">Theory of Change</h2>
          <div className="w-24 h-2 bg-orange mx-auto rounded-full" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {[
            { title: "Inputs", items: ["Educators & Volunteers", "Digital Tools", "Industry Mentors", "Curriculum Design"] },
            { title: "Activities", items: ["Identity Workshops", "Skill Bootcamps", "Peer Mentorship", "Community Projects"] },
            { title: "Outcomes", items: ["Confidence & Clarity", "Future Agency", "Early Ventures", "Problem Solving"] },
          ].map((card, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="bg-white p-10 rounded-[32px] shadow-xl shadow-black/5 border border-slate-100 h-full hover:shadow-2xl transition-all duration-500 group">
                <div className="w-12 h-12 bg-orange/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange group-hover:text-white transition-all duration-500">
                  <Check size={24} />
                </div>
                <h4 className="text-navy font-bold uppercase mb-6 tracking-widest text-sm">{card.title}</h4>
                <ul className="space-y-4">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                      <div className="w-1.5 h-1.5 bg-orange rounded-full mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.4}>
            <div className="bg-navy p-10 rounded-[32px] shadow-2xl h-full text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-yellow font-bold uppercase mb-6 tracking-widest text-sm">Long-term Impact</h4>
              <p className="text-lg leading-relaxed opacity-90 font-medium">
                Establishment of youth-led enterprises and sustainable community development across Nigeria.
              </p>
              <div className="mt-10 pt-10 border-t border-white/10">
                <p className="text-xs text-white/50 uppercase tracking-widest">Goal 2030</p>
                <p className="text-xl font-bold text-yellow">10,000+ Leaders</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-12 md:py-20 px-[8%] bg-white">
        <Reveal className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">Impact in Action</h2>
          <div className="w-24 h-2 bg-orange mx-auto rounded-full" />
          <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
            A glimpse into our humanitarian activities and community outreach programs across Nigeria.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
          {[
            { 
              url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80",
              title: "Community Workshop",
              desc: "Empowering local youth through collaborative problem-solving sessions."
            },
            { 
              url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
              title: "Mentorship Program",
              desc: "Connecting industry experts with aspiring young entrepreneurs."
            },
            { 
              url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
              title: "Skill Training",
              desc: "Hands-on vocational training to foster self-reliance and economic growth."
            },
            { 
              url: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80",
              title: "Group Learning",
              desc: "Fostering a culture of peer-to-peer knowledge sharing."
            },
            { 
              url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
              title: "Youth Empowerment",
              desc: "Building confidence and leadership skills in the next generation."
            },
            { 
              url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
              title: "Community Outreach",
              desc: "Direct engagement with underserved communities to identify and address needs."
            }
          ].map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] shadow-lg">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <h4 className="text-white font-bold text-xl mb-2">{item.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-20 px-[8%] bg-white">
        <Reveal className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">Success Stories</h2>
          <div className="w-24 h-2 bg-orange mx-auto rounded-full" />
          <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-sm md:text-lg">
            Hear from the young minds who have transformed their futures through our initiatives.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <TestimonialCarousel />
        </Reveal>
      </section>

      {/* Leadership Structure */}
      <section id="leadership" className="py-12 md:py-20 px-[8%] bg-light relative overflow-hidden">
        <Reveal className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">Leadership Structure</h2>
          <div className="w-24 h-2 bg-orange mx-auto rounded-full" />
        </Reveal>

        <div className="max-w-5xl mx-auto">
          {/* Mobile Layout (Vertical) */}
          <div className="flex md:hidden flex-col items-center gap-4 relative">
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-navy/10 -translate-x-1/2" />
            
            {/* Top Level */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white text-navy px-5 py-3 rounded-xl text-center shadow-md border-b-4 border-orange relative z-10 w-full max-w-[240px]"
            >
              <p className="font-extrabold text-sm mb-0.5">Executive Director</p>
              <span className="text-orange text-[8px] font-black uppercase tracking-widest">The Visionary</span>
            </motion.div>

            {/* Second Level */}
            <div className="flex flex-col gap-3 w-full items-center">
              {[
                { name: "Project Lead", role: "Strategy & Execution" },
                { name: "Policy Lead", role: "Advocacy & Impact" },
                { name: "Partnership Lead", role: "Growth & Relations" }
              ].map((node, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 5 }}
                  className="bg-white text-navy px-4 py-2.5 rounded-lg text-center shadow-sm w-full max-w-[200px] border-l-4 border-navy relative z-10"
                >
                  <p className="font-bold text-xs">{node.name}</p>
                  <span className="text-orange text-[8px] font-bold uppercase tracking-wider">{node.role}</span>
                </motion.div>
              ))}
            </div>

            {/* Third Level */}
            <div className="flex flex-col gap-2 w-full items-center">
              {[
                { name: "Program Lead", role: "Curriculum" },
                { name: "Content Lead", role: "Media" },
                { name: "M&E Leads", role: "Data" }
              ].map((node, i) => (
                <motion.div 
                  key={i}
                  className="bg-slate-50 text-navy px-3 py-2 rounded-md text-center shadow-sm w-full max-w-[160px] border border-slate-200 relative z-10"
                >
                  <p className="font-bold text-[11px]">{node.name}</p>
                  <span className="text-orange text-[7px] font-bold uppercase tracking-widest">{node.role}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Layout (Horizontal Tree) */}
          <div className="hidden md:flex flex-col items-center gap-16">
            {/* Top Level */}
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white text-navy px-12 py-8 rounded-[32px] text-center shadow-2xl border-b-8 border-orange relative z-10"
              >
                <p className="font-extrabold text-xl mb-1">Executive Director</p>
                <span className="text-orange text-xs font-black uppercase tracking-widest">The Visionary</span>
              </motion.div>
              <div className="absolute top-full left-1/2 w-1 h-16 bg-navy/20 -translate-x-1/2" />
            </div>

            {/* Second Level */}
            <div className="flex gap-12 relative">
              <div className="absolute -top-16 left-0 right-0 h-1 bg-navy/20" />
              {[
                { name: "Project Lead", role: "Strategy & Execution" },
                { name: "Policy Lead", role: "Advocacy & Impact" },
                { name: "Partnership Lead", role: "Growth & Relations" }
              ].map((node, i) => (
                <div key={i} className="relative pt-16">
                  <div className="absolute top-0 left-1/2 w-1 h-16 bg-navy/20 -translate-x-1/2" />
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="bg-white text-navy px-8 py-6 rounded-2xl text-center shadow-xl min-w-[200px] border-t-4 border-navy"
                  >
                    <p className="font-bold text-lg">{node.name}</p>
                    <span className="text-orange text-xs font-bold uppercase tracking-wider">{node.role}</span>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Third Level */}
            <div className="flex gap-8">
              {[
                { name: "Program Lead", role: "Curriculum" },
                { name: "Content Lead", role: "Media" },
                { name: "M&E Leads", role: "Data" }
              ].map((node, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white text-navy px-6 py-5 rounded-xl text-center shadow-lg min-w-[180px] border-b-4 border-slate-100"
                >
                  <p className="font-bold">{node.name}</p>
                  <span className="text-orange text-[10px] font-bold uppercase tracking-widest">{node.role}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-10 md:py-16 px-[6%] md:px-[8%] bg-white">
        <Reveal className="max-w-6xl mx-auto bg-navy rounded-[32px] md:rounded-[60px] p-4 md:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to <span className="text-yellow">create change?</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto">
              Whether you want to mentor, partner, or donate, your contribution makes a real difference.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-10 md:mb-16 text-white/80">
              <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10">
                <MapPin size={18} className="text-yellow" />
                <span className="text-xs md:text-sm font-medium">UI, Ibadan, Oyo State</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10">
                <Phone size={18} className="text-yellow" />
                <span className="text-xs md:text-sm font-medium">0707 977 8649</span>
              </div>
            </div>

            <form action="https://formspree.io/f/meelnoqz" method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                required 
                className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-yellow outline-none transition-all text-sm md:text-base"
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                required 
                className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-yellow outline-none transition-all text-sm md:text-base"
              />
              <div className="md:col-span-2 relative">
                <select 
                  name="category" 
                  className="w-full p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-white/50 focus:ring-2 focus:ring-yellow outline-none transition-all appearance-none text-sm md:text-base"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-navy">Join as a...</option>
                  <option value="Volunteer" className="bg-navy">Volunteer / Mentor</option>
                  <option value="Partner" className="bg-navy">Partner / School</option>
                  <option value="Donor" className="bg-navy">Donor / Sponsor</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                  <ArrowRight size={18} className="rotate-90" />
                </div>
              </div>
              <textarea 
                name="message" 
                rows={4} 
                placeholder="Your message..." 
                required 
                className="md:col-span-2 p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:ring-2 focus:ring-yellow outline-none transition-all text-sm md:text-base"
              />
              <button 
                type="submit" 
                className="md:col-span-2 bg-yellow text-navy p-4 md:p-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:bg-white transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-yellow/20 flex items-center justify-center gap-3 group"
              >
                Send Message <Send size={20} className="md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-24 pb-12 px-[8%] text-slate-400 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <a href="#" className="text-3xl font-black text-white tracking-tighter mb-8 block">
              YME<span className="text-orange">I</span>
            </a>
            <p className="text-lg leading-relaxed mb-10 max-w-md">
              Empowering underserved Nigerian youth through mindset reorientation, life skills, and entrepreneurial training.
            </p>
            <div className="flex gap-5">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange hover:text-white transition-all duration-300 border border-white/10"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Quick Links</h5>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-orange transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Newsletter</h5>
            <p className="text-sm mb-6">Get the latest updates on our impact and upcoming programs.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 focus:ring-2 focus:ring-orange outline-none transition-all"
              />
              <button className="absolute right-2 top-2 w-10 h-10 bg-orange text-white rounded-full flex items-center justify-center hover:bg-navy transition-colors">
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>© 2026 Young Minds Empowerment Initiatives. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 w-14 h-14 bg-orange text-white rounded-full shadow-2xl flex items-center justify-center z-[2000] hover:bg-navy transition-all hover:-translate-y-2 active:scale-90"
          >
            <ChevronUp size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
