import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import HeroSlideshow from '../components/HeroSlideshow';
import SEO from '../components/SEO';
import { services, testimonials } from '../data/staticData';

const HomePage = () => {
  const featuredServices = services.slice(0, 4);
  const featuredTestimonials = testimonials.filter((t) => t.is_featured).slice(0, 3);

  // Hero images from the public folder
  const heroImages = [
    '/hero-image/andrea-mininni-VLlkOJdzLG0-unsplash.jpg',
    '/hero-image/fabio-guntur-qG2yK_iNspE-unsplash.jpg',
    '/hero-image/fotografo-samuel-cruz-CzhLNWoEd4A-unsplash.jpg',
    '/hero-image/jorge-fernandez-salas-lSCD5QDwqQ8-unsplash.jpg',
    '/hero-image/matthew-PmFCYjRqHN8-unsplash.jpg',
    '/hero-image/miltiadis-fragkidis-OdV-57s7Hrs-unsplash.jpg',
    '/hero-image/roma-shackiy-pye5zRDTm2A-unsplash.jpg',
    '/hero-image/sirio-hm3efUMoReg-unsplash.jpg',
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      <SEO
        title="Event Rental &amp; Décor — Weddings, Corporate, Celebrations"
        description="Aruma Events brings your celebration to life. Premium event rental and décor: tents, tables, chairs, photo booths, and custom design for weddings, corporate events, and parties."
        path="/"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center" data-testid="hero-section">
        {/* Background Slideshow */}
        <HeroSlideshow images={heroImages} interval={5000} />

        {/* Content */}
        <div className="relative z-10 container-custom w-full pt-24">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-accent text-sm md:text-base uppercase tracking-widest mb-4"
            >
              Your story, beautifully told
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Every Celebration Is a
              <span className="block text-accent">Chapter in Your Family’s Story</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-white/80 text-base md:text-lg mb-8 leading-relaxed"
            >
              From your first gathering to the milestones your grandchildren will remember—we help you set the scene with premium décor and rentals so the moments you share become the stories you tell for years.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/services">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base"
                  data-testid="hero-explore-services-btn"
                >
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-foreground rounded-full px-8 py-6 text-base"
                  data-testid="hero-get-quote-btn"
                >
                  Get a Quote
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Services */}
      <section className="section-padding" data-testid="featured-services-section">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-body text-primary text-sm uppercase tracking-widest mb-2"
              >
                How We Help You Celebrate
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-heading text-3xl md:text-4xl font-bold text-foreground"
              >
                The Moments We Help You Create
              </motion.h2>
            </div>
            <Link
              to="/services"
              className="font-body text-primary hover:text-primary/80 flex items-center gap-2 mt-4 md:mt-0"
              data-testid="view-all-services-link"
            >
              Explore All Ways to Celebrate <ArrowRight size={18} />
            </Link>
          </div>

          <div className="tetris-grid gap-6">
              {featuredServices.map((service, index) => (
                <div
                  key={service.id}
                  className={`${index === 0 ? 'featured h-full min-h-0' : 'min-h-[300px]'}`}
                >
                  <ServiceCard service={service} index={index} showDescription={false} />
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-muted" data-testid="about-preview-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="font-body text-primary text-sm uppercase tracking-widest">
                Our Story
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                We Believe Every Family Deserves a Beautiful Chapter
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                From day one we’ve had a front-row seat to the moments that define families—the “I do” that starts a new chapter, the first birthday that brings everyone to the table, the anniversary that reminds you how far you’ve come. We don’t just decorate spaces; we help you set the stage for the stories your family will tell for generations.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Whether it’s an intimate dinner or a grand celebration, our décor and rentals are chosen so your day feels unmistakably yours. Your vision, your people, your story—beautifully told.
              </p>
              <Link to="/about">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                  data-testid="learn-more-about-btn"
                >
                  Read Our Story
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/hero-image/matthew-PmFCYjRqHN8-unsplash.jpg"
                alt="Wedding decoration"
                className="rounded-lg w-full h-64 object-cover"
              />
              <img
                src="/hero-image/sirio-hm3efUMoReg-unsplash.jpg"
                alt="Corporate event"
                className="rounded-lg w-full h-64 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted" data-testid="faq-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-primary text-sm uppercase tracking-widest mb-2"
            >
              Frequently Asked Questions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-4xl font-bold text-foreground"
            >
              Everything You Need to Know
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                How far in advance should I book?
              </h3>
              <p className="font-body text-muted-foreground">
                We recommend booking 4-6 weeks in advance for optimal availability, though we can often accommodate shorter timelines depending on your needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                Do you provide setup and breakdown services?
              </h3>
              <p className="font-body text-muted-foreground">
                Yes! Our team handles complete setup and breakdown, so you can focus on enjoying your celebration without any stress.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                What areas do you serve?
              </h3>
              <p className="font-body text-muted-foreground">
                We proudly serve the greater metropolitan area and surrounding regions. Contact us to confirm service availability for your location.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                Can you work with my budget?
              </h3>
              <p className="font-body text-muted-foreground">
                Absolutely! We offer flexible packages and can customize our services to work within your budget while still creating a beautiful celebration.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-10">
            <Link to="/contact">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                data-testid="faq-contact-btn"
              >
                Have More Questions?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="section-padding" data-testid="testimonials-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-primary text-sm uppercase tracking-widest mb-2"
            >
              From Families Like Yours
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-4xl font-bold text-foreground"
            >
              Stories From the Celebrations We've Shared
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
              {featuredTestimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </div>

          <div className="text-center mt-10">
            <Link
              to="/testimonials"
              className="font-body text-primary hover:text-primary/80 flex items-center justify-center gap-2"
              data-testid="view-all-testimonials-link"
            >
              Read More Stories <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Ready to Write Your Next Chapter?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-body text-white/80 text-lg mb-8"
            >
              Tell us the moment you’re celebrating—we’ll help you set the scene. We respond within 24 hours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/contact">
                <Button
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold"
                  data-testid="cta-get-quote-btn"
                >
                  Request a Quote
                </Button>
              </Link>
              <Link to="/rentals">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-base"
                  data-testid="cta-browse-rentals-btn"
                >
                  See What’s Possible
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
