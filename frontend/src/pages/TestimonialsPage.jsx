import { motion } from 'framer-motion';
import TestimonialCard from '../components/TestimonialCard';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';
import { testimonials } from '../data/staticData';

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen pt-24" data-testid="testimonials-page">
      <SEO
        title="Testimonials"
        description="Read what couples, families, and companies say about Aruma Events. Real reviews from real celebrations."
        path="/testimonials"
      />
      {/* Header */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
              Testimonials
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h1>
            <p className="font-body text-muted-foreground text-lg">
              Don't just take our word for it. Hear from the couples, families, and 
              companies who trusted us with their special events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Create Your Success Story?
          </h2>
          <p className="font-body text-white/80 mb-8 max-w-xl mx-auto">
            Join our growing list of satisfied clients. Let us make your event unforgettable.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold"
              data-testid="testimonials-cta-btn"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
