import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '../components/ui/button';

const termsSections = [
  {
    title: '1. Acceptance of Terms',
    content:
      'By accessing or using the Aruma Events website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.',
  },
  {
    title: '2. Services and Rentals',
    content:
      'Aruma Events provides event décor design services and premium rental equipment including, but not limited to, tents, tables, chairs, linens, centerpieces, backdrops, and other event supplies. All services and rentals are subject to availability. Product images and descriptions on our website are for illustrative purposes; actual items may vary slightly.',
  },
  {
    title: '3. Booking and Reservations',
    content:
      'A booking is confirmed when we receive your signed agreement and required deposit. Reservations are held for a limited time pending payment. Dates are not reserved until full deposit is received. We recommend booking as far in advance as possible, especially for peak seasons (spring, summer, and fall).',
  },
  {
    title: '4. Payment Terms',
    content:
      'A non-refundable deposit (typically 30–50% of the total) is required to confirm your reservation. The remaining balance is due no later than 7–14 days before your event date, unless otherwise agreed in writing. We accept major credit cards, debit cards, and bank transfers. Late payments may result in cancellation of your booking without refund.',
  },
  {
    title: '5. Cancellation and Refunds',
    content:
      'The initial deposit is non-refundable. If you cancel more than 30 days before your event, you may apply your deposit (minus an administrative fee) toward a future booking within 12 months. Cancellations within 30 days of the event are subject to 100% of the total contract value. We do not offer refunds for no-shows or for weather-related cancellations.',
  },
  {
    title: '6. Rental Period and Returns',
    content:
      'Rental periods typically run from delivery/pickup to the agreed return date and time. Late returns are subject to additional daily charges. All equipment must be returned in the same condition as received, ordinary wear excepted. You are responsible for cleaning rentals (e.g., wiping tables, shaking linens) unless cleaning services were explicitly included in your contract.',
  },
  {
    title: '7. Damage and Loss',
    content:
      'You are responsible for any loss, theft, or damage to rented items beyond normal wear and tear. A security deposit may be required for high-value items. Damage charges will be assessed based on repair or replacement cost. Missing or damaged items will be billed at full replacement value.',
  },
  {
    title: '8. Setup and Delivery',
    content:
      'Delivery, setup, and pickup schedules are agreed upon in your contract. Additional fees may apply for deliveries outside our standard service area or for special timing requests. You are responsible for ensuring adequate access to the venue for delivery and pickup. Delays caused by venue access issues may incur additional charges.',
  },
  {
    title: '9. Intellectual Property',
    content:
      'All content on this website—including text, graphics, logos, images, and design—is the property of Aruma Events or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute, or use our content without prior written permission.',
  },
  {
    title: '10. Privacy',
    content:
      'Your use of our services is also governed by our Privacy Policy. We collect and process personal information as described therein. By using our website and services, you consent to such collection and use.',
  },
  {
    title: '11. Limitation of Liability',
    content:
      'To the fullest extent permitted by law, Aruma Events shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or equipment. Our total liability for any claim shall not exceed the amount you paid for the services or rentals in question.',
  },
  {
    title: '12. Force Majeure',
    content:
      'We are not liable for failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, pandemics, government actions, strikes, or severe weather. In such cases, we will work with you to reschedule or credit your deposit toward a future event.',
  },
  {
    title: '13. Governing Law',
    content:
      'These Terms and Conditions are governed by the laws of the State of Delaware, United States. Any disputes arising from these terms or your use of our services shall be resolved in the courts of Delaware.',
  },
  {
    title: '14. Contact Information',
    content:
      'For questions about these Terms and Conditions, please contact us at arumaeventsservices@gmail.com or (835) 212-0574. Our address is 53 Cilento Dr, Magnolia, Delaware.',
  },
];

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen pt-24" data-testid="terms-page">
      {/* Header */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
              <FileText size={18} />
              Legal
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="font-body text-muted-foreground text-lg">
              Please read these terms carefully before using Aruma Events services or renting our equipment.
            </p>
            <p className="font-body text-muted-foreground text-sm mt-4">
              Last updated: February 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <div className="space-y-8">
            {termsSections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border pb-8 last:border-0 last:pb-0"
              >
                <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Questions About Our Terms?
          </h2>
          <p className="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">
            We’re happy to clarify anything. Reach out and we’ll respond within 24 hours.
          </p>
          <Link to="/contact">
            <Button
              className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold"
              data-testid="terms-contact-btn"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
