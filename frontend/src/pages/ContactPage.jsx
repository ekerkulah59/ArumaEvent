import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  const contactItems = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: ['53 Cilento Dr, Magnolia, Delaware'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: ['(835) 212-0574', 'Mon-Fri: 9am - 6pm'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: ['arumaeventsservices@gmail.com'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      lines: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm'],
    },
  ];

  return (
    <div className="min-h-screen pt-24" data-testid="contact-page">
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
              Contact Aruma Events
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let's Create Something Beautiful
            </h1>
            <p className="font-body text-muted-foreground text-lg">
              Have a question or want to get in touch with the Aruma Events team? Send us 
              a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-8"
            >
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="font-body text-muted-foreground mb-8">
                  Have questions about Aruma Events services or rentals? We're here to 
                  help you create the perfect event.
                </p>
              </div>

              {contactItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                    data-testid={`contact-info-${item.title.toLowerCase().replace(' ', '-')}`}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      {item.lines.map((line, i) => (
                        <p key={i} className="font-body text-sm text-muted-foreground">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-border">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Send us a message
                </h2>
                <p className="font-body text-muted-foreground mb-8">
                  For a custom quote on services or rentals, add items to your cart and use Request a Quote from the cart or any product page.
                </p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="h-96 bg-muted relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.8234567890123!2d-75.4567890!3d39.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s53%20Cilento%20Dr%2C%20Magnolia%2C%20DE!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Aruma Events Location"
        ></iframe>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">
                53 Cilento Dr, Magnolia, Delaware
              </p>
              <p className="font-body text-xs text-muted-foreground">
                Delaware
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
