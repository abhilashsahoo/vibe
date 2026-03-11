'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ArrowUp,
  ArrowRight,
  X,
  Check,
  Star,
  Settings,
  Headphones,
  Shield,
  Users,
  Zap,
  Palette,
  RefreshCw,
  Code,
  Megaphone,
  Layers,
  Globe,
  Cpu,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  User,
  Rocket,
} from 'lucide-react';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { getThemeVars } from '@/lib/theme';

function setCookie(name: string, value: string, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

const COLOR_PRESETS = [
  { name: 'Indigo', hue: 250, color: 'hsl(250, 90%, 58%)' },
  { name: 'Blue', hue: 215, color: 'hsl(215, 90%, 55%)' },
  { name: 'Cyan', hue: 195, color: 'hsl(195, 85%, 48%)' },
  { name: 'Teal', hue: 175, color: 'hsl(175, 80%, 42%)' },
  { name: 'Emerald', hue: 160, color: 'hsl(160, 75%, 44%)' },
  { name: 'Green', hue: 145, color: 'hsl(145, 75%, 42%)' },
  { name: 'Lime', hue: 85, color: 'hsl(85, 70%, 45%)' },
  { name: 'Amber', hue: 40, color: 'hsl(40, 95%, 50%)' },
  { name: 'Orange', hue: 25, color: 'hsl(25, 95%, 55%)' },
  { name: 'Red', hue: 0, color: 'hsl(0, 80%, 55%)' },
  { name: 'Rose', hue: 340, color: 'hsl(340, 82%, 58%)' },
  { name: 'Pink', hue: 320, color: 'hsl(320, 80%, 55%)' },
  { name: 'Purple', hue: 280, color: 'hsl(280, 85%, 58%)' },
  { name: 'Slate', hue: 220, color: 'hsl(220, 15%, 50%)' },
];

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
  heroSide: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  aboutMain: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  aboutFloat: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&q=80',
  team1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  team2: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  team3: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  project1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  project2: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=800&q=80',
  project3: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
  project4: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  testimonial: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  blog1: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
};

function hslToRgbString(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return `${Math.round(f(0) * 255)}, ${Math.round(f(8) * 255)}, ${Math.round(f(4) * 255)}`;
}

