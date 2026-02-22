import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { faq } from '../data/staticData';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaqs = activeCategory === 'all'
    ? faq
    : faq.filter((item) => item.category === activeCategory);

  const categories = [
    { value: 'all', label: 'All Questions' },
    { value: 'booking', label: 'Booking' },
    { value: 'services', label: 'Services' },
    { value: 'rentals', label: 'Rentals' },
    { value: 'payment', label: 'Payment' },
  ];

  return (
    <div className="min-h-screen pt-24" data-testid="faq-page">
      {/* Header */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
              FAQ
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="font-body text-muted-foreground text-lg">
              Find answers to common questions about Aruma Events services, rentals, and booking process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center" data-testid="faq-filters">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? 'default' : 'outline'}
                size="sm"
                className={`rounded-full ${
                  activeCategory === cat.value 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-primary/10'
                }`}
                onClick={() => setActiveCategory(cat.value)}
                data-testid={`faq-filter-${cat.value}`}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
            {filteredFaqs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem 
                  value={item.id}
                  className="bg-white rounded-xl border border-border px-6"
                  data-testid={`faq-item-${item.id}`}
                >
                  <AccordionTrigger className="font-heading text-base md:text-lg font-semibold text-foreground hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground pb-5 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-muted">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="font-body text-muted-foreground mb-6">
            We're here to help. Reach out to the Aruma Events team for personalized assistance.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
              data-testid="faq-contact-btn"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
