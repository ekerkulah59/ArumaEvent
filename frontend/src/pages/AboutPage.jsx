import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Handshake, Star, Check, Utensils, Camera, Tent, Sofa, Sparkles, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';

const AboutPage = () => {
  const services = [
    { icon: Sofa, title: 'Elegant Seating & Tables', description: 'Comfortable, stylish options for any size gathering' },
    { icon: Tent, title: 'Professional Tents', description: 'The right atmosphere, rain or shine' },
    { icon: Camera, title: 'Photo Booth Fun', description: 'Capture the joy of your special day' },
    { icon: Sparkles, title: 'Beautiful Decor', description: 'Transform any space into something extraordinary' },
    { icon: Utensils, title: 'Complete Food Service', description: 'Everything to serve your guests with style' },
    { icon: Check, title: 'And So Much More', description: 'Custom solutions for your unique celebration' },
  ];

  const promise = [
    { icon: Handshake, text: 'We treat your event like our own—with care, attention, and genuine excitement.' },
    { icon: Heart, text: 'We believe in quality—your memories deserve nothing less than the best.' },
    { icon: Star, text: 'We\'re here for you—from your first call to the final cleanup.' },
    { icon: Home, text: 'We celebrate community—every event strengthens the bonds that make Delaware feel like home.' },
  ];

  return (
    <div className="min-h-screen pt-24" data-testid="about-page">
      <SEO
        title="About Us"
        description="Meet Aruma Events — your Delaware event rental and décor partner. We bring quality tents, seating, photo booths, and custom design to every celebration."
        path="/about"
      />
      {/* Hero */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
                Our Story
              </p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                It Started at Our Family’s Table
              </h1>
              <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
                Aurma Rental began around our family’s dining table—at my grandmother’s 80th birthday. Three generations laughed, shared stories, and made memories under a simple tent in the backyard. That evening we asked: “Why do some people miss out on celebrating because they don’t have the right setup?” We knew we had to do something about it.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                We’re not just in the rental business; we’re in the business of bringing people together and creating the space where memories are made.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src="/event-gallary0.jpeg"
                alt="Event decoration"
                className="rounded-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl">
                <p className="font-heading text-4xl font-bold">2025</p>
                <p className="font-body text-sm">Founded · Helping Families Celebrate</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Do This */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
            Why We Do This
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            Life moves fast. Celebrations stop time.
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            At Aurma Rental we believe every milestone deserves to be celebrated, and no one should have to compromise their vision because of logistics. We’re a family business serving families—your story matters to us.
          </p>
        </div>
      </section>

      {/* How We Help You Celebrate */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
              How We Help You Celebrate
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              From intimate gatherings to grand celebrations
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Aurma Family Promise */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600"
                alt="Corporate event"
                className="rounded-xl h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600"
                alt="Birthday party"
                className="rounded-xl h-48 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600"
                alt="Gala event"
                className="rounded-xl h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600"
                alt="Baby shower"
                className="rounded-xl h-48 object-cover mt-8"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
                The Aurma Family Promise
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
                How we show up for you
              </h2>
              <ul className="space-y-5">
                {promise.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-body text-muted-foreground pt-0.5">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Let’s Create Your Perfect Day
          </h2>
          <p className="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Tell us what you’re celebrating—we’ll help you bring it to life.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold"
              data-testid="about-cta-btn"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