function applyPrimaryColor(hue: number) {
  const s = 90,
    l = 58;
  document.documentElement.style.setProperty('--color-primary', `hsl(${hue}, ${s}%, ${l}%)`);
  document.documentElement.style.setProperty('--color-primary-light', `hsl(${hue}, ${s}%, 73%)`);
  document.documentElement.style.setProperty('--color-primary-dark', `hsl(${hue}, ${s}%, 46%)`);
  document.documentElement.style.setProperty('--color-primary-rgb', hslToRgbString(hue, s, l));
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [billingAnnual, setBillingAnnual] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [colorStyle, setColorStyle] = useState<'gradient' | 'flat'>('gradient');
  const [activeColor, setActiveColor] = useState(250);

  useEffect(() => {
    const savedTheme = (getCookie('vibe_theme') as 'dark' | 'light') || 'dark';
    const savedStyle = (getCookie('vibe_style') as 'gradient' | 'flat') || 'gradient';
    const savedColor = parseInt(getCookie('vibe_color') || '250', 10);

    setTheme(savedTheme);
    setColorStyle(savedStyle);
    setActiveColor(savedColor);

    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-style', savedStyle);
    applyPrimaryColor(savedColor);

    const vars = getThemeVars();
    document.documentElement.style.setProperty('--color-secondary', vars['--color-secondary']);
    document.documentElement.style.setProperty('--color-secondary-light', vars['--color-secondary-light']);
    document.documentElement.style.setProperty('--color-secondary-dark', vars['--color-secondary-dark']);
    document.documentElement.style.setProperty('--color-secondary-rgb', vars['--color-secondary-rgb']);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    setCookie('vibe_theme', next);
  }, [theme]);

  const toggleStyle = useCallback(() => {
    const next = colorStyle === 'gradient' ? 'flat' : 'gradient';
    setColorStyle(next);
    document.documentElement.setAttribute('data-style', next);
    setCookie('vibe_style', next);
  }, [colorStyle]);

  const changeColor = useCallback((hue: number) => {
    setActiveColor(hue);
    applyPrimaryColor(hue);
    setCookie('vibe_color', String(hue));
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          <a href="#" className="header__logo">
            <span>Vibe</span>
          </a>

          <nav className="header__nav">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header__actions">
            <a href="#contact" className="btn btn--primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
              Get Started
            </a>
            <button className="header__hamburger" onClick={() => setMobileNav(true)} aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${mobileNav ? 'open' : ''}`}>
        <button
          onClick={() => setMobileNav(false)}
          style={{ position: 'absolute', top: 32, right: 32, color: 'var(--text)' }}
          aria-label="Close menu"
        >
          <X size={32} />
        </button>
        {['Features', 'About', 'Services', 'Pricing', 'Projects', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileNav(false)}>
            {item}
          </a>
        ))}
      </div>

      <main>
        <section className="hero" id="hero">
          <div className="hero__bg">
            <img src={IMAGES.hero} alt="Hero Background" />
          </div>
          <div className="hero__glow hero__glow--primary" />
          <div className="hero__glow hero__glow--secondary" />

          <div className="container">
            <div className="hero__inner">
              <div className="hero__content animate-in">
                <div className="hero__badge">
                  <Rocket size={14} /> We Build Digital Experiences
                </div>
                <h1 className="hero__title">
                  Crafting <span>Premium Digital</span> Solutions for Startups
                </h1>
                <p className="hero__text">
                  We specialize in UI/UX design, web development, and digital marketing. Empowering
                  businesses with cutting-edge technology and stunning design.
                </p>
                <div className="hero__actions">
                  <a href="#contact" className="btn btn--primary">
                    Get Started Now <ArrowRight size={18} />
                  </a>
                  <a href="#about" className="btn btn--outline">
                    Learn More
                  </a>
                </div>

                <div className="hero__stats">
                  <div>
                    <div className="hero__stat-value">500+</div>
                    <div className="hero__stat-label">Projects Completed</div>
                  </div>
                  <div>
                    <div className="hero__stat-value">120+</div>
                    <div className="hero__stat-label">Happy Clients</div>
                  </div>
                  <div>
                    <div className="hero__stat-value">15+</div>
                    <div className="hero__stat-label">Awards Won</div>
                  </div>
                </div>
              </div>

              <div className="hero__image animate-in" style={{ animationDelay: '0.2s' }}>
                <img src={IMAGES.heroSide} alt="Digital workspace" />
              </div>
            </div>
          </div>
        </section>

        <section className="section section--gradient" id="features">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Why Choose Us</div>
              <h2 className="section-header__title">
                Powerful Features to <span className="gradient-text">Elevate</span> Your Business
              </h2>
              <p className="section-header__text">
                Everything you need to launch and scale your startup with confidence.
              </p>
            </div>

            <div className="features__grid">
              {[
                {
                  icon: <Headphones size={28} />,
                  title: '24/7 Support',
                  text: 'Round-the-clock expert assistance to keep your business running smoothly.',
                },
                {
                  icon: <Shield size={28} />,
                  title: 'Enterprise Security',
                  text: 'Bank-grade encryption and security measures to protect your data.',
                },
                {
                  icon: <Users size={28} />,
                  title: 'Team Collaboration',
                  text: 'Seamless tools for your team to work together effectively from anywhere.',
                },
                {
                  icon: <Zap size={28} />,
                  title: 'Lightning Fast',
                  text: 'Optimized for speed with edge delivery and intelligent caching.',
                },
                {
                  icon: <Palette size={28} />,
                  title: 'Fully Customizable',
                  text: 'Tailor every aspect to match your brand identity perfectly.',
                },
                {
                  icon: <RefreshCw size={28} />,
                  title: 'Regular Updates',
                  text: 'Continuous improvements and new features delivered seamlessly.',
                },
              ].map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-card__icon">{f.icon}</div>
                  <h4 className="feature-card__title">{f.title}</h4>
                  <p className="feature-card__text">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <div className="about__inner">
              <div className="about__images">
                <div className="about__img-glow" />
                <div className="about__img-main">
                  <img src={IMAGES.aboutMain} alt="Team working together" />
                </div>
                <div className="about__img-float animate-float">
                  <img src={IMAGES.aboutFloat} alt="Team collaboration" />
                </div>
              </div>

              <div>
                <div className="about__badge">About Us</div>
                <h2 className="about__title">
                  We Make Our Customers Happy by Giving{' '}
                  <span className="gradient-text">Best Services</span>
                </h2>
                <p className="about__text">
                  With over a decade of experience, we build digital products that are beautiful,
                  functional, and drive real business results. Our passion is turning complex
                  challenges into elegant solutions.
                </p>
                <div className="about__list">
                  {[
                    'Expert team of designers & developers',
                    'Agile methodology for fast delivery',
                    'Transparent communication & reporting',
                    '100% satisfaction guaranteed',
                  ].map((item, i) => (
                    <div className="about__list-item" key={i}>
                      <div className="about__list-icon">
                        <Check size={14} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="btn btn--primary">
                  Get In Touch <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--gradient" id="team">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Our Team</div>
              <h2 className="section-header__title">
                Meet Our <span className="gradient-text">Creative</span> Team
              </h2>
              <p className="section-header__text">
                Talented people who make the magic happen every single day.
              </p>
            </div>

            <div className="team__grid">
              {[
                { name: 'Olivia Andrium', role: 'Product Manager', img: IMAGES.team1 },
                { name: 'James Cameron', role: 'Lead Designer', img: IMAGES.team2 },
                { name: 'Ava Richardson', role: 'Senior Developer', img: IMAGES.team3 },
              ].map((m, i) => (
                <div className="team-card" key={i}>
                  <div className="team-card__img">
                    <img src={m.img} alt={m.name} />
                    <div className="team-card__overlay">
                      <div className="team-card__socials">
                        {[Facebook, Twitter, Linkedin].map((Icon, j) => (
                          <a href="#" className="team-card__social" key={j}>
                            <Icon size={18} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <h4 className="team-card__name">{m.name}</h4>
                  <p className="team-card__role">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Our Services</div>
              <h2 className="section-header__title">
                Premium Quality <span className="gradient-text">Services</span>
              </h2>
              <p className="section-header__text">
                Comprehensive digital solutions tailored for modern businesses.
              </p>
            </div>

            <div className="services__grid">
              {[
                {
                  icon: <Code size={28} />,
                  title: 'Web Development',
                  text: 'Full-stack applications built with modern frameworks and best practices.',
                },
                {
                  icon: <Palette size={28} />,
                  title: 'UI/UX Design',
                  text: 'User-centered designs that are beautiful, intuitive, and engaging.',
                },
                {
                  icon: <Megaphone size={28} />,
                  title: 'Digital Marketing',
                  text: 'Data-driven strategies to grow your brand and reach your audience.',
                },
                {
                  icon: <Layers size={28} />,
                  title: 'Brand Identity',
                  text: 'Complete branding solutions from logo design to brand guidelines.',
                },
                {
                  icon: <Globe size={28} />,
                  title: 'SEO Optimization',
                  text: 'Boost your rankings and drive organic traffic to your website.',
                },
                {
                  icon: <Cpu size={28} />,
                  title: 'AI Solutions',
                  text: 'Intelligent automation and AI integration for modern businesses.',
                },
              ].map((s, i) => (
                <div className="service-card" key={i}>
                  <div className="service-card__icon">{s.icon}</div>
                  <h4 className="service-card__title">{s.title}</h4>
                  <p className="service-card__text">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--gradient" id="pricing">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Pricing Plans</div>
              <h2 className="section-header__title">
                Simple, <span className="gradient-text">Transparent</span> Pricing
              </h2>
              <p className="section-header__text">No hidden fees. Pick the plan that fits your needs.</p>
            </div>

            <div className="pricing__toggle">
              <span className="pricing__toggle-label">Monthly</span>
              <button
                className={`pricing__toggle-switch ${billingAnnual ? 'active' : ''}`}
                onClick={() => setBillingAnnual(!billingAnnual)}
                aria-label="Toggle billing"
              />
              <span className="pricing__toggle-label">
                Annually <span className="gradient-text" style={{ fontSize: 12 }}>(Save 20%)</span>
              </span>
            </div>

            <div className="pricing__grid">
              {[
                {
                  name: 'Starter',
                  monthly: 29,
                  featured: false,
                  features: ['5 Projects', '10 GB Storage', 'Basic Analytics', 'Email Support'],
                },
                {
                  name: 'Growth',
                  monthly: 59,
                  featured: true,
                  features: [
                    'Unlimited Projects',
                    '100 GB Storage',
                    'Advanced Analytics',
                    'Priority Support',
                    'Custom Domain',
                  ],
                },
                {
                  name: 'Enterprise',
                  monthly: 139,
                  featured: false,
                  features: [
                    'Everything in Growth',
                    'Unlimited Storage',
                    'Dedicated Manager',
                    '24/7 Phone Support',
                    'SLA Guarantee',
                  ],
                },
              ].map((plan, i) => {
                const price = billingAnnual ? Math.round(plan.monthly * 12 * 0.8) : plan.monthly;
                return (
                  <div
                    className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}
                    key={i}
                  >
                    <h4 className="pricing-card__name">{plan.name}</h4>
                    <div className="pricing-card__price">
                      <span className="pricing-card__amount">${price}</span>
                      <span className="pricing-card__period">/{billingAnnual ? 'year' : 'month'}</span>
                    </div>
                    <p className="pricing-card__desc">No credit card required</p>
                    <div className="pricing-card__features">
                      {plan.features.map((f, j) => (
                        <div className="pricing-card__feature" key={j}>
                          <Check size={16} className="pricing-card__check" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="#"
                      className={`btn ${plan.featured ? 'btn--primary' : 'btn--outline'}`}
                      style={{ width: '100%' }}
                    >
                      Start Free Trial
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Portfolio</div>
              <h2 className="section-header__title">
                Our Latest <span className="gradient-text">Projects</span>
              </h2>
              <p className="section-header__text">Showcasing our best work across diverse industries.</p>
            </div>

            <div className="projects__tabs">
              {['All', 'Branding', 'Development', 'Marketing'].map((tab) => (
                <button
                  key={tab}
                  className={`projects__tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="projects__grid">
              {[
                { title: 'Brand Redesign', cat: 'Branding', img: IMAGES.project1, tags: ['Branding'] },
                { title: 'E-Commerce Platform', cat: 'Development', img: IMAGES.project2, tags: ['Development'] },
                { title: 'Growth Campaign', cat: 'Marketing', img: IMAGES.project3, tags: ['Marketing'] },
                {
                  title: 'Analytics Dashboard',
                  cat: 'Development',
                  img: IMAGES.project4,
                  tags: ['Development', 'Branding'],
                },
              ].filter((p) => activeTab === 'All' || p.tags.includes(activeTab))
                .map((p, i) => (
                  <div className="project-card" key={i}>
                    <img src={p.img} alt={p.title} />
                    <div className="project-card__overlay">
                      <h4 className="project-card__title">{p.title}</h4>
                      <span className="project-card__cat">{p.cat}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="section section--gradient" id="testimonials">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Testimonials</div>
              <h2 className="section-header__title">
                What Our <span className="gradient-text">Clients</span> Say
              </h2>
              <p className="section-header__text">Real feedback from real people who trust us.</p>
            </div>

            {(() => {
              const testimonials = [
                {
                  quote:
                    'Vibe transformed our online presence completely. Their team delivered a stunning website that exceeded our expectations and doubled our conversion rate.',
                  name: 'David Smith',
                  position: 'CEO, TechVenture',
                  img: IMAGES.testimonial,
                },
                {
                  quote:
                    'Working with Vibe was an absolute pleasure. They understood our vision perfectly and delivered a product that our users love. Highly recommended!',
                  name: 'Sarah Chen',
                  position: 'Founder, StartupXYZ',
                  img: IMAGES.team3,
                },
                {
                  quote:
                    'The quality of work and attention to detail is unmatched. Vibe helped us build a platform that handles millions of users seamlessly.',
                  name: 'Michael Torres',
                  position: 'CTO, ScaleUp Inc',
                  img: IMAGES.team2,
                },
              ];
              const t = testimonials[testimonialIndex];
              return (
                <>
                  <div className="testimonial-card">
                    <div className="testimonial-card__stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                    <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
                    <div className="testimonial-card__author">
                      <div className="testimonial-card__avatar">
                        <img src={t.img} alt={t.name} />
                      </div>
                      <div>
                        <div className="testimonial-card__name">{t.name}</div>
                        <div className="testimonial-card__position">{t.position}</div>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial__dots">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        className={`testimonial__dot ${i === testimonialIndex ? 'active' : ''}`}
                        onClick={() => setTestimonialIndex(i)}
                        aria-label={`Testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </section>

        <section className="stats">
          <div className="container">
            <div className="stats__grid">
              {[
                { value: '785+', label: 'Global Brands' },
                { value: '533+', label: 'Happy Clients' },
                { value: '99%', label: 'Satisfaction Rate' },
                { value: '50+', label: 'Team Members' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="stats__value">{s.value}</div>
                  <div className="stats__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="blog">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Our Blog</div>
              <h2 className="section-header__title">
                Latest <span className="gradient-text">Insights</span>
              </h2>
              <p className="section-header__text">
                Stay updated with our latest articles and industry trends.
              </p>
            </div>

            <div className="blog__grid">
              {[
                {
                  title: 'Free Advertising Strategies for Your Online Business',
                  date: 'Mar 10, 2026',
                  author: 'Olivia A.',
                  img: IMAGES.blog1,
                },
                {
                  title: '9 Simple Ways to Improve Your Design Skills Today',
                  date: 'Mar 5, 2026',
                  author: 'James C.',
                  img: IMAGES.blog2,
                },
                {
                  title: 'Tips to Quickly Boost Your Coding Productivity',
                  date: 'Feb 28, 2026',
                  author: 'Ava R.',
                  img: IMAGES.blog3,
                },
              ].map((b, i) => (
                <div className="blog-card" key={i}>
                  <div className="blog-card__img">
                    <img src={b.img} alt={b.title} />
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-card__meta">
                      <span>
                        <User size={14} /> {b.author}
                      </span>
                      <span>
                        <Calendar size={14} /> {b.date}
                      </span>
                    </div>
                    <h4 className="blog-card__title">
                      <a href="#">{b.title}</a>
                    </h4>
                    <a href="#" className="blog-card__link">
                      Read More <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--gradient" id="contact">
          <div className="container">
            <div className="section-header">
              <div className="section-header__badge">Get In Touch</div>
              <h2 className="section-header__title">
                Let&apos;s <span className="gradient-text">Connect</span>
              </h2>
              <p className="section-header__text">Have a project in mind? We&apos;d love to hear from you.</p>
            </div>

            <div className="contact__inner">
              <div className="contact__info">
                {[
                  {
                    icon: <Mail size={20} />,
                    label: 'Email Address',
                    value: 'hello@vibetemplate.com',
                    href: 'mailto:hello@vibetemplate.com',
                  },
                  {
                    icon: <MapPin size={20} />,
                    label: 'Office Location',
                    value: '76/A, Green Valley, California, USA',
                  },
                  {
                    icon: <Phone size={20} />,
                    label: 'Phone Number',
                    value: '+1 (800) 123-4567',
                    href: 'tel:+18001234567',
                  },
                  {
                    icon: <MessageSquare size={20} />,
                    label: 'Live Chat',
                    value: 'Available Mon-Fri, 9AM-6PM PST',
                  },
                ].map((item, i) => (
                  <div className="contact__info-item" key={i}>
                    <div className="contact__info-label">{item.label}</div>
                    <div className="contact__info-value">
                      {'href' in item && item.href ? (
                        <a href={item.href}>{item.value}</a>
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact__form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="contact__form-row">
                    <input className="contact__input" type="text" placeholder="Full Name" />
                    <input className="contact__input" type="email" placeholder="Email Address" />
                  </div>
                  <div className="contact__form-row">
                    <input className="contact__input" type="text" placeholder="Phone Number" />
                    <input className="contact__input" type="text" placeholder="Subject" />
                  </div>
                  <textarea className="contact__input" placeholder="Your Message" rows={5} />
                  <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
                    Send Message <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <h2 className="cta__title">Join 5,000+ Startups Growing with Vibe</h2>
            <p className="cta__text">
              Ready to transform your digital presence? Let&apos;s build something amazing together.
            </p>
            <a href="#contact" className="btn btn--white">
              Get Started Now <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div>
              <a href="#" className="header__logo">
                <span>Vibe</span>
              </a>
              <p className="footer__brand-text">
                Crafting premium digital experiences for modern startups and businesses worldwide.
              </p>
              <div className="footer__socials">
                {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                  <a href="#" className="footer__social" key={i}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="footer__heading">Quick Links</h4>
              <div className="footer__links">
                <a href="#">Home</a>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#about">About Us</a>
              </div>
            </div>

            <div>
              <h4 className="footer__heading">Services</h4>
              <div className="footer__links">
                <a href="#">Web Development</a>
                <a href="#">UI/UX Design</a>
                <a href="#">Digital Marketing</a>
                <a href="#">Brand Identity</a>
              </div>
            </div>

            <div>
              <h4 className="footer__heading">Support</h4>
              <div className="footer__links">
                <a href="#">Documentation</a>
                <a href="#">FAQs</a>
                <a href="#">Contact Us</a>
                <a href="#">Privacy Policy</a>
              </div>
            </div>

            <div>
              <h4 className="footer__heading">Newsletter</h4>
              <p className="footer__newsletter-text">Subscribe to receive updates and tips.</p>
              <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input className="footer__newsletter-input" type="email" placeholder="Email address" />
                <button className="footer__newsletter-btn" type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="footer__bottom">
            <span className="footer__bottom-text">&copy; 2026 Vibe. All rights reserved.</span>
            <div className="footer__bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <div
        className={`settings-panel__backdrop ${settingsOpen ? 'open' : ''}`}
        onClick={() => setSettingsOpen(false)}
      />
      <div className={`settings-panel ${settingsOpen ? 'open' : ''}`}>
        <div className="settings-panel__header">
          <h3 className="settings-panel__title">
            <Settings
              size={18}
              style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 6 }}
            />{' '}
            Settings
          </h3>
          <button
            className="settings-panel__close"
            onClick={() => setSettingsOpen(false)}
            aria-label="Close settings"
          >
            <X size={20} />
          </button>
        </div>

        <div className="settings-group">
          <div className="settings-group__label">Appearance</div>
          <div className="settings-row">
            <div>
              <div className="settings-row__label">
                {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </div>
              <div className="settings-row__desc">Switch between dark and light themes</div>
            </div>
            <button
              className={`toggle-switch ${theme === 'light' ? 'active' : ''}`}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            />
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-row__label">
                {colorStyle === 'gradient' ? '🎨 Gradient' : '🟦 Flat'}
              </div>
              <div className="settings-row__desc">Toggle gradient or flat color style</div>
            </div>
            <button
              className={`toggle-switch ${colorStyle === 'flat' ? 'active' : ''}`}
              onClick={toggleStyle}
              aria-label="Toggle color style"
            />
          </div>
        </div>

        <div className="settings-group">
          <div className="settings-group__label">Primary Color</div>
          <div className="settings-colors">
            {COLOR_PRESETS.map((p) => (
              <button
                key={p.hue}
                className={`settings-color-btn ${activeColor === p.hue ? 'active' : ''}`}
                style={{ background: p.color }}
                onClick={() => changeColor(p.hue)}
                title={p.name}
                aria-label={`Set primary color to ${p.name}`}
              />
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
          Settings are saved in cookies and will persist across page reloads.
        </div>
      </div>

      <button
        className="settings-toggle"
        onClick={() => setSettingsOpen(true)}
        aria-label="Open settings"
      >
        <Settings size={22} />
      </button>

      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <ArrowUp size={22} />
      </button>
    </>
  );
}
